import { useSyncExternalStore } from "react";

/**
 * Light or dark, following the reader's OS.
 *
 * Chakra keys its dark tokens off `.dark &`, and light is what you get by
 * default, so the whole mechanism is one class on `<html>`.
 */

const OS_DARK_QUERY = "(prefers-color-scheme: dark)";

/** The class Chakra's `_dark` condition looks for on an ancestor. */
export const DARK_CLASS = "dark";

/** Whether the OS is asking for dark right now. Re-renders when it changes. */
export function useOsPrefersDark(): boolean {
  return useSyncExternalStore(subscribeToOsScheme, osSnapshot, serverSnapshot);
}

function subscribeToOsScheme(onChange: () => void): () => void {
  const query = window.matchMedia(OS_DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const osSnapshot = () => window.matchMedia(OS_DARK_QUERY).matches;

/** The pages are rendered at build time, when there is no OS to ask, so they
 *  are built light and the bootstrap script corrects before anything paints. */
const serverSnapshot = () => false;

/**
 * Decides the theme before the first paint.
 *
 * React resolves this too, but only once it hydrates, which is after the
 * browser has painted: a reader with a dark OS would get a white flash on
 * every load. This runs synchronously in `<head>`. A constant string, with
 * nothing from the reader in it.
 */
export const colorModeBootstrapScript = [
  "(function(){try{",
  `var d=window.matchMedia(${JSON.stringify(OS_DARK_QUERY)}).matches;`,
  `document.documentElement.classList.toggle(${JSON.stringify(DARK_CLASS)},d);`,
  "}catch(e){}})()",
].join("");
