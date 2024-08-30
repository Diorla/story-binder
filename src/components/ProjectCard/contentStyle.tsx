const contentStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
  transition: "background-color 0.3s ease",
  [`&:hover`]: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
};

export default contentStyle;
