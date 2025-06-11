import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import SvgIcon from "@mui/material/SvgIcon";

const TikTokIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M9 3v12.5a2.5 2.5 0 1 1-2.5-2.5h0V9.5A6 6 0 0 0 9 21a6 6 0 0 0 6-6V8.83a6.02 6.02 0 0 0 3 0V6.41a4.978 4.978 0 0 1-3-1.41V3H9z" />
  </SvgIcon>
);

const APPBAR_HEIGHT = 56; // standard Material-UI AppBar height

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: "VDJKush", path: "/vdjkush" },
    { label: "Mixes", path: "/mixes" },
    { label: "Events", path: "/events" },
    { label: "Services", path: "/services" },
    { label: "Archive", path: "/archive" },
    { label: "Vibe", path: "/vibe" },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNavigation = (item) => {
    navigate(item.path);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url(/kush.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        overflowX: "hidden",
      }}
    >
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "black", height: APPBAR_HEIGHT }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "flex-end",
            height: APPBAR_HEIGHT,
            px: 2,
            gap: 1.5,
          }}
        >
          {/* Logo on the far left */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              src="/Leonardo_Phoenix_10_a_stunning_cursive_logo_with_an_italicized_0-removebg-preview.png"
              alt="VDJ Kush Logo"
              style={{ height: 40, marginRight: 16 }}
            />
          </Box>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => handleNavigation(item)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                sx={{ minWidth: 80 }}
                onClick={() => handleNavigation(item)}
              >
                {item.label}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          paddingTop: `${APPBAR_HEIGHT}px`, // space for top bar
          paddingBottom: `${APPBAR_HEIGHT}px`, // space for bottom bar
          height: `calc(100vh - ${APPBAR_HEIGHT * 2}px)`, // fill space between appbars
        }}
      >
        <Outlet />
      </Box>

      {/* Bottom AppBar with social icons */}
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "black",
          height: APPBAR_HEIGHT,
          py: 0,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "center",
            gap: 2,
            height: APPBAR_HEIGHT,
            flexWrap: "wrap",
            px: 2,
          }}
        >
          <IconButton
            color="inherit"
            component="a"
            href="https://www.facebook.com/hockinsrobin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://youtube.com/@vdjkush254?si=UCJCzmNTeVn-VgXs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://wa.me/message/NGXICLXIBRDOP1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.tiktok.com/@vdjkush?_t=ZM-8wzAcC2hulk&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTokIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Layout;
