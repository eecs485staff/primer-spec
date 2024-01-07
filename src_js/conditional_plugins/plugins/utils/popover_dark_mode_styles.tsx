/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';

const DARK_MODE_STYLE_ID = 'primer-spec-april-fools-popover-dark-mode-styles';

export function insertPopoverDarkModeStylesOnce() {
  if (!document.querySelector(`#${DARK_MODE_STYLE_ID}`)) {
    document.head.appendChild(
      <style>
        {':root[data-theme-mode="dark"] .Popover .dropdown {'}
        {'  filter: invert(93%) hue-rotate(180deg);'}
        {'}'}
        {':root[data-theme-mode="dark"] .Popover .dropdown .dropdown-item {'}
        {'  color: #24292e'}
        {'}'}
        {
          ':root[data-theme-mode="dark"] .Popover .dropdown .dropdown-item:hover {'
        }
        {'  color: #000;'}
        {'}'}
        {'.Popover {'}
        {'  color: var(--main-text-color)'}
        {'}'}
        {':root[data-theme-mode="dark"] .Popover-message {'}
        {'  background-color: var(--code-block-header-bg-color);'}
        {'  border: 1px solid #30363d;'}
        {'}'}
        {':root[data-theme-mode="dark"] .Popover-message--right-top::after {'}
        {'  border-left-color: #30363d;'}
        {'}'}
      </style>,
    );
  }
}
