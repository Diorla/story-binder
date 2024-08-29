import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import ChooseWorkspace from "./choose-workspace";
import Onboarding from "./onboarding";
import { useCallback, useEffect } from "react";
import UserInfo from "@/types/UserInfo";
import AppContext from "./AppContext";
import useContextState from "@/hooks/useContextState";
import logError from "@/scripts/logError";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useContextState("app-context-loading", true);
  const [status, setStatus] = useContextState<UserInfo>(
    "app-context-status",
    INITIAL_USER_INFO
  );

  const getUserInfo = useCallback(() => {
    const defaultContent = JSON.stringify(INITIAL_USER_INFO);
    window.api
      ?.sendMessage({
        type: "read-file",
        path: USER_INFO_DIR,
        defaultContent,
      })
      .then((value = {}) => {
        setStatus(JSON.parse(value as string));
        setLoading(false);
      })
      .catch((e) => {
        logError("AppProvider", "getUserInfo", e);
        setLoading(false);
      });
  }, [setLoading, setStatus]);

  const openFile = async () => {
    setLoading(true);
    window.api
      .sendMessage({
        type: "select-directory",
      })
      .then((value) => {
        const newContent: UserInfo = {
          ...INITIAL_USER_INFO,
          workspace: value as string,
        };

        localStorage.clear();
        window.api
          .sendMessage({
            type: "write-file",
            path: USER_INFO_DIR,
            content: JSON.stringify(newContent),
          })
          .then(() => setLoading(false));
        setStatus(newContent);
      })
      .catch((err: Error) => {
        logError("AppProvider", "openFile", err);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const completeOnboarding = () => {
    window.api
      .sendMessage({
        type: "write-file",
        path: USER_INFO_DIR,
        content: JSON.stringify({ ...status, onboardCompleted: true }),
      })
      .then(() => setStatus({ ...status, onboardCompleted: true }))
      .then(() => setLoading(false));
  };
  if (loading) return <div>Loading...</div>;
  if (!status.workspace) return <ChooseWorkspace changeWorkspace={openFile} />;
  if (!status.onboardCompleted)
    return <Onboarding completeOnboarding={completeOnboarding} />;
  return (
    <AppContext.Provider
      value={{ userInfo: status, changeWorkspace: openFile }}
    >
      {children}
    </AppContext.Provider>
  );
}
