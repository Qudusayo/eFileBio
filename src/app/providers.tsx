"use client";

import { NextUIProvider } from "@nextui-org/react";
import { RouteProvider } from "./context/RouteContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RouteProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </RouteProvider>
  );
}
