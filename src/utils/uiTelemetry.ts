const UI_TELEMETRY_ENABLED =
  import.meta.env.DEV && import.meta.env.VITE_UI_TELEMETRY !== 'false';

export const logUiEvent = (eventName: string) => {
  if (!UI_TELEMETRY_ENABLED) {
    return;
  }
  console.info(`UI_EVENT: ${eventName}`);
};
