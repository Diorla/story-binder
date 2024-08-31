import { Box, useTheme } from "@mui/material";

export default function ToolbarIconsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box
      className="row"
      sx={{
        backgroundColor: theme.palette.grey[50],
        flexDirection: "row",
        ml: 1,
        mr: 1,
        [`& > svg`]: {
          ml: 1,
          mr: 1,
        },
        [`& > span`]: {
          pl: 1,
          pr: 1,
        },
      }}
    >
      {children}
    </Box>
  );
}
