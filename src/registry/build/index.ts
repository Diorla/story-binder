import chance from "chance";
import { FuncArgType } from "../RegistryFunc";

const Chance = new chance();

type Size = "small" | "medium" | "large";

const muscle = (bodyFrame: Size, size: Size) => {
  if (size === "small")
    return `${bodyFrame} body frame, no discernible muscles`;
  if (size === "medium") {
    return "Medium build";
  }
  if (bodyFrame === "small") return "Sinewy";
  if (bodyFrame === "medium") return "Toned";
  return "Buffed";
};

const fat = (bodyFrame: Size, size: Size) => {
  if (size === "small") return `Thin with a ${bodyFrame} body frame`;
  if (size === "medium") return `Medium build`;

  if (bodyFrame === "small") return "Skinny fat";
  if (bodyFrame === "medium") return "Overweight";
  return "Obese";
};

type BodyDeterminant = "Fat" | "Muscle";

const getBodyShape = () => {
  const shape = Chance.weighted(
    ["Straight", "Apple", "Pear", "Hourglass"],
    [46, 20, 14, 8]
  );
  if (shape === "Apple") return " and busty";
  if (shape === "Pear") return " and has a big booty";
  if (shape === "Hourglass") return " and curvy";
  return "";
};

const build = async (arg: FuncArgType) => {
  const { gender } = arg as { gender: "female" };
  const bodyFrame = Chance.pickone<Size>(["small", "medium", "large"]);
  const primaryDeterminant = Chance.pickone<BodyDeterminant>(["Fat", "Muscle"]);
  const determinantSize = Chance.pickone<Size>(["small", "medium", "large"]);

  if (primaryDeterminant === "Fat") return fat(bodyFrame, determinantSize);

  if (gender === "female")
    return muscle(bodyFrame, determinantSize) + getBodyShape();
  return muscle(bodyFrame, determinantSize);
};

export default build;
