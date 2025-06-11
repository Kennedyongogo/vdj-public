import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Archive = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  paths,
  currentPath,
  navigate,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box
      sx={{
        color: "white",
        textAlign: "left",
        padding: "1rem",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "16px",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Flex row for content and image card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <Box sx={{ flex: 2, minWidth: 0, position: "relative", pb: 6 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              marginBottom: "1rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontSize: "2rem",
            }}
          >
            Event Archive
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "medium",
              marginBottom: "0.75rem",
              fontSize: "1.25rem",
            }}
          >
            Past Performances & Events
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "700px",
              lineHeight: 1.3,
              marginBottom: "0.75rem",
              fontSize: "0.875rem",
            }}
          >
            <span role="img" aria-label="calendar">
              📅
            </span>{" "}
            Take a journey through VDJ Kush's musical history. Our archive
            showcases memorable performances, special events, and milestone
            moments that have shaped our journey in the music industry.
            <br />
            <br />
            <span role="img" aria-label="trophy">
              🏆
            </span>{" "}
            Featured Events:
            <br />
            • Major Club Performances
            <br />
            • Festival Appearances
            <br />
            • Special Guest Sets
            <br />
            • Award Ceremonies
            <br />
            • Charity Events
            <br />
            <br />
            Browse through our past events and relive the moments that made
            history.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontStyle: "italic",
              fontWeight: "bold",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            Slogan: Every Event, A Story. Every Performance, A Memory.
          </Typography>
          {/* Archive button */}
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              bgcolor: "rgba(255,255,255,0.08)",
              color: "#fff",
              px: 2,
              py: 1,
              borderRadius: "8px",
              fontWeight: "bold",
              letterSpacing: 1,
              fontSize: "0.75rem",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            Archive
          </Button>
        </Box>
        {/* Archive Card Placeholder */}
        <Card
          sx={{
            flex: 1,
            minWidth: 220,
            maxWidth: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(30,30,30,0.85)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: 3,
            height: 320,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "#bbb", textAlign: "center" }}
          >
            Archive Image
            <br />
            (Coming Soon)
          </Typography>
        </Card>
      </Box>

      {/* Progressive Dots below the image card */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "140px",
          left: 0,
          right: 0,
          gap: 1,
          zIndex: 2,
        }}
      >
        {paths &&
          paths.map((path, i) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: path === currentPath ? "#fff" : "#666",
                border: "none",
                outline: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                boxShadow: path === currentPath ? "0 0 4px #fff" : "none",
              }}
              aria-label={`Go to ${path}`}
            />
          ))}
      </Box>

      {/* SVG Wave Background at the bottom */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: "60px", sm: "120px" },
          zIndex: 1,
          pointerEvents: "none",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          overflow: "hidden",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="0"
              y1="0"
              x2="1440"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff6f61" />
              <stop offset="0.5" stopColor="#6a82fb" />
              <stop offset="1" stopColor="#fc5c7d" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      {/* Archive Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "rgba(0,0,0,0.9)",
            color: "white",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
            position: "relative",
          }}
        >
          Event Archive
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "white", textAlign: "center", mt: 4 }}>
            Archive content coming soon...
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Archive;
