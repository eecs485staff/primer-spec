import Storage from '../Storage';

describe('Storage', () => {
  const STORAGE_KEY = 'spam';
  const STORAGE_VALUE = 'baked beans';

  afterEach(() => {
    window.localStorage.clear();
  });

  describe('basic functionality', () => {
    test('set', () => {
      Storage.set(STORAGE_KEY, STORAGE_VALUE);
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe(STORAGE_VALUE);
    });

    test('get', () => {
      window.localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
      expect(Storage.get(STORAGE_KEY)).toBe(STORAGE_VALUE);
    });
  });

  describe('page-specific accessors', () => {
    const DOCUMENT_LOCATION_PATHNAME = document.location.pathname;

    test('setForPage', () => {
      Storage.setForPage(STORAGE_KEY, STORAGE_VALUE);
      expect(
        window.localStorage.getItem(
          `${DOCUMENT_LOCATION_PATHNAME}__${STORAGE_KEY}`,
        ),
      ).toBe(STORAGE_VALUE);
    });

    test('getForPage', () => {
      Storage.setForPage(STORAGE_KEY, STORAGE_VALUE);
      expect(Storage.getForPage(STORAGE_KEY)).toBe(STORAGE_VALUE);
    });
  });

  describe('storage change listeners', () => {
    test('add single listener', () => {
      const listener = jest.fn();
      Storage.addListener(STORAGE_KEY, listener);

      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
      expect(listener).toHaveBeenCalled();
    });

    test('add multiple listeners', () => {
      const listeners = [jest.fn(), jest.fn(), jest.fn()];
      listeners.forEach((listener) =>
        Storage.addListener(STORAGE_KEY, listener),
      );

      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
      listeners.forEach((listener) => {
        expect(listener).toHaveBeenCalled();
      });
    });

    test('remove listeners', () => {
      const listenerToRemove = jest.fn();
      const listeners = [jest.fn(), jest.fn()];

      Storage.addListener(STORAGE_KEY, listenerToRemove);
      listeners.forEach((listener) =>
        Storage.addListener(STORAGE_KEY, listener),
      );

      Storage.removeListener(STORAGE_KEY, listenerToRemove);

      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
      listeners.forEach((listener) => {
        expect(listener).toHaveBeenCalled();
      });

      expect(listenerToRemove).not.toHaveBeenCalled();
    });

    test('listeners are not invoked for irrelevant events', () => {
      const listeners = [jest.fn(), jest.fn(), jest.fn()];
      listeners.forEach((listener) =>
        Storage.addListener(STORAGE_KEY, listener),
      );

      const IRRELEVANT_STORAGE_KEY = 'something else';

      window.dispatchEvent(
        new StorageEvent('storage', { key: IRRELEVANT_STORAGE_KEY }),
      );
      listeners.forEach((listener) => {
        expect(listener).not.toHaveBeenCalled();
      });
    });

    describe('page-specific listeners', () => {
      const DOCUMENT_LOCATION_PATHNAME = document.location.pathname;

      test('add multiple listeners', () => {
        const listeners = [jest.fn(), jest.fn(), jest.fn()];
        listeners.forEach((listener) =>
          Storage.addListenerForPage(STORAGE_KEY, listener),
        );

        window.dispatchEvent(
          new StorageEvent('storage', {
            key: `${DOCUMENT_LOCATION_PATHNAME}__${STORAGE_KEY}`,
          }),
        );
        listeners.forEach((listener) => {
          expect(listener).toHaveBeenCalled();
        });
      });

      test('remove listeners', () => {
        const listenerToRemove = jest.fn();
        const listeners = [jest.fn(), jest.fn()];

        Storage.addListenerForPage(STORAGE_KEY, listenerToRemove);
        listeners.forEach((listener) =>
          Storage.addListenerForPage(STORAGE_KEY, listener),
        );

        Storage.removeListenerForPage(STORAGE_KEY, listenerToRemove);

        window.dispatchEvent(
          new StorageEvent('storage', {
            key: `${DOCUMENT_LOCATION_PATHNAME}__${STORAGE_KEY}`,
          }),
        );
        listeners.forEach((listener) => {
          expect(listener).toHaveBeenCalled();
        });

        expect(listenerToRemove).not.toHaveBeenCalled();
      });

      test('listeners are not invoked for irrelevant events', () => {
        const listeners = [jest.fn(), jest.fn(), jest.fn()];
        listeners.forEach((listener) =>
          Storage.addListenerForPage(STORAGE_KEY, listener),
        );

        const IRRELEVANT_STORAGE_KEY = 'something else';

        window.dispatchEvent(
          new StorageEvent('storage', {
            key: `${DOCUMENT_LOCATION_PATHNAME}__${IRRELEVANT_STORAGE_KEY}`,
          }),
        );
        listeners.forEach((listener) => {
          expect(listener).not.toHaveBeenCalled();
        });
      });
    });
  });
});
