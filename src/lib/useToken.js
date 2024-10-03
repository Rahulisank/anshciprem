import Cookies from "js-cookie";
import { AUTH_ID_KEY } from "@/constants";

export function useToken() {
  return {
    setToken(token) {
      Cookies.set(AUTH_ID_KEY, token, { expires: 1 });
    },
    getToken() {
      return Cookies.get(AUTH_ID_KEY);
    },
    removeToken() {
      Cookies.remove(AUTH_ID_KEY);
    },
  };
}
