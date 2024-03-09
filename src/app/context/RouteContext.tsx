"use client";

import { usePathname } from "next/navigation";
import { useSelectedLayoutSegment } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type IRouteContextProps = {
  previousRoute: string;
};

const defaultState: IRouteContextProps = {
  previousRoute: "/",
};

export const RouteContext = createContext<IRouteContextProps>(defaultState);

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const routeSegments = useSelectedLayoutSegment("auth");
  const [previousRoute, setPreviousRoute] = useState("/");

  useEffect(() => {
    if (routeSegments === "__DEFAULT__") {
      setPreviousRoute(pathname);
    }
  }, [routeSegments]);

  const routeContextValue: IRouteContextProps = {
    previousRoute,
  };

  return (
    <RouteContext.Provider value={routeContextValue}>
      {children}
    </RouteContext.Provider>
  );
};

export function useRouteContext() {
  return useContext(RouteContext);
}
