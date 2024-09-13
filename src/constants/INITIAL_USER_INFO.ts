import User from "@/types/User";

const INITIAL_USER_INFO: User = {
  onboardingCompletedAt: 0,
  appInitialisedAt: Date.now(),
  workspace: "",
  explored: [],
  projectPath: "",
  templatePath: "",
};

export default INITIAL_USER_INFO;
