import Button from "@mui/material/Button";

export default function MenuButton({
  onClick,
  label,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
}) {
  return (
    <Button
      onClick={onClick}
      style={{ textTransform: "inherit" }}
      color="inherit"
      size="small"
    >
      {label}
    </Button>
  );
}
