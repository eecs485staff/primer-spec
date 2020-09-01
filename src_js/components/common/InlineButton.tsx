import { h } from 'preact';
import IconType from './IconType';

export type PropsType = {
  icon: IconType;
  onClick: () => void;
  ariaLabel?: string;
};

export default function InlineButton(props: PropsType) {
  return (
    <span class="primer-spec-hoverable">
      <a
        href="#primer-spec-top"
        class="primer-spec-hoverable no-print"
        onClick={(event) => {
          event.preventDefault();
          props.onClick();
        }}
        aria-label={props.ariaLabel}
      >
        <i class={props.icon}></i>
      </a>
    </span>
  );
}
