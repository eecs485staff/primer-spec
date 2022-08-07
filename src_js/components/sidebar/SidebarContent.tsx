import { h, Fragment } from 'preact';
import Config from '../../Config';
import getSitemapName from './getSitemapName';

import IconType from '../common/IconType';

import type { SitemapType } from './getSitemapUrls';

type PropsType = { sitemap?: null | SitemapType; children: h.JSX.Element };

export default function SidebarContent(props: PropsType): h.JSX.Element {
  if (props.sitemap == null) {
    return (
      <div role="presentation" onClick={() => true}>
        {props.children}
      </div>
    );
  }

  const isRootPageCurrent = props.sitemap.rootPage.current;

  return (
    <Fragment>
      <Sitemap sitemap={props.sitemap}>
        {isRootPageCurrent ? undefined : props.children}
      </Sitemap>
      <hr />
      <SitemapPage page={props.sitemap.rootPage} dedent>
        {isRootPageCurrent ? props.children : undefined}
      </SitemapPage>
    </Fragment>
  );
}

function Sitemap(props: {
  sitemap: SitemapType;
  children?: h.JSX.Element;
}): h.JSX.Element {
  const shouldDedentSitemap = Config.SITEMAP_LABEL == null;
  const renderedSiteUrls = (
    <Fragment>
      {props.sitemap.siteUrls.map((sitePage) => (
        <SitemapPage
          key={sitePage.url}
          page={sitePage}
          dedent={shouldDedentSitemap}
        >
          {sitePage.current ? props.children : undefined}
        </SitemapPage>
      ))}
    </Fragment>
  );

  if (shouldDedentSitemap) {
    return renderedSiteUrls;
  }

  return (
    <details
      role="navigation"
      aria-label={Config.SITEMAP_LABEL}
      open={props.sitemap.rootPage.current ? undefined : true}
    >
      <summary>{Config.SITEMAP_LABEL}</summary>
      {renderedSiteUrls}
    </details>
  );
}

function SitemapPage(props: {
  page: SitemapPageInfoType;
  dedent?: boolean;
  children: h.JSX.Element | undefined;
}): h.JSX.Element {
  const title =
    props.page.title || (props.page.path && getSitemapName(props.page.path));
  if (!title) {
    console.error(
      `Primer Spec: Page with URL ${props.page.url} has no title to display in sidebar`,
    );
  }
  if (props.page.current) {
    return (
      <details
        open
        class={props.dedent ? 'left-space-fix' : 'primer-spec-toc-sitemap-item'}
      >
        <summary class="left-space-fix primer-spec-toc-active">{title}</summary>
        {props.children}
      </details>
    );
  }
  // Wrap everything in an <a/> element to indicate to mouse-users that it's
  // a hyperlink. But don't make it focusable because the <summary/> element
  // is itself focusable. Let the <summary/> function as the true hyperlink
  // element for keyboard users and screen-readers.
  return (
    <a href={props.page.url} tabIndex={-1}>
      <details class={props.dedent ? '' : 'primer-spec-toc-sitemap-item'}>
        <summary
          class={props.page.external ? 'primer-spec-toc-sitemap-external' : ''}
          data-order={props.page.external ? '' : props.page.sitemapOrder ?? ''}
          role="link"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = props.page.url;
          }}
        >
          {title}
          {props.page.external && (
            <Fragment>
              <i class={IconType.EXTERNAL_LINK} />
              <span class="sr-only">External Link</span>
            </Fragment>
          )}
        </summary>
      </details>
    </a>
  );
}
