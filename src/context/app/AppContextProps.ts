import User from "@/types/User";

export default interface AppContextProps {
  userInfo: User;
  updateUserInfo: (userInfo: Partial<User>) => void;
  refresh: () => void;
}
