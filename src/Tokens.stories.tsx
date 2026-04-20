import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from './design-tokens';

const meta: Meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'All design tokens from the Surveil Component Library. Use these values for consistency across the design system.',
      },
    },
  },
};

export default meta;

const TokenSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section style={{ marginBottom: 48 }}>
    <h2 className="text-h5" style={{ marginBottom: 24, color: '#131313' }}>
      {title}
    </h2>
    {children}
  </section>
);

const TokenRow = ({
  name,
  value,
  preview,
}: {
  name: string;
  value: string | number;
  preview?: React.ReactNode;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '12px 16px',
      borderBottom: '1px solid #efefef',
      fontFamily: 'Roboto, monospace',
    }}
  >
    <code
      style={{
        minWidth: 200,
        fontSize: 13,
        color: '#3165ad',
        fontWeight: 500,
      }}
    >
      {name}
    </code>
    <span style={{ fontSize: 13, color: '#616161' }}>
      {typeof value === 'string' && value.startsWith('#') ? (
        <span style={{ fontFamily: 'monospace' }}>{value}</span>
      ) : (
        String(value)
      )}
    </span>
    {preview && <div style={{ marginLeft: 'auto' }}>{preview}</div>}
  </div>
);

/**
 * Re-orders palette entries so non-numeric keys (e.g. "default") are inserted
 * after the last numeric step ≤ 500 — keeping them between 400 and 600.
 */
function orderPaletteEntries(obj: Record<string, unknown>): [string, unknown][] {
  const entries = Object.entries(obj);
  const numeric = entries
    .filter(([k]) => !isNaN(Number(k)))
    .sort((a, b) => Number(a[0]) - Number(b[0]));
  const strings = entries.filter(([k]) => isNaN(Number(k)));

  const result: [string, unknown][] = [];
  let inserted = false;
  for (const entry of numeric) {
    if (!inserted && Number(entry[0]) > 500) {
      result.push(...strings);
      inserted = true;
    }
    result.push(entry);
  }
  if (!inserted) result.push(...strings);
  return result;
}

