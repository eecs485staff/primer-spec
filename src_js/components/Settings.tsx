import { h } from 'preact';
import { connect } from 'redux-zero/preact';
import Config from '../Config';
import { Subthemes } from '../SubthemeSettings';

// Importing only for types
import { BoundActions } from 'redux-zero/types/Actions';
import actions from '../actions';
import { StoreStateType } from '../store';

type PropsType = {};

function Settings(
  props: PropsType &
    StoreStateType &
    BoundActions<StoreStateType, typeof actions>,
) {
  if (!props.settingsShown) {
    return null;
  }

  const subtheme_dropdown_options = Object.entries(Subthemes).map(([name]) => {
    return <option value={name}>{name}</option>;
  });

  return (
    <div class="primer-spec-settings-container position-fixed top-0 left-0 width-full height-full">
      <div class="primer-spec-settings container-lg markdown-body primer-spec-content-margin-extra px-3 my-5">
        <h1 class="primer-spec-toc-ignore">{'Spec Theme Settings'}</h1>
        <label for="primer-spec-subtheme-selector">
          {'Choose your theme: '}
          <select
            name="primer-spec-subtheme-selector"
            class="primer-spec-subtheme-selector"
            onChange={(e) =>
              props.setSubthemeName((e.target as HTMLSelectElement)?.value)
            }
            value={props.currentSubthemeName ?? ''}
          >
            {subtheme_dropdown_options}
          </select>
        </label>
        <br />
        <br />

        <label for="primer-spec-subtheme-mode-selector">
          {'Choose your theme mode: '}
          <select
            name="primer-spec-subtheme-mode-selector"
            class="primer-spec-subtheme-mode-selector"
            onChange={(e) =>
              props.setSubthemeMode(
                (e.target as HTMLSelectElement)
                  ?.value as SubthemeModeSelectorType,
              )
            }
            value={props.currentSubthemeMode ?? ''}
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
