/**
 * Return a number indicating the Chrome major version. Returns false if
 * not Chrome.
 */
export default function getChromeVersion(): number | false {
  // Based on: https://stackoverflow.com/a/4900484/5868796
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : false;
}
