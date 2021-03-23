import useTaskListCheckboxes, {
  TASK_LIST_STORAGE_PREFIX,
  TASK_LIST_STORAGE_COUNT_KEY,
} from '../useTaskListCheckboxes';

describe('useTaskListCheckboxes', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('checkboxes should be enabled and wrapped in labels', () => {
    document.body.innerHTML = genTaskListHTML(3) + genTaskListHTML(1);

    useTaskListCheckboxes({ current: document.body });

    const taskListItems = document.querySelectorAll('li.task-list-item');
    expect(taskListItems.length).toBe(4);

    taskListItems.forEach((taskListEl) => {
      expect(taskListEl.children.length).toBe(1);
      expect(taskListEl.children[0].tagName).toBe('LABEL');

      const label = taskListEl.children[0];
      expect(label.children.length).toBe(1);
      expect(label.children[0].tagName).toBe('INPUT');

      const inputEl = label.children[0] as HTMLInputElement;
      expect(inputEl.disabled).toBe(false);
      expect(inputEl.checked).toBe(false);

      expect(label.textContent?.trim()).toBe('Item text');
    });
  });

  test('checkboxes use default state on first load', () => {
    document.body.innerHTML =
      genTaskListHTML(2, true) + genTaskListHTML(2, false);

    useTaskListCheckboxes({ current: document.body });

    const taskListItems = [
      ...document.querySelectorAll('li.task-list-item input'),
    ] as Array<HTMLInputElement>;
    expect(taskListItems.length).toBe(4);
    expect(taskListItems[0].checked).toBe(true);
    expect(taskListItems[1].checked).toBe(true);
    expect(taskListItems[2].checked).toBe(false);
    expect(taskListItems[3].checked).toBe(false);
  });

  describe('checkbox state persistence', () => {
    const DOCUMENT_LOCATION_PATHNAME = document.location.pathname;

    test('changes persist in local storage', () => {
      document.body.innerHTML = genTaskListHTML(2);
      useTaskListCheckboxes({ current: document.body });

      const taskListItems = [
        ...document.querySelectorAll('li.task-list-item input'),
      ] as Array<HTMLInputElement>;
      expect(taskListItems[0].checked).toBe(false);

      // Verify initial persistence state
      expect(
        window.localStorage.getItem(
          `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_COUNT_KEY}`,
        ),
      ).toBe('2');
      expect(
        window.localStorage.getItem(
          `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_0`,
        ),
      ).toBe('false');
      expect(
        window.localStorage.getItem(
          `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_1`,
        ),
      ).toBe('false');

      // Click the first checkbox
      taskListItems[0].click();
      expect(
        window.localStorage.getItem(
          `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_0`,
        ),
      ).toBe('true');
    });

    test('init from local storage', () => {
      // Start with checkboxes unchecked by default
      document.body.innerHTML = genTaskListHTML(2, false);

      // Mock local storage checkbox state
      window.localStorage.setItem(
        `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_COUNT_KEY}`,
        '2',
      );
      window.localStorage.setItem(
        `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_0`,
        'true',
      );
      window.localStorage.setItem(
        `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_1`,
        'false',
      );

      useTaskListCheckboxes({ current: document.body });

      const taskListItems = [
        ...document.querySelectorAll('li.task-list-item input'),
      ] as Array<HTMLInputElement>;

      expect(taskListItems[0].checked).toBe(true);
      expect(taskListItems[1].checked).toBe(false);
    });

    test('reset to defaults if persisted count is different', () => {
      // Start with checkboxes unchecked by default
      document.body.innerHTML = genTaskListHTML(2, false);

      // Mock local storage checkbox state, but use the WRONG count.
      window.localStorage.setItem(
        `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_COUNT_KEY}`,
        '1',
      );
      window.localStorage.setItem(
        `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_0`,
        'true',
      );
      window.localStorage.setItem(
        `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_1`,
        'false',
      );

      useTaskListCheckboxes({ current: document.body });

      const taskListItems = [
        ...document.querySelectorAll('li.task-list-item input'),
      ] as Array<HTMLInputElement>;

      expect(taskListItems[0].checked).toBe(false);
      expect(taskListItems[1].checked).toBe(false);
      expect(
        window.localStorage.getItem(
          `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_COUNT_KEY}`,
        ),
      ).toBe('2');
    });

    describe('cross-window checkbox sync', () => {
      test('update on storage change', () => {
        // Start with checkboxes unchecked by default
        document.body.innerHTML = genTaskListHTML(2, false);

        useTaskListCheckboxes({ current: document.body });

        const taskListItems = [
          ...document.querySelectorAll('li.task-list-item input'),
        ] as Array<HTMLInputElement>;

        expect(taskListItems[0].checked).toBe(false);
        expect(taskListItems[1].checked).toBe(false);

        const CHECKBOX_KEY = `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_0`;

        // Mock a checkbox change in another window
        window.localStorage.setItem(CHECKBOX_KEY, 'true');
        window.dispatchEvent(
          new StorageEvent('storage', { key: CHECKBOX_KEY }),
        );

        // Verify that checkbox updated itself
        expect(taskListItems[0].checked).toBe(true);
      });

      test('do not sync if checkbox-count-mismatch', () => {
        // Start with checkboxes unchecked by default
        document.body.innerHTML = genTaskListHTML(2, false);

        useTaskListCheckboxes({ current: document.body });

        const taskListItems = [
          ...document.querySelectorAll('li.task-list-item input'),
        ] as Array<HTMLInputElement>;
        expect(taskListItems[0].checked).toBe(false);
        expect(taskListItems[1].checked).toBe(false);

        // Mock the following scenario:
        //   Page changes to have 1 checkbox instead of 2.
        //   That page is opened on a new tab. The current tab still has the
        //   old version of the page.
        const COUNT_KEY = `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_COUNT_KEY}`;
        window.localStorage.setItem(COUNT_KEY, '3');
        window.dispatchEvent(new StorageEvent('storage', { key: COUNT_KEY }));

        // Mock a checkbox change in the other tab.
        const CHECKBOX_0_KEY = `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_0`;
        window.localStorage.setItem(CHECKBOX_0_KEY, 'true');
        window.dispatchEvent(
          new StorageEvent('storage', { key: CHECKBOX_0_KEY }),
        );
        // It should not sync with current.
        expect(taskListItems[0].checked).not.toBe(true);

        // Mock a click of a checkbox on the current page.
        taskListItems[1].click();
        // It should not save the change to local storage.
        const CHECKBOX_1_KEY = `${DOCUMENT_LOCATION_PATHNAME}__${TASK_LIST_STORAGE_PREFIX}_1`;
        expect(window.localStorage.getItem(CHECKBOX_1_KEY)).not.toBe(true);
      });
    });
  });
});

function genTaskListHTML(numCheckboxes: number, checked = false): string {
  return `
  <ul class="task-list">
    ${Array(numCheckboxes)
      .fill(
        `<li class="task-list-item">
          <input type="checkbox" class="task-list-item-checkbox" disabled ${
            checked ? 'checked' : ''
          }>
          Item text
        </li>`,
      )
      .join()}
  </ul>
  `.trim();
}
