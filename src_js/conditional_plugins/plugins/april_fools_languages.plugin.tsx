/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import type { PluginDefinition } from '../types';
import { printEnablingURLToConsole } from '../utils/print_enabling_url_to_console';

const PLUGIN_ID = 'april_fools_languages';

export function initialize(): PluginDefinition {
  return {
    id: PLUGIN_ID,
    plugin: AprilFoolsLanguagesPlugin,
    shouldRun: () => {
      const today = new Date();
      // Console message if we are *just* past the April Fools end-date.
      // After April 3 until April 13.
      if (
        today.getMonth() === 3 &&
        today.getDate() > 3 &&
        today.getDate() <= 13
      ) {
        printEnablingURLToConsole(
          PLUGIN_ID,
          "🤫 Psst... It's well past halloween, but you can re-enable halloween mode by clicking this url:",
        );
      }

      // Remember that months are 0-indexed in JS!
      return (
        (today.getMonth() === 2 && today.getDate() >= 29) || // March 29
        (today.getMonth() === 3 && today.getDate() <= 3) // April 3
      );
    },
  };
}

async function AprilFoolsLanguagesPlugin(): Promise<void> {
  insertLanguageToggleIfNeeded();
}

function insertLanguageToggleIfNeeded() {
  const languageToggleId = 'primer-spec-april-fools-language-toggle';
  const existingLanguageToggle = document.querySelector(`#${languageToggleId}`);
  if (existingLanguageToggle) {
    return;
  }

  const settingsToggleContainer = document.querySelector(
    '.primer-spec-settings-toggle',
  );
  const settingsToggle = settingsToggleContainer?.querySelector(
    '.primer-spec-hoverable',
  );
  if (!settingsToggle || !settingsToggleContainer) {
    console.warn(
      'Primer Spec: April Fools Languages joke: Could not find settings toggle',
    );
    return;
  }

  const languageToggle = settingsToggle.cloneNode(true) as HTMLElement;
  languageToggle.id = languageToggleId;
  languageToggle.style.paddingRight = '1em';
  const languageIcon = languageToggle.querySelector('i.fa-cog');
  languageIcon?.classList.remove('fa-cog');
  languageIcon?.classList.add('fa-language');
  settingsToggleContainer.prepend(languageToggle);

  const languageToggleBtn = languageToggle.querySelector('button');
  languageToggleBtn?.addEventListener('click', () => toggleLanguagePopover());
}

function toggleLanguagePopover() {
  const languagePopoverId = 'primer-spec-april-fools-language-popover';
  const existingPopover = document.querySelector(`#${languagePopoverId}`);
  if (existingPopover) {
    existingPopover.remove();
  } else {
    const topbar = document.querySelector('header.primer-spec-topbar');
    topbar?.appendChild(
      <div
        id={languagePopoverId}
        class="Popover position-absolute"
        style="right: 8em; pointer-events: auto;"
      >
        <div class="Popover-message Popover-message--right-top p-4 mr-2 Box color-shadow-large">
          <h4 class="mb-2">Popover heading</h4>
          <p>Message about this particular piece of UI.</p>
          <button type="submit" class="btn btn-outline mt-2 text-bold">
            Got it!
          </button>
        </div>
      </div>,
    );
  }
}
