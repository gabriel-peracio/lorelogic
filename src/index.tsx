import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./App";
import { RootRoute, Route, Router, RouterProvider } from "@tanstack/react-router";
import { SettingsRoute } from "./Routes/SettingsRoute/SettingsRoute";
import { KeybindsRoute } from "Routes/KeybindsRoute/KeybindsRoute";
import { Prompts } from "Components/Prompt/PromptsStore";
import { TelemetryRoute } from "Routes/TelemetryRoute/TelemetryRoute";
import { ProvidersRoute } from "Routes/ProvidersRoute/ProvidersRoute";

export const AppState = createContext({});

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return <App />;
  },
});

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "settings",
  component: function Settings() {
    return <SettingsRoute />;
  },
});

const keybindsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "settings/keybinds",
  component: function Keybinds() {
    return <KeybindsRoute />;
  },
});

const templatesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "templates",
  component: function Templates() {
    return <KeybindsRoute />;
  },
});

const telemetryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "telemetry",
  component: function Telemetry() {
    return <TelemetryRoute />;
  },
});

const providersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "providers",
  component: function Providers() {
    return <ProvidersRoute />;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, settingsRoute, keybindsRoute, telemetryRoute, providersRoute]);
const router = new Router({ routeTree });

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    <RouterProvider router={router} />
    <Prompts />
  </>,
);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
