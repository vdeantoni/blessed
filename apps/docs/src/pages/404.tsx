import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

export default function NotFound(): ReactNode {
  return (
    <Layout
      title="404: Page Not Found"
      description="The page you're looking for doesn't exist."
    >
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 60px - 80px)",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          {/* Terminal-style 404 */}
          <pre
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "var(--ifm-color-primary)",
              fontWeight: "bold",
              marginBottom: "2rem",
              fontFamily: "var(--ifm-font-family-monospace)",
              lineHeight: 1.2,
            }}
          >
            {`┌─────────────────┐
│   ERROR: 404    │
│  Page Not Found │
└─────────────────┘`}
          </pre>

          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              marginBottom: "1rem",
            }}
          >
            The page you're looking for doesn't exist
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
              marginBottom: "2rem",
              color: "var(--ifm-color-secondary-darkest)",
            }}
          >
            The widget you're trying to render can't be found. It might have
            been moved or deleted.
          </p>

          {/* Quick Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <Link
              to="/"
              className="button button--primary button--lg"
              style={{
                minWidth: "200px",
              }}
            >
              Go to Home
            </Link>
            <Link
              to="/docs/getting-started/introduction"
              className="button button--secondary button--lg"
              style={{
                minWidth: "200px",
              }}
            >
              Read the Docs
            </Link>
          </div>

          {/* Popular Pages */}
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "var(--ifm-background-surface-color)",
              borderRadius: "8px",
              border: "1px solid var(--ifm-color-emphasis-200)",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontSize: "1.125rem" }}>
              Popular Pages
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "0.5rem",
              }}
            >
              <li>
                <Link to="/docs/getting-started/quick-start">
                  → Quick Start Guide
                </Link>
              </li>
              <li>
                <Link to="/docs/getting-started/migration-from-blessed">
                  → Migrating from blessed
                </Link>
              </li>
              <li>
                <Link to="/docs/api/generated/widgets.screen.Class.Screen">
                  → API Reference
                </Link>
              </li>
              <li>
                <Link to="/docs/advanced/testing">→ Testing Guide</Link>
              </li>
              <li>
                <Link to="/docs/faq">→ FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Search Tip */}
          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.875rem",
              color: "var(--ifm-color-secondary-dark)",
            }}
          >
            Try using the search bar (Ctrl/Cmd + K) to find what you're looking
            for
          </p>
        </div>
      </main>
    </Layout>
  );
}
