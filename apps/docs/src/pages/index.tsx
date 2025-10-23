import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

function LiveDemoSection() {
  return (
    <BrowserOnly
      fallback={
        <div
          style={{
            minHeight: "100svh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#a0a0a0",
          }}
        >
          Loading demo...
        </div>
      }
    >
      {() => {
        const LiveDemo = require("../components/LiveDemo").default;
        return <LiveDemo />;
      }}
    </BrowserOnly>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Modern, Platform-Agnostic Terminal UI Library"
      description="TypeScript-first terminal UI library. Run in Node.js and browsers. 100% blessed-compatible."
      noFooter={true}
    >
      <LiveDemoSection />
    </Layout>
  );
}
