/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import type { ConditionalPluginInput } from '../types';

export default async function HalloweenPlugin(
  input: ConditionalPluginInput,
): Promise<void> {
  registerHalloweenSubthemeIfNeeded();
  if (!input.settings_shown) {
    replaceSettingsToggleWithHat();
  } else {
    insertPumpkinsInThemePreview();
  }
  replaceSidebarToggleWithBook();
  toggleFontIfNeeded(input.subtheme_name);
  registerDblclickEasterEggIfNeeded(input.subtheme_name);
  insertShyEmojiIfNeeded(input.subtheme_name);
}

function replaceSettingsToggleWithHat() {
  const settingsIconClassList = document.querySelector(
    '#primer-spec-settings-toggle i.fa-cog',
  )?.classList;
  if (settingsIconClassList) {
    settingsIconClassList.remove('fa-cog');
    settingsIconClassList.add('fa-hat-wizard');
  }
}

function replaceSidebarToggleWithBook() {
  const sidebarToggles = document.querySelectorAll(
    '.primer-spec-hoverable i.fa-bars',
  );
  sidebarToggles.forEach((sidebarToggle) => {
    sidebarToggle.classList.remove('fa-cog');
    sidebarToggle.classList.add('fa-book-dead');
  });
}

// Acknowledgement: The _design_ inspiration for this easter egg comes from a
// similar easter egg in WhatsApp Web, where clicking on an expired "view-once"
// media message shows an animated "🤫" emoji.
function createGhostEasterEggOnClick(event: MouseEvent | TouchEvent) {
  let startX, startY;
  if (event instanceof TouchEvent) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  } else {
    startX = event.clientX;
    startY = event.clientY;
  }

  const ghostSize = 32;
  startX -= ghostSize / 2;
  startY -= ghostSize / 2;
  const easterEggEmoji = (
    <span
      style={`position: fixed; top: ${startY}px; left: ${startX}px; z-index: 1000; font-size: ${ghostSize}px; transition: all 1s ease-out; user-select: none;`}
    >
      👻
    </span>
  );

  // Animate the ghost right after it's rendered.
  setTimeout(() => {
    easterEggEmoji.style.transform = `translateY(-${Math.round(
      ghostSize * 1.5,
    )}px)`;
    easterEggEmoji.style.opacity = '0';
  }, 0);
  // And clean up after the animation is complete.
  setTimeout(() => {
    easterEggEmoji.remove();
  }, 1500);

  // Add the ghost to the page!
  document.body.append(easterEggEmoji);
}

function registerDblclickEasterEggIfNeeded(subtheme_name: string) {
  if (subtheme_name === 'spooky') {
    document.body.addEventListener('dblclick', createGhostEasterEggOnClick, {
      passive: true,
    });
    document.body.addEventListener('touchend', createGhostEasterEggOnClick, {
      passive: true,
    });
  } else {
    document.body.removeEventListener('dblclick', createGhostEasterEggOnClick);
    document.body.removeEventListener('touchend', createGhostEasterEggOnClick);
  }
}

function insertPumpkinsInThemePreview() {
  document
    .querySelectorAll(
      'svg.primer-spec-theme-preview-spooky-light, svg.primer-spec-theme-preview-spooky-dark',
    )
    .forEach((svg) => {
      if (!svg.querySelector('.spooky-pumpkins')) {
        svg.appendChild(
          <text
            class="spooky-pumpkins"
            x="180"
            y="130"
            dominant-baseline="middle"
            text-anchor="middle"
            style="font-size: 72px;"
          >
            🎃🎃🎃
          </text>,
        );
      }
    });
}

function registerHalloweenSubthemeIfNeeded() {
  if (!window.PrimerSpec?.REGISTERED_SUBTHEMES?.['spooky']) {
    // NOTE: This block of code will only ever be called ONCE per page session.
    window.PrimerSpec?.registerNewSubtheme?.(
      'spooky',
      '🎃 Spooky 👻',
      constructHalloweenSubtheme(),
    );
    // Force-update the theme. The page will have already loaded with the
    // default theme, so we need to re-render with the spooky theme.
    window.PrimerSpec?.updateTheme?.({}, false);
  }
}

