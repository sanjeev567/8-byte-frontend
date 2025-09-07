import { GLOBAL_CONFIGS } from "../configs/global-config";

export class LocalSessionManager {
  static saveToken = (token: string): void => {
    localStorage.setItem("accessToken", token);
  };
  static readToken = (): string | null => {
    if (GLOBAL_CONFIGS.testingToken) {
      return GLOBAL_CONFIGS.testingToken;
    }
    return localStorage.getItem("accessToken");
  };
  static deleteToken = (): void => localStorage.removeItem("accessToken");
}
