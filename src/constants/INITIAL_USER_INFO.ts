import UserInfo from "@/types/UserInfo";

const INITIAL_USER_INFO: UserInfo = {
  onboardingCompletedAt: 0,
  appInitialisedAt: Date.now(),
  workspace: "",
  explored: [],
};

export default INITIAL_USER_INFO;
