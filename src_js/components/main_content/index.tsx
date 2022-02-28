import { h } from 'preact';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import clsx from 'clsx';
import Config from '../../Config';
import { usePrintInProgress } from '../../utils/hooks/print';
import useTaskListCheckboxes from './useTaskListCheckboxes';
import useEnhancedCodeBlocks from './useEnhancedCodeBlocks';
import useMermaidDiagrams from './useMermaidDiagrams';
import useTooltippedAbbreviations from './useTooltippedAbbreviations';
import usePrefersDarkMode from '../../utils/hooks/usePrefersDarkMode';

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
  const main_el_ref = useRef<HTMLElement>(null);

  const taskListCheckboxEffect = useCallback(useTaskListCheckboxes, [
    innerHTML,
  ]);
  useEffect(() => {
    return taskListCheckboxEffect(main_el_ref);
  }, [taskListCheckboxEffect]);

  const enhancedCodeBlocksEffect = useCallback(useEnhancedCodeBlocks, [
    innerHTML,
  ]);
  useEffect(() => {
    return enhancedCodeBlocksEffect(main_el_ref);
  }, [enhancedCodeBlocksEffect]);

  let should_use_dark_mode_for_mermaid_diagrams = false;
  switch (currentSubthemeMode) {
    case 'system':
      should_use_dark_mode_for_mermaid_diagrams = prefers_dark_mode;
      break;
    case 'dark':
      should_use_dark_mode_for_mermaid_diagrams = true;
      break;
    default:
      should_use_dark_mode_for_mermaid_diagrams = false;
  }
  if (currentSubthemeName === 'xcode-civic') {
    should_use_dark_mode_for_mermaid_diagrams = true;
  }
  const mermaidDiagramsEffect = useCallback(useMermaidDiagrams, [innerHTML]);
  useEffect(() => {
    return mermaidDiagramsEffect(
      main_el_ref,
      should_use_dark_mode_for_mermaid_diagrams,
    );
  }, [mermaidDiagramsEffect, should_use_dark_mode_for_mermaid_diagrams]);

  const tooltippedAbbreviationsEffect = useCallback(
    useTooltippedAbbreviations,
    [innerHTML],
  );
  useEffect(() => {
    return tooltippedAbbreviationsEffect(main_el_ref);
  }, [tooltippedAbbreviationsEffect]);

  useEffect(() => {
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
