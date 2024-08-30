import { Card, Grid, IconButton } from "@mui/material";
import { Add, Tune } from "@mui/icons-material";
import Nav from "./Nav";
import MainWindow from "./MainWindow";

export default function Project() {
  return (
    <div>
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 0,
        }}
      >
        <Nav />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 100,
            justifyContent: "space-evenly",
          }}
        >
          <IconButton>
            <Add style={{ fontSize: 21, cursor: "pointer" }} />
          </IconButton>
          <IconButton>
            <Tune style={{ fontSize: 21, cursor: "pointer" }} />
          </IconButton>
        </div>
      </Card>
      <Grid sx={{ p: 1 }}>
        <MainWindow />
      </Grid>
    </div>
  );
}
