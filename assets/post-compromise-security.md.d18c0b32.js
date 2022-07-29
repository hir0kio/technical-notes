import{_ as e,c as t,o as r,a as o}from"./app.0a7d2607.js";const l=JSON.parse('{"title":"Post-compromise security","description":"\u6697\u53F7\u9375\u3092\u81EA\u52D5\u7684\u306B\u4EA4\u63DB\u3059\u308B\u4ED5\u7D44\u307F\u306B\u3088\u308A\u3001\u6697\u53F7\u9375\u304C\u5371\u6B86\u5316\u3057\u3066\u3082\u305D\u306E\u9375\u304C\u3044\u305A\u308C\u6B63\u5E38\u306A\u9375\u3068\u7F6E\u304D\u63DB\u3048\u3089\u308C\u308B\u3053\u3068\u3067\u3001\u30D7\u30ED\u30C8\u30B3\u30EB\u304C\u81EA\u5DF1\u4FEE\u5FA9\u3057\u3001\u5371\u6B86\u5316\u5F8C\u306E\u901A\u4FE1\u306E\u6A5F\u5BC6\u6027\u3092\u4FDD\u3064\u6697\u53F7\u30D7\u30ED\u30C8\u30B3\u30EB\u306E\u6A5F\u80FD\u3002future secrecy\u3002","frontmatter":{"description":"\u6697\u53F7\u9375\u3092\u81EA\u52D5\u7684\u306B\u4EA4\u63DB\u3059\u308B\u4ED5\u7D44\u307F\u306B\u3088\u308A\u3001\u6697\u53F7\u9375\u304C\u5371\u6B86\u5316\u3057\u3066\u3082\u305D\u306E\u9375\u304C\u3044\u305A\u308C\u6B63\u5E38\u306A\u9375\u3068\u7F6E\u304D\u63DB\u3048\u3089\u308C\u308B\u3053\u3068\u3067\u3001\u30D7\u30ED\u30C8\u30B3\u30EB\u304C\u81EA\u5DF1\u4FEE\u5FA9\u3057\u3001\u5371\u6B86\u5316\u5F8C\u306E\u901A\u4FE1\u306E\u6A5F\u5BC6\u6027\u3092\u4FDD\u3064\u6697\u53F7\u30D7\u30ED\u30C8\u30B3\u30EB\u306E\u6A5F\u80FD\u3002future secrecy\u3002"},"headers":[],"relativePath":"post-compromise-security.md","lastUpdated":1659104594000}'),a={name:"post-compromise-security.md"},s=o('<h1 id="post-compromise-security" tabindex="-1">Post-compromise security <a class="header-anchor" href="#post-compromise-security" aria-hidden="true">#</a></h1><p>\u6697\u53F7\u9375\u3092\u81EA\u52D5\u7684\u306B\u4EA4\u63DB\u3059\u308B\u4ED5\u7D44\u307F\u306B\u3088\u308A\u3001\u6697\u53F7\u9375\u304C\u5371\u6B86\u5316\u3057\u3066\u3082\u305D\u306E\u9375\u304C\u3044\u305A\u308C\u6B63\u5E38\u306A\u9375\u3068\u7F6E\u304D\u63DB\u3048\u3089\u308C\u308B\u3053\u3068\u3067\u3001\u30D7\u30ED\u30C8\u30B3\u30EB\u304C\u81EA\u5DF1\u4FEE\u5FA9\u3057\u3001\u5371\u6B86\u5316\u5F8C\u306E\u901A\u4FE1\u306E\u6A5F\u5BC6\u6027\u3092\u4FDD\u3064\u6697\u53F7\u30D7\u30ED\u30C8\u30B3\u30EB\u306E\u6A5F\u80FD\u3002future secrecy\u3002</p><p><a href="./double-ratchet-algorithm.html">Double Ratchet \u30A2\u30EB\u30B4\u30EA\u30BA\u30E0</a>\u3067\u306F\u3001Alice \u3068 Bob \u304C\u305D\u308C\u305E\u308C\u77ED\u671F\u9375\uFF08<a href="./double-ratchet-algorithm.html#\u30E9\u30C1\u30A7\u30C3\u30C8\u9375">\u30E9\u30C1\u30A7\u30C3\u30C8\u9375</a>\uFF09\u3092\u4FDD\u6301\u3057\u3066\u3001\u76F8\u624B\u306E\u30E1\u30C3\u30BB\u30FC\u30B8\u306B\u8FD4\u4FE1\u3059\u308B\u3068\u304D\u306B\u81EA\u5206\u306E\u77ED\u671F\u9375\u3092\u66F4\u65B0\u3057\u3001\u81EA\u5206\u306E\u65B0\u3057\u3044\u77ED\u671F\u9375\u3068\u76F8\u624B\u306E\u65E2\u5B58\u306E\u77ED\u671F\u9375\u3067<a href="https://ja.wikipedia.org/wiki/%E6%A5%95%E5%86%86%E6%9B%B2%E7%B7%9A%E3%83%87%E3%82%A3%E3%83%95%E3%82%A3%E3%83%BC%E3%83%BB%E3%83%98%E3%83%AB%E3%83%9E%E3%83%B3%E9%8D%B5%E5%85%B1%E6%9C%89" target="_blank" rel="noopener noreferrer">\u6955\u5186\u66F2\u7DDA\u30C7\u30A3\u30D5\u30A3\u30FC\u30FB\u30D8\u30EB\u30DE\u30F3\u9375\u5171\u6709</a>\u3092\u884C\u3063\u3066\u5F97\u3089\u308C\u305F\u79D8\u5BC6\u306E\u5024\u3092\u3082\u3068\u306B\u6697\u53F7\u9375\u3092\u66F4\u65B0\u3059\u308B\u3002\u3053\u308C\u306B\u3088\u308A\u3001\u3042\u308B\u6642\u70B9\u3067\u6697\u53F7\u9375\u304C\u5371\u6B86\u5316\u3057\u3066\u3082\u3001\u305D\u306E\u6697\u53F7\u9375\u304C\u66F4\u65B0\u3055\u308C\u305F\u3042\u3068\u306E\u901A\u4FE1\u306E\u6A5F\u5BC6\u6027\u304C\u4FDD\u305F\u308C\u308B\u3002</p>',3),c=[s];function i(p,_,m,n,d,h){return r(),t("div",null,c)}var E=e(a,[["render",i]]);export{l as __pageData,E as default};
