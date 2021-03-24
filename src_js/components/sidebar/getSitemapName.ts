/**
 * Generate a sitemap-label that describes a page with path `pathName`. The
 * extracted name is simply the name of the file in title-case and
 * word-boundaries replaced with spaces.
 * @param pathName path to a file whose sitemap-label needs to be generated
 * @example '../dir1/dir2/my-page.html' --> 'My Page'
 */
export default function getSitemapName(pathName: string): string {
  pathName = getFilenameFromPath(pathName);
  const dotIndex = pathName.lastIndexOf('.');
  if (dotIndex !== -1) {
    pathName = pathName.slice(0, dotIndex);
  }

  // Replace hyphens and underscores with spaces
  pathName = pathName.replace(/[-_]/g, ' ');

  return toTitleCase(pathName);
}

function getFilenameFromPath(pathName: string): string {
  const pathParts = pathName.split('/');
  return pathParts[pathParts.length - 1];
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
