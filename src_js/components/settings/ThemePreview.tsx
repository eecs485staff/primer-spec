import { h } from 'preact';

import type { RegisteredSubthemeType } from '../../subthemes';

type PropsType = {
  subtheme: RegisteredSubthemeType;
  mode: 'light' | 'dark';
};

export default function ThemePreview(props: PropsType): h.JSX.Element {
  const { theme_definition } = props.subtheme;
  const { mode } = props;

  const svgClassName = `primer-spec-theme-preview-${props.subtheme.name}-${props.mode}`;

  const mainBgColor = theme_definition[mode]['--main-bg-color'] || 'white';
  const sidebarBgColor =
    theme_definition[mode]['--sidebar-bg-color'] || 'white';
  const sidebarHeadingTextColor =
    theme_definition[mode]['--sidebar-heading-text-color'] || 'black';
  const sidebarTocH1LinkColor =
    theme_definition[mode]['--sidebar-toc-h1-link-color'] || '#0366d6';
  const sidebarActiveTocSectionBgColor =
    theme_definition[mode]['--sidebar-active-toc-section-bg-color'] ||
    '#faed27';
  const sidebarActiveTocSectionLinkColor =
    theme_definition[mode]['--sidebar-active-toc-section-link-color'] ||
    'black';
  const sidebarTocSectionLinkColor =
    theme_definition[mode]['--sidebar-toc-section-link-color'] || 'black';
  const sidebarTocH1BorderColor =
    theme_definition[mode]['--sidebar-toc-h1-border-color'] || 'lightgrey';
  const mainHeadingLinkColor =
    theme_definition[mode]['--main-heading-link-color'] || '#0366d6';
  const mainTextColor = theme_definition[mode]['--main-text-color'] || 'black';
  const mainHeaderBorderBottomColor =
    theme_definition[mode]['--main-header-border-bottom-color'] || '#eaecef';
  const mainLinkColor =
    theme_definition[mode]['--main-link-color'] || '#0366d6';
  const mainTablePreBgColor =
    theme_definition[mode]['--main-table-pre-bg-color'] || '#f6f8fa';
  const sidebarBorderColor =
    theme_definition[mode]['--sidebar-border-color'] || '#eaecef';

  const mainTablePreBorderColor = mode === 'light' ? 'none' : 'rgb(60, 62, 66)';

  // The following SVG was designed by @bellakiminsun for Primer Spec. It was
  // modified so that the theme colors could be dynamically rendered by JS.
  return (
    <svg
      class={svgClassName}
      viewBox="30.774 27.546 298.133 175.743"
      xmlns="http://www.w3.org/2000/svg"
      clip-path={`url(#${svgClassName}-clip)`}
    >
      <defs>
        <style>
          {`.${svgClassName} .main-bg{fill:${mainBgColor};}`}
          {`.${svgClassName} .sidebar-bg{fill:${sidebarBgColor};stroke:${sidebarBgColor};}`}
          {`.${svgClassName} .sidebar-heading{fill:${sidebarHeadingTextColor};}`}
          {`.${svgClassName} .sidebar-toc-h1-link{fill:${sidebarTocH1LinkColor};}`}
          {`.${svgClassName} .sidebar-active-toc-section-bg{fill:${sidebarActiveTocSectionBgColor};}`}
          {`.${svgClassName} .sidebar-active-toc-section-link{fill:${sidebarActiveTocSectionLinkColor};}`}
          {`.${svgClassName} .sidebar-toc-section-link{fill:${sidebarTocSectionLinkColor};}`}
          {`.${svgClassName} .sidebar-toc-h1-border-color{fill:${sidebarTocH1BorderColor};}`}
          {`.${svgClassName} .main-heading-link{fill:${mainHeadingLinkColor};}`}
          {`.${svgClassName} .main-text{fill:${mainTextColor};}`}
          {`.${svgClassName} .main-header-border-bottom{fill:none;stroke:${mainHeaderBorderBottomColor};stroke-miterlimit:10;}`}
          {`.${svgClassName} .main-link{fill:${mainLinkColor};}`}
          {`.${svgClassName} .main-table-pre{fill:${mainTablePreBgColor};stroke:${mainTablePreBorderColor};stroke-width:0.2}`}
          {`.${svgClassName} .sidebar-border{fill:none;stroke:${sidebarBorderColor};stroke-miterlimit:10;}`}
        </style>
        {/*
         ** The following HACK hides overflow from the top-left corner of the
         ** SVG and creates a rounded corner. Unfortunately, it doesn't affect
         ** the top right corner, but that can be solved some other time.
         **/}
        <clipPath id={`${svgClassName}-clip`}>
          <rect x="0" y="0" width="200%" height="200%" rx="8" />
        </clipPath>
      </defs>
      <rect
        class="main-bg"
        x="30.588"
        y="27.623"
        width="298"
        height="175.694"
      />
      <rect
        class="sidebar-bg"
        x="30.79"
        y="27.669"
        width="93.85"
        height="175.646"
      />
      <rect
        class="sidebar-heading"
        x="43.588"
        y="43.623"
        width="41"
        height="10.26"
        rx="5"
      />
      <rect
        class="sidebar-toc-h1-link"
        x="43.588"
        y="62.993"
        width="58"
        height="10.26"
        rx="5"
      />
      <path
        class="sidebar-active-toc-section-bg"
        d="M 65.268 81.893 L 124.518 81.893 C 124.518 81.893 124.518 81.893 124.518 81.893 L 124.518 99.893 C 124.518 99.893 124.518 99.893 124.518 99.893 L 65.268 99.893 C 60.435 99.893 56.518 95.976 56.518 91.143 L 56.518 90.633 C 56.523 85.805 60.439 81.893 65.268 81.893 Z"
      />
      <rect
        class="sidebar-active-toc-section-link"
        x="64.748"
        y="85.853"
        width="47.77"
        height="10.26"
        rx="5.13"
      />
      <rect
        class="sidebar-toc-section-link"
        x="64.438"
        y="105.573"
        width="48.08"
        height="10.26"
        rx="5"
      />
      <rect
        class="sidebar-toc-section-link"
        x="64.438"
        y="124.573"
        width="48.08"
        height="10.26"
        rx="5.13"
      />
      <rect
        class="sidebar-toc-h1-border-color"
        x="-50.518"
        y="-135.883"
        width="2"
        height="55"
        transform="matrix(-1, 0, 0, -1, 0, 0)"
      />
      <rect
        class="main-heading-link"
        x="141.588"
        y="43.623"
        width="106.93"
        height="21.26"
        rx="4.49"
      />
      <rect
        class="main-text"
        x="141.518"
        y="80.893"
        width="162"
        height="6"
        rx="3"
      />
      <line
        class="main-header-border-bottom"
        x1="141.588"
        y1="72.623"
        x2="306.858"
        y2="72.623"
      />
      <rect
        class="main-text"
        x="141.518"
        y="103.893"
        width="101"
        height="6"
        rx="3"
      />
      <rect
        class="main-link"
        x="245.388"
        y="103.623"
        width="28.13"
        height="6.26"
        rx="3.13"
      />
      <rect
        class="main-text"
        x="276.518"
        y="103.623"
        width="27"
        height="6"
        rx="3"
      />
      <rect
        class="main-table-pre"
        x="141.518"
        y="170.893"
        width="162"
        height="32.424"
        style=""
      />
      <circle class="main-text" cx="144.088" cy="136.123" r="2" />
      <circle class="main-text" cx="144.088" cy="160.123" r="2" />
      <circle class="main-text" cx="144.088" cy="148.123" r="2" />
      <rect
        class="main-link"
        x="151.288"
        y="133.063"
        width="27.23"
        height="6"
        rx="3"
      />
      <rect
        class="main-link"
        x="151.288"
        y="145.063"
        width="27.23"
        height="6"
        rx="3"
      />
      <rect
        class="sidebar-toc-h1-link"
        x="43.638"
        y="148.663"
        width="58"
        height="10.26"
        rx="5"
      />
      <rect
        class="sidebar-toc-h1-border-color"
        x="-50.518"
        y="-203.281"
        width="1.95"
        height="36.728"
        transform="matrix(-1, 0, 0, -1, 0, 0)"
        style=""
      />
      <rect
        class="sidebar-toc-section-link"
        x="64.888"
        y="166.803"
        width="48.08"
        height="10.26"
        rx="5"
      />
      <rect
        class="sidebar-toc-section-link"
        x="64.888"
        y="183.803"
        width="48.08"
        height="10.26"
        rx="5.13"
      />
      <path
        class="sidebar-toc-section-link"
        d="M 65.248 203.3 C 66.2 202.04 67.796 201.283 69.504 201.283 L 107.283 201.283 C 108.94 201.285 110.459 202.119 111.424 203.317"
        style=""
      />
      <rect
        class="main-text"
        x="141.518"
        y="92.893"
        width="162"
        height="6"
        rx="3"
      />
      <rect
        class="main-text"
        x="141.518"
        y="115.893"
        width="162"
        height="6"
        rx="3"
      />
      <rect
        class="main-link"
        x="151.398"
        y="157.243"
        width="27.23"
        height="6"
        rx="3"
      />
      <line
        class="sidebar-border"
        x1="124.588"
        y1="27.623"
        x2="124.588"
        y2="203.317"
        style=""
      />
    </svg>
  );
}
