import Keycloak, {
  KeycloakError,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakPromise,
} from "keycloak-js";
import { parseSearchParam } from "./url-utlis";
import { delay } from "./delay";

import {
  STORAGE_KEY_SESSION,
  UPDATE_MIN_VALIDITY,
  UPDATE_INTERVAL,
  SESSION_REFRESH_RETRY_MAX,
  SESSION_REFRESH_RETRY_DELAY,
  KEYCLOAK_INSTANCE_OPTIONS,
} from "../constant";

const KEYCLOAK_INIT_OPTIONS: KeycloakInitOptions = {
  checkLoginIframe: false,
};

export interface IKeycloakSession {
  token?: string;
  refreshToken?: string;
}

// keycloak-js supports native promises, but it breaks the library internally
function createPromise<T, E = KeycloakError>(
  promise: KeycloakPromise<T, E>
): Promise<T> {
  return new Promise<T>((resolve, reject) =>
    promise.success(resolve).error(reject)
  );
}

function getTokenFromUrl(): string | null {
  return parseSearchParam(window.location.hash, "access_token");
}

class KeycloakClient {
  private readonly keycloak: KeycloakInstance;

  private impersonateToken: string | null = null;
  private updateInterval: number | null = null;

  public constructor() {
    this.keycloak = Keycloak(KEYCLOAK_INSTANCE_OPTIONS);
  }

  public async login(session?: IKeycloakSession) {
    try {
      const impersonateToken = await this.checkImpersonation();

      if (impersonateToken) {
        return impersonateToken;
      }

      const savedSession = this.getSavedSession();
      const sessionOptions = session || savedSession;

      const options = sessionOptions
        ? { ...KEYCLOAK_INIT_OPTIONS, ...sessionOptions }
        : KEYCLOAK_INIT_OPTIONS;

      const authenticated = await this.init(options);

      if (!authenticated) {
        this.removeSavedSession();
        this.keycloak.login(this.getLoginOptions());

        return null;
      }

      if (this.updateInterval) {
        window.clearInterval(this.updateInterval);
      }

      this.updateInterval = window.setInterval(
        () => this.updateSession(),
        UPDATE_INTERVAL
      );

      this.saveSession();

      return this.getToken();
    } catch (error) {
      console.log(error, "Login failed");
      this.logout();
    }
    return null;
  }

  public async logout(options?: KeycloakLoginOptions) {
    this.removeSavedSession();
    if (!this.keycloak.authenticated) {
      await this.init(KEYCLOAK_INIT_OPTIONS);
    }

    this.keycloak.logout(options || this.getLoginOptions());
  }

  public getToken() {
    const token = this.impersonateToken || this.keycloak.token || null;
    return token;
  }

  public getCurrentSession(): IKeycloakSession {
    const { token, refreshToken } = this.keycloak;
    return { token, refreshToken };
  }

  public getRefreshToken() {
    return this.keycloak.refreshToken;
  }

  public async createLoginUrl() {
    if (!this.keycloak.authenticated) {
      await this.init(KEYCLOAK_INIT_OPTIONS);
    }
    return this.keycloak.createLoginUrl(this.getLoginOptions());
  }

  public async createLogoutUrl() {
    if (!this.keycloak.authenticated) {
      await this.init(KEYCLOAK_INIT_OPTIONS);
    }
    return this.keycloak.createLogoutUrl(this.getLoginOptions());
  }

  private async init(
    options: KeycloakInitOptions,
    tryCount = 1
  ): Promise<boolean> {
    try {
      return await createPromise<boolean>(this.keycloak.init(options));
    } catch {
      if (tryCount < SESSION_REFRESH_RETRY_MAX) {
        await delay(SESSION_REFRESH_RETRY_DELAY);
        return this.init(options, tryCount + 1);
      }
    }
    return false;
  }

  private getLoginOptions(): KeycloakLoginOptions | undefined {
    return { redirectUri: KEYCLOAK_INSTANCE_OPTIONS.rederictUrl };
  }

  private async checkImpersonation() {
    const token = getTokenFromUrl();
    if (token) {
      await this.init(KEYCLOAK_INIT_OPTIONS);
      this.impersonateToken = token;
    }
    return token;
  }

  private async updateSession(): Promise<void> {
    console.log("updateSession");
    try {
      await createPromise<boolean, boolean>(
        this.keycloak.updateToken(UPDATE_MIN_VALIDITY)
      );
      this.saveSession();
    } catch (error) {
      console.log(error, "Could not refresh session");
    }
  }

  private saveSession() {
    const { token, refreshToken } = this.keycloak;
    window.localStorage.setItem(
      STORAGE_KEY_SESSION,
      JSON.stringify({ token, refreshToken })
    );
  }

  private getSavedSession(): IKeycloakSession | null {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY_SESSION);
      if (item) {
        return JSON.parse(item) as IKeycloakSession;
      }
    } catch (error) {
      console.log(error, "Could not parse saved session");
    }
    return null;
  }

  private removeSavedSession() {
    window.localStorage.removeItem(STORAGE_KEY_SESSION);
  }
}

export const keycloakClient = new KeycloakClient();
