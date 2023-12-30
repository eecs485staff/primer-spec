/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import { Month, getCurrentMonth } from '../utils/date_utils';

const PIXELS_PER_SECOND = 40;
const AUTO_SCROLL_BTN_ID = 'primer-spec-star-wars-auto-scroll-ctrl';

let specHtmlBodyElement: null | HTMLElement = null;

export default async function AprilFoolsLanguagesPlugin(): Promise<void> {
  insertToggleIfNeeded();
}

const state = { enabled: false, autoScroll: true };

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

  // Store the existing spec body so that we can revert to it when the user
  // closes this joke.
  specHtmlBodyElement = document.body;

  insertStyles();
  document.body = (
    <body>
      <Topbar />
      <div class="wrapper">
        {convertSpecHtmlToStarWarsDom(specHtmlBodyElement)}
      </div>
    </body>
  ) as HTMLElement;

  setScrollAnimationDuration();
  listenForScrollChanges();
  startAutoScroll();

  // Set dark theme CSS variables
  window.PrimerSpec?.updateTheme?.({ mode: 'dark' }, false);
}

function convertSpecHtmlToStarWarsDom(specNode: HTMLElement): HTMLElement {
  const mainContent = specNode.querySelector(
    '#primer-spec-preact-main-content',
  );
  if (!mainContent) {
    throw new Error('Star Wars joke: Could not find main content');
  }
  let logo = null;
  if (mainContent.firstElementChild?.tagName === 'H1') {
    logo = mainContent.firstElementChild.cloneNode(true) as HTMLElement;
    logo.classList.add('main-logo');
  }
  return (
    <div class="star-wars-intro">
      <p class="intro-text">A long time ago, in a class far, far away...</p>
      {logo}
      {convertSpecHtmlToStarWarsDomMainContent(mainContent as HTMLElement)}
    </div>
  ) as HTMLElement;
}

function convertSpecHtmlToStarWarsDomMainContent(
  mainContentNode: HTMLElement,
): HTMLElement {
  const titleContent = <div class="title-content" />;
  for (const child of mainContentNode.children) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }
    if (child.tagName.startsWith('H')) {
      titleContent.appendChild(<p class="content-header">{child.innerText}</p>);
    } else {
      titleContent.appendChild(<p class="content-body">{child.innerText}</p>);
    }
  }
  return (<div class="main-content">{titleContent}</div>) as HTMLElement;
}

function setScrollAnimationDuration() {
  const duration = Math.round(
    getStarWarsMainContentEl().offsetHeight / PIXELS_PER_SECOND,
  );
  document.body.style.setProperty(
    '--primer-spec-april-fools-star-wars-content-scroll-duration',
    `${duration}s`,
  );
}

// Based on: https://css-tricks.com/books/greatest-css-tricks/scroll-animation/
function listenForScrollChanges() {
  const handleScroll = () => {
    const animationDuration = parseInt(
      document.body.style.getPropertyValue(
        '--primer-spec-april-fools-star-wars-content-scroll-duration',
      ),
      10,
    );
    const scrollPercentage =
      window.scrollY / (document.body.offsetHeight - window.innerHeight);
    document.body.style.setProperty(
      '--primer-spec-april-fools-star-wars-scroll',
      `${scrollPercentage * animationDuration}`,
    );
  };
  window.addEventListener('scroll', handleScroll, false);

  // Also make the body scrollable
  document.body.style.setProperty(
    'min-height',
    `${getStarWarsMainContentEl().offsetHeight + 200}px`,
  );
}

function startAutoScroll() {
  if (!state.autoScroll) {
    state.autoScroll = true;
  }
  listenForUserScroll(toggleAutoScroll);

  let lastTick: null | DOMHighResTimeStamp = null;
  function autoScrollStep(timestamp: DOMHighResTimeStamp) {
    if (!lastTick) {
      lastTick = timestamp;
    }

    const elapsed = timestamp - lastTick;
    if (elapsed > 20) {
      window.scrollBy(0, (PIXELS_PER_SECOND * elapsed) / 1000);
      lastTick = timestamp;
    }

    if (state.autoScroll) {
      window.requestAnimationFrame(autoScrollStep);
    }
  }
  window.requestAnimationFrame(autoScrollStep);
}

function getStarWarsMainContentEl(): HTMLElement {
  const mainContentEl = document.querySelector(
    '.title-content',
  ) as null | HTMLElement;
  if (!mainContentEl) {
    throw new Error('Primer Spec: Expected to find Star Wars title element');
  }
  return mainContentEl;
}

////////////
// Topbar //
////////////

