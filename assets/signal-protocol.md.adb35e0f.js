import{_ as e,c as r,o as t,a}from"./app.0a7d2607.js";const m=JSON.parse('{"title":"Signal \u30D7\u30ED\u30C8\u30B3\u30EB","description":"\u975E\u540C\u671F\u7684\u306A\u30A4\u30F3\u30B9\u30BF\u30F3\u30C8 \u30E1\u30C3\u30BB\u30FC\u30B8\u30F3\u30B0\u3067\u30A8\u30F3\u30C9\u30C4\u30FC\u30A8\u30F3\u30C9\u306E\u6697\u53F7\u5316\u3092\u5B9F\u73FE\u3059\u308B\u305F\u3081\u306E\u6697\u53F7\u30D7\u30ED\u30C8\u30B3\u30EB\u3002","frontmatter":{"description":"\u975E\u540C\u671F\u7684\u306A\u30A4\u30F3\u30B9\u30BF\u30F3\u30C8 \u30E1\u30C3\u30BB\u30FC\u30B8\u30F3\u30B0\u3067\u30A8\u30F3\u30C9\u30C4\u30FC\u30A8\u30F3\u30C9\u306E\u6697\u53F7\u5316\u3092\u5B9F\u73FE\u3059\u308B\u305F\u3081\u306E\u6697\u53F7\u30D7\u30ED\u30C8\u30B3\u30EB\u3002"},"headers":[{"level":2,"title":"\u53C2\u8003\u6587\u732E","slug":"\u53C2\u8003\u6587\u732E"}],"relativePath":"signal-protocol.md","lastUpdated":1659104594000}'),o={name:"signal-protocol.md"},i=a('<h1 id="signal-\u30D7\u30ED\u30C8\u30B3\u30EB" tabindex="-1">Signal \u30D7\u30ED\u30C8\u30B3\u30EB <a class="header-anchor" href="#signal-\u30D7\u30ED\u30C8\u30B3\u30EB" aria-hidden="true">#</a></h1><p>\u975E\u540C\u671F\u7684\u306A\u30A4\u30F3\u30B9\u30BF\u30F3\u30C8 \u30E1\u30C3\u30BB\u30FC\u30B8\u30F3\u30B0\u3067<a href="https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%B3%E3%83%89%E3%83%84%E3%83%BC%E3%82%A8%E3%83%B3%E3%83%89%E6%9A%97%E5%8F%B7%E5%8C%96" target="_blank" rel="noopener noreferrer">\u30A8\u30F3\u30C9\u30C4\u30FC\u30A8\u30F3\u30C9\u306E\u6697\u53F7\u5316</a>\u3092\u5B9F\u73FE\u3059\u308B\u305F\u3081\u306E<a href="https://en.wikipedia.org/wiki/Cryptographic_protocol" target="_blank" rel="noopener noreferrer">\u6697\u53F7\u30D7\u30ED\u30C8\u30B3\u30EB</a>\u3002</p><p>\u76F8\u624B\u3068\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u306B\u901A\u4FE1\u3059\u308B\u3053\u3068\u306A\u304F\u79D8\u5BC6\u306E\u5024\u3092\u5171\u6709\u3067\u304D\u308B<a href="https://en.wikipedia.org/wiki/Authenticated_Key_Exchange" target="_blank" rel="noopener noreferrer">\u8A8D\u8A3C\u4ED8\u304D\u9375\u5171\u6709</a>\u30D7\u30ED\u30C8\u30B3\u30EB\u3067\u3042\u308B <a href="./x3dh-key-agreement-protocol.html">X3DH \u9375\u5408\u610F\u30D7\u30ED\u30C8\u30B3\u30EB</a>\u3068\u3001\u5171\u6709\u3057\u305F\u79D8\u5BC6\u306E\u5024\u3092\u3082\u3068\u306B\u5B89\u5168\u306B\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u6697\u53F7\u5316\u3057\u3066\u9001\u53D7\u4FE1\u3059\u308B\u305F\u3081\u306E\u30A2\u30EB\u30B4\u30EA\u30BA\u30E0\u3067\u3042\u308B <a href="./double-ratchet-algorithm.html">Double Ratchet \u30A2\u30EB\u30B4\u30EA\u30BA\u30E0</a>\u306E\u7DCF\u79F0\u3067\u3001\u4E3B\u306B\u6B21\u306E 3 \u6BB5\u968E\u304B\u3089\u69CB\u6210\u3055\u308C\u308B\u3002</p><ol><li><strong>\u521D\u671F\u30CF\u30F3\u30C9\u30B7\u30A7\u30A4\u30AF</strong>\u3002<a href="./x3dh-key-agreement-protocol.html">X3DH \u9375\u5171\u6709\u30D7\u30ED\u30C8\u30B3\u30EB</a>\u3092\u4F7F\u3063\u3066<a href="./double-ratchet-algorithm.html#\u30EB\u30FC\u30C8\u9375">\u30EB\u30FC\u30C8\u9375</a>\u3092\u5171\u6709\u3059\u308B\u3002</li><li><strong><a href="./double-ratchet-algorithm.html#\u975E\u5BFE\u79F0\u30E9\u30C1\u30A7\u30C3\u30C8">\u975E\u5BFE\u79F0\u30E9\u30C1\u30A7\u30C3\u30C8</a> \u30B9\u30C6\u30FC\u30B8</strong>\u3002\u30EB\u30FC\u30C8\u9375\u3068 Alice \u3068 Bob \u306E<a href="./double-ratchet-algorithm.html#\u30E9\u30C1\u30A7\u30C3\u30C8\u9375">\u30E9\u30C1\u30A7\u30C3\u30C8\u9375</a>\u304B\u3089\u5BFE\u5FDC\u3059\u308B<a href="./double-ratchet-algorithm.html#\u30C1\u30A7\u30FC\u30F3\u9375">\u30C1\u30A7\u30FC\u30F3\u9375</a>\u3092\u751F\u6210\u3059\u308B\u3002</li><li><strong><a href="./double-ratchet-algorithm.html#\u5BFE\u79F0\u30E9\u30C1\u30A7\u30C3\u30C8">\u5BFE\u79F0\u30E9\u30C1\u30A7\u30C3\u30C8</a> \u30B9\u30C6\u30FC\u30B8</strong>\u3002\u30C1\u30A7\u30FC\u30F3\u9375\u304B\u3089\u5BFE\u5FDC\u3059\u308B<a href="./double-ratchet-algorithm.html#\u30E1\u30C3\u30BB\u30FC\u30B8\u9375">\u30E1\u30C3\u30BB\u30FC\u30B8\u9375</a>\u3092\u751F\u6210\u3059\u308B\u3002</li></ol><h2 id="\u53C2\u8003\u6587\u732E" tabindex="-1">\u53C2\u8003\u6587\u732E <a class="header-anchor" href="#\u53C2\u8003\u6587\u732E" aria-hidden="true">#</a></h2><ul><li>Wikipedia contributors. &quot;Signal protocol&quot;. <em>Wikipedia</em>. <a href="https://en.wikipedia.org/wiki/Signal_Protocol" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Signal_Protocol</a></li><li>K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). &quot;A formal security analysis of the signal messaging protocol&quot;. <em>Journal of Cryptology</em>, 33(4), pp. 1914\u20131983. <a href="https://doi.org/10.1007/s00145-020-09360-1" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/s00145-020-09360-1</a></li></ul>',6),l=[i];function n(h,s,p,c,g,d){return t(),r("div",null,l)}var f=e(o,[["render",n]]);export{m as __pageData,f as default};