---
description: あらかじめ合意した共通鍵を使って、二者間で暗号化されたメッセージを送受信するためのアルゴリズム。
---

# Double Ratchet アルゴリズム

あらかじめ合意した共通鍵を使って、二者間で暗号化されたメッセージを送受信するためのアルゴリズム。

## 特徴

### [前方秘匿性](https://ja.wikipedia.org/wiki/Forward_secrecy)

将来のある時点で鍵が危殆化しても、第三者は過去の通信をさかのぼって復号することができない。

### [post-compromise security](/cryptography/post-compromise-security)

将来のある時点で鍵が危殆化 compromise しても、その鍵はすぐに正常な鍵と置き換えられ、第三者はそれ以降の通信を復号することができない。

## 手順

Alice が Bob との間に秘密鍵を確立し、暗号化されたメッセージを送受信する例を解説する。

### ステップ 1: ルート鍵の合意

1. Alice と Bob は [X3DH 鍵合意プロトコル](/cryptography/x3dh-key-agreement-protocol)を使って共通鍵を確立する。この共通鍵を最初のルート鍵 root key として使う。

前方秘匿性のため、最初のルート鍵はそれぞれのセッションごとに固有である必要がある。

### ステップ 2: Alice から Bob へメッセージの送信

1. Alice は [ECC](https://ja.wikipedia.org/wiki/楕円曲線暗号) ラチェット鍵 ratchet key ペアを作成する。
2. Alice は自分のラチェット鍵と Bob の[前鍵](/cryptography/x3dh-key-agreement-protocol#前鍵)で [ECDH 鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行い、DH 出力を得る。
3. Alice は ルート鍵と DH 出力を [HKDF](https://en.wikipedia.org/wiki/HKDF) に入力し、新しいルート鍵と送信チェーン鍵 sending chain key を得る。
4. Alice は送信チェーン鍵を HKDF に入力し、新しい送信チェーン鍵とメッセージ鍵 message key を得る。
5. Alice はメッセージ鍵で自分のメッセージを暗号化する。
6. Alice は暗号化されたメッセージと自分のラチェット鍵を Bob に送信する。
7. さらにメッセージを送る場合は、ステップ 2.4 から 2.6 までを繰り返す。

新しいルート鍵やチェーン鍵を導出したあとは、前方秘匿性のため古い鍵をデバイスから削除すること。以下、あえて記載しない。

### ステップ 3: Alice からのメッセージの受信

1. Bob は Alice の暗号化されたメッセージとラチェット鍵を受け取る。
2. Bob は自分の前鍵と Alice のラチェット鍵で ECDH 鍵共有を行い、DH 出力を得る。
3. Bob はルート鍵と DH 出力を HKDF に入力し、新しいルート鍵と受信チェーン鍵 receiving chain key を得る。
4. Bob は受信チェーン鍵を HKDF に入力し、新しい受信チェーン鍵とメッセージ鍵を得る。
5. Bob はメッセージ鍵で Alice のメッセージを復号する。
6. Bob は Alice のすべてのメッセージを復号するまでステップ 3.4 から 3.5 までを繰り返す。

### ステップ 4: Bob から Alice へメッセージの送信

先ほど Alice から受け取ったメッセージに Bob が返信するとする。

1. Bob は新しい ECC ラチェット鍵ペアを作成する。
2. Bob は自分のラチェット鍵と Alice のラチェット鍵で ECDH 鍵共有を行い、DH 出力を得る。
3. Bob は ルート鍵と DH 出力を HKDF に入力し、新しいルート鍵と送信チェーン鍵を得る。
4. Bob は送信チェーン鍵を HKDF に入力し、新しい送信チェーン鍵とメッセージ鍵を得る。
5. Bob はメッセージ鍵で自分のメッセージを暗号化する。
6. Bob は暗号化されたメッセージと自分のラチェット鍵を Alice に送信する。
7. さらにメッセージを送る場合は、ステップ 4.4 から 4.6 までを繰り返す。

### ステップ 5: Bob からのメッセージの受信

1. Alice は Bob の暗号化されたメッセージとラチェット鍵を受け取る。
2. Alice は自分のラチェット鍵と Bob のラチェット鍵で ECDH 鍵共有を行い、DH 出力を得る。
3. Alice はルート鍵と DH 出力を HKDF に入力し、新しいルート鍵と受信チェーン鍵を得る。
4. Alice は受信チェーン鍵を HKDF に入力し、新しい受信チェーン鍵とメッセージ鍵を得る。
5. Alice はメッセージ鍵で Bob のメッセージを復号する。
6. Alice は Bob のすべてのメッセージを復号するまでステップ 5.4 から 5.5 までを繰り返す。

以下、ステップ 2 から 5 までを繰り返す。（ただし、ステップ 2 と 3 で「Bob の前鍵」「自分の前鍵」とあるところはそれぞれ「Bob のラチェット鍵」「自分のラチェット鍵」と読み替える。）

## 参考文献

- M. Marlinspike, T. Perrin (2016). "The Double Ratchet Algorithm". _Signal Foundation_. https://signal.org/docs/specifications/doubleratchet/
- Wikipedia contributors. "Signal Protocol". _Wikipedia_. https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm
- K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). "A formal security analysis of the signal messaging protocol". _Journal of Cryptology_, 33(4), pp. 1914&ndash;1983. https://doi.org/10.1007/s00145-020-09360-1
