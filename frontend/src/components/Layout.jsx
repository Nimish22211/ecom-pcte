import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
import { GetNavigation } from "./GetNavigation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Layout() {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1d39c7",
        light: "#608bfa",
        dark: "#162456",
      },
      background: {
        default: "#f8fafc",
      },
    },
    shape: {
      borderRadius: 10,
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
      theme={lightTheme}
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
