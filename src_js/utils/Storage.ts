const local_storage_available = isStorageAvailable('localStorage');

export default {
  /**
   * Get an item persisted in local storage by key. These values are typically
   * persisted across all pages in the same "website".
   *
   * Use in conjunction with `Storage.set()`.
   */
  get(key: string): string | null {
    return local_storage_available ? window.localStorage.getItem(key) : null;
  },

  /**
   * Persist an item in local storage by key. The item is persisted across all
   * pages in the same "website".
   *
   * Use in conjunction with `Storage.get()`.
   */
  set(key: string, value: string): void {
    if (local_storage_available) {
      window.localStorage.setItem(key, value);
    }
  },

  /**
   * Get an item persisted in local storage using `Storage.setForPage()`.
   */
  getForPage(key: string): string | null {
    return this.get(mangleKeyWithPagePath(key));
  },

  /**
   * Persist an item in local storage, and mark it as being attached to the
   * current page (as opposed to being available to all pages across the same
   * "website").
   *
   * Retrieve items set using this method using `Storage.getForPage()`.
   */
  setForPage(key: string, value: string): void {
    return this.set(mangleKeyWithPagePath(key), value);
  },
};

function mangleKeyWithPagePath(key: string) {
  return `${document.location.pathname}__${key}`;
}

/**
 * Check if a particular type of storage is made available by the browser.
 * @param type storage type (for instance, 'localStorage')
 */
function isStorageAvailable(type: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storage: any;
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
