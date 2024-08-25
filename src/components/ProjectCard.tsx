import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import useRouter from "@/context/router/useRouter";
import BOOK_DIMENSION from "@/constants/BOOK_DIMENSION";
import { truncateText } from "@/scripts/truncateText";

const { height, width } = BOOK_DIMENSION;

export default function ProjectCard({
  name,
  summary,
  cover,
}: {
  name: string;
  summary: string;
  cover: string;
}) {
  const { navigate } = useRouter<{ name: string }>();

  return (
    <Card
      sx={{
        width,
        height,
        backgroundImage: `url(${cover})`,
        display: "flex",
        textShadow: "0 0 1px white",
      }}
    >
      <CardContent
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {truncateText(name, 30)}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {truncateText(summary)}
        </Typography>
        <CardActions sx={{ backgroundColor: "white" }}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => navigate("project", { name })}
          >
            Open
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
