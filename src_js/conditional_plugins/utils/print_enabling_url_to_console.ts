export function printEnablingURLToConsole(
  pluginId: string,
  message: string,
): void {
  const enabled_url = new URL(window.location.href);
  enabled_url.searchParams.set(`enable_${pluginId}`, '1');
  console.info(`${message}\n`, enabled_url.toString());
}
