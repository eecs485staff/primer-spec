import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import IconType from './common/IconType';
import InlineButton from './common/InlineButton';
import Config from '../Config';

// Importing only for types
import { BoundActions } from 'redux-zero/types/Actions';
import actions from '../actions';
import { StoreStateType } from '../store';
import Utilities from '../Utilities';

type PropsType = {};

function Settings(
  props: PropsType &
    StoreStateType &
    BoundActions<StoreStateType, typeof actions>,
) {
  if (!props.settingsShown) {
    return null;
  }

  return (
    <div class="primer-spec-settings-container position-fixed top-0 left-0 width-full height-full">
      <div class="primer-spec-settings container-lg markdown-body primer-spec-content-margin-extra px-3 my-5">
        <h1 class="primer-spec-toc-ignore">{'Spec Theme Settings'}</h1>
        <label for="primer-spec-subtheme-selector">
          {'Choose your theme:'}
          <select
            name="primer-spec-subtheme-selector"
            class="primer-spec-subtheme-selector"
          ></select>
        </label>
        <br />
        <br />

        <label for="primer-spec-subtheme-mode-selector">
          {'Choose your theme mode:'}
          <select
            name="primer-spec-subtheme-mode-selector"
            class="primer-spec-subtheme-mode-selector"
          >
            <option value="light">{'light'}</option>
            <option value="dark">{'dark'}</option>
            <option value="system">{'use system settings'}</option>
          </select>
        </label>

        <hr />

        <p>
          <small>
            {'Does the spec display incorrectly?'}
            <a href="https://github.com/eecs485staff/primer-spec/issues">
              {'Let us know by adding a new "issue" here.'}
            </a>
          </small>
        </p>

        <p class="primer-spec-brand">
          <a
            href="https://github.com/eecs485staff/primer-spec/"
            target="_blank"
          >
            {`Primer Spec v${Config.VERSION_RAW}`}
          </a>
        </p>
      </div>
    </div>
  );
}

export default connect(null, actions)(Settings);
