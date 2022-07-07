import { h } from 'preact';
import IconType from './IconType';
import { Hoverable } from './Hoverable';

export type PropsType = {
  icon: IconType;
  href?: string;
  floatRight?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function InlineButton(props: PropsType): h.JSX.Element {
  return (
    <Hoverable floatRight={props.floatRight}>
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
    </Hoverable>
  );
}
