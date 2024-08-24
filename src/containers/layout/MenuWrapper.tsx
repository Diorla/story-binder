import Menu from "@mui/material/Menu";

export default function MenuWrapper({
  children,
  anchorEl,
  open,
  onClose,
}: {
  children: React.ReactNode;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          minWidth: 300,
        },
      }}
    >
      {children}
    </Menu>
  );
}
