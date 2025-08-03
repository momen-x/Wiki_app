"use client";
import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
  username: string;
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



const sidebarPages: ISidebarPages[] = [
  {
    name: "Articles",
    path: "/admindashboard/articles",
    icon: <ArticleOutlinedIcon />,
  },
  {
    name: "Comments",
    path: "/admindashboard/comments",
    icon: <MarkUnreadChatAltOutlinedIcon />,
  },
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
    <div >
      <Toolbar >
      <Link href={"/admindashboard"}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DashboardIcon color="primary" />
          
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Box>
      </Link>
      </Toolbar>
      <Divider />
      <List>
        {sidebarPages.map((page, index) => (
          <ListItem key={index} disablePadding>
            <Link
              href={page.path}
              style={{
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemButton>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
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
