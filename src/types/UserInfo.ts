export default interface UserInfo {
  /**
   * Indicates if the user has completed the onboarding flow
   * It is the date (Date.now()) or 0
   */
  onboardingCompletedAt: number;
  /**
   * First the the app was opened
   */
  appInitialisedAt: number;
  /**
   * The workspace the user is currently in
   * It's where all the projects are stored
   */
  workspace: string;
  /**
   * The pages that has been explored by the user
   * It's an array of page path
   * It would be used to show help tips when the user opens it for the first time
   */
  explored: string[];
}
