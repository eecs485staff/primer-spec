import Storage from '../../utils/Storage';
import Config from '../../Config';

export type DiffContentChangeResult =
  | {
      changed: false;
    }
  | {
      changed: true;
      lastVisitedTs: number;
    };

type StoredHTML = {
  rawHTML: string;
  ts: number;
};

export const OLD_HTML_STORAGE_KEY = 'old_spec_html';

export function didSpecContentChange(
  newSpecContent: string,
): DiffContentChangeResult {
  const oldRawStoredHTML = Storage.getForPage(OLD_HTML_STORAGE_KEY);
  if (oldRawStoredHTML == null) {
    storeHTML(newSpecContent);
    return { changed: false };
  }

  const oldStoredHTML = parseStoredHTMLFromStorage(oldRawStoredHTML);
  if (
    oldStoredHTML == null ||
    isExpired(oldStoredHTML) ||
    newSpecContent === oldStoredHTML.rawHTML
  ) {
    storeHTML(newSpecContent);
    return { changed: false };
  }

  return { changed: true, lastVisitedTs: oldStoredHTML.ts };
}

function storeHTML(rawHTML: string): void {
  Storage.setForPage(
    OLD_HTML_STORAGE_KEY,
    JSON.stringify(genStoredHTML(rawHTML)),
  );
}

function genStoredHTML(rawHTML: string): StoredHTML {
  return {
    rawHTML,
    ts: Date.now(),
  };
}

function parseStoredHTMLFromStorage(rawStoredHTML: string): StoredHTML | null {
  const parsed = JSON.parse(rawStoredHTML);
  const { rawHTML, ts } = parsed;
  if (!rawHTML || !ts) {
    console.error('Primer Spec: Diff: Invalid stored HTML');
    return null;
  }
  return { rawHTML, ts };
}

function isExpired(storedHTML: StoredHTML): boolean {
  const { ts } = storedHTML;
  const now = Date.now();
  return now - ts > Config.DIFF_HTML_STORAGE_TTL;
}
