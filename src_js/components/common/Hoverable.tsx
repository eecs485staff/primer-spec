import { h } from 'preact';

type PropsType = {
  floatRight?: boolean;
  children: h.JSX.Element | Array<h.JSX.Element>;
};

export function Hoverable(props: PropsType): h.JSX.Element {
  return (
    <span
      class={`primer-spec-hoverable ${
        props.floatRight ? 'primer-spec-hoverable-float-right' : ''
      }`}
    >
      {props.children}
    </span>
  );
}
