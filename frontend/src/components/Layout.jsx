import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { GetNavigation } from "./GetNavigation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Layout() {
  const theme = createTheme({
    cssVariables: true,
    palette: {
      mode: "light",
      primary: {
        main: "#0A0A0A",
        light: "#404040",
        dark: "#000000",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#FAFAFA",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#0A0A0A",
        secondary: "#6B6B6B",
      },
      divider: "#E5E5E5",
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
      h6: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            color: "#0A0A0A",
            boxShadow: "none",
            borderBottom: "1px solid #E5E5E5",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid #E5E5E5",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 2,
            "&.Mui-selected": {
              backgroundColor: "#F0F0F0",
              boxShadow: "inset 3px 0 0 #0A0A0A",
              "& .MuiListItemIcon-root": { color: "#0A0A0A" },
              "& .MuiListItemText-primary": { fontWeight: 600 },
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#E5E5E5",
            },
            "&:hover": { backgroundColor: "#F0F0F0" },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: { color: "#6B6B6B", minWidth: 36 },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: { fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", color: "#0A0A0A" },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: "#E5E5E5" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999 },
        },
      },
    },
  });
  const NAVIGATION = GetNavigation();

  const location = useLocation();
  const navigate = useNavigate();

  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };

  return (
    <AppProvider
      theme={theme}
      navigation={NAVIGATION}
      router={router}
      branding={{
        title: "CampusCart",
        logo: <></>,
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Layout;
