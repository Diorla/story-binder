import UserInfo from "@/types/UserInfo";

export default interface AppContextProps {
  userInfo: UserInfo;
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  refresh: () => void;
}
