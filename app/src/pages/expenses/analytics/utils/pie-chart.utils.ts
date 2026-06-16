import { useSyncExternalStore } from "react";

const SMALL_SCREEN_BREAKPOINT = 640;

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getIsSmallScreen() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < SMALL_SCREEN_BREAKPOINT;
}

export function useIsSmallScreen() {
  return useSyncExternalStore(subscribeToResize, getIsSmallScreen, getIsSmallScreen);
}

type PieChartDimensions = {
  height: number;
  outerRadius: number;
  innerRadius: number;
  centerY: string;
  legendWrapperStyle: {
    color: string;
    paddingTop: number;
    maxHeight?: number;
    overflowY?: "auto";
    overflowX?: "hidden";
    fontSize?: number;
  };
};

export function getPieChartDimensions(isSmallScreen: boolean, itemCount: number): PieChartDimensions {
  const needsScrollableLegend = isSmallScreen || itemCount > 6;

  return {
    height: isSmallScreen ? 280 : 380,
    outerRadius: isSmallScreen ? 72 : 110,
    innerRadius: isSmallScreen ? 36 : 50,
    centerY: isSmallScreen ? "42%" : "45%",
    legendWrapperStyle: needsScrollableLegend
      ? {
          color: "#cbd5e1",
          paddingTop: 8,
          maxHeight: isSmallScreen ? 96 : 120,
          overflowY: "auto",
          overflowX: "hidden",
          fontSize: isSmallScreen ? 11 : 12,
        }
      : { color: "#cbd5e1", paddingTop: 16 },
  };
}
