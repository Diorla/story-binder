import UserInfo from "@/types/UserInfo";
import DirProps from "./DirProps";

export default interface AppContextProps {
  userInfo: UserInfo;
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  dir: DirProps;
  updateDir: (
    type: "projectPath" | "folderName" | "fileName",
    value: string
  ) => void;
}
