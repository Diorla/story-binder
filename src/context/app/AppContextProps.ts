import UserInfo from "@/types/UserInfo";

export default interface AppContextProps {
  userInfo: UserInfo;
  changeWorkspace: () => void;
}
