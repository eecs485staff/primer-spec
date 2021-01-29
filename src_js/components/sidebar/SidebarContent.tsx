import { h } from 'preact';
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
    <div role="presentation" onClick={() => true}>
      <details open={props.sitemap.rootPage.current ? undefined : true}>
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
    </div>
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
  return (
    <a
      href={props.page.url}
      onClick={() => {
        window.location.href = props.page.url;
      }}
    >
      <details class={props.dedent ? '' : 'primer-spec-toc-sitemap-item'}>
        <summary onClick={(e) => e.preventDefault()}>{title}</summary>
      </details>
    </a>
  );
}
