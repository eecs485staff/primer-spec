import getSitemapName from '../getSitemapName';

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

  test('removes directory parts from path name', () => {
    expect(getSitemapName('docs/macos/setup-macos-xcode')).toBe(
      'Setup Macos Xcode',
    );
  });
});