export const AllTokens: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <TokenSection title="Font Family">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.fontFamily
          </div>
          {Object.entries(tokens.fontFamily).map(([key, val]) => (
            <TokenRow key={key} name={`fontFamily.${key}`} value={val} />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Font Weight">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.fontWeight
          </div>
          {Object.entries(tokens.fontWeight).map(([key, val]) => (
            <TokenRow key={key} name={`fontWeight.${key}`} value={val} />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Scale">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.scale
          </div>
          {Object.entries(tokens.scale).map(([key, val]) => (
            <TokenRow key={key} name={`scale.${key}`} value={val} />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Border Width">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.borderWidth
          </div>
          {Object.entries(tokens.borderWidth).map(([key, val]) => (
            <TokenRow key={key} name={`borderWidth.${key}`} value={`${val}px`} />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Color">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            Palette tokens
          </div>
          {Object.entries(tokens.color).map(([key, val]) => {
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
              return (
                <div key={key}>
                  <div
                    style={{
                      padding: '8px 16px',
                      background: '#f7f7f7',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#272727',
                    }}
                  >
                    {key}
                  </div>
                  {orderPaletteEntries(val as Record<string, unknown>).map(
                    ([subKey, subVal]) => (
                      <TokenRow
                        key={`${key}.${subKey}`}
                        name={`color.${key}.${subKey}`}
                        value={subVal as string}
                        preview={
                          typeof subVal === 'string' &&
                          subVal.startsWith('#') ? (
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 4,
                                backgroundColor: subVal,
                                border:
                                  subVal === '#ffffff'
                                    ? '1px solid #e5e7eb'
                                    : undefined,
                              }}
                            />
                          ) : undefined
                        }
                      />
                    )
                  )}
                </div>
              );
            }
            return (
              <TokenRow
                key={key}
                name={`color.${key}`}
                value={val as string}
                preview={
                  typeof val === 'string' && val.startsWith('#') ? (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        backgroundColor: val,
                        border:
                          val === '#ffffff' ? '1px solid #e5e7eb' : undefined,
                      }}
                    />
                  ) : undefined
                }
              />
            );
          })}
        </div>
      </TokenSection>

      <TokenSection title="Typography">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.typography
          </div>
          {Object.entries(tokens.typography).map(([key, val]) => (
            <TokenRow
              key={key}
              name={`typography.${key}`}
              value={`${(val as any).fontSize} / ${(val as any).fontWeight} / ${(val as any).lineHeight}`}
              preview={
                <span
                  style={{
                    ...(val as React.CSSProperties),
                    color: '#131313',
                  }}
                >
                  Aa
                </span>
              }
            />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Radius">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.radius
          </div>
          {Object.entries(tokens.radius).map(([key, val]) => (
            <TokenRow
              key={key}
              name={`radius.${key}`}
              value={key === 'full' ? `${val}px` : `${val}px`}
              preview={
                <div
                  style={{
                    width: 40,
                    height: 24,
                    borderRadius: key === 'full' ? 9999 : Number(val),
                    backgroundColor: '#3165ad',
                    opacity: 0.3,
                  }}
                />
              }
            />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Focus Ring">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.focusRing
          </div>
          {Object.entries(tokens.focusRing).map(([key, val]) => (
            <TokenRow
              key={key}
              name={`focusRing.${key}`}
              value={val}
              preview={
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: '#3165ad',
                    boxShadow: val,
                  }}
                />
              }
            />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Shadow">
        <div
          style={{
            border: '1px solid #efefef',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#f9fafb',
              fontWeight: 600,
              fontSize: 12,
              color: '#616161',
              textTransform: 'uppercase',
            }}
          >
            tokens.shadow
          </div>
          {Object.entries(tokens.shadow).map(([key, val]) => (
            <TokenRow
              key={key}
              name={`shadow.${key}`}
              value={val}
              preview={
                <div
                  style={{
                    width: 64,
                    height: 32,
                    background: '#efefef',
                    borderRadius: 4,
                    boxShadow: val,
                  }}
                />
              }
            />
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Usage">
        <div className="text-body-md" style={{ color: '#616161' }}>
          <p style={{ marginBottom: 16 }}>
            Import tokens in your code:
          </p>
          <pre
            style={{
              padding: 16,
              background: '#f7f7f7',
              borderRadius: 8,
              overflow: 'auto',
              fontSize: 13,
              fontFamily: 'monospace',
            }}
          >
            {`import { tokens } from '@/design-tokens';

// Font
tokens.fontFamily.headings    // 'Roboto, system-ui, sans-serif'
tokens.fontWeight.medium      // 500

// Scale (spacing/sizing)
tokens.scale[400]             // 16
tokens.borderWidth.sm         // 1

// Color
tokens.color.primary.default  // '#3165ad'

// Typography
tokens.typography.h1         // { fontSize: '60px', ... }

// Radius
tokens.radius.md             // 4 (or tokens.radius.s for alias)

// Shadow
tokens.shadow.md             // '0 2px 4px -2px...'

// Focus
tokens.focusRing.primary`}
          </pre>
          <p style={{ marginTop: 16, marginBottom: 8 }}>
            Or use CSS variables from <code>colors.css</code> and{' '}
            <code>typography.css</code>:
          </p>
          <pre
            style={{
              padding: 16,
              background: '#f7f7f7',
              borderRadius: 8,
              overflow: 'auto',
              fontSize: 13,
              fontFamily: 'monospace',
            }}
          >
            {`var(--font-family-headings)
var(--scale-400)
var(--radius-md)
var(--border-width-sm)
var(--color-primary)
var(--shadow-md)
.text-h1, .text-body-md`}
          </pre>
        </div>
      </TokenSection>
    </div>
  ),
};
