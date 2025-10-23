import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "unblessed",
  tagline: "Modern, platform-agnostic terminal UI library",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://unblessed-docs.vercel.app",
  baseUrl: "/",

  organizationName: "vdeantoni",
  projectName: "unblessed",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/vdeantoni/unblessed/tree/main/apps/docs/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl:
            "https://github.com/vdeantoni/unblessed/tree/main/apps/docs/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/unblessed-social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "unblessed",
      logo: {
        alt: "unblessed Logo",
        src: "img/logo.svg",
        srcDark: "img/logo-dark.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          to: "/playground",
          label: "Playground",
          position: "left",
        },
        {
          href: "https://github.com/vdeantoni/unblessed",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.npmjs.com/package/@unblessed/core",
          label: "npm",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/installation",
            },
            {
              label: "API Reference",
              to: "/docs/api/screen",
            },
            {
              label: "Examples",
              to: "/docs/examples",
            },
          ],
        },
        {
          title: "Packages",
          items: [
            {
              label: "@unblessed/core",
              href: "https://www.npmjs.com/package/@unblessed/core",
            },
            {
              label: "@unblessed/node",
              href: "https://www.npmjs.com/package/@unblessed/node",
            },
            {
              label: "@unblessed/browser",
              href: "https://www.npmjs.com/package/@unblessed/browser",
            },
            {
              label: "@unblessed/blessed",
              href: "https://www.npmjs.com/package/@unblessed/blessed",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/vdeantoni/unblessed",
            },
            {
              label: "Issues",
              href: "https://github.com/vdeantoni/unblessed/issues",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vinicius De Antoni. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ["typescript", "javascript", "bash", "json"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
