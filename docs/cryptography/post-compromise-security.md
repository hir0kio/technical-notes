---
description: 鍵を自動的に交換することで、鍵が危殆化 compromise した場合に第三者による機密データへのアクセスを制限する仕組み。
---

# Post-compromise security

鍵を自動的に交換することで、鍵が危殆化 compromise した場合に第三者による機密データへのアクセスを制限する仕組み。

[Double Ratchet アルゴリズム](/cryptography/double-ratchet-algorithm)では、自動的に自分の[ラチェット鍵](/cryptography/double-ratchet-algorithm#ラチェット鍵)を更新し、自分の新しい[ラチェット鍵](/cryptography/double-ratchet-algorithm#ラチェット鍵)の秘密鍵と相手の既存の[ラチェット鍵](/cryptography/double-ratchet-algorithm#ラチェット鍵)の公開鍵で[楕円曲線ディフィー・ヘルマン鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行って得られた秘密の値をもとに[非対称ラチェット](/cryptography/double-ratchet-algorithm#非対称ラチェット)を更新するため、[ラチェット鍵](/cryptography/double-ratchet-algorithm#ラチェット鍵)が危殆化してもその後の通信の機密性が保たれる。
