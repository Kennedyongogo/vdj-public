import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const VDJKush = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  paths,
  currentPath,
  navigate,
}) => {
  console.log("VDJKush props:", {
    onNext,
    onPrev,
    hasNext,
    hasPrev,
    paths,
    currentPath,
    navigate,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const typographyElement = (
    <Typography
      variant="body1"
      sx={{
        maxWidth: "600px",
        lineHeight: 1.6,
        fontSize: "0.875rem",
      }}
    >
      THIS IS A TEST CHANGE - IT SHOULD APPEAR IMMEDIATELY why was it not
      working initially?
    </Typography>
  );

  console.log("Typography element:", typographyElement);

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
        <Box
          sx={{
            flex: 2,
            minWidth: 0,
            position: "relative",
            paddingBottom: "20px",
          }}
        >
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
            VDJ Kush
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
            The Pulse of Kenyan Nightlife
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
            <span role="img" aria-label="fire">
              🔥
            </span>{" "}
            VDJ Kush is not just a DJ — he's a musical architect, blending
            Afrobeat, Amapiano, Gengetone, Dancehall, and global rhythms into
            unforgettable nights. Born and raised in the heart of Kenya, VDJ
            Kush electrifies crowds with explosive mixes, seamless transitions,
            and a deep connection to East African street culture.
            <br />
            <br />
            <span role="img" aria-label="headphones">
              🎧
            </span>{" "}
            Whether he's lighting up the decks in Nairobi's top clubs,
            headlining major events, or spinning live for thousands online, VDJ
            Kush delivers high-energy sets that keep the crowd on its feet from
            dusk till dawn.
            <br />
            <br />
            With a name that echoes across clubs and campuses, VDJ Kush
            represents a new wave of urban sound culture — raw, real, and
            undeniably Kenyan.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontStyle: "italic",
              fontWeight: "bold",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              mb: 4,
            }}
          >
            Slogan: Feel the Vibe. Live the Sound. Ride with Kush.
          </Typography>
          {/* Trendingz label at bottom left */}
          <Typography
            variant="overline"
            onClick={handleOpenDialog}
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              bgcolor: "rgba(255,255,255,0.08)",
              color: "#fff",
              px: 1,
              py: 0.25,
              borderRadius: "8px",
              fontWeight: "bold",
              letterSpacing: 1,
              fontSize: "0.75rem",
              boxShadow: 2,
              cursor: "pointer",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            Trendingz
          </Typography>
        </Box>
        {/* Image Card Placeholder */}
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
            VDJ Kush Image
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
          mt: 2,
          gap: 1,
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

      {/* Trending Topics Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
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
          }}
        >
          VDJ Kush Trending Topics
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "white", mt: 2 }}>
            Trending topics content will go here...
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VDJKush;
