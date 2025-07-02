"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
  DashboardCustomize,
} from "@mui/icons-material";
import Profile from "./Profile";
import SettingsPage from "./Settings";
import Reports from "./Reports";
import DefaultDashboard from "./DefaultDasboard";
import StudentList from "@layouts/comman/student/StudentList";

// Custom MUI theme for enhanced styling
const theme = createTheme({
  palette: {
    primary: {
      main: "#0AA8A7",
      dark: "#087876",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1A2027",
      secondary: "#4A5568",
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          margin: "4px 8px",
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "rgba(10, 168, 167, 0.1)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(10, 168, 167, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(10, 168, 167, 0.3)",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #0AA8A7 0%, #087876 100%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("overview");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (page) => {
    setActivePage(page);
    if (window.innerWidth < 600) {
      setIsSidebarOpen(false);
    }
  };

  const menuItems = [
    { name: "Dashboard", page: "dashboard", icon: <DashboardCustomize /> },
    {
      name: "Student",
      page: "student",
      icon: <PersonIcon />,
      hasChildren: true,
      children: [{ name: "StudentList", page: "student" }],
    },
    { name: "Settings", page: "settings", icon: <SettingsIcon /> },
    { name: "Reports", page: "reports", icon: <AssessmentIcon /> },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DefaultDashboard />;
      case "student":
        return <StudentList />;
      case "settings":
        return <SettingsPage />;
      case "reports":
        return <Reports />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}
            >
              {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              Dashboard
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" sx={{ color: "white" }}>
                Welcome, User
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => router.push("/api/logout")}
                title="Logout"
              >
                <LogoutIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: isSidebarOpen ? 240 : 60,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isSidebarOpen ? 240 : 60,
              boxSizing: "border-box",
              transition: "width 0.3s ease-in-out",
              overflowX: "hidden",
              overflowY: "hidden", // Prevent vertical scrollbar
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflowY: "hidden" }}>
            {" "}
            {/* Control overflow at parent level */}
            <List>
              {menuItems.map((item) => (
                <div key={item.name}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={activePage === item.page}
                      onClick={() => {
                        if (item.hasChildren) {
                          setSubmenuOpen(!submenuOpen);
                        } else {
                          handleNavigation(item.page);
                        }
                      }}
                      sx={{
                        minHeight: 48,
                        justifyContent: isSidebarOpen ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: isSidebarOpen ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{
                          opacity: isSidebarOpen ? 1 : 0, // Hide text when collapsed
                          transition: "opacity 0.2s",
                          "& .MuiTypography-root": {
                            fontSize: "0.875rem",
                          },
                        }}
                      />
                      {item.hasChildren && isSidebarOpen && (
                        <IconButton
                          size="small"
                          sx={{ ml: "auto", opacity: isSidebarOpen ? 1 : 0 }}
                        >
                          {submenuOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      )}
                    </ListItemButton>
                  </ListItem>
                  {item.hasChildren && submenuOpen && isSidebarOpen && (
                    <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child) => (
                          <ListItem
                            key={child.name}
                            disablePadding
                            sx={{ pl: 4 }}
                          >
                            <ListItemButton
                              selected={activePage === child.page}
                              onClick={() => handleNavigation(child.page)}
                              sx={{ minHeight: 48 }}
                            >
                              <ListItemText
                                primary={child.name}
                                primaryTypographyProps={{
                                  variant: "body2",
                                  color: "text.secondary",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            overflowY: "auto",
            height: "calc(100vh - 64px)",
            backgroundColor: theme.palette.background.default,
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
