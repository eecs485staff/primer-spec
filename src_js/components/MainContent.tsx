import { h } from 'preact';
import { usePrintInProgress } from '../utils/printHandlerHooks';
import Config from '../Config';

type PropsType = {
  innerHTML: string;
  sidebarShown: boolean;
  isSmallScreen: boolean;
};

export default function MainContent(props: PropsType) {
  const isPrintInProgress = usePrintInProgress();

  return (
    <div
      id={Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}
      class={`container-lg px-3 my-5 markdown-body ${
        props.sidebarShown && !props.isSmallScreen && !isPrintInProgress
          ? 'primer-spec-content-margin-extra'
          : ''
      } ${props.isSmallScreen ? 'primer-spec-content-mobile' : ''}`}
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    ></div>
  );
}
