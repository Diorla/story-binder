import {
  SettingsApplications,
  InsertDriveFile,
  ExpandMore,
  ChevronRight,
} from "@mui/icons-material";

export default function LeftIcon({
  active,
  isFile,
  isTemplate,
}: {
  active?: boolean;
  isFile?: boolean;
  isTemplate?: boolean;
}) {
  if (isTemplate) return <SettingsApplications />;
  if (isFile) return <InsertDriveFile />;
  if (active) {
    return <ExpandMore />;
  }
  return <ChevronRight />;
}
