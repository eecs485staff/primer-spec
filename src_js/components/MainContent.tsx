import { h } from 'preact';
import Config from '../Config';
import { usePrintInProgress } from '../utils/hooks';

type PropsType = {
  innerHTML: string;
  isSmallScreen: boolean;
  sidebarShown: boolean;
};

export default function MainContent(props: PropsType) {
  const is_print_in_progress = usePrintInProgress();

  return (
    <main
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
