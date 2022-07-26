---
description: あらかじめ共有した鍵を使って安全にメッセージを暗号化して送受信するためのアルゴリズム。鍵が危殆化しても、過去の通信が復号されるのを防ぎ、またアルゴリズムの自己修復機能によりその鍵が正常な鍵と交換されることで、前方秘匿性と post-compromise security を実現する。
---

# Double Ratchet アルゴリズム

あらかじめ共有した鍵を使って安全にメッセージを暗号化して送受信するためのアルゴリズム。鍵が危殆化しても、過去の通信が復号されるのを防ぎ、またアルゴリズムの自己修復機能によりその鍵が正常な鍵と交換されることで、[前方秘匿性](https://ja.wikipedia.org/wiki/Forward_secrecy)と [post-compromise security](/cryptography/post-compromise-security) を実現する。

## 定義

### DH(鍵ペア<sub>0</sub>, 鍵ペア<sub>1</sub>)

鍵ペア<sub>0</sub>の秘密鍵と鍵ペア<sub>1</sub>の公開鍵で[楕円曲線ディフィー・ヘルマン鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行って得られる秘密の値。

### HKDF(ikm<sub>0</sub>, ikm<sub>1</sub>, ikm<sub>2</sub>, ......)

1 個以上の入力[キー マテリアル](https://csrc.nist.gov/glossary/term/keying_material) ikm<sub>0</sub>, ikm<sub>1</sub>, ikm<sub>2</sub>, ...... を [HMAC-based extract-and-expand key derivation function](https://datatracker.ietf.org/doc/html/rfc5869)（HKDF）に入力して得られる 1 個以上の対称鍵。

対称鍵 &larr; HKDF(ikm)<br />
対称鍵 &larr; HKDF(ikm<sub>0</sub>, ikm<sub>1</sub>, ikm<sub>2</sub>)<br />
対称鍵<sub>0</sub>, 対称鍵<sub>1</sub>, 対称鍵<sub>2</sub> &larr; HKDF(ikm<sub>0</sub>, ikm<sub>1</sub>, ikm<sub>2</sub>)

### 非対称ラチェット

asymmetric ratchet<sup><a href="#ref-1">1</a></sup>

[ルート鍵](#ルート鍵)と Alice と Bob の[ラチェット鍵](#ラチェット鍵)から forward-secret な[チェーン鍵](#チェーン鍵)と次の[ルート鍵](#ルート鍵)を生成する関数。

DH 出力<sub>k</sub> &larr; DH(Alice のラチェット鍵, Bob のラチェット鍵)<br />
ルート鍵<sub>k+1</sub>, チェーン鍵<sub>k</sub> &larr; HKDF(ルート鍵<sub>k</sub>, DH 出力<sub>k</sub>)<br />

---

1. <span id="ref-1">ratchet は「爪車」（逆転止めの爪と組み合わせて、一方向だけに回転するように作られている歯車）の意。</span>

### ラチェット鍵

ratchet key

非対称鍵。[非対称ラチェット](#非対称ラチェット)を更新するときに更新する。

### ルート鍵

root key

ハンドシェイクの [X3DH 鍵共有](/cryptography/x3dh-key-agreement-protocol)の結果の値を 0 番目のルート鍵として[非対称ラチェット](#非対称ラチェット)に入力して得られる秘密の値。

### 対称ラチェット

symmetric ratchet

[チェーン鍵](#チェーン鍵)から forward-secret な[メッセージ鍵](#メッセージ鍵)と次の[チェーン鍵](#チェーン鍵)を生成する関数。

チェーン鍵<sub>k+1</sub>, メッセージ鍵<sub>k</sub> &larr; HKDF(チェーン鍵<sub>k</sub>)<br />

### チェーン鍵

chain key

[対称ラチェット](#対称ラチェット)に入力して[メッセージ鍵](#メッセージ鍵)を導出するのに使う秘密の値。

暗号化用の[メッセージ鍵](#メッセージ鍵)の導出に使うチェーン鍵は**送信チェーン鍵**、復号用の[メッセージ鍵](#メッセージ鍵)の導出に使うチェーン鍵は**受信チェーン鍵**と呼ばれる。

### メッセージ鍵

message key

メッセージを暗号化・復号するための対称鍵。[対称ラチェット](#対称ラチェット)から導出する。

それぞれのメッセージごとに固有であり、別のメッセージを同じメッセージ鍵で暗号化することはできない。

## 手順

### 役割

- **Alice**（イニシエーター）は、Bob にメッセージを送る。ただし、メッセージを送るとき Bob はオフラインである場合がある。
- **Bob**（レスポンダー）は、Alice からのメッセージを受け取って、Alice に返信する。ただし、返信を送るとき Alice はオフラインである場合がある。
- **サーバ**は、Alice と Bob が相手に送ったデータを一時的に保持し、対象者がオンラインに復帰するとこのデータを配送する。

### 1. Alice: ルート鍵の共有

Alice は [X3DH 鍵合意プロトコル](/cryptography/x3dh-key-agreement-protocol)を使って Bob と鍵を共有する。この鍵を[ルート鍵](#ルート鍵)<sub>0</sub>（最初の[ルート鍵](#ルート鍵)）とする。

### 2. Alice: メッセージの送信（Alice &rarr; Bob 宛）

Alice は Bob にメッセージを送信する。

1. Alice は新しい[ラチェット鍵](#ラチェット鍵)<sub>0</sub>を作成する。<br />
   Alice のラチェット鍵<sub>0</sub> &larr; 鍵生成()
1. Alice は[ルート鍵](#ルート鍵)<sub>0</sub>、自分の[ラチェット鍵](#ラチェット鍵)<sub>0</sub>、Bob の[前鍵](/cryptography/x3dh-key-agreement-protocol#前鍵)を[非対称ラチェット](#非対称ラチェット)に入力し、新しい[ルート鍵](#ルート鍵)<sub>1</sub>と送信[チェーン鍵](#チェーン鍵)<sub>0, 0</sub>を得る。<br />
   DH 出力<sub>0</sub> &larr; DH(Alice のラチェット鍵<sub>0</sub>, Bob の前鍵)<br />
   ルート鍵<sub>1</sub>, 送信チェーン鍵<sub>0, 0</sub> &larr; HKDF(ルート鍵<sub>0</sub>, DH 出力<sub>0</sub>)
1. Alice は送信[チェーン鍵](#チェーン鍵)<sub>0, 0</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい送信[チェーン鍵](#チェーン鍵)<sub>0, 1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>0, 0</sub>を得る。<br />
   送信チェーン鍵<sub>0, 1</sub>, メッセージ鍵<sub>0, 0</sub> &larr; HKDF(送信チェーン鍵<sub>0, 0</sub>)
1. [メッセージ鍵](#メッセージ鍵)<sub>0, 0</sub>でメッセージを暗号化する。
1. さらにメッセージを送る場合は、
   1. n=1 とする。
   1. Alice は送信[チェーン鍵](#チェーン鍵)<sub>0, n</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい送信[チェーン鍵](#チェーン鍵)<sub>0, n+1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>0, n</sub>を得る。<br />
      送信チェーン鍵<sub>0, n+1</sub>, メッセージ鍵<sub>0, n</sub> &larr; HKDF(送信チェーン鍵<sub>0, n</sub>)
   1. [メッセージ鍵](#メッセージ鍵)<sub>0, n</sub>でメッセージを暗号化する。
   1. n &larr; n+1。
   1. すべてのメッセージを暗号化するまで繰り返す。
1. 暗号化したメッセージと自分の[ラチェット鍵](#ラチェット鍵)をサーバに送信する。

[ルート鍵](#ルート鍵)または[チェーン鍵](#チェーン鍵)を更新したあとは、前方秘匿性のため古い鍵を削除する。

### 3. Bob: メッセージの受信（Alice &rarr; Bob 宛）

1. Bob は Alice の暗号化されたメッセージと[ラチェット鍵](#ラチェット鍵)をサーバから受け取る。
1. Bob は[ルート鍵](#ルート鍵)<sub>0</sub>、自分の[前鍵](/cryptography/x3dh-key-agreement-protocol#前鍵)、Alice の[ラチェット鍵](#ラチェット鍵)<sub>0</sub>を[非対称ラチェット](#非対称ラチェット)に入力し、[ルート鍵](#ルート鍵)<sub>1</sub>と受信[チェーン鍵](#チェーン鍵)<sub>0, 0</sub>を得る。<br />
   DH 出力<sub>0</sub> &larr; DH(Bob の前鍵, Alice のラチェット鍵<sub>0</sub>)<br />
   ルート鍵<sub>1</sub>, 受信チェーン鍵<sub>0, 0</sub> &larr; HKDF(ルート鍵<sub>0</sub>, DH 出力<sub>0</sub>)
1. Bob は受信[チェーン鍵](#チェーン鍵)<sub>0, 0</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい受信[チェーン鍵](#チェーン鍵)<sub>0, 1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>0, 0</sub>を得る。<br />
   受信チェーン鍵<sub>0, 1</sub>, メッセージ鍵<sub>0, 0</sub> &larr; HKDF(受信チェーン鍵<sub>0, 0</sub>)
1. [メッセージ鍵](#メッセージ鍵)<sub>0, 0</sub>で Alice のメッセージを復号する。
1. さらにメッセージを受け取った場合は、
   1. n=1 とする。
   1. Bob は受信[チェーン鍵](#チェーン鍵)<sub>0, n</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい受信[チェーン鍵](#チェーン鍵)<sub>0, n+1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>0, n</sub>を得る。<br />
      受信チェーン鍵<sub>0, n+1</sub>, メッセージ鍵<sub>0, n</sub> &larr; HKDF(受信チェーン鍵<sub>0, n</sub>)
   1. [メッセージ鍵](#メッセージ鍵)<sub>0, n</sub>で Alice のメッセージを復号する。
   1. n &larr; n+1。
   1. すべてのメッセージを復号するまで繰り返す。

### 4. Bob: メッセージの送信（Bob &rarr; Alice 宛）

Alice から受け取ったメッセージに Bob が返信する。

1. Bob は新しい[ラチェット鍵](#ラチェット鍵)<sub>0</sub>を作成する。<br />Bob のラチェット鍵<sub>0</sub> &larr; 鍵生成()
1. Bob は[ルート鍵](#ルート鍵)<sub>1</sub>、自分の[ラチェット鍵](#ラチェット鍵)<sub>0</sub>、Alice の[ラチェット鍵](#ラチェット鍵)<sub>0</sub>を[非対称ラチェット](#非対称ラチェット)に入力し、新しい[ルート鍵](#ルート鍵)<sub>2</sub>と送信[チェーン鍵](#チェーン鍵)<sub>1, 0</sub>を得る。<br />
   DH 出力<sub>1</sub> &larr; DH(Bob のラチェット鍵<sub>0</sub>, Alice のラチェット鍵<sub>0</sub>)<br />
   ルート鍵<sub>2</sub>, 送信チェーン鍵<sub>1, 0</sub> &larr; HKDF(ルート鍵<sub>1</sub>, DH 出力<sub>1</sub>)
1. Bob は送信[チェーン鍵](#チェーン鍵)<sub>1, 0</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい送信[チェーン鍵](#チェーン鍵)<sub>1, 1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>1, 0</sub>を得る。<br />
   送信チェーン鍵<sub>1, 1</sub>, メッセージ鍵<sub>1, 0</sub> &larr; HKDF(送信チェーン鍵<sub>1, 0</sub>)
1. [メッセージ鍵](#メッセージ鍵)<sub>1, 0</sub>でメッセージを暗号化する。
1. さらにメッセージを送る場合は、
   1. n=1 とする。
   1. Bob は送信[チェーン鍵](#チェーン鍵)<sub>1, n</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい送信[チェーン鍵](#チェーン鍵)<sub>1, n+1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>1, n</sub>を得る。<br />
      送信チェーン鍵<sub>1, n+1</sub>, メッセージ鍵<sub>1, n</sub> &larr; HKDF(送信チェーン鍵<sub>1, n</sub>)
   1. [メッセージ鍵](#メッセージ鍵)<sub>1, n</sub>でメッセージを暗号化する。
   1. n &larr; n+1。
   1. すべてのメッセージを暗号化するまで繰り返す。
1. 暗号化したメッセージと自分の[ラチェット鍵](#ラチェット鍵)をサーバに送信する。

### 5. Alice: メッセージの受信（Bob &rarr; Alice 宛）

1. Alice は Bob の暗号化されたメッセージと[ラチェット鍵](#ラチェット鍵)をサーバから受け取る。
1. Alice は[ルート鍵](#ルート鍵)<sub>1</sub>、自分の[ラチェット鍵](#ラチェット鍵)<sub>0</sub>、Bob の[ラチェット鍵](#ラチェット鍵)<sub>0</sub>を[非対称ラチェット](#非対称ラチェット)に入力し、新しい[ルート鍵](#ルート鍵)<sub>2</sub>と受信[チェーン鍵](#チェーン鍵)<sub>1, 0</sub>を得る。<br />
   DH 出力<sub>1</sub> &larr; DH(Bob のラチェット鍵<sub>0</sub>, Alice のラチェット鍵<sub>0</sub>)<br />
   ルート鍵<sub>2</sub>, 受信チェーン鍵<sub>1, 0</sub> &larr; HKDF(ルート鍵<sub>1</sub>, DH 出力<sub>1</sub>)
1. Alice は受信[チェーン鍵](#チェーン鍵)<sub>1, 0</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい受信[チェーン鍵](#チェーン鍵)<sub>1, 1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>1, 0</sub>を得る。<br />
   受信チェーン鍵<sub>1, 1</sub>, メッセージ鍵<sub>1, 0</sub> &larr; HKDF(受信チェーン鍵<sub>1, 0</sub>)
1. [メッセージ鍵](#メッセージ鍵)<sub>1, 0</sub>で Bob のメッセージを復号する。
1. さらにメッセージを受け取った場合は、
   1. n=1 とする。
   1. Alice は受信[チェーン鍵](#チェーン鍵)<sub>1, n</sub>を[対称ラチェット](#対称ラチェット)に入力し、新しい受信[チェーン鍵](#チェーン鍵)<sub>1, n+1</sub>と[メッセージ鍵](#メッセージ鍵)<sub>1, n</sub>を得る。<br />
      受信チェーン鍵<sub>1, n+1</sub>, メッセージ鍵<sub>1, n</sub> &larr; HKDF(受信チェーン鍵<sub>1, n</sub>)
   1. [メッセージ鍵](#メッセージ鍵)<sub>1, n</sub>で Alice のメッセージを復号する。
   1. n &larr; n+1。
   1. すべてのメッセージを復号するまで繰り返す。

## 擬似コードによる実装

### メッセージの送信

```js
let ルート鍵;

function メッセージの送信(相手のラチェット鍵または前鍵, 平文メッセージ) {
  let 暗号化済みメッセージ = [];

  // 自分のラチェット鍵を更新する。
  let 自分のラチェット鍵 = 鍵生成();

  // ルート チェーンを更新する。
  let DH_出力 = DH(自分のラチェット鍵, 相手のラチェット鍵または前鍵);
  let [新しいルート鍵, 送信チェーン鍵] = HKDF(ルート鍵, DH_出力);
  ルート鍵 = 新しいルート鍵;

  for (let m in 平文メッセージ) {
    // 送信チェーンを更新する。
    let [新しい送信チェーン鍵, メッセージ鍵] = HKDF(送信チェーン鍵);
    送信チェーン鍵 = 新しい送信チェーン鍵;

    // メッセージ m を暗号化する。
    暗号化済みメッセージ.push(暗号化(m, メッセージ鍵));
  }

  return {
    自分のラチェット鍵,
    暗号化済みメッセージ,
  };
}
```

### メッセージの受信

```js
let ルート鍵;
let 自分のラチェット鍵または前鍵;

function メッセージの受信(相手のラチェット鍵, 暗号化済みメッセージ) {
  let 平文メッセージ = [];

  // ルート チェーンを更新する。
  let DH_出力 = DH(自分のラチェット鍵または前鍵, 相手のラチェット鍵);
  let [新しいルート鍵, 受信チェーン鍵] = HKDF(ルート鍵, DH_出力);
  ルート鍵 = 新しいルート鍵;

  for (let m in 暗号化済みメッセージ) {
    // 受信チェーンを更新する。
    let [新しい受信チェーン鍵, メッセージ鍵] = HKDF(受信チェーン鍵);
    受信チェーン鍵 = 新しい受信チェーン鍵;

    // 暗号化済みメッセージ m を復号する。
    平文メッセージ.push(復号(m, メッセージ鍵));
  }

  return {
    自分のメッセージ鍵,
    平文メッセージ,
  };
}
```

## 参考文献

- M. Marlinspike, T. Perrin (2016). "The double ratchet algorithm". _Signal Foundation_. https://signal.org/docs/specifications/doubleratchet/
- Wikipedia contributors. "Double ratchet algorithm". _Wikipedia_. https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm
- K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). "A formal security analysis of the signal messaging protocol". _Journal of Cryptology_, 33(4), pp. 1914&ndash;1983. https://doi.org/10.1007/s00145-020-09360-1
