import { h, Fragment } from 'preact';
import Config from '../../Config';
import getSitemapName from './getSitemapName';

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

  return (
    <Fragment>
      <details
        role="navigation"
        aria-label={Config.SITEMAP_LABEL}
        open={props.sitemap.rootPage.current ? undefined : true}
      >
        <summary>
          <i class="fas fa-sitemap" /> {Config.SITEMAP_LABEL}
        </summary>
        {props.sitemap.siteUrls.map((sitePage) => (
          <SitemapPage page={sitePage}>
            {sitePage.current ? props.children : undefined}
          </SitemapPage>
        ))}
      </details>
      <hr />
      <SitemapPage page={props.sitemap.rootPage} dedent>
        {props.sitemap.rootPage.current ? props.children : undefined}
      </SitemapPage>
    </Fragment>
  );
}

function SitemapPage(props: {
  page: SitemapPageInfoType;
  dedent?: boolean;
  children: h.JSX.Element | undefined;
}): h.JSX.Element {
  const title = props.page.title || getSitemapName(props.page.path);
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
          role="link"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = props.page.url;
          }}
        >
          {title}
        </summary>
      </details>
    </a>
  );
}
