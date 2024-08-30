import BOOK_DIMENSION from "@/constants/BOOK_DIMENSION";

const { height, width } = BOOK_DIMENSION;

const cardStyle = {
  width,
  height,
  display: "flex",
  textShadow: "0 0 1px white",
  backgroundSize: "200px 300px",
  fontWeight: "bold",
  mb: 1,
};

export default cardStyle;
