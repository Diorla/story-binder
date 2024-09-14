import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import User from "@/types/User";

export default async function getUserInfo(): Promise<User> {
  const info = await window.api?.sendMessage({
    type: "read-file",
    path: USER_INFO_DIR,
    defaultContent: INITIAL_USER_INFO,
  });

  return info as User;
}
