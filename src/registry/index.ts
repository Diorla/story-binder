import sex from "./sex";
import RegistryFunc from "./RegistryFunc";
import whole_number from "./whole_number";
import decimal_number from "./decimal_number";
import name from "./name";
import country from "./country";

interface RegistryProps {
  [key: string]: RegistryFunc;
}

const Registry: RegistryProps = {
  sex,
  whole_number,
  decimal_number,
  name,
  country,
};

export default Registry;
