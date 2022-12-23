export function openExternalLink(props: {
  url: string;
  download?: string | boolean;
}): void {
  const { url, download } = props;

  try {
    sanityCheckUrl(url);
  } catch (e) {
    console.error('Blocking attempt to open external link. Error:', e);
    return;
  }

  const anchor = document.createElement('a');
  anchor.href = url;
  if (download != null && download !== false) {
    // Use the original filename by not specifying one here.
    anchor.download = typeof download === 'boolean' ? '' : download;
  }
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(
    () => {
      document.body.removeChild(anchor);
    },
    2000, // 2 seconds
  );
}

function sanityCheckUrl(url: string): void {
  if (!url.startsWith('https://') && !url.startsWith('/')) {
    throw new Error(`Expected HTTPS external link, received: ${url}`);
  }
}
