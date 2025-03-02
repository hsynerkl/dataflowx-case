/* eslint-disable react-refresh/only-export-components */
import {
  createRootRoute,
  createRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import getCookieAsJson from "@/utils/getCookieAsJson";

import DashboardLayout from "./dashboard/layout";
import DashboardIndex from "./dashboard/index";
import ReactFlowPage from "./dashboard/react-flow";
import LoginPage from "./login";
import DataGridOne from "./dashboard/data-grid-one";
import DataGridTwo from "./dashboard/data-grid-two";

export const rootRoute = createRootRoute({
  beforeLoad: ({ location }) => {
    const authData = getCookieAsJson("auth") || {};
    const isLoggedIn = authData.isLoggedIn ?? false;

    if (location.pathname === "/") {
      throw redirect({ to: isLoggedIn ? "/dashboard" : "/login" });
    }
    if (location.pathname.startsWith("/dashboard") && !isLoggedIn) {
      throw redirect({ to: "/login" });
    }
    if (location.pathname === "/login" && isLoggedIn) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: function RootComponent() {
    return (
      <>
        <Outlet />
        <Toaster position="top-right" reverseOrder={false} />
      </>
    );
  },
});

export const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});

export const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "dashboard",
  component: DashboardLayout,
});

export const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/",
  component: DashboardIndex,
});

export const reactFlowRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "react-flow",
  component: ReactFlowPage,
});

export const dataGridOneRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "data-grid-one",
  component: DataGridOne,
});

export const dataGridTwoRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "data-grid-two",
  component: DataGridTwo,
});

export const routeTree = rootRoute.addChildren([
  LoginRoute,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    reactFlowRoute,
    dataGridOneRoute,
    dataGridTwoRoute,
  ]),
]);

export const Route = rootRoute;
