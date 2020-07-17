import { parse as parseQueryString } from "query-string";

export function openUrl(url: string) {
  window.open(url, "_blank");
}

export function createOpenUrlHandler(url: string) {
  return () => openUrl(url);
}

export const parseSearchParam = (
  search: string,
  prop: string
): string | null => {
  const parsed = parseQueryString(search)[prop];
  const value = Array.isArray(parsed) ? parsed.find(Boolean) : parsed;
  return value || null;
};
