import unflattenSitemapTree, { getSitemapName } from '../unflattenSitemapTree';

describe('getSitemapName', () => {
  test('removes trailing extension', () => {
    expect(getSitemapName('about.html')).toBe('About');
  });

  test('removes trailing extension when multiple dots are present', () => {
    expect(getSitemapName('my.fav.file.md')).toBe('My.fav.file');
  });

  test('converts name to title case', () => {
    expect(getSitemapName('setup vscode')).toBe('Setup Vscode');
  });

  test('converts hyphens to spaces', () => {
    expect(getSitemapName('setup-macos-xcode')).toBe('Setup Macos Xcode');
  });

  test('converts underscores to spaces', () => {
    expect(getSitemapName('setup_macos_xcode')).toBe('Setup Macos Xcode');
  });
});

describe('unflattenSitemapTree', () => {
  const SITE_TITLE = 'Some site title';

  describe('cases where sitemap is not created', () => {
    test('empty sitemap', () => {
      global.console.debug = jest.fn();
      expect(unflattenSitemapTree([], SITE_TITLE)).toBe(null);
      expect(console.debug).toBeCalled();
    });

    test('no root', () => {
      global.console.debug = jest.fn();

      const sitemapPagesInfo = [
        { url: '/something.html', path: 'something.html' },
      ];
      expect(unflattenSitemapTree(sitemapPagesInfo, SITE_TITLE)).toBe(null);
      expect(console.debug).toBeCalled();
    });

    test('single root item', () => {
      const sitemapPagesInfo = [{ url: '/', path: 'README.md' }];
      expect(unflattenSitemapTree(sitemapPagesInfo, SITE_TITLE)).toBe(null);
    });
  });

  describe('cases where sitemap is created', () => {
    test('basic test', () => {
      const sitemapPagesInfo = [
        { url: '/my-repo/about.html', path: 'about.md' },
        { url: '/my-repo/', path: 'README.md' },
        {
          url: '/my-repo/setup-docs/windows_visual_studio.html',
          path: 'setup-docs/windows_visual_studio.html',
        },
        {
          url: '/my-repo/setup-docs/linux_nano.html',
          path: 'setup-docs/linux_nano.md',
        },
      ];

      const expectedSitemap = {
        page: { name: SITE_TITLE, url: '/my-repo/' },
        childPages: [
          {
            page: { name: 'About', url: '/my-repo/about.html' },
            childPages: [],
            childDirs: [],
          },
        ],
        childDirs: [
          {
            dir: 'setup-docs',
            title: 'Setup Docs',
            childPages: [
              {
                page: {
                  name: 'Windows Visual Studio',
                  url: '/my-repo/setup-docs/windows_visual_studio.html',
                },
                childPages: [],
                childDirs: [],
              },
              {
                page: {
                  name: 'Linux Nano',
                  url: '/my-repo/setup-docs/linux_nano.html',
                },
                childPages: [],
                childDirs: [],
              },
            ],
            childDirs: [],
          },
        ],
      };

      expect(unflattenSitemapTree(sitemapPagesInfo, SITE_TITLE)).toStrictEqual(
        expectedSitemap,
      );
    });

    test('remove assets pages', () => {
      const sitemapPagesInfo = [
        { url: '/my-repo/about.html', path: 'about.md' },
        { url: '/my-repo/', path: 'README.md' },
        {
          url: '/my-repo/assets/styles.css',
          path: 'assets/styles.css',
        },
      ];

      const expectedSitemap = {
        page: { name: SITE_TITLE, url: '/my-repo/' },
        childPages: [
          {
            page: { name: 'About', url: '/my-repo/about.html' },
            childPages: [],
            childDirs: [],
          },
        ],
        childDirs: [],
      };
      expect(unflattenSitemapTree(sitemapPagesInfo, SITE_TITLE)).toStrictEqual(
        expectedSitemap,
      );
    });

    test('respects page titles', () => {
      const sitemapPagesInfo = [
        {
          url: '/about.html',
          path: 'about.md',
          title: 'CUSTOM ABOUT-PAGE',
        },
        { url: '/', path: 'README.md' },
        {
          url: '/setup-docs/linux_nano.html',
          path: 'setup-docs/linux_nano.md',
          title: 'Linux',
        },
      ];

      const expectedSitemap = {
        page: { name: SITE_TITLE, url: '/' },
        childPages: [
          {
            page: { name: 'CUSTOM ABOUT-PAGE', url: '/about.html' },
            childPages: [],
            childDirs: [],
          },
        ],
        childDirs: [
          {
            dir: 'setup-docs',
            title: 'Setup Docs',
            childPages: [
              {
                page: { name: 'Linux', url: '/setup-docs/linux_nano.html' },
                childPages: [],
                childDirs: [],
              },
            ],
            childDirs: [],
          },
        ],
      };
      expect(unflattenSitemapTree(sitemapPagesInfo, SITE_TITLE)).toStrictEqual(
        expectedSitemap,
      );
    });
  });
});
