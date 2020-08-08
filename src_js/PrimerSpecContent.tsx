import { h } from 'preact';
import { connect } from 'redux-zero/preact';

// Importing only for types
import { BoundActions } from 'redux-zero/types/Actions';
import actions from './actions';
import { StoreStateType } from './store';
import Config from './Config';

type PropsType = {
  innerHTML: string;
};

function PrimerSpecContent(
  props: PropsType &
    StoreStateType &
    BoundActions<StoreStateType, typeof actions>,
) {
  return (
    <div
      id={Config.PRIMER_SPEC_CONTENT_PREACT_NODE_ID}
      class={`container-lg px-3 my-5 markdown-body ${
        props.sidebarShown && !props.isSmallScreen
          ? 'primer-spec-content-margin-extra'
          : ''
      } ${props.isSmallScreen ? 'primer-spec-content-mobile' : ''}`}
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    ></div>
  );
}

export default connect(null, actions)(PrimerSpecContent);
