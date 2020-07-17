export const STORAGE_KEY_SESSION = "A_SESSION";
export const UPDATE_MIN_VALIDITY = 86400; // 1 day in seconds
export const UPDATE_INTERVAL = 3600000; // 1 hour in milliseconds
export const SESSION_REFRESH_RETRY_MAX = 3;
export const SESSION_REFRESH_RETRY_DELAY = 300;

export const KEYCLOAK_INSTANCE_OPTIONS = {
  url: "https://auth.sharkme.de/auth",
  realm: "sharkme",
  clientId: "sharkme-app",
  rederictUrl: "http://localhost:3000/",
};
