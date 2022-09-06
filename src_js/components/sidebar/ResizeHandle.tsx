/**
 * This component was largely inspired by: https://codepen.io/mcolo/pen/OJMjWda
 */
import { h } from 'preact';
import { useEffect, useRef, Ref } from 'preact/hooks';

type PropsType = {
  sidebarRef: Ref<HTMLElement>;
};

type ResizeDataType = {
  tracking: boolean;
  startCursorScreenX: number | null;
  startSidebarWidth: number | null;
  startMainContentMargin: number | null;
};

const MIN_WIDTH = 250;
const MAX_WIDTH = 650;

export function ResizeHandle({ sidebarRef }: PropsType): h.JSX.Element {
  const resize_handle_ref = useRef<HTMLDivElement>(null);
  const resize_data_ref = useRef<ResizeDataType>(getInitialResizeData());

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const {
        startCursorScreenX,
        startSidebarWidth,
        startMainContentMargin,
      } = resize_data_ref.current;

      if (
        startCursorScreenX != null &&
        startSidebarWidth != null &&
        startMainContentMargin != null
      ) {
        // (1) Calculate the new sidebar width
        const cursorScreenXDelta = e.screenX - startCursorScreenX;
        let newSidebarWidth = Math.max(
          MIN_WIDTH,
          startSidebarWidth + cursorScreenXDelta,
        );
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
          const mainContentEl = getMainContentNode();
          if (mainContentEl) {
            mainContentEl.style.marginLeft = `${newMainContentMargin}px`;
          }
        }
      }
    };

    const onMouseUp = () => {
      resize_data_ref.current = getInitialResizeData();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [resize_handle_ref, sidebarRef]);

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
          tracking: true,
          startCursorScreenX: e.screenX,
          startSidebarWidth: sidebarRef.current?.offsetWidth ?? null,
          startMainContentMargin: getMainContentMarginPx(),
        };
      }}
    />
  );
}

function getInitialResizeData(): ResizeDataType {
  return {
    tracking: false,
    startCursorScreenX: null,
    startSidebarWidth: null,
    startMainContentMargin: null,
  };
}

/**
 * Assumes that the screen is not small.
 */
function getMainContentNode() {
  return document.querySelector(
    '.primer-spec-content-margin-extra',
  ) as HTMLElement | null;
}

function getMainContentMarginPx() {
  const mainContentNode = getMainContentNode();
  const startMainContentMarginRaw = mainContentNode
    ? window.getComputedStyle(mainContentNode).getPropertyValue('margin-left')
    : null;
  return startMainContentMarginRaw?.match(/^\d+px$/)
    ? parseInt(startMainContentMarginRaw, 10)
    : null;
}
