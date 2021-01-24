import { Fragment, h } from 'preact';
import Config from '../../Config';

import type {
  SitemapNodePageType,
  SitemapNodeType,
} from './unflattenSitemapTree';

type PropsType = { sitemapNode?: SitemapNodePageType | null };

export default function Sitemap(props: PropsType): h.JSX.Element {
  const { sitemapNode } = props;
  if (!sitemapNode) {
    return <div />;
  }

  return (
    <nav class="primer-spec-toc" aria-label="Sitemap">
      <ul class="primer-spec-toc-list">
        <li>
          <div
            class={`primer-spec-toc-item primer-spec-toc-h1 ${
              sitemapNode.page.current ? 'primer-spec-toc-active' : ''
            }`}
          >
            <a href={getUrl(sitemapNode.page.url)}>
              <i class="fas fa-home" /> {sitemapNode.page.name}
            </a>
          </div>
        </li>
        {...generateListItems(sitemapNode)}
      </ul>
    </nav>
  );
}

function generateListItems(node: SitemapNodeType, level = 1): h.JSX.Element[] {
  const effectiveLevel = level <= 6 ? level : 6;

  const pageItems = node.childPages.map((childPage) => (
    <Fragment>
      <li>
        <div
          class={`primer-spec-toc-item primer-spec-toc-h${effectiveLevel} ${
            childPage.page.current ? 'primer-spec-toc-active' : ''
          }`}
        >
          <a href={getUrl(childPage.page.url)}>{childPage.page.name}</a>
        </div>
        <ul class="primer-spec-toc-section primer-spec-toc-list">
          {...generateListItems(childPage, level + 1)}
        </ul>
      </li>
    </Fragment>
  ));

  const dirItems = node.childDirs.map((childDir) => (
    <Fragment>
      <li>
        <div class={`primer-spec-toc-item primer-spec-toc-h${effectiveLevel}`}>
          {childDir.title}
        </div>
        <ul class="primer-spec-toc-section primer-spec-toc-list">
          {...generateListItems(childDir, level + 1)}
        </ul>
      </li>
    </Fragment>
  ));

  return [...pageItems, ...dirItems];
}

function getUrl(absoluteUrl: string): string {
  return Config.BASE_URL + absoluteUrl;
}
