{
  title: "{{ include.item.title | default: '' }}",
  {%- if include.item.url -%}
  url: "{{ include.item.url }}",
  {%- elsif include.item.pages -%}
  pages: [
    {%- for itemChild in include.item.pages -%}
    {% include sitemap_custom_item.liquid.js item=itemChild %},
    {%- endfor -%}
  ],
  {%- endif -%}
}
