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
  isSmallScreen: boolean;
  sidebarShown: boolean;
  currentSubthemeName: string;
  currentSubthemeMode: SubthemeModeSelectorType;
};

export default function MainContent(props: PropsType): h.JSX.Element {
  const is_print_in_progress = usePrintInProgress();
  const prefers_dark_mode = usePrefersDarkMode();
  const main_el_ref = useRef<HTMLElement>(null);

  const taskListCheckboxEffect = useCallback(useTaskListCheckboxes, [
    props.innerHTML,
  ]);
  useEffect(() => {
    return taskListCheckboxEffect(main_el_ref);
  }, [taskListCheckboxEffect]);

  const enhancedCodeBlocksEffect = useCallback(useEnhancedCodeBlocks, [
    props.innerHTML,
  ]);
  useEffect(() => {
    return enhancedCodeBlocksEffect(main_el_ref);
  }, [enhancedCodeBlocksEffect]);

  let should_use_dark_mode_for_mermaid_diagrams = false;
  switch (props.currentSubthemeMode) {
    case 'system':
      should_use_dark_mode_for_mermaid_diagrams = prefers_dark_mode;
      break;
    case 'dark':
      should_use_dark_mode_for_mermaid_diagrams = true;
      break;
    default:
      should_use_dark_mode_for_mermaid_diagrams = false;
  }
  if (props.currentSubthemeName === 'xcode-civic') {
    should_use_dark_mode_for_mermaid_diagrams = true;
  }
  const mermaidDiagramsEffect = useCallback(useMermaidDiagrams, [
    props.innerHTML,
  ]);
  useEffect(() => {
    return mermaidDiagramsEffect(
      main_el_ref,
      should_use_dark_mode_for_mermaid_diagrams,
    );
  }, [mermaidDiagramsEffect, should_use_dark_mode_for_mermaid_diagrams]);

  const tooltippedAbbreviationsEffect = useCallback(
    useTooltippedAbbreviations,
    [props.innerHTML],
  );
  useEffect(() => {
    return tooltippedAbbreviationsEffect(main_el_ref);
  }, [tooltippedAbbreviationsEffect]);

  return (
    <main
      ref={main_el_ref}
      id={Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}
      class={clsx('container-lg', 'px-3', 'my-5', 'markdown-body', {
        'primer-spec-content-margin-extra':
          props.sidebarShown && !props.isSmallScreen && !is_print_in_progress,
        'primer-spec-content-mobile':
          props.isSmallScreen && !is_print_in_progress,
      })}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    />
  );
}
