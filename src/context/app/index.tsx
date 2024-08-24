import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import ChooseProjectDir from "./choose-project-dir";
import Onboarding from "./onboarding";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(INITIAL_USER_INFO);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(INITIAL_USER_INFO);

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
  if (!status.projectDir)
    return (
      <ChooseProjectDir
        confirmDir={(projectDir) => setStatus({ ...status, projectDir })}
      />
    );
  return <AppContext.Provider value={status}>{children}</AppContext.Provider>;
}
