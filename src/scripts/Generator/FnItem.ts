type FnItem = {
  /**
   * I will generate this unique id
   */
  id: string;
  /**
   * The order in which it is found in the fnList
   */
  index: number;
  /**
   * The text inside the template
   */
  template: string;
  /**
   * it will extracted from the template string
   * e.g. ~firstName()~ will become firstName
   */
  functionName: string;
  /**
   * A user may use an identifier to refer to a function
   * This allows the user to reference the function e.g.
   *
   */
  identifier: string;
  /**
   * This are the parameters that will be parsed to the function
   * it will go like this
   *  (min=1, max=100, int=[bool]) => { min: 1, max: 100, int: this.ref(bool) }
   * ref is basically find this.bool by identifier and return the value.
   */
  args: {
    [key: string]: number | string;
  };
  /**
   * This is the value that will be returned by the function
   */
  value: string | number;
  /**
   * The functions that is required for this to work, passed as variables
   */
  dep: string[];
};
export default FnItem;
