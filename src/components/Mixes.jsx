import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import MovieIcon from "@mui/icons-material/Movie";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "http://38.242.243.113:5035" : "";

const Mixes = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  paths,
  currentPath,
  navigate,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mixes, setMixes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playModalOpen, setPlayModalOpen] = useState(false);
  const [currentMix, setCurrentMix] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    fetchMixes();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchMixes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/mix`);
      if (!response.ok) {
        throw new Error("Failed to fetch mixes");
      }
      const data = await response.json();
      setMixes(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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
            Latest Mixes
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
            Experience the Sound
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
            <span role="img" aria-label="headphones">
              🎧
            </span>{" "}
            Dive into VDJ Kush's latest mixes, featuring the hottest Afrobeat,
            Amapiano, and Gengetone tracks. Each mix is carefully curated to
            take you on a musical journey through the vibrant sounds of East
            Africa.
            <br />
            <br />
            <span role="img" aria-label="fire">
              🔥
            </span>{" "}
            From club bangers to laid-back vibes, these mixes showcase VDJ
            Kush's signature style and technical prowess. Perfect for your
            workout, party, or just chilling at home.
            <br />
            <br />
            Stay tuned for regular updates as VDJ Kush continues to drop fresh
            mixes that keep the dance floor moving.
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
            Slogan: Feel the Beat. Move Your Feet. Mix with Kush.
          </Typography>
          {/* Playlist label at bottom left */}
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
            Playlist
          </Typography>
        </Box>
        {/* Mix Card Placeholder */}
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
            Latest Mix Cover
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

      {/* Playlist Dialog */}
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
          VDJ Kush Playlist
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress sx={{ color: "#fff" }} />
            </Box>
          ) : error ? (
            <Typography sx={{ color: "error.main", textAlign: "center", p: 2 }}>
              {error}
            </Typography>
          ) : (
            <List sx={{ width: "100%", bgcolor: "transparent" }}>
              {mixes.map((mix, index) => (
                <React.Fragment key={mix.id}>
                  <ListItem
                    button={true}
                    onClick={(e) => {
                      // Row click handler
                      console.log("Row clicked:", mix.title);
                    }}
                    sx={{
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      {mix.fileType === "audio" ? (
                        <AudiotrackIcon sx={{ color: "#19bdb7" }} />
                      ) : (
                        <MovieIcon sx={{ color: "#1976d2" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={mix.title}
                      secondary={
                        <Box
                          component="span"
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {mix.description}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            Duration: {formatDuration(mix.duration)} |
                            Downloads: {mix.downloadCount} | Plays:{" "}
                            {mix.playCount}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box onClick={(e) => e.stopPropagation()}>
                      <IconButton
                        edge="end"
                        aria-label="play"
                        sx={{ color: "#19bdb7" }}
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          try {
                            // First, increment play count by fetching the specific mix
                            await fetch(`${API_BASE_URL}/api/mix/${mix.id}`);

                            // Then open the play modal
                            setCurrentMix(mix);
                            setPlayModalOpen(true);

                            // Refresh the mixes list to update the play count
                            await fetchMixes();
                          } catch (error) {
                            console.error("Error playing mix:", error);
                          }
                        }}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="download"
                        sx={{ color: "#fff" }}
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          try {
                            // Trigger the file download
                            const response = await fetch(
                              `${API_BASE_URL}/api/mix/${mix.id}/download-file`
                            );
                            if (!response.ok)
                              throw new Error("Download failed");

                            // Get the blob from the response
                            const blob = await response.blob();

                            // Create a URL for the blob
                            const url = window.URL.createObjectURL(blob);

                            // Create a temporary link element
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = mix.title || "mix"; // Use mix title as filename

                            // Append to body, click and remove
                            document.body.appendChild(link);
                            link.click();

                            // Clean up
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                          } catch (err) {
                            console.error("Error downloading file:", err);
                            // Optionally show an error message to the user
                          }
                        }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < mixes.length - 1 && (
                    <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* Play Modal */}
      <Dialog
        open={playModalOpen}
        onClose={() => setPlayModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "rgba(0,0,0,0.95)",
            color: "white",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          Play Mix
        </DialogTitle>
        <DialogContent>
          {currentMix && currentMix.fileType === "audio" && (
            <audio
              controls
              style={{ width: "100%" }}
              src={
                currentMix.fileUrl.startsWith("http")
                  ? currentMix.fileUrl
                  : `${API_BASE_URL}${currentMix.fileUrl}`
              }
            />
          )}
          {currentMix &&
            (currentMix.fileType === "video" ||
              currentMix.fileType === "mp4") && (
              <video
                controls
                style={{ width: "100%" }}
                src={
                  currentMix.fileUrl.startsWith("http")
                    ? currentMix.fileUrl
                    : `${API_BASE_URL}${currentMix.fileUrl}`
                }
              />
            )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Mixes;
