export default interface Document {
  id: string;
  name: string;
  note: string;
  /**
   * it will be based on Template interface
   */
  template: string;
  content: string;
}
