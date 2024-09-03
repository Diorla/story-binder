import UserInfo from "@/types/UserInfo";
import DirProps from "./DirProps";

export default interface AppContextProps {
  userInfo: UserInfo;
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  dir: DirProps;
  updateDir: (
    type: "projectPath" | "folderPath" | "documentId",
    value: string
  ) => void;
  refresh: () => void;
}
