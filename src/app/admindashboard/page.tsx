import React from "react";
import Drawar from "../components/Drawar";
import { Box, Card } from "@mui/material";
import ArticleInputs from "../components/ArticleInputs";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "../utils/verifyToken";
import { redirect } from "next/navigation";

const Admainpage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");

  if (!payload?.isAdmin) {
    redirect("/");
  }
  return (
    <div className="">
      <Drawar username={payload?.username}>
        <Box
          sx={{ minWidth: 275 }}
          className="flex justify-center items-center min-h-[calc(100vh-150px)] "
        >
          <Card
            className="bg-indigo-400"
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 800,
              height: 400,
              maxHeight: "100%",
              p: 4,
            }}
          >
            <ArticleInputs id={payload?.id} />
          </Card>
        </Box>
      </Drawar>
    </div>
  );
};

export default Admainpage;
