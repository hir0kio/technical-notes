---
description: 非同期的なインスタント メッセージングでエンドツーエンドの暗号化を実現するための暗号プロトコル。
---

# Signal プロトコル

非同期的なインスタント メッセージングで[エンドツーエンドの暗号化](https://ja.wikipedia.org/wiki/エンドツーエンド暗号化)を実現するための[暗号プロトコル](https://en.wikipedia.org/wiki/Cryptographic_protocol)。

相手とリアルタイムに通信することなく秘密の値を共有できる[認証付き鍵共有](https://en.wikipedia.org/wiki/Authenticated_Key_Exchange)プロトコルである [X3DH 鍵合意プロトコル](x3dh-key-agreement-protocol)と、共有した秘密の値をもとに安全にメッセージを暗号化して送受信するためのアルゴリズムである [Double Ratchet アルゴリズム](double-ratchet-algorithm)の総称で、主に次の 3 段階から構成される。

1. **初期ハンドシェイク**。[X3DH 鍵共有プロトコル](x3dh-key-agreement-protocol)を使って[ルート鍵](double-ratchet-algorithm#ルート鍵)を共有する。
1. **[非対称ラチェット](double-ratchet-algorithm#非対称ラチェット) ステージ**。ルート鍵と Alice と Bob の[ラチェット鍵](double-ratchet-algorithm#ラチェット鍵)から対応する[チェーン鍵](double-ratchet-algorithm#チェーン鍵)を生成する。
1. **[対称ラチェット](double-ratchet-algorithm#対称ラチェット) ステージ**。チェーン鍵から対応する[メッセージ鍵](double-ratchet-algorithm#メッセージ鍵)を生成する。

## 参考文献

- Wikipedia contributors. "Signal protocol". _Wikipedia_. https://en.wikipedia.org/wiki/Signal_Protocol
- K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). "A formal security analysis of the signal messaging protocol". _Journal of Cryptology_, 33(4), pp. 1914&ndash;1983. https://doi.org/10.1007/s00145-020-09360-1
