import { h } from 'preact';
import IconType from '../common/IconType';
import InlineButton from '../common/InlineButton';
import TableOfContents from './TableOfContents';

export type SidebarProps = {
  contentNode: HTMLElement;
  shown: boolean;
};

export default function Sidebar(props: SidebarProps) {
  return (
    <div
      class="primer-spec-sidebar position-fixed top-0 py-5 no-print"
      onClick={() => true}
    >
      <h2 class="primer-spec-toc-ignore" id="contents">
        Contents
        <InlineButton icon={IconType.SIDEBAR} />
      </h2>
      <br />
      <TableOfContents contentNode={props.contentNode} />
    </div>
  );
}
