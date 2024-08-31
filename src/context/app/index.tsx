import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import { useEffect } from "react";
import UserInfo from "@/types/UserInfo";
import AppContext from "./AppContext";
import useContextState from "@/hooks/useContextState";
import DirProps from "./DirProps";
import Wrapper from "./Wrapper";
import getUserInfo from "./getUserInfo";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useContextState("app-context-loading", true);
  const [userInfo, setUserInfo] = useContextState<UserInfo>(
    "app-context-status",
    INITIAL_USER_INFO
  );
  const [dir, setDir] = useContextState<DirProps>("user-dir", {
    projectPath: "",
    folderName: "",
    fileName: "",
  });

  useEffect(() => {
    getUserInfo().then((data) => {
      setLoading(false);
      setUserInfo(data);
    });
  }, [setLoading, setUserInfo]);

  const updateDir = (
    type: "projectPath" | "folderName" | "fileName",
    value: string
  ) => {
    if (type === "projectPath") {
      setDir({ projectPath: value, folderName: "", fileName: "" });
    } else if (type === "folderName") {
      setDir({ ...dir, folderName: value, fileName: "" });
    } else if (type === "fileName") {
      setDir({ ...dir, fileName: value });
    }
  };

  const updateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    const mergedUserInfo = { ...userInfo, ...newUserInfo };
    window.api
      .sendMessage({
        type: "write-file",
        path: USER_INFO_DIR,
        content: JSON.stringify(mergedUserInfo),
      })
      .then(() => setUserInfo(mergedUserInfo));
  };

  if (loading) return <div>Loading...</div>;
  return (
    <AppContext.Provider value={{ userInfo, dir, updateDir, updateUserInfo }}>
      <Wrapper>{children}</Wrapper>
    </AppContext.Provider>
  );
}
