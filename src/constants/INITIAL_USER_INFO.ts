import User from "@/types/User";

const INITIAL_USER_INFO: User = {
  onboardingCompletedAt: 0,
  appInitialisedAt: Date.now(),
  workspace: "",
  explored: [],
};

export default INITIAL_USER_INFO;
