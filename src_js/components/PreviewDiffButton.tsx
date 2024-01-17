import { Fragment, h } from 'preact';

const PRIMER_SPEC_PREVIEW_HOSTNAME = 'preview.sesh.rs';
const GITHUB_REPO_REGEX_FROM_PREVIEW_URL =
  /^https:\/\/preview\.sesh\.rs\/previews\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/\d+\/(.*)/;

const HTML_DIFF_URL = 'https://services.w3.org/htmldiff';

export function PreviewDiffButton() {
  if (window.location.hostname !== PRIMER_SPEC_PREVIEW_HOSTNAME) {
    return null;
  }

  const productionUrl = getProductionUrl();
  if (!productionUrl) {
    return null;
  }

  return (
    <Fragment>
      <style>
        {'.btn-primer-spec-preview {'}
        {'  position: fixed;'}
        {'  top: 15%;'}
        {'  right: 1em;'}
        {'  transition: width 0.5s !important;'}
        {'  width: 3.5em;'}
        {'}'}
        {'.btn-primer-spec-preview:hover {'}
        {'  width: 22em;'}
        {'}'}
        {'.primer-spec-preview-show-on-hover {'}
        {'  opacity: 0;'}
        {'  /* Transition applies onMouseOut (text disappears faster) */'}
        {'  transition: opacity 0.15s;'}
        {'}'}
        {'.btn-primer-spec-preview:hover .primer-spec-preview-show-on-hover {'}
        {'  opacity: 1;'}
        {'  /* Transition applies onMouseOver (hence we add a delay) */'}
        {'  transition: opacity 0.3s 0.3s;'}
        {'}'}
      </style>
      <button
        class="btn btn-primary btn-primer-spec-preview"
        onClick={() => {
          window.open(buildDiffUrl(productionUrl), '_blank');
        }}
      >
        <i class="fas fa-glasses" style="font-weight: 900; opacity: 1;" />{' '}
        <span class="primer-spec-preview-show-on-hover">
          Compare preview with published page
        </span>
      </button>
    </Fragment>
  );
}

function getProductionUrl() {
  const matches = window.location.href.match(
    GITHUB_REPO_REGEX_FROM_PREVIEW_URL,
  );
  if (matches && matches.length >= 4) {
    const org = matches[1];
    const repo = matches[2];
    const path = matches[3];
    return `https://${org}.github.io/${repo}/${path}`;
  }
  return null;
}

function buildDiffUrl(publishedUrl: string) {
  const queryParams = new URLSearchParams({
    doc1: publishedUrl,
    doc2: window.location.href,
  });
  return `${HTML_DIFF_URL}?${queryParams}`;
}
