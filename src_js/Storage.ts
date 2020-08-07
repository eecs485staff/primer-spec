const local_storage_available = isStorageAvailable('localStorage');

export default {
  get: (key: string) => {
    return local_storage_available ? window.localStorage.getItem(key) : null;
  },

  set: (key: string, value: string) => {
    if (local_storage_available) {
      window.localStorage.setItem(key, value);
    }
  },
};

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
