import UserInfo from "@/types/UserInfo";

const INITIAL_USER_INFO: UserInfo = {
  onboardCompleted: false,
  appInitialised: Date.now(),
  workspace: "",
};

export default INITIAL_USER_INFO;
