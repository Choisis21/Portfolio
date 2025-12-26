// src/pages/PerformancePage.jsx
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const PerformancePage = () => {
  const url = "https://chosen-akinnola.vercel.app"; // replace with your Vercel URL

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Vercel Speed Insights</h1>

      <h2 className="text-2xl font-semibold mb-2">Mobile</h2>
      <SpeedInsights url={url} strategy="mobile" />

      <h2 className="text-2xl font-semibold mt-8 mb-2">Desktop</h2>
      <SpeedInsights url={url} strategy="desktop" />
    </div>
  );
};
