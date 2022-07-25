import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/technical-notes/",
  description: "暗号理論に関するノートを公開しています。",
  head: [
    [
      "link",
      {
        rel: "license",
        href: "https://github.com/hir0kio/technical-notes/blob/main/LICENSE",
      },
    ],
  ],
  lang: "ja",
  themeConfig: {
    editLink: {
      text: "このページを編集",
      pattern:
        "https://github.com/hir0kio/technical-notes/edit/main/docs/:path",
    },
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
    sidebar: {
      "/": [
        {
          text: "暗号理論",
          items: [
            {
              text: "目次",
              link: "/",
            },
            {
              text: "Post-compromise security",
              link: "/cryptography/post-compromise-security",
            },
            {
              text: "Puncturable encryption",
              link: "/cryptography/puncturable-encryption",
            },
            {
              text: "Signal プロトコル",
              link: "/cryptography/signal-protocol",
            },
            {
              text: "Double Ratchet アルゴリズム",
              link: "/cryptography/double-ratchet-algorithm",
            },
            {
              text: "X3DH 鍵合意プロトコル",
              link: "/cryptography/x3dh-key-agreement-protocol",
            },
            {
              text: "落とし戸付き一方向性関数",
              link: "/cryptography/trapdoor-one-way-function",
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