function Topbar() {
  return (
    <div class="topbar">
      <Button
        id={AUTO_SCROLL_BTN_ID}
        faClass="pause"
        title="Pause auto-scroll"
        onClick={toggleAutoScroll}
      />
      <Button
        faClass="music"
        title="Open background music in new tab"
        onClick={() => {
          window.open(
            'https://youtu.be/MNMSAIG0dfQ?si=XY4mCjSpwFRswqaA',
            '_blank',
          );
        }}
      />
      <Button
        faClass="sign-out-alt"
        title="Exit Star Wars crawl"
        onClick={() => {
          if (specHtmlBodyElement != null) {
            state.autoScroll = false;
            state.enabled = false;
            // Reset the theme
            window.PrimerSpec?.updateTheme?.({}, false);
            // Then reset the body el
            document.body = specHtmlBodyElement;
          }
        }}
      />
    </div>
  );
}

function Button(props: {
  id?: string;
  faClass: string;
  title: string;
  onClick: () => void;
}) {
  const { id, faClass, title, onClick } = props;
  return (
    <span id={id} class="primer-spec-hoverable" style="margin-left: 30px;">
      <button
        class="btn-link primer-spec-hoverable no-print"
        title={title}
        onClick={onClick}
      >
        <i class={`fas fa-${faClass}`} />
      </button>
    </span>
  );
}

function toggleAutoScroll() {
  state.autoScroll = !state.autoScroll;
  const btnIcon = document
    .getElementById(AUTO_SCROLL_BTN_ID)
    ?.querySelector('i.fas') as HTMLElement | null;
  const btn = document
    .getElementById(AUTO_SCROLL_BTN_ID)
    ?.querySelector('button') as HTMLElement | null;
  if (btn && btnIcon && state.autoScroll) {
    btnIcon.classList.remove('fa-play');
    btnIcon.classList.add('fa-pause');
    btn.title = 'Pause auto-scroll';
  } else if (btn && btnIcon && !state.autoScroll) {
    btnIcon.classList.remove('fa-pause');
    btnIcon.classList.add('fa-play');
    btn.title = 'Start auto-scroll';
  }

  if (state.autoScroll) {
    startAutoScroll();
  } else {
    stopListeningForUserScroll(toggleAutoScroll);
  }
}

///////////////////
// 3rd party CSS //
///////////////////

