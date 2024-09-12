export default interface Doc {
  id: string;
  name: string;
  note: string;
  /**
   * it will be based on Template interface
   */
  template: string;
  content: string;
}
