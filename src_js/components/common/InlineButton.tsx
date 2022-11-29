import { h } from 'preact';
import IconType from './IconType';
import { Hoverable } from './Hoverable';
import { openExternalLink } from './openExternalLink';

export type InlineButtonPropsType = {
  icon: IconType;
  floatRight?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function InlineButton(
  props: InlineButtonPropsType,
): h.JSX.Element {
  return (
    <Hoverable floatRight={props.floatRight}>
      <button
        class="btn-link primer-spec-hoverable no-print"
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
      </button>
    </Hoverable>
  );
}

export type InlineLinkButtonPropsType = {
  icon: IconType;
  floatRight?: boolean;
  href: string;
  download?: string | boolean;
  ariaLabel?: string;
};

export function InlineLinkButton(
  props: InlineLinkButtonPropsType,
): h.JSX.Element {
  return (
    <Hoverable floatRight={props.floatRight}>
      <a
        class="btn-link primer-spec-hoverable no-print"
        role="button"
        href={props.href}
        onClick={(event) => {
          event.preventDefault();
          openExternalLink({ url: props.href, download: props.download });
        }}
        aria-label={props.ariaLabel}
      >
        <i class={props.icon} />
      </a>
    </Hoverable>
  );
}
