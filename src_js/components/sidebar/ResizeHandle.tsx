/**
 * This component was largely inspired by: https://codepen.io/mcolo/pen/OJMjWda
 */
import { h } from 'preact';
import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  Ref,
  useCallback,
} from 'preact/hooks';
import Storage from '../../utils/Storage';

type PropsType = {
  sidebarRef: Ref<HTMLElement>;
};

type ResizeDataType = {
  startCursorScreenX: number | null;
  startSidebarWidth: number | null;
  startMainContentMargin: number | null;
};

const MIN_WIDTH = 250;
const MAX_WIDTH = 650;
const SIDEBAR_WIDTH_DELTA_STORAGE_KEY = 'primer_spec_sidebar_width_delta';

let defaultSidebarWidth: number | null;

export function ResizeHandle({ sidebarRef }: PropsType): h.JSX.Element {
  const resize_handle_ref = useRef<HTMLDivElement>(null);
  const resize_data_ref = useRef<ResizeDataType>(getInitialResizeData());

  const [mainContentMarginLeft, setMainContentMarginLeft] = useState<
    number | null
  >(null);

  const resizeSidebar = useCallback(
    (
      delta: number,
      startSidebarWidth: number | null,
      startMainContentMargin: number | null,
    ) => {
      if (startSidebarWidth != null && startMainContentMargin != null) {
        // (1) Calculate the new sidebar width (with constraints)
        let newSidebarWidth = Math.max(MIN_WIDTH, startSidebarWidth + delta);
        newSidebarWidth = Math.min(newSidebarWidth, MAX_WIDTH);

        // (2) Use the width change to calculate the main content margin change
        const widthDelta = newSidebarWidth - startSidebarWidth;
        const newMainContentMargin = startMainContentMargin + widthDelta;

        if (sidebarRef.current && resize_handle_ref.current) {
          // (3.1) Update the Sidebar width
          sidebarRef.current.style.width = `${newSidebarWidth}px`;
          // (3.2) Update the position of the resize handle (so that it's next
          //       to the Sidebar)
          resize_handle_ref.current.style.left = `${newSidebarWidth}px`;
          // (3.3) Update the margin of the main content so that it doesn't
          //       hide underneath the Sidebar
          getMainContentEls().forEach((el) => {
            el.style.marginLeft = `${newMainContentMargin}px`;
          });
        }
      }
    },
    [sidebarRef, resize_handle_ref],
  );

  // On page load, restore the sidebar to the width stored in local storage
  useLayoutEffect(() => {
    defaultSidebarWidth = getCurrentSidebarWidth(sidebarRef);
    const storedWidthDelta = getStoredSidebarWidthDelta();
    if (storedWidthDelta != null) {
      resizeSidebar(
        storedWidthDelta,
        defaultSidebarWidth,
        getMainContentMarginPx(),
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const {
        startCursorScreenX,
        startSidebarWidth,
        startMainContentMargin,
      } = resize_data_ref.current;

      if (startCursorScreenX) {
        const cursorScreenXDelta = e.screenX - startCursorScreenX;
        resizeSidebar(
          cursorScreenXDelta,
          startSidebarWidth,
          startMainContentMargin,
        );
      }
    };

    const onMouseUp = () => {
      const mainContentMargin = getMainContentMarginPx();
      if (mainContentMargin != null) {
        // Freeze the main content margin. This value is rendered in a
        // stylesheet so that it is also applied to the Settings pane.
        setMainContentMarginLeft(mainContentMargin);
      }

      const currentWidth = parseInt(sidebarRef.current?.style.width ?? '', 10);
      const widthDelta = Number.isNaN(currentWidth)
        ? null
        : currentWidth - (defaultSidebarWidth ?? 0);
      storeSidebarWidthDelta(widthDelta);

      resize_data_ref.current = getInitialResizeData();
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [sidebarRef, resize_handle_ref, resizeSidebar, setMainContentMarginLeft]);

  return (
    <div
      ref={resize_handle_ref}
      class="primer-spec-sidebar-resize-handle position-fixed top-0"
      tabIndex={-1}
      aria-hidden="true"
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();

        resize_data_ref.current = {
          startCursorScreenX: e.screenX,
          startSidebarWidth: getCurrentSidebarWidth(sidebarRef),
          startMainContentMargin: getMainContentMarginPx(),
        };
      }}
    >
      {// We render a stylesheet for the content margin because when the
      // Settings container renders, its margin is not auto-adjusted to match
      // the custom sidebar width.
      mainContentMarginLeft ? (
        <style>
          {'.primer-spec-content-margin-extra {'}
          {`  margin-left: ${mainContentMarginLeft}px`}
          {'}'}
        </style>
      ) : null}
    </div>
  );
}

function getInitialResizeData(): ResizeDataType {
  return {
    startCursorScreenX: null,
    startSidebarWidth: null,
    startMainContentMargin: null,
  };
}

function getCurrentSidebarWidth(sidebarRef: Ref<HTMLElement>) {
  return sidebarRef.current?.offsetWidth ?? null;
}

/**
 * Assumes that the screen is not small.
 */
function getMainContentEls() {
  const els = document.querySelectorAll(
    '.primer-spec-content-margin-extra',
  ) as NodeListOf<HTMLElement>;
  if (els.length <= 0) {
    throw new Error(
      'Primer Spec: While resizing sidebar, expected at least one main content node.',
    );
  }
  return els;
}

function getMainContentMarginPx() {
  const mainContentEls = getMainContentEls();
  const startMainContentMarginRaw = mainContentEls
    ? window.getComputedStyle(mainContentEls[0]).getPropertyValue('margin-left')
    : null;
  return startMainContentMarginRaw?.match(/^\d+px$/)
    ? parseInt(startMainContentMarginRaw, 10)
    : null;
}

function storeSidebarWidthDelta(widthDelta: number | null): void {
  Storage.setForPage(SIDEBAR_WIDTH_DELTA_STORAGE_KEY, widthDelta ?? '');
}

function getStoredSidebarWidthDelta(): number | null {
  const widthDelta = parseInt(
    Storage.getForPage(SIDEBAR_WIDTH_DELTA_STORAGE_KEY) ?? '',
    10,
  );
  return Number.isNaN(widthDelta) ? null : widthDelta;
}