function insertStyles() {
  // Downloaded from: https://polarnotion.github.io/starwarsintro/
  // With some modifications for the Primer Spec joke
  document.head.appendChild(
    <style>
      {`/*`}
      {`Name: StarWarsIntro.css`}
      {`URI: polarnotion.github.io/starwarsintro`}
      {`Author: Polar Notion`}
      {`Author URI: http://polarnotion.com/`}
      {`Description: A simple CSS library for creating a Star Wars Intro Crawl. May the Force be with you.`}
      {`Version: 1.0`}
      {`*/`}
      {`.topbar {`}
      {`  position: fixed;`}
      {`  top: 0;`}
      {`  width: 100%;`}
      {`  z-index: 2;`}
      {`  display: flex;`}
      {`  justify-content: center;`}
      {`}`}
      {`.wrapper {`}
      {`  position: fixed;`}
      {`}`}
      {`body, html, .wrapper {`}
      {`  height: 100%;`}
      {`  width: 100%;`}
      {`  min-height: 100vh;`}
      {`  margin: 0px;`}
      {`}`}
      {`.star-wars-intro {`}
      {/* {`  background: url("https://polarnotion.github.io/starwarsintro/img/stars-bg.jpg") center center;`} */}
      {`  background: url("https://eecs485staff.github.io/primer-spec/demo/stars-bg.jpg") center center;`}
      {`  width: 100%;`}
      {`  height: 100%;`}
      {`  font-family: "Droid Sans", arial, verdana, sans-serif;`}
      {`  font-weight: 700;`}
      {`  color: #EBD71C;`}
      {`  background-color: #000;`}
      {`  overflow: hidden;`}
      {`  position: relative;`}
      {`}`}
      {`.star-wars-intro p.intro-text {`}
      {`  position: relative;`}
      {`  max-width: 16em;`}
      {`  font-size: 200%;`}
      {`  font-weight: 400;`}
      {`  margin: 20% auto;`}
      {`  color: #4ee;`}
      {`  opacity: 0;`}
      {`  z-index: 1;`}
      {`  text-align: center;`}
      {`  animation: intro 2s ease-out;`}
      {`  /* Support animate-via-scrolling */`}
      {`  animation-delay: calc(var(--primer-spec-april-fools-star-wars-scroll) * -1s);`}
      {`  animation-iteration-count: 1;`}
      {`  animation-fill-mode: both;`}
      {`  animation-play-state: paused;`}
      {`}`}
      {`.star-wars-intro .main-content{`}
      {`  margin-left: auto;`}
      {`  margin-right: auto;`}
      {`  position: absolute;`}
      {`  z-index: 3;`}
      {`  width: 98%;`}
      {`  height: 50em;`}
      {`  bottom: 0;`}
      {`  font-size: 80px;`}
      {`  font-weight: bold;`}
      {`  text-align: justify;`}
      {`  overflow: hidden;`}
      {`  transform-origin: 50% 100%;`}
      {`  transform: perspective(350px) rotateX(25deg);`}
      {`}`}
      {`.star-wars-intro .main-content:after {`}
      {`  position: absolute;`}
      {`  content: ' ';`}
      {`  top: 0;`}
      {`  bottom: 60%;`}
      {`  background-image: linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);`}
      {`  pointer-events: none;`}
      {`}`}
      {`.star-wars-intro .space-button {`}
      {`  color: #EBD71C;`}
      {`  border: 12px solid #EBD71C;`}
      {`  padding: 20px;`}
      {`  background: transparent;`}
      {`  text-decoration: none;`}
      {`  margin: 0 auto;`}
      {`  display: block;`}
      {`  text-align: center;`}
      {`}`}
      {`.star-wars-intro .space-button:hover {`}
      {`  background-color: #D2BE03;`}
      {`  border-color: #D2BE03;`}
      {`  color: black;`}
      {`}`}
      {`.star-wars-intro .space-button:active,`}
      {`.star-wars-intro .space-button:focus {`}
      {`  background-color: #B8A40A;`}
      {`  border-color: #B8A40A;`}
      {`  color: black;`}
      {`}`}
      {`.star-wars-intro .title-content {`}
      {`  position: absolute;`}
      {`  top: 100%;`}
      {`  animation: scroll var(--primer-spec-april-fools-star-wars-content-scroll-duration) linear 4s forwards;`}
      {`  /* Support animate-via-scrolling */`}
      {`  animation-delay: calc(var(--primer-spec-april-fools-star-wars-scroll) * -1s + 4s);`}
      {`  animation-iteration-count: 1;`}
      {`  animation-fill-mode: both;`}
      {`  animation-play-state: paused;`}
      {`}`}
      {`.star-wars-intro .title-content > .content-header {`}
      {`  text-align: center;`}
      {`}`}
      {`/* Main Image Styles */`}
      {`.star-wars-intro .main-logo {`}
      {`  position: absolute;`}
      {`  width: 2.6em;`}
      {`  left: 50%;`}
      {`  top: 20vh;`}
      {`  font-size: 10em;`}
      {`  text-align: center;`}
      {`  margin-left: -1.3em;`}
      {`  line-height: 0.8em;`}
      {`  letter-spacing: -0.05em;`}
      {`  color: #000;`}
      {`  text-shadow: -2px -2px 0 #EBD71C, 2px -2px 0 #EBD71C, -2px 2px 0 #EBD71C, 2px 2px 0 #EBD71C;`}
      {`  opacity: 0;`}
      {`  z-index: 1;`}
      {`  animation: logo 5s ease-out 2.5s;`}
      {`  /* Support animate-via-scrolling */`}
      {`  animation-delay: calc(var(--primer-spec-april-fools-star-wars-scroll) * -1s + 2.5s);`}
      {`  animation-iteration-count: 1;`}
      {`  animation-fill-mode: both;`}
      {`  animation-play-state: paused;`}
      {`}`}
      {`.star-wars-intro .main-logo > img {`}
      {`  max-width: 100%;`}
      {`}`}
      {`@keyframes intro {`}
      {`  0% { opacity: 1; }`}
      {`  90% { opacity: 1; }`}
      {`  100% { opacity: 0; }`}
      {`}`}
      {`@keyframes logo {`}
      {`  0% { opacity: 0; }`}
      {`  1% { transform: scale(1); opacity: 1; }`}
      {`  50% { opacity: 1; }`}
      {`  100% { transform: scale(0.1); opacity: 0; }`}
      {`}`}
      {`@keyframes scroll {`}
      {`  0% { transform: translate(0, 0); }`}
      {`  100% { transform: translate(0, -170%); }`}
      {`}`}
      {/* {`@media screen and (max-width: 720px) {`}
      {`  .star-wars-intro .main-content {`}
      {`    font-size: 35px;`}
      {`  }`}
      {`  .star-wars-intro .title-content {`}
      {`    position: absolute;`}
      {`    top: 100%;`}
      {`    animation: scroll 100s linear 4s forwards;`}
      {`  }`}
    {`}`} */}
    </style>,
  );
}

///////////////////
// 3rd party JS //
///////////////////

// The following code was modified from: https://stackoverflow.com/a/4770179

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    'test',
    () => {},
    Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
        return null;
      },
    }),
  );
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function listenForUserScroll(callback: () => void) {
  window.addEventListener('DOMMouseScroll', callback, false); // older FF
  window.addEventListener(wheelEvent, callback, wheelOpt); // modern desktop
  window.addEventListener('touchmove', callback, wheelOpt); // mobile
  window.addEventListener('keydown', callback, false);
}

function stopListeningForUserScroll(callback: () => void) {
  window.removeEventListener('DOMMouseScroll', callback); // older FF
  window.removeEventListener(wheelEvent, callback); // modern desktop
  window.removeEventListener('touchmove', callback); // mobile
  window.removeEventListener('keydown', callback);
}
