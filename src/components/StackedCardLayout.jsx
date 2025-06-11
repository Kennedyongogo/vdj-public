import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import VDJKush from "./VDJKush";
import Mixes from "./Mixes";
import Events from "./Events";
import Vibe from "./Vibe";
import Services from "./Services";
import Archive from "./Archive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const components = {
  "/vdjkush": VDJKush,
  "/mixes": Mixes,
  "/events": Events,
  "/services": Services,
  "/archive": Archive,
  "/vibe": Vibe,
};

const titles = {
  "/vdjkush": "VDJKush",
  "/mixes": "Mixes",
  "/events": "Events",
  "/services": "Services",
  "/archive": "Archive",
  "/vibe": "Vibe",
};

// Define paths in the same order as the navbar
const paths = [
  "/vdjkush",
  "/mixes",
  "/events",
  "/services",
  "/archive",
  "/vibe",
];
const swipeConfidenceThreshold = 10000;

const StackedCardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  const CurrentComponent = components[currentPath];
  const title = titles[currentPath];
  const currentIndex = paths.indexOf(currentPath);

  const paginate = (direction) => {
    const newIndex = currentIndex + direction;
    console.log("Paginate called:", {
      direction,
      currentIndex,
      newIndex,
      paths,
    });
    if (newIndex < 0 || newIndex >= paths.length) return;
    navigate(paths[newIndex]);
  };

  const handleDragEnd = (_, info) => {
    const swipe = info.offset.x * info.velocity.x;
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Navigation props for the card component
  const navigationProps = {
    onNext: () => {
      console.log("onNext called, currentIndex:", currentIndex);
      paginate(1);
    },
    onPrev: () => {
      console.log("onPrev called, currentIndex:", currentIndex);
      paginate(-1);
    },
    hasNext: currentIndex < paths.length - 1,
    hasPrev: currentIndex > 0,
  };

  return (
    <div
      className="bg-black text-white"
      style={{
        height: "100%",
        width: "100%",
        minHeight: 0,
        minWidth: 0,
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flex: 1,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ x: 300, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -300, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col bg-gray-900 rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing"
          style={{
            width: "100%",
            maxWidth: "calc(100vw - 2rem)",
            height: "100%",
            minHeight: 0,
            boxSizing: "border-box",
            borderRadius: "1rem",
            boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
            background: "rgba(60, 60, 60, 0.7)",
            padding: 0,
            position: "relative",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Pass navigation props and dot info to the card component */}
            <CurrentComponent
              key={currentPath}
              {...navigationProps}
              paths={paths}
              currentPath={currentPath}
              navigate={navigate}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Progress dots removed from here */}
    </div>
  );
};

export default StackedCardLayout;
