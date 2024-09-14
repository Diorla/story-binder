import React from "react";
import Top from "./top";
import BROWSER from "@/constants/BROWSER";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Top />
      <div style={{ height: 40 }} />
      <div
        style={{
          height: BROWSER.HEIGHT,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
