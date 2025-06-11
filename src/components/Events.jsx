import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "http://38.242.243.113:5035" : "";

const Events = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  paths,
  currentPath,
  navigate,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    fetchEvents();
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/public`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
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
            Events
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
            Upcoming & Past Events
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
            Stay updated with upcoming events and never miss out on the fun.
            From club nights to exclusive parties, VDJ Kush brings the energy to
            every stage.
            <br />
            <br />
            <span role="img" aria-label="confetti">
              🎉
            </span>{" "}
            Check back often for the latest event announcements, recaps, and
            highlights from the hottest spots in town.
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
            Slogan: Join the Party. Make Memories. Celebrate with Kush.
          </Typography>
          {/* Events label at bottom left */}
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
            Events
          </Typography>
        </Box>
        {/* Events Card Placeholder */}
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
            overflow: "hidden",
            p: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/events.jpg"
              alt="Events Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                display: "block",
              }}
            />
          </Box>
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

      {/* Events Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "rgba(0,0,0,0.9)",
            color: "white",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            maxHeight: "90vh",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box width={40} /> {/* Spacer for alignment */}
          <Typography variant="h5" sx={{ flex: 1, textAlign: "center" }}>
            Upcoming Events
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
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
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {events.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    {event.bannerUrl && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={
                          event.bannerUrl.startsWith("http")
                            ? event.bannerUrl
                            : `${API_BASE_URL}${event.bannerUrl}`
                        }
                        alt={event.name}
                        sx={{ objectFit: "cover" }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        {event.name}
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255,255,255,0.9)" }}
                        >
                          <b>Start:</b> {formatDateTime(event.startDate)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255,255,255,0.9)" }}
                        >
                          <b>End:</b> {formatDateTime(event.endDate)}
                        </Typography>
                      </Box>
                      {event.eventHosts && event.eventHosts.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#ff6f61", fontWeight: "bold" }}
                          >
                            Host{event.eventHosts.length > 1 ? "s" : ""}:
                          </Typography>
                          {event.eventHosts.map((host, idx) => (
                            <Typography
                              key={idx}
                              variant="body2"
                              sx={{ color: "rgba(255,255,255,0.85)" }}
                            >
                              {host.name} {host.role && `(${host.role})`}{" "}
                              {host.contact && `- ${host.contact}`}
                            </Typography>
                          ))}
                        </Box>
                      )}
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255,255,255,0.9)" }}
                        >
                          📍 {event.venue}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255,255,255,0.9)" }}
                        >
                          💰 {event.ticketPrice} {event.currency}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                          label={event.status}
                          size="small"
                          sx={{
                            bgcolor:
                              event.status === "published"
                                ? "success.main"
                                : "info.main",
                            color: "white",
                          }}
                        />
                        {event.tags &&
                          event.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.1)",
                                color: "white",
                              }}
                            />
                          ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Events;
