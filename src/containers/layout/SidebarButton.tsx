import useRouter from "@/context/router/useRouter";
import Path from "@/types/Path";

import { Tooltip, useTheme } from "@mui/material";

export default function SidebarButton({
  children,
  title,
  path,
}: {
  children: React.ReactNode;
  title: string;
  path: Path;
}) {
  const { navigate, _lastPath } = useRouter();
  const theme = useTheme();
  const color =
    _lastPath === path ? theme.palette.primary.light : theme.palette.grey[100];
  const style = { borderLeft: `2px solid ${color}` };

  return (
    <Tooltip title={title} placement="right">
      <button
        className="sidebar-button"
        style={style}
        onClick={() => navigate(path)}
      >
        {children}
      </button>
    </Tooltip>
  );
}
