import { h } from 'preact';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import clsx from 'clsx';
import Config from '../../Config';
import { usePrintInProgress } from '../../utils/hooks/print';
import useTaskListCheckboxes from './useTaskListCheckboxes';
import useEnhancedCodeBlocks from './useEnhancedCodeBlocks';
import useTooltippedAbbreviations from './useTooltippedAbbreviations';

type PropsType = {
  innerHTML: string;
  isSmallScreen: boolean;
  sidebarShown: boolean;
};

export default function MainContent(props: PropsType): h.JSX.Element {
  const is_print_in_progress = usePrintInProgress();
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
