import ChooseWorkspace from "./choose-workspace";
import Onboarding from "./onboarding";
import useApp from "./useApp";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { userInfo } = useApp();

  if (!userInfo.workspace) return <ChooseWorkspace />;
  if (!userInfo.onboardCompletedAt) return <Onboarding />;
  return <>{children}</>;
}
