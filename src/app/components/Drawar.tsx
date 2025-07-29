"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

import cloude from "../images/cloud.png";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}

interface INavPages {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface ISidebarPages {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navPages: INavPages[] = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "User", path: "/login", icon: <PersonIcon /> },
  { name: "Article", path: "/article", icon: <ArticleOutlinedIcon /> },
  { name: "About", path: "/about", icon: <InfoIcon /> },
];

const sidebarPages: ISidebarPages[] = [
  { name: "Articles", path: "/admindashboard/articles", icon: <ArticleOutlinedIcon /> },
  { name: "Comments", path: "/admindashboard/comments", icon: <MarkUnreadChatAltOutlinedIcon /> },
];

export default function AdminLayout(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DashboardIcon color="primary" />
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {sidebarPages.map((page, index) => (
          <ListItem key={index} disablePadding>
            <Link href={page.path} style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'rgb(59 130 246)', // blue-500
        }}
      >
        <Toolbar>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo - only show on mobile when sidebar is closed */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Image
              src={cloude}
              alt="logo"
              width={32}
              height={32}
              style={{ borderRadius: '50%' }}
            />
            <Typography variant="h6" noWrap component="div">
              Cloude
              <BiotechOutlinedIcon sx={{ ml: 0.5 }} fontSize="inherit" />
              Hosting
            </Typography>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 1 }}>
            {navPages.map((page) => (
              <Link
                key={page.name}
                href={page.path}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    '&:hover': { color: 'rgb(252 211 77)' }, // amber-300
                    transition: 'color 0.2s',
                  }}
                >
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* Auth buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "4px",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "white",
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "4px",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "white",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="admin navigation"
      >
        {/* Mobile drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* This creates space for the fixed AppBar */}
        {children}
      </Box>
    </Box>
  );
}