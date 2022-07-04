import { h } from 'preact';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import clsx from 'clsx';
import Config from '../../Config';
import { usePrintInProgress } from '../../utils/hooks/print';
import useTaskListCheckboxes from './useTaskListCheckboxes';
import useEnhancedCodeBlocks from './useEnhancedCodeBlocks';
import useMermaidDiagrams from './useMermaidDiagrams';
import useTooltippedAbbreviations from './useTooltippedAbbreviations';
import usePrefersDarkMode from '../../utils/hooks/usePrefersDarkMode';
import useWindowLoaded from '../../utils/hooks/useWindowLoaded';

type PropsType = {
  innerHTML: string;
  visible: boolean;
  scrollToPosition: null | { top: number; left: number };
  isSmallScreen: boolean;
  sidebarShown: boolean;
  currentSubthemeName: string;
  currentSubthemeMode: SubthemeModeSelectorType;
};

export default function MainContent({
  innerHTML,
  visible,
  scrollToPosition,
  isSmallScreen,
  sidebarShown,
  currentSubthemeName,
  currentSubthemeMode,
}: PropsType): h.JSX.Element | null {
  const is_print_in_progress = usePrintInProgress();
  const prefers_dark_mode = usePrefersDarkMode();
  const window_loaded = useWindowLoaded();
  const main_el_ref = useRef<HTMLElement>(null);

  // INTERACTIVE TASK LIST CHECKBOXES
  const taskListCheckboxEffect = useCallback(useTaskListCheckboxes, [
    innerHTML,
  ]);
  useEffect(() => {
    return taskListCheckboxEffect(main_el_ref);
  }, [taskListCheckboxEffect]);

  // ENHANCED CODE BLOCKS
  const enhancedCodeBlocksEffect = useCallback(useEnhancedCodeBlocks, [
    innerHTML,
  ]);
  useEffect(() => {
    return enhancedCodeBlocksEffect(main_el_ref);
  }, [enhancedCodeBlocksEffect]);

  // MERMAID DIAGRAMS
  let should_use_dark_mode = false;
  switch (currentSubthemeMode) {
    case 'system':
      should_use_dark_mode = prefers_dark_mode;
      break;
    case 'dark':
      should_use_dark_mode = true;
      break;
    default:
      should_use_dark_mode = false;
  }
  if (
    currentSubthemeName === 'xcode-civic' ||
    currentSubthemeName === 'spooky'
  ) {
    should_use_dark_mode = true;
  }
  if (is_print_in_progress) {
    should_use_dark_mode = false;
  }
  const mermaidDiagramsEffect = useCallback(useMermaidDiagrams, [innerHTML]);
  useEffect(() => {
    // Mermaid Diagrams should only be rendered after the document has
    // completed loading (including CSS and font resources). Otherwise, labels
    // may be displayed out of bounds.
    // Hence, we trigger a re-render of the Mermaid diagrams if the
    // `window_loaded` variable changes.
    //
    // NOTE: We _could_ have delayed rendering till after
    // `window_loaded === true`, but then users would briefly see a flash with
    // the original Mermaid source before the diagram is rendered. That page
    // might also reflow.
    return mermaidDiagramsEffect(main_el_ref, should_use_dark_mode);
  }, [window_loaded, mermaidDiagramsEffect, should_use_dark_mode]);

  // TOOLTIPPED ABBREVIATIONS
  const tooltippedAbbreviationsEffect = useCallback(
    useTooltippedAbbreviations,
    [innerHTML],
  );
  useEffect(() => {
    return tooltippedAbbreviationsEffect(main_el_ref);
  }, [tooltippedAbbreviationsEffect]);

  // RESET SCROLL POSITION (after closing settings pane)
  useLayoutEffect(() => {
    if (scrollToPosition != null) {
      window.scrollTo(scrollToPosition);
    }
  }, [scrollToPosition]);

  return (
    <main
      ref={main_el_ref}
      id={Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}
      class={clsx('container-lg', 'px-3', 'my-5', 'markdown-body', {
        'primer-spec-content-margin-extra':
          sidebarShown && !isSmallScreen && !is_print_in_progress,
        'primer-spec-content-mobile': isSmallScreen && !is_print_in_progress,
        'primer-spec-content-frozen': !visible,
      })}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    />
  );
}
