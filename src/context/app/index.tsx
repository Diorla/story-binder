import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import { useEffect } from "react";
import UserInfo from "@/types/UserInfo";
import AppContext from "./AppContext";
import useContextState from "@/hooks/useContextState";
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

  useEffect(() => {
    getUserInfo().then((data) => {
      setLoading(false);
      setUserInfo(data);
    });
  }, [setLoading, setUserInfo]);

  const updateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    const mergedUserInfo = { ...userInfo, ...newUserInfo };
    window.api
      .sendMessage({
        type: "write-file",
        path: USER_INFO_DIR,
        content: mergedUserInfo,
      })
      .then(() => setUserInfo(mergedUserInfo));
  };

  const refresh = () => {
    setLoading(true);
    getUserInfo().then((data) => {
      setUserInfo(data);
      setLoading(false);
    });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <AppContext.Provider value={{ userInfo, updateUserInfo, refresh }}>
      <Wrapper>{children}</Wrapper>
    </AppContext.Provider>
  );
}
