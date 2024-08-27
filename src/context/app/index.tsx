import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import ChooseProjectDir from "./choose-project-dir";
import Onboarding from "./onboarding";
import { useEffect } from "react";
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

  function getUserInfo() {
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
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!status.onboardCompleted)
    return <Onboarding onCompleteOnboarding={getUserInfo} />;
  if (!status.workspace)
    return (
      <ChooseProjectDir
        confirmDir={(workspace) => setStatus({ ...status, workspace })}
      />
    );
  return <AppContext.Provider value={status}>{children}</AppContext.Provider>;
}
