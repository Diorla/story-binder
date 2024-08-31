import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import UserInfo from "@/types/UserInfo";

export default async function getUserInfo(): Promise<UserInfo> {
  const defaultContent = JSON.stringify(INITIAL_USER_INFO);
  const info = await window.api?.sendMessage({
    type: "read-file",
    path: USER_INFO_DIR,
    defaultContent,
  });
  const data = JSON.parse(info as string);
  return data;
}
