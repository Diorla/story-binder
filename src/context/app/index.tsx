import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import ChooseWorkspace from "./choose-workspace";
import Onboarding from "./onboarding";
import { useCallback, useEffect } from "react";
import UserInfo from "@/types/UserInfo";
import AppContext from "./AppContext";
import useContextState from "@/hooks/useContextState";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [error, setError] = useContextState<null | Error>(
    "app-context-error",
    null
  );
  const [loading, setLoading] = useContextState("app-context-loading", true);
  const [status, setStatus] = useContextState<UserInfo>(
    "app-context-status",
    INITIAL_USER_INFO
  );

  const getUserInfo = useCallback(() => {
    const content = JSON.stringify(INITIAL_USER_INFO);
    window.fs
      ?.sendMessage({
        type: "read-file",
        dir: USER_INFO_DIR,
        content,
      })
      .then((value) => {
        setStatus(JSON.parse(value as string));
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [setError, setLoading, setStatus]);

  const openFile = async () => {
    setLoading(true);
    window.dialog
      .selectDir()
      .then((value) => {
        const newContent: UserInfo = {
          ...INITIAL_USER_INFO,
          workspace: value as string,
          onboardCompleted: true,
        };
        localStorage.clear();
        setStatus(newContent);
        window.fs.sendMessage({
          type: "write-file",
          dir: USER_INFO_DIR,
          content: JSON.stringify(newContent),
        });
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!status.onboardCompleted)
    return <Onboarding onCompleteOnboarding={getUserInfo} />;
  if (!status.workspace) return <ChooseWorkspace changeWorkspace={openFile} />;
  return (
    <AppContext.Provider
      value={{ userInfo: status, changeWorkspace: openFile }}
    >
      {children}
    </AppContext.Provider>
  );
}
