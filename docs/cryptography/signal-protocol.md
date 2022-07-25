---
description: 音声通話やインスタント メッセージングでエンドツーエンドの暗号化を実現するための暗号プロトコル。
---

# Signal プロトコル

音声通話やインスタント メッセージングで[エンドツーエンドの暗号化](https://ja.wikipedia.org/wiki/エンドツーエンド暗号化)を実現するための[暗号プロトコル](https://en.wikipedia.org/wiki/Cryptographic_protocol)。

相手とリアルタイムにやり取りすることなく鍵共有を完了することができる[認証付き鍵共有](https://en.wikipedia.org/wiki/Authenticated_Key_Exchange)プロトコルである [X3DH 鍵合意プロトコル](/cryptography/x3dh-key-agreement-protocol)と、共有した共通鍵を使って安全にメッセージを暗号化して送受信するためのアルゴリズムである [Double Ratchet アルゴリズム](/cryptography/double-ratchet-algorithm)の総称。

## 参考文献

- Wikipedia contributors. "Signal protocol". _Wikipedia_. https://en.wikipedia.org/wiki/Signal_Protocol
- K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). "A formal security analysis of the signal messaging protocol". _Journal of Cryptology_, 33(4), pp. 1914&ndash;1983. https://doi.org/10.1007/s00145-020-09360-1
