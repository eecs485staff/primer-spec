import { h } from 'preact';
import IconType from './IconType';

export type PropsType = {
  icon: IconType;
  href?: string;
  floatRight?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function InlineButton(props: PropsType): h.JSX.Element {
  return (
    <span
      class={`primer-spec-hoverable ${
        props.floatRight ? 'primer-spec-hoverable-float-right' : ''
      }`}
    >
      <a
        href={props.href ?? '#primer-spec-top'}
        class="primer-spec-hoverable no-print"
        onClick={
          props.onClick
            ? (event) => {
                event.preventDefault();
                props.onClick && props.onClick();
              }
            : undefined
        }
        aria-label={props.ariaLabel}
      >
        <i class={props.icon} />
      </a>
    </span>
  );
}
