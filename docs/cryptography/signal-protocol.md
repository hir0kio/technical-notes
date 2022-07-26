---
description: 非同期的な環境におけるインスタント メッセージングでエンドツーエンドの暗号化を実現するための暗号プロトコル。
---

# Signal プロトコル

非同期的な環境におけるインスタント メッセージングで[エンドツーエンドの暗号化](https://ja.wikipedia.org/wiki/エンドツーエンド暗号化)を実現するための[暗号プロトコル](https://en.wikipedia.org/wiki/Cryptographic_protocol)。

相手とリアルタイムにやり取りすることなく鍵共有を完了することができる[認証付き鍵共有](https://en.wikipedia.org/wiki/Authenticated_Key_Exchange)プロトコルである [X3DH 鍵合意プロトコル](/cryptography/x3dh-key-agreement-protocol)と、共有した共通鍵を使って安全にメッセージを暗号化して送受信するためのアルゴリズムである [Double Ratchet アルゴリズム](/cryptography/double-ratchet-algorithm)の総称で、主に次の 3 段階から構成される。

1. **初期ハンドシェイク**。[X3DH 鍵共有プロトコル](/cryptography/x3dh-key-agreement-protocol)を使って秘密の「[ルート鍵](/cryptography/double-ratchet-algorithm#ルート鍵)」を共有する。
1. **[非対称ラチェット](/cryptography/double-ratchet-algorithm#非対称ラチェット) ステージ**。「[ルート鍵](/cryptography/double-ratchet-algorithm#ルート鍵)」と[楕円曲線ディフィー・ヘルマン鍵共有](https://ja.wikipedia.org/wiki//cryptography/double-ratchet-algorithm)を使って共有した秘密の値から forward-secret かつ future-secret な「[チェーン鍵](/cryptography/double-ratchet-algorithm#チェーン鍵)」を作る。
1. **[対称ラチェット](/cryptography/double-ratchet-algorithm#対称ラチェット) ステージ**。鍵導出関数を使って、「[チェーン鍵](/cryptography/double-ratchet-algorithm#チェーン鍵)」から forward-secret な暗号化用の「[メッセージ鍵](/cryptography/double-ratchet-algorithm#メッセージ鍵)」を作る。

## 参考文献

- Wikipedia contributors. "Signal protocol". _Wikipedia_. https://en.wikipedia.org/wiki/Signal_Protocol
- K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). "A formal security analysis of the signal messaging protocol". _Journal of Cryptology_, 33(4), pp. 1914&ndash;1983. https://doi.org/10.1007/s00145-020-09360-1
