---
description: 暗号鍵を自動的に交換する仕組みがあるため、鍵が危殆化 compromise しても第三者による機密データへのアクセスが限定される状態のこと。
---

# Post-compromise security

暗号鍵を自動的に交換する仕組みがあるため、鍵が危殆化 compromise しても第三者による機密データへのアクセスが限定される状態のこと。

[Double Ratchet アルゴリズム](/cryptography/double-ratchet-algorithm)では、相手からの通信に応答するたびに自分の [ECC](https://ja.wikipedia.org/wiki/楕円曲線暗号) ラチェット鍵 ratchet key を更新し、自分の新しいラチェット鍵と相手のラチェット鍵との間で [ECDH 鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行って得られた秘密の値をもとに[送信チェーン鍵](/cryptography/double-ratchet-algorithm#用語)を作り直すため、ラチェット鍵が危殆化してもその後の通信の機密性が保たれる。
