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
        [`& > svg`]: {
          ml: 0.4,
          mr: 0.4,
        },
        [`& > span`]: {
          pl: 0.4,
          pr: 0.4,
        },
      }}
    >
      {children}
    </Box>
  );
}
