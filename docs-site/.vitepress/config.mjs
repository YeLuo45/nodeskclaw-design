import { defineConfig } from "vitepress";

export default defineConfig({
  title: "NoDeskClaw Design",
  description: "NoDeskClaw DeskClaw 实例可视化管理系统设计文档",
  base: "/nodeskclaw-design/",
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#6366f1" }],
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Architecture", link: "/architecture" },
      { text: "Backend", link: "/backend" },
      { text: "Frontend", link: "/frontend" },
      { text: "Database", link: "/database" },
      { text: "API", link: "/api" },
      { text: "Deployment", link: "/deployment" },
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Home", link: "/" },
          { text: "Architecture", link: "/architecture" },
          { text: "Tech Stack", link: "/tech-stack" },
        ],
      },
      {
        text: "Backend",
        items: [
          { text: "Overview", link: "/backend" },
          { text: "Data Models", link: "/data-models" },
          { text: "Auth", link: "/auth" },
        ],
      },
      {
        text: "Frontend",
        items: [
          { text: "Portal", link: "/frontend" },
          { text: "Admin", link: "/admin" },
        ],
      },
      {
        text: "Infrastructure",
        items: [
          { text: "Database", link: "/database" },
          { text: "Deployment", link: "/deployment" },
          { text: "Docker", link: "/docker" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Blackboard API", link: "/api-blackboard" },
          { text: "Instance API", link: "/api-instance" },
          { text: "Topology API", link: "/api-topology" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/nodeskclawnl/nodeskclaw" },
    ],
  },
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
  lastUpdated: true,
});
