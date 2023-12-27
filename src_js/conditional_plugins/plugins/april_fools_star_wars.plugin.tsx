/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import { Month, getCurrentMonth } from '../utils/date_utils';

let specHtmlBodyElement = null;

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

  // Store the existing spec body so that we can revert to it when the user
  // closes this joke.
  specHtmlBodyElement = document.body;

  insertStyles();
  document.body = (
    <body>{convertSpecHtmlToStarWarsDom(specHtmlBodyElement)}</body>
  ) as HTMLElement;
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

///////////////////
// 3rd party CSS //
///////////////////

function insertStyles() {
  // Downloaded from: https://polarnotion.github.io/starwarsintro/
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
      {`body, html{`}
      {`  height: 100%;`}
      {`  min-height: 100vh;`}
      {`  margin: 0px;`}
      {`}`}
      {`.star-wars-intro {`}
      {`  background: url("https://polarnotion.github.io/starwarsintro/img/stars-bg.jpg") center center;`}
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
      {`  -webkit-animation: intro 2s ease-out;`}
      {`  -moz-animation: intro 2s ease-out;`}
      {`  -ms-animation: intro 2s ease-out;`}
      {`  -o-animation: intro 2s ease-out;`}
      {`  animation: intro 2s ease-out;`}
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
      {`  animation: scroll 120s linear 4s forwards;`}
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
      {`  -webkit-animation: logo 5s ease-out 2.5s;`}
      {`  -moz-animation: logo 5s ease-out 2.5s;`}
      {`  -ms-animation: logo 5s ease-out 2.5s;`}
      {`  -o-animation: logo 5s ease-out 2.5s;`}
      {`  animation: logo 5s ease-out 2.5s;`}
      {`}`}
      {`.star-wars-intro .main-logo > img {`}
      {`  max-width: 100%;`}
      {`}`}
      {`@-webkit-keyframes intro {`}
      {`  0% { opacity: 1; }`}
      {`  90% { opacity: 1; }`}
      {`  100% { opacity: 0; }`}
      {`}`}
      {`@-moz-keyframes intro {`}
      {`  0% { opacity: 1; }`}
      {`  90% { opacity: 1; }`}
      {`  100% { opacity: 0; }`}
      {`}`}
      {`@-ms-keyframes intro {`}
      {`  0% { opacity: 1; }`}
      {`  90% { opacity: 1; }`}
      {`  100% { opacity: 0; }`}
      {`}`}
      {`@-o-keyframes intro {`}
      {`  0% { opacity: 1; }`}
      {`  90% { opacity: 1; }`}
      {`  100% { opacity: 0; }`}
      {`}`} {`@keyframes intro {`}
      {`  0% { opacity: 1; }`}
      {`  90% { opacity: 1; }`}
      {`  100% { opacity: 0; }`}
      {`}`} {`@-webkit-keyframes logo {`}
      {`  0% { -webkit-transform: scale(1); opacity: 1; }`}
      {`  50% { opacity: 1; }`}
      {`  100% { -webkit-transform: scale(0.1); opacity: 0; }`}
      {`}`}
      {`@-moz-keyframes logo {`}
      {`  0% { -moz-transform: scale(1); opacity: 1; }`}
      {`  50% { opacity: 1; }`}
      {`  100% { -moz-transform: scale(0.1); opacity: 0; }`}
      {`}`}
      {`@-ms-keyframes logo {`}
      {`  0% { -ms-transform: scale(1); opacity: 1; }`}
      {`  50% { opacity: 1; }`}
      {`  100% { -ms-transform: scale(0.1); opacity: 0; }`}
      {`}`}
      {`@-o-keyframes logo {`}
      {`  0% { -o-transform: scale(1); opacity: 1; }`}
      {`  50% { opacity: 1; }`}
      {`  100% { -o-transform: scale(0.1); opacity: 0; }`}
      {`}`}
      {`@keyframes logo {`}
      {`  0% { transform: scale(1); opacity: 1; }`}
      {`  50% { opacity: 1; }`}
      {`  100% { transform: scale(0.1); opacity: 0; }`}
      {`}`}
      {`@keyframes scroll {`}
      {`  0% { top: 100%; }`}
      {`  100% { top: -170%; }`}
      {`}`}
      {`@media screen and (max-width: 720px) {`}
      {`  .star-wars-intro .main-content {`}
      {`    font-size: 35px;`}
      {`  }`}
      {`  .star-wars-intro .title-content {`}
      {`    position: absolute;`}
      {`    top: 100%;`}
      {`    animation: scroll 100s linear 4s forwards;`}
      {`  }`}
      {`}`}
    </style>,
  );
}
