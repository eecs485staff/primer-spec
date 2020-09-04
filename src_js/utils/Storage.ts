const local_storage_available = isStorageAvailable('localStorage');

export default {
  /**
   * Get an item persisted in local storage by key.
   *
   * If `siteProperty` is set to `false`, returns a persisted value set for the
   * current pathname (or `null` if unavailable).
   */
  get(key: string, siteProperty: boolean = true) {
    return local_storage_available
      ? window.localStorage.getItem(getMangledKey(key, siteProperty))
      : null;
  },

  /**
   * Persist an item in local storage by key.
   *
   * If `siteProperty` is set to `false`, the property is stored with a
   * reference to the path it was persisted from. Use `get()` with
   * `siteProperty: false` to retrieve the value for the current pathname.
   */
  set(key: string, value: string, siteProperty: boolean = true) {
    if (local_storage_available) {
      window.localStorage.setItem(getMangledKey(key, siteProperty), value);
    }
  },

  getForPage(key: string) {
    return this.get(key, false);
  },

  setForPage(key: string, value: string) {
    return this.set(key, value, false);
  },
};

function getMangledKey(key: string, siteProperty: boolean) {
  return siteProperty ? key : `${document.location.pathname}__${key}`;
}

/**
 * Check if a particular type of storage is made available by the browser.
 * @param type storage type (for instance, 'localStorage')
 */
function isStorageAvailable(type: string) {
  let storage: any;
  try {
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
