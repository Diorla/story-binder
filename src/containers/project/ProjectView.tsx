import { Box, Button, Card, Divider, Grid, IconButton } from "@mui/material";
import { Add, GridView, Tune } from "@mui/icons-material";
import Nav from "./Nav";
import { useState } from "react";
import CollectionList from "./CollectionList";
import Input from "@/components/Input";
import { useProject } from "./useProject";
import useForm from "@/hooks/useForm";

export default function ProjectView() {
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { register, handleSubmit, resetForm } = useForm({
    defaultValue: {
      name: "",
      note: "",
    },
    required: ["name"],
  });

  const { createCollection } = useProject();

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
          <IconButton onClick={() => setOpenForm(!openForm)}>
            <Add style={{ fontSize: 21, cursor: "pointer" }} />
          </IconButton>
          <IconButton onClick={() => setEditing(!editing)}>
            {editing ? (
              <GridView style={{ fontSize: 21, cursor: "pointer" }} />
            ) : (
              <Tune style={{ fontSize: 21, cursor: "pointer" }} />
            )}
          </IconButton>
        </div>
      </Card>
      {openForm && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 1,
              maxWidth: 300,
              margin: "auto",
            }}
          >
            <Input label="Name" {...register("name")} />
            <Input rows={5} multiline label="Note" {...register("note")} />
            <Box className="row" sx={{ justifyContent: "space-evenly" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setOpenForm(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={handleSubmit((data) => {
                  createCollection(data);
                  setOpenForm(false);
                  resetForm();
                })}
              >
                Save
              </Button>
            </Box>
          </Box>
          <Divider />
        </>
      )}
      <Grid sx={{ p: 1 }}>
        {editing ? <div>Edit project</div> : <CollectionList />}
      </Grid>
    </div>
  );
}
