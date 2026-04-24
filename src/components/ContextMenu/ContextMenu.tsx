import { ChevronRight } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import './ContextMenu.css';

export interface ContextMenuItemProps {
  /** Item label */
  label: string;
  /** Optional left icon (lucide-react node, 14px) */
  icon?: React.ReactNode;
  /** Optional description shown below the label */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Show a divider below this item */
  divider?: boolean;
  /** Show a checkbox on the left */
  checkbox?: boolean;
  /** Checkbox checked state */
  checked?: boolean;
  /** Show a toggle on the right */
  toggle?: boolean;
  /** Toggle on/off state */
  toggled?: boolean;
  /** Show a right-arrow (sub-menu indicator) */
  arrow?: boolean;
  /** Optional initials string to show an Avatar instead of an icon */
  avatarInitials?: string;
  /** Click handler */
  onClick?: () => void;
}

export interface ContextMenuProps {
  /** Menu items */
  items: ContextMenuItemProps[];
  /** Whether the menu is visible */
  open?: boolean;
  /** Optional class name for the root element */
  className?: string;
}

function ContextMenuItemRow({
  label,
  icon,
  description,
  disabled = false,
  divider = false,
  checkbox,
  checked = false,
  toggle,
  toggled = false,
  arrow,
  avatarInitials,
  onClick,
}: ContextMenuItemProps) {
  return (
    <>
      <li
        className={`context-menu__item ${disabled ? 'context-menu__item--disabled' : ''}`}
        role="menuitem"
        aria-disabled={disabled}
        onClick={!disabled ? onClick : undefined}
      >
        {/* Left: checkbox */}
        {checkbox && (
          <span className="context-menu__left" aria-hidden>
            <label className="context-menu__checkbox-label">
              <input
                type="checkbox"
                className="context-menu__checkbox-input"
                checked={checked}
                readOnly
                tabIndex={-1}
              />
              <span className="context-menu__checkbox-box" />
            </label>
          </span>
        )}

        {/* Left: avatar */}
        {!checkbox && avatarInitials && (
          <span className="context-menu__left" aria-hidden>
            <Avatar size="xs" initials={avatarInitials} />
          </span>
        )}

        {/* Left: icon */}
        {!checkbox && !avatarInitials && icon && (
          <span className="context-menu__left context-menu__icon" aria-hidden>
            {icon}
          </span>
        )}

        {/* Text block */}
        <span className="context-menu__text">
          <span className="context-menu__label">{label}</span>
          {description && (
            <span className="context-menu__description">{description}</span>
          )}
        </span>

        {/* Right: toggle */}
        {toggle && (
          <span className="context-menu__right" aria-hidden>
            <span
              className={`context-menu__toggle-track ${toggled ? 'context-menu__toggle-track--on' : ''}`}
            >
              <span className="context-menu__toggle-thumb" />
            </span>
          </span>
        )}

        {/* Right: arrow */}
        {arrow && !toggle && (
          <span className="context-menu__right context-menu__arrow" aria-hidden>
            <ChevronRight size={14} />
          </span>
        )}
      </li>

      {divider && <li className="context-menu__divider" role="separator" />}
    </>
  );
}

/**
 * Context / dropdown menu. Renders a floating list of items when `open` is true.
 * Supports icon, avatar, checkbox, toggle, arrow, description, and divider per item.
 * Figma: node 299-827 (_Atom)
 */
export function ContextMenu({ items, open = true, className = '' }: ContextMenuProps) {
  if (!open) return null;

  return (
    <ul
      className={`context-menu ${className}`.trim()}
      role="menu"
    >
      {items.map((item, i) => (
        <ContextMenuItemRow key={i} {...item} />
      ))}
    </ul>
  );
}
