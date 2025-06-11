import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Button,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "http://38.242.243.113:5035" : "";

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
  const [trending, setTrending] = useState([]);
  const [tab, setTab] = useState("all");
  const [likeLoading, setLikeLoading] = useState({});
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [loadingTrending, setLoadingTrending] = useState(false);

  useEffect(() => {
    if (openDialog) {
      fetchTrending();
    }
  }, [openDialog]);

  const fetchTrending = async () => {
    setLoadingTrending(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/trending?period=daily&limit=20`
      );
      const data = await res.json();
      setTrending(data.data || []);
      // Initialize comments state for new items
      const newComments = {};
      data.data?.forEach((item) => {
        newComments[item.id] = [];
      });
      setComments((prev) => ({ ...prev, ...newComments }));
    } catch (err) {
      console.error("Error fetching trending:", err);
      setTrending([]);
    } finally {
      setLoadingTrending(false);
    }
  };

  const handleTabChange = (e, newValue) => setTab(newValue);

  const filteredTrending = trending.filter((item) =>
    tab === "all" ? true : item.contentType === tab
  );

  const handleLike = async (id) => {
    // Optimistically update the trending count in the UI
    setTrending((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likeCount: (item.likeCount || 0) + 1 }
          : item
      )
    );

    try {
      await fetch(`${API_BASE_URL}/api/trending/${id}/like`, {
        method: "POST",
      });
      // Optionally, you can refresh trending in the background if you want to sync with backend
      // fetchTrending();
    } catch (error) {
      // If error, revert the optimistic update
      setTrending((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, likeCount: Math.max(0, (item.likeCount || 1) - 1) }
            : item
        )
      );
      console.error("Error handling like:", error);
    }
  };

  const handleComment = async (id) => {
    if (!commentText[id]?.trim()) return;

    try {
      setCommentLoading((prev) => ({ ...prev, [id]: true }));
      await fetch(`${API_BASE_URL}/api/trending/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: commentText[id] }),
      });

      // Clear comment text
      setCommentText((prev) => ({ ...prev, [id]: "" }));

      // Refresh comments
      await fetchComments(id);

      // Refresh trending data to get updated engagement count
      await fetchTrending();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const fetchComments = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/trending/${id}/comments`);
      const data = await res.json();
      if (data.success) {
        setComments((prev) => ({ ...prev, [id]: data.data || [] }));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleToggleComments = async (id) => {
    setExpandedComments((prev) => {
      const isExpanded = !!prev[id];
      if (isExpanded) {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      }
      fetchComments(id);
      return { ...prev, [id]: true };
    });
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
            }}
          >
            Slogan: Feel the Vibe. Live the Sound. Ride with Kush.
          </Typography>
          {/* Trendingz label at bottom left */}
          <Typography
            variant="overline"
            onClick={() => setOpenDialog(true)}
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

      {/* Trending Topics Dialog */}
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
          VDJ Kush Trending Topics
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
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{
              mb: 2,
              "& .MuiTab-root": { color: "#fff" }, // Unselected tab color
              "& .Mui-selected": { color: "#fff" }, // Selected tab color
              "& .MuiTabs-indicator": { backgroundColor: "#fff" }, // Indicator color
            }}
          >
            <Tab label="All" value="all" />
            <Tab label="Events" value="event" />
            <Tab label="Mixes" value="mix" />
          </Tabs>
          {loadingTrending ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : filteredTrending.length === 0 ? (
            <Typography sx={{ color: "white", textAlign: "center", mt: 4 }}>
              No trending topics found.
            </Typography>
          ) : (
            <Box sx={{ mt: 2 }}>
              {filteredTrending.map((item) => (
                <Card key={item.id} sx={{ mb: 2, bgcolor: "#fff" }}>
                  <CardContent sx={{ color: "#000" }}>
                    <Typography variant="h6">
                      {item.content?.title ||
                        item.content?.name ||
                        "No content found"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {item.content?.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <IconButton
                        onClick={() => handleLike(item.id)}
                        disabled={likeLoading[item.id]}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <Typography variant="caption">
                        {item.likeCount || 0} likes • {item.commentCount || 0}{" "}
                        comments • {item.score?.toFixed(2)} score
                      </Typography>
                      <IconButton onClick={() => handleToggleComments(item.id)}>
                        <CommentIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        size="small"
                        placeholder="Add a comment"
                        value={commentText[item.id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleComment(item.id);
                          }
                        }}
                        sx={{
                          mr: 1,
                          bgcolor: "rgba(255,255,255,0.1)",
                          borderRadius: 1,
                        }}
                        InputProps={{ style: { color: "#000" } }}
                      />
                      <Button
                        size="small"
                        onClick={() => handleComment(item.id)}
                        disabled={
                          commentLoading[item.id] ||
                          !commentText[item.id]?.trim()
                        }
                        sx={{ color: "#000", borderColor: "#000" }}
                      >
                        {commentLoading[item.id] ? "Posting..." : "Comment"}
                      </Button>
                    </Box>
                    {/* Only show comments if expanded */}
                    {expandedComments[item.id] && (
                      <List dense>
                        {(comments[item.id] || []).map((c, idx) => (
                          <ListItem key={idx} sx={{ color: "#000" }}>
                            <ListItemText
                              primary={c.comment}
                              secondary={new Date(c.createdAt).toLocaleString()}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VDJKush;
