import { USER_AUTH } from "@/constants";
import Cookies from "js-cookie";

export function useAuth() {
  return {
    setAuth(user) {
      Cookies.set(USER_AUTH, JSON.stringify(user), { expires: 1 });
    },
    getAuth() {
      return Cookies.get(USER_AUTH);
    },
    removeAuth() {
      Cookies.remove(USER_AUTH);
    },
  };
}
