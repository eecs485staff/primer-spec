import htmlTableOfContents from "./htmlTableOfContents";
import NodeManager from "./NodeManager";

function main() {
  // Generate the HTML table of contents in the sidebar.
  htmlTableOfContents();
  new NodeManager().init();
}

main();
