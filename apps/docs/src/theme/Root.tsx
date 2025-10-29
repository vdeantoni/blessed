import React from "react";
import { initSentry } from "../sentry";

// Initialize Sentry on client side only
if (typeof window !== "undefined") {
  initSentry();
}

export default function Root({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
