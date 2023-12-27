/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import { Month, getCurrentMonth } from '../utils/date_utils';

export default async function AprilFoolsLanguagesPlugin(): Promise<void> {
  insertToggleIfNeeded();
}

const state = { enabled: false };

function insertToggleIfNeeded() {
  if (state.enabled) {
    return;
  }
  const settingsToggleButtonContainer = document.querySelector(
    '#primer-spec-settings-toggle',
  );
  const settingsToggleButton = settingsToggleButtonContainer?.querySelector(
    '#primer-spec-settings-toggle .primer-spec-hoverable',
  );
  if (!settingsToggleButton || !settingsToggleButtonContainer) {
    console.warn(
      'Primer Spec: April Fools Star Wars joke: Could not find left-most topbar toggle button or settings toggle button',
    );
    return;
  }

  const toggle = settingsToggleButton.cloneNode(true) as HTMLElement;
  toggle.style.paddingRight = '1em';
  const icon = toggle.querySelector('i.fa-cog');
  icon?.classList.remove('fa-cog');
  icon?.classList.add('fa-jedi');
  settingsToggleButtonContainer.prepend(toggle);

  const toggleBtn = toggle.querySelector('button');
  toggleBtn?.addEventListener('click', () => togglePopover());
}

const popoverId = 'primer-spec-april-fools-star-wars-popover';
function togglePopover() {
  const existingPopover = document.getElementById(popoverId);
  if (existingPopover) {
    existingPopover.remove();
    return;
  }

  const greeting =
    getCurrentMonth() === Month.MAY
      ? 'May the fourth be with you!'
      : 'April Fools!';

  const topbar = document.querySelector('header.primer-spec-topbar');
  topbar?.appendChild(
    <div
      id={popoverId}
      class="Popover position-absolute"
      style="right: 8em; pointer-events: auto;"
    >
      <div
        class="Popover-message Popover-message--right-top p-4 mr-2 Box color-shadow-large"
        style="width: auto;"
      >
        <button
          class="btn-link position-absolute primer-spec-hoverable"
          style="top: 0.25em; right: 0.5em; font-size: 20px;"
          onClick={() => togglePopover()}
        >
          <i class="fas fa-times" />
        </button>
        <h4 class="mb-2">{greeting}</h4>
        <button class="btn btn-primary" onClick={() => renderStarWarsCrawl()}>
          Switch to Star Wars crawl
        </button>
      </div>
    </div>,
  );
}

function renderStarWarsCrawl() {
  if (state.enabled) {
    return;
  }
  state.enabled = true;

  document.body = (<body />) as HTMLElement;
}
