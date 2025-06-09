import React from "react";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 112px)", // Subtract top (56px) and bottom (56px) AppBars
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
