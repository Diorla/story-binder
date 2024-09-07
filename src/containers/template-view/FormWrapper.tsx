import { Box, Typography, Button, Divider, Pagination } from "@mui/material";
import useTemplateContext from "./useTemplateContext";
import AddQuestion from "./AddQuestion";
import QuestionList from "./QuestionList";
import { useState } from "react";

export default function FormWrapper({
  setIsSelect,
}: {
  setIsSelect: (value: boolean) => void;
}) {
  const { form } = useTemplateContext();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);

  return (
    <Box>
      <Box>
        <Typography>{form.name}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => setIsSelect(true)}>Change basic info</Button>
        </Box>
      </Box>
      <Divider />
      <QuestionList page={page} />
      <Divider />

      <AddQuestion page={page} />
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          flex: 1,
          width: "100%",
          backgroundColor: "white",
          zIndex: 2,
        }}
      >
        <Pagination
          count={count}
          variant="outlined"
          shape="rounded"
          page={page + 1}
          onChange={(_e, page) => setPage(page - 1)}
        />
        <Button
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => {
            const maxPage = count;
            setCount((prev) => prev + 1);
            setPage(maxPage);
          }}
        >
          New page
        </Button>
      </Box>
    </Box>
  );
}
