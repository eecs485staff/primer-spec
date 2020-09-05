import { h, RefObject } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Config from '../Config';
import { usePrintInProgress } from '../utils/hooks';
import Storage from '../utils/Storage';

type PropsType = {
  innerHTML: string;
  isSmallScreen: boolean;
  sidebarShown: boolean;
};

const TASK_LIST_STORAGE_PREFIX = 'primer_spec_task_list';

export default function MainContent(props: PropsType) {
  const is_print_in_progress = usePrintInProgress();
  const main_el_ref = useRef<HTMLElement>(null);

  useTaskListCheckboxListeners(main_el_ref, [props.innerHTML]);

  return (
    <main
      ref={main_el_ref}
      id={Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}
      class={`container-lg px-3 my-5 markdown-body ${
        props.sidebarShown && !props.isSmallScreen && !is_print_in_progress
          ? 'primer-spec-content-margin-extra'
          : ''
      } ${props.isSmallScreen ? 'primer-spec-content-mobile' : ''}`}
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    ></main>
  );
}

/**
 * A custom hook that uses `useEffect()` to persist checkbox state for
 * task-list checkboxes.
 * @param mainElRef A ref to the `<main>` element from MainContent
 * @param deps Dependencies for useEffect
 */
function useTaskListCheckboxListeners(
  mainElRef: RefObject<HTMLElement>,
  deps: Array<any>,
) {
  useEffect(() => {
    if (!mainElRef.current) {
      throw new Error(
        'Primer Spec: Main Content: Expected main content ref to be initialized.',
      );
    }

    // Find all GFM task-list checkboxes
    const task_checkboxes = [
      ...mainElRef.current.querySelectorAll(
        '.task-list-item > input.task-list-item-checkbox[type="checkbox"]',
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

    // Keep track of the listeners so that we can unregister them if the
    // innerHTML prop to MainContent ever changes.
    const listeners: Array<() => void> = [];
    task_checkboxes.forEach((checkbox, i) => {
      checkbox.disabled = false;
      if (should_use_default_values) {
        setCheckboxState(i, checkbox.checked);
      } else {
        checkbox.checked = getCheckboxState(i);
      }

      const checkbox_change_listener = () => {
        // Persist preference
        setCheckboxState(i, checkbox.checked);
      };
      listeners.push(checkbox_change_listener);

      checkbox.addEventListener('change', checkbox_change_listener);
    });

    return () => {
      task_checkboxes.forEach((checkbox, i) => {
        checkbox.removeEventListener('change', listeners[i]);
      });
    };
  }, deps);
}

function getNumCheckboxesFromStorage() {
  const raw_count =
    Storage.getForPage(`${TASK_LIST_STORAGE_PREFIX}_count`) || '';
  const count = parseInt(raw_count, 10);
  return count || 0;
}

function storeNumCheckboxes(num_checkboxes: number) {
  Storage.setForPage(`${TASK_LIST_STORAGE_PREFIX}_count`, `${num_checkboxes}`);
}

function getCheckboxState(index: number) {
  const raw_state = Storage.getForPage(`${TASK_LIST_STORAGE_PREFIX}_${index}`);
  return raw_state === 'true';
}

function setCheckboxState(index: number, state: boolean) {
  Storage.setForPage(`${TASK_LIST_STORAGE_PREFIX}_${index}`, `${state}`);
}
