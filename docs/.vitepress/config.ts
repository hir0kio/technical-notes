import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/technical-notes/",
  description: "技術ノートを公開しています。",
  head: [
    [
      "link",
      {
        rel: "license",
        href: "https://github.com/hir0kio/technical-notes/blob/main/LICENSE",
      },
    ],
    [
      "meta",
      {
        name: "referrer",
        content: "no-referrer",
      },
    ],
  ],
  lang: "ja",
  lastUpdated: true,
  themeConfig: {
    editLink: {
      text: "このページを編集",
      pattern:
        "https://github.com/hir0kio/technical-notes/edit/main/docs/:path",
    },
    lastUpdatedText: "最終更新",
    nav: [
      {
        text: "目次",
        link: "/",
      },
      {
        text: "編集履歴",
        link: "https://github.com/hir0kio/technical-notes/commits/main",
      },
      {
        text: "ライセンス",
        link: "https://github.com/hir0kio/technical-notes/blob/main/LICENSE",
      },
    ],
    outlineTitle: "目次",
    sidebar: {
      "/": [
        {
          text: "記事",
          items: [
            {
              text: "目次",
              link: "/",
            },
            {
              text: "Git のデータ構造",
              link: "/git",
            },
            {
              text: "Post-compromise security",
              link: "/post-compromise-security",
            },
            {
              text: "Puncturable encryption",
              link: "/puncturable-encryption",
            },
            {
              text: "Signal プロトコル",
              link: "/ignal-protocol",
            },
            {
              text: "Double Ratchet アルゴリズム",
              link: "/double-ratchet-algorithm",
            },
            {
              text: "X3DH 鍵合意プロトコル",
              link: "/x3dh-key-agreement-protocol",
            },
            {
              text: "落とし戸付き一方向性関数",
              link: "/trapdoor-one-way-function",
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/hir0kio",
      },
    ],
  },
  title: "Technical Notes",
});
