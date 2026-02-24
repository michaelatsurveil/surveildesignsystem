/**
 * Generates CSS custom properties from design-tokens.ts.
 * Run: node scripts/generate-tokens-css.mjs
 * Requires: design-tokens.ts to be buildable (script is run after ts build or via tsx).
 *
 * For simplicity this script reads a tokens export from a CJS/ESM build.
 * Alternative: use tsx to run a .ts version that imports design-tokens directly.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// Parse design-tokens.ts and extract a minimal token map for CSS.
// We read the file and extract key-value pairs to avoid needing ts-node/tsx at script time.
const tokensPath = path.join(root, 'src', 'design-tokens.ts');
let content = readFileSync(tokensPath, 'utf-8');

// Extract scale: 0: 0, 25: 1, ... 1000: 48
const scaleMatch = content.match(/scale:\s*\{([^}]+)\}/s);
const scaleEntries = scaleMatch
  ? scaleMatch[1]
      .split(',')
      .map((s) => s.trim().match(/(\d+):\s*(\d+)/))
      .filter(Boolean)
      .map((m) => [m[1], m[2]])
  : [];

// Extract color palettes (primary.default -> --color-primary, primary.50 -> --color-primary-50)
const colorSection = content.match(/color:\s*\{([\s\S]*?)\n\s+typography:/);
if (!colorSection) throw new Error('Could not find color section');
const colorBlock = colorSection[1];
const hexRe = /#'[a-fA-F0-9]{6}'|#['"]?[a-fA-F0-9]{6}['"]?/g;
const colorVars = [];

// primary: { 50: '#e5eefa', ... default: '#3165ad' }
const paletteRe = /(primary|grey|success|error|warning|neutral|background|icon):\s*\{([^}]+)\}/g;
let m;
while ((m = paletteRe.exec(colorBlock)) !== null) {
  const name = m[1];
  const inner = m[2];
  const pairs = inner.match(/(\w+):\s*(#[a-fA-F0-9]{6}|'[^']+'|"[^"]+")/g) || [];
  for (const p of pairs) {
    const [, k, v] = p.match(/(\w+):\s*(#[a-fA-F0-9]{6}|'[^']+'|"[^"]+")/);
    const val = v.replace(/['"]/g, '');
    const suffix = k === 'default' ? '' : `-${k}`;
    colorVars.push([`--color-${name}${suffix}`, val]);
  }
}

// button.* and other flat color keys
const flatColorRe = /'([^']+)':\s*('#[a-fA-F0-9]{6}')/g;
while ((m = flatColorRe.exec(colorBlock)) !== null) {
  const key = m[1].replace(/\./g, '-');
  colorVars.push([`--color-${key}`, m[2].replace(/['"]/g, '')]);
}

// fontFamily, fontWeight from start of file
const fontFamilyRe = /fontFamily:\s*\{\s*headings:\s*'([^']+)',\s*body:\s*'([^']+)'/;
const fontFamilyM = content.match(fontFamilyRe);
const fontWeightRe = /fontWeight:\s*\{\s*regular:\s*(\d+),\s*medium:\s*(\d+),\s*semibold:\s*(\d+),\s*bold:\s*(\d+)/;
const fontWeightM = content.match(fontWeightRe);

// radius
const radiusRe = /radius:\s*\{([^}]+)\}/s;
const radiusM = content.match(radiusRe);
const radiusEntries = radiusM
  ? radiusM[1]
      .split(',')
      .map((s) => s.trim().match(/(\w+):\s*(\d+|9999)/))
      .filter(Boolean)
      .map((m) => [m[1], m[2]])
  : [];

// shadow (values contain commas; match each key: 'value' without splitting on comma)
const shadowRe = /shadow:\s*\{([^}]+)\}/s;
const shadowM = content.match(shadowRe);
let shadowEntries = [];
if (shadowM) {
  const shadowBlock = shadowM[1];
  const lineRe = /(?:'(\w+)'|(\w+)):\s*'([^']+)'/g;
  let lm;
  while ((lm = lineRe.exec(shadowBlock)) !== null) {
    const key = lm[1] || lm[2];
    shadowEntries.push([key, lm[3]]);
  }
}

// Build :root block
const lines = [
  '/**',
  ' * Generated from src/design-tokens.ts - do not edit by hand.',
  ' * Run: node scripts/generate-tokens-css.mjs',
  ' */',
  '',
  ':root {',
];

// Scale (with px for non-zero)
for (const [num, val] of scaleEntries) {
  const v = Number(val);
  lines.push(`  --scale-${num}: ${v === 0 ? '0' : v + 'px'};`);
}
lines.push('');

// Font
if (fontFamilyM) {
  lines.push(`  --font-family-headings: ${fontFamilyM[1]};`);
  lines.push(`  --font-family-body: ${fontFamilyM[2]};`);
  lines.push('');
}
if (fontWeightM) {
  lines.push(`  --font-weight-regular: ${fontWeightM[1]};`);
  lines.push(`  --font-weight-medium: ${fontWeightM[2]};`);
  lines.push(`  --font-weight-semibold: ${fontWeightM[3]};`);
  lines.push(`  --font-weight-bold: ${fontWeightM[4]};`);
  lines.push('');
}

// Colors (dedupe by name - prefer first)
const seen = new Set();
for (const [name, val] of colorVars) {
  if (seen.has(name)) continue;
  seen.add(name);
  lines.push(`  ${name}: ${val};`);
}
lines.push('');

// Radius
for (const [name, val] of radiusEntries) {
  const v = Number(val);
  lines.push(`  --radius-${name}: ${v === 9999 ? '9999px' : v + 'px'};`);
}
lines.push('');

// Shadow
for (const [name, val] of shadowEntries) {
  const varName = name === 'default' ? '--shadow' : `--shadow-${name}`;
  lines.push(`  ${varName}: ${val};`);
}

lines.push('}');
lines.push('');

const outPath = path.join(root, 'src', 'tokens.generated.css');
writeFileSync(outPath, lines.join('\n'), 'utf-8');
console.log('Wrote', outPath);
