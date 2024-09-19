import city from "./city";
import country from "./country";
import firstname from "./firstname";
import food from "./food";
import gender from "./gender";
import RegistryFunc from "./RegistryFunc";
import whole_number from "./whole_number";

interface RegistryProps {
  [key: string]: RegistryFunc;
}

const Registry: RegistryProps = {
  city,
  gender,
  firstname,
  country,
  whole_number,
  food,
};

export default Registry;