function constructHalloweenSubtheme() {
  // NOTE: This method will only ever be called ONCE per page session.
  // Hence, we can perform actions that modify the page state without
  // having to worry about duplicated effects.

  // Start by deep-copying the default theme's definition.
  const defaultSubthemeDef =
    window.PrimerSpec.REGISTERED_SUBTHEMES['default'].theme_definition;
  const halloweenSubthemeDef = JSON.parse(JSON.stringify(defaultSubthemeDef));

  // Since we want to use a custom font, we need to inject it into the page.
  document.head.appendChild(
    <link
      href="https://fonts.googleapis.com/css2?family=Creepster&family=Architects+Daughter&display=swap"
      rel="stylesheet"
    />,
  );

  // 'Spooky' is a dark-only theme. We'll first define the dark-mode colors,
  // then we'll completely remove the light-mode colors.

  // Finally, replace the light colors with the dark ones.
  halloweenSubthemeDef['light'] = halloweenSubthemeDef['dark'];
  return halloweenSubthemeDef;
}

function toggleFontIfNeeded(subtheme_name: string) {
  const existingStyleTag = document.getElementById(
    'primer-spec-halloween-font',
  );
  if (subtheme_name === 'spooky' && !existingStyleTag) {
    document.body.appendChild(
      <style id="primer-spec-halloween-font">
        body, .markdown-body, p {'{'}font-family: 'Architects Daughter'; {'}'}
        h1, h2, h3, h4, h5, h6 {'{'}font-family: 'Creepster' !important; {'}'}
      </style>,
    );
  } else if (subtheme_name !== 'spooky' && existingStyleTag) {
    existingStyleTag.remove();
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/*** SHY EMOJI ***/

const emojiSpanId = 'primer-spec-shy-emoji';
const keyframesCssId = 'primer-spec-shy-emoji-keyframes';

function insertShyEmojiImpl(subtheme_name: string) {
  const initHeight = getRandomInt(10, 90);

  const spookyEmojis = ['🎃', '👻', '🤫', '🧙', '🧛', '🧟', '👺'];
  const chosenEmoji = spookyEmojis[getRandomInt(0, spookyEmojis.length)];

  const peakFromMargin = getRandomInt(0, 2) === 0 ? 'right' : 'left';

  const shyEmojiKeyframes = (
    <style id={keyframesCssId}>
      {'@keyframes peak-in-out {'}
      {'  from {'}
      {`    ${peakFromMargin}: -70px;`}
      {'  }'}
      {'  20% {'}
      {`    ${peakFromMargin}: -20px;`}
      {'  }'}
      {'  80% {'}
      {`    ${peakFromMargin}: -20px;`}
      {'  }'}
      {'  to {'}
      {`    ${peakFromMargin}: -70px;`}
      {'  }'}
      {'}'}
      {'@keyframes fly {'}
      {'  25% {'}
      {`    top: ${getRandomInt(10, 90)}vh;`}
      {'  }'}
      {'  60% {'}
      {`    top: ${getRandomInt(-1, 101)}vh;`}
      {'  }'}
      {'  to {'}
      {`    top: ${getRandomInt(-10, 110)}vh;`}
      {`    ${peakFromMargin}: 110vw;`}
      {'  }'}
      {'}'}
    </style>
  );
  document.body.append(shyEmojiKeyframes);

  const shyEmoji = (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <span
      id={emojiSpanId}
      style={`position: fixed; top: ${initHeight}%; ${peakFromMargin}: -70px; font-size: 60px; z-index: 1000; user-select: none; cursor: pointer;`}
      onClick={() => {
        // If the emoji is still in the middle of peaking in, we want the
        // animation to begin from wherever it currently is.
        shyEmoji.style[peakFromMargin] =
          window.getComputedStyle(shyEmoji)[peakFromMargin];
        shyEmoji.style.animationDelay = '0s';
        shyEmoji.style.animationDuration = '3s';
        shyEmoji.style.animationName = 'fly';
      }}
    >
      {chosenEmoji}
    </span>
  );

  // Peak In and Out
  shyEmoji.style.animationFillMode = 'forwards';
  shyEmoji.style.animationDelay = '2s';
  shyEmoji.style.animationDuration = '25s';
  shyEmoji.style.animationTimingFunction = 'ease-in-out';
  shyEmoji.style.animationName = 'peak-in-out';
  // CLEANUP
  shyEmoji.onanimationend = () => {
    shyEmoji.remove();
    shyEmojiKeyframes.remove();
    // Rinse and repeat!
    insertShyEmojiIfNeeded(subtheme_name);
  };

  document.body.append(shyEmoji);
}

function insertShyEmojiIfNeeded(subtheme_name: string) {
  document.getElementById(emojiSpanId)?.remove();
  document.getElementById(keyframesCssId)?.remove();
  if (subtheme_name === 'spooky') {
    insertShyEmojiImpl(subtheme_name);
  }
}
