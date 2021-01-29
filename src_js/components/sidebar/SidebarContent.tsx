import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import Config from '../../Config';
import getSitemapName from './getSitemapName';

type PropsType = { children: h.JSX.Element };

export default function SidebarContent(props: PropsType): h.JSX.Element {
  const processedSitemap = useMemo(
    () => processSitemapURLs(Config.SITEMAP_URLS),
    [],
  );

  if (processedSitemap == null) {
    return (
      <div role="presentation" onClick={() => true}>
        {props.children}
      </div>
    );
  }

  return (
    <div role="presentation" onClick={() => true}>
      <details open={processedSitemap.rootPage.current ? undefined : true}>
        <summary>
          <i class="fas fa-sitemap" /> {Config.SITEMAP_LABEL}
        </summary>
        {processedSitemap.siteUrls.map((sitePage) => (
          <SitemapPage page={sitePage}>
            {sitePage.current ? props.children : undefined}
          </SitemapPage>
        ))}
      </details>
      <hr />
      <SitemapPage page={processedSitemap.rootPage} dedent>
        {processedSitemap.rootPage.current ? props.children : undefined}
      </SitemapPage>
    </div>
  );
}

function processSitemapURLs(
  siteUrls: Array<SitemapPageInfoType>,
): null | {
  rootPage: SitemapPageInfoType;
  siteUrls: Array<SitemapPageInfoType>;
} {
  // Remove assets pages
  siteUrls = siteUrls.filter((pageInfo) => !pageInfo.path.startsWith('assets'));

  if (siteUrls.length === 0) {
    return null;
  }

  const rootIndex = siteUrls.findIndex((page) =>
    /^(index|readme)\.(md|htm|html)$/.test(page.path.toLowerCase()),
  );
  if (rootIndex === -1) {
    console.warn(
      'PrimerSpec: processSitemapURLs: Expected to find a root page. Disabling sitemap.',
    );
    return null;
  }

  const [rootPage] = siteUrls.splice(rootIndex, 1);
  rootPage.title = Config.SITEMAP_SITE_TITLE;

  return { rootPage, siteUrls };
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
