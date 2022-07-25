---
description: 鍵を自動的に交換することで、鍵が危殆化 compromise した場合に第三者による機密データへのアクセスを制限する仕組み。
---

# Post-compromise security

鍵を自動的に交換することで、鍵が危殆化 compromise した場合に第三者による機密データへのアクセスを制限する仕組み。

[Double Ratchet アルゴリズム](/cryptography/double-ratchet-algorithm)では、自動的に自分の[ラチェット鍵](/cryptography/double-ratchet-algorithm#ラチェット鍵)を更新し、自分の新しいラチェット鍵の秘密鍵と相手の既存のラチェット鍵の公開鍵で[楕円曲線ディフィー・ヘルマン鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行って得られた[秘密の値](/cryptography/double-ratchet-algorithm#dh-出力)をもとに[ルート チェーン](/cryptography/double-ratchet-algorithm#ルート-チェーン)を更新するため、ラチェット鍵が危殆化してもその後の通信の機密性が保たれる。
