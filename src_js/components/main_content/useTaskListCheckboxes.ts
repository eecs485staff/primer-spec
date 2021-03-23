import { RefObject } from 'preact';
import Storage, { StorageChangeCallbackType } from '../../utils/Storage';

export const TASK_LIST_STORAGE_PREFIX = 'primer_spec_task_list';
export const TASK_LIST_STORAGE_COUNT_KEY = `${TASK_LIST_STORAGE_PREFIX}_count`;

/**
 * A custom hook that enables task-list checkboxes and persists the checkbox
 * state. Intended to be used inside `useEffect()`. Returns a cleanup method
 * to remove the event listeners.
 * @param mainElRef A ref to the `<main>` element from MainContent
 */
export default function useTaskListCheckboxes(
  mainElRef: RefObject<HTMLElement>,
): () => void {
  if (!mainElRef.current) {
    throw new Error(
      'Primer Spec: Main Content: Expected main content ref to be initialized.',
    );
  }

  // The structure of a task-list is:
  // <ul class="task-list">
  //   <li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled>Item 1</li>
  //   <li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled>Item 2</li>
  // </ul>

  // Wrap the entire contents of each <li> in a <label> for better a11y
  const task_list_items = mainElRef.current.querySelectorAll('.task-list-item');
  task_list_items.forEach((task_list_item) => {
    const label = document.createElement('label');
    label.innerHTML = task_list_item.innerHTML;
    task_list_item.innerHTML = '';
    task_list_item.appendChild(label);
  });

  // Find all GFM task-list checkboxes
  const task_checkboxes = [
    ...mainElRef.current.querySelectorAll(
      '.task-list-item input.task-list-item-checkbox[type="checkbox"]',
    ),
  ] as Array<HTMLInputElement>;

  let should_use_default_values = false;
  if (task_checkboxes.length !== getNumCheckboxesFromStorage()) {
    // If the number of checkboxes is different, then it's possible that
    // the page has changed (or the user is viewing this page for the first
    // time.)
    // Hence, we ignore storage values and render/store default states to
    // storage for future reloads.
    should_use_default_values = true;
    storeNumCheckboxes(task_checkboxes.length);
  }

  // Listen for changes to the *number of checkboxes* in local storage (from
  // another tab). If this changes, that usually means that the other tab has a
  // newer (and changed) version of the page compared to the current tab.
  // Since it's *very* likely that the current page is out-of-date, let us not
  // sync any future changes to checkboxes from this tab.
  let should_sync_checkbox_state = true;
  const count_change_callback = () => {
    should_sync_checkbox_state = false;
  };
  Storage.addListenerForPage(
    TASK_LIST_STORAGE_COUNT_KEY,
    count_change_callback,
  );

  // Keep track of the listeners so that we can unregister them if the
  // innerHTML prop to MainContent ever changes.
  const change_listeners: Array<() => void> = [];
  // Also add listeners for storage change events (in case the checkbox is
  // changed on another tab, we change it here too).
  const storage_change_listeners: Array<StorageChangeCallbackType> = [];

  task_checkboxes.forEach((checkbox, i) => {
    checkbox.disabled = false;
    if (should_use_default_values) {
      setCheckboxState(i, checkbox.checked);
    } else {
      checkbox.checked = getCheckboxState(i);
    }

    // Listen for clicks on the checkbox on the page.
    const checkbox_change_listener = () => {
      if (should_sync_checkbox_state) {
        // Persist preference
        setCheckboxState(i, checkbox.checked);
      }
    };
    change_listeners.push(checkbox_change_listener);
    checkbox.addEventListener('change', checkbox_change_listener);

    // Listen for changes to checkbox state on other tabs.
    const storage_change_listener: StorageChangeCallbackType = () => {
      if (should_sync_checkbox_state) {
        checkbox.checked = getCheckboxState(i);
      }
    };
    storage_change_listeners.push(storage_change_listener);
    addListenerForCheckboxStorage(i, storage_change_listener);
  });

  return () => {
    task_checkboxes.forEach((checkbox, i) => {
      checkbox.removeEventListener('change', change_listeners[i]);
      removeListenerForCheckboxStorage(i, storage_change_listeners[i]);
    });
    Storage.removeListenerForPage(
      TASK_LIST_STORAGE_COUNT_KEY,
      count_change_callback,
    );
  };
}

function getNumCheckboxesFromStorage() {
  const raw_count = Storage.getForPage(TASK_LIST_STORAGE_COUNT_KEY) || '';
  const count = parseInt(raw_count, 10);
  return count || 0;
}

function storeNumCheckboxes(num_checkboxes: number) {
  Storage.setForPage(TASK_LIST_STORAGE_COUNT_KEY, `${num_checkboxes}`);
}

function getCheckboxState(index: number) {
  const raw_state = Storage.getForPage(`${TASK_LIST_STORAGE_PREFIX}_${index}`);
  return raw_state === 'true';
}

function setCheckboxState(index: number, state: boolean) {
  Storage.setForPage(`${TASK_LIST_STORAGE_PREFIX}_${index}`, `${state}`);
}

function addListenerForCheckboxStorage(
  index: number,
  callback: StorageChangeCallbackType,
) {
  Storage.addListenerForPage(`${TASK_LIST_STORAGE_PREFIX}_${index}`, callback);
}

function removeListenerForCheckboxStorage(
  index: number,
  callback: StorageChangeCallbackType,
) {
  Storage.removeListenerForPage(
    `${TASK_LIST_STORAGE_PREFIX}_${index}`,
    callback,
  );
}
