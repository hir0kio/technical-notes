---
description: あらかじめ共有した共通鍵を使って安全にメッセージを暗号化して送受信するためのアルゴリズム。鍵が危殆化しても、過去の通信が復号されるのを防ぎ、またアルゴリズムの自己修復機能によりその鍵が正常な鍵と交換されることで、前方秘匿性と post-compromise security を実現する。
---

# Double Ratchet アルゴリズム

あらかじめ共有した共通鍵を使って安全にメッセージを暗号化して送受信するためのアルゴリズム。鍵が危殆化しても、過去の通信が復号されるのを防ぎ、またアルゴリズムの自己修復機能によりその鍵が正常な鍵と交換されることで、[前方秘匿性](https://ja.wikipedia.org/wiki/Forward_secrecy)と [post-compromise security](/cryptography/post-compromise-security) を実現する。

## 定義

### ECDH(鍵ペア<sub>0</sub>, 鍵ペア<sub>1</sub>)

鍵ペア<sub>0</sub>の秘密鍵と鍵ペア<sub>1</sub>の公開鍵で[楕円曲線ディフィー・ヘルマン鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行って得られる秘密の値。

### HKDF(km<sub>0</sub>, km<sub>1</sub>, km<sub>2</sub>, ......)

1 個以上の[キー マテリアル](https://csrc.nist.gov/glossary/term/keying_material) km<sub>0</sub>, km<sub>1</sub>, km<sub>2</sub>, ...... を [HMAC-based extract-then-expand key derivation function](https://datatracker.ietf.org/doc/html/rfc5869)（HKDF）に入力して得られる 1 個以上の対称鍵。

対称鍵 &larr; HKDF(km)<br />
対称鍵 &larr; HKDF(km<sub>0</sub>, km<sub>1</sub>, km<sub>2</sub>)<br />
対称鍵<sub>0</sub>, 対称鍵<sub>1</sub>, 対称鍵<sub>2</sub> &larr; HKDF(km<sub>0</sub>, km<sub>1</sub>, km<sub>2</sub>)

### 非対称ラチェット

asymmetric ratchet<sup><a href="#ref-1">1</a></sup>

[DH 出力](#dh-出力)を得るための暗号学的チェーン。自分と相手の[ラチェット鍵](#ラチェット鍵)のどちらかが更新されると新しい DH 出力が得られる。自分と相手のラチェット鍵のどちらかが危殆化しない限り、そのラチェット鍵の組み合わせから得られる DH 出力の機密性は保たれる。また、仮に第三者が DH 出力を危殆化させても、どちらかのラチェット鍵が更新されると第三者はそれ以降の通信を復号できない。

自分が非対称ラチェットを更新するには、新しいラチェット鍵を作成し、自分の新しいラチェット鍵と相手の既存のラチェット鍵で[楕円曲線ディフィー・ヘルマン鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行って新しい DH 出力を得る。

DH 出力 &larr; ECDH(自分の新しいラチェット鍵, 相手の既存のラチェット鍵)

新しい DH 出力を導出したあとは、自分の新しいラチェット鍵の公開鍵を仲介するサーバに送り、相手は任意のタイミングでそれを受け取って同じ計算を行い、同じ DH 出力を得る。

相手が非対称ラチェットを更新したときは、相手の新しいラチェット鍵を仲介するサーバから受け取り、自分の既存のラチェット鍵と相手の新しいラチェット鍵で楕円曲線ディフィー・ヘルマン鍵共有を行って新しい DH 出力を得る。

DH 出力 &larr; ECDH(自分の既存のラチェット鍵, 相手の新しいラチェット鍵)

### ラチェット鍵

ratchet key

[非対称ラチェット](#非対称ラチェット)を更新するときにこの鍵を更新する。

### DH 出力

DH output

[非対称ラチェット](#非対称ラチェット)から得られる秘密の値。[ルート チェーン](#ルート-チェーン)を更新するのに使う。ある[ラチェット鍵](#ラチェット鍵)の組み合わせからは同じ DH 出力が得られる。

### 対称ラチェット

symmetric ratchet

n 番目のチェーン鍵（と任意の[キー マテリアル](https://csrc.nist.gov/glossary/term/keying_material)）を受け取って、n+1 番目のチェーン鍵と 1 個以上の対称鍵を出力する暗号学的チェーン。

チェーン鍵<sub>k+1</sub>, 対称鍵 &larr; HKDF(チェーン鍵<sub>k</sub>)<br />
チェーン鍵<sub>l+1</sub>, 対称鍵 &larr; HKDF(チェーン鍵<sub>l</sub>, キー マテリアル)<br />
チェーン鍵<sub>m+1</sub>, 対称鍵<sub>0</sub>, 対称鍵<sub>1</sub>, 対称鍵<sub>2</sub> &larr; HKDF(チェーン鍵<sub>m</sub>, キー マテリアル)

対称ラチェットは進行方向にしか操作できない。つまり、一度対称ラチェットを更新して古いチェーン鍵を削除すると、古いチェーン鍵から導出した対称鍵を得ることはできない。

### ルート チェーン

root chain

新しい[送信](#送信チェーン)・[受信チェーン](#受信チェーン)を得るための[対称ラチェット](#対称ラチェット)。

n 番目のルート鍵と新しい [DH 出力](#dh-出力)を入力すると、n+1 番目のルート鍵と新しい送信または受信チェーン鍵が交互に得られる。例として、n 番目のルート鍵から**送信**チェーン鍵を導出した場合、n+1 番目からは**受信**チェーン鍵、n+2 番目からは**送信**チェーン鍵、n+3 番目からは**受信**チェーン鍵、...... と得られる鍵が交互に入れ替わる。

ルート鍵<sub>n+1</sub>, **送信**チェーン鍵<sub>n, 0</sub> &larr; HKDF(ルート鍵<sub>n</sub>, DH 出力<sub>n</sub>)<br />
ルート鍵<sub>n+2</sub>, **受信**チェーン鍵<sub>n+1, 0</sub> &larr; HKDF(ルート鍵<sub>n+1</sub>, DH 出力<sub>n+1</sub>)<br />
ルート鍵<sub>n+3</sub>, **送信**チェーン鍵<sub>n+2, 0</sub> &larr; HKDF(ルート鍵<sub>n+2</sub>, DH 出力<sub>n+2</sub>)<br />
ルート鍵<sub>n+4</sub>, **受信**チェーン鍵<sub>n+3, 0</sub> &larr; HKDF(ルート鍵<sub>n+3</sub>, DH 出力<sub>n+3</sub>)<br />
......

### 送信チェーン

sending chain

自分が新しいメッセージを送るときに、最新の送信チェーン鍵を入力し、次の送信チェーン鍵と暗号化用の新しいメッセージ鍵を得るのに使う[対称ラチェット](#対称ラチェット)。

送信チェーン鍵<sub>k, 1</sub>, メッセージ鍵<sub>k, 0</sub> &larr; HKDF(送信チェーン鍵<sub>k, 0</sub>)<br />
送信チェーン鍵<sub>k, 2</sub>, メッセージ鍵<sub>k, 1</sub> &larr; HKDF(送信チェーン鍵<sub>k, 1</sub>)<br />
送信チェーン鍵<sub>k, 3</sub>, メッセージ鍵<sub>k, 2</sub> &larr; HKDF(送信チェーン鍵<sub>k, 2</sub>)<br />
......

自分の**送信**チェーンは相手の**受信**チェーンと同期している。同じチェーンにおいて、自分の n 番目の送信チェーン鍵は相手の n 番目の受信チェーン鍵と同じである。

### 受信チェーン

receiving chain

相手から新しいメッセージを受け取ったときに、最新の受信チェーン鍵を入力し、次の受信チェーン鍵と復号用の新しいメッセージ鍵を得るのに使う[対称ラチェット](#対称ラチェット)。

送信チェーン鍵<sub>k, 1</sub>, メッセージ鍵<sub>k, 0</sub> &larr; HKDF(受信チェーン鍵<sub>k, 0</sub>)<br />
送信チェーン鍵<sub>k, 2</sub>, メッセージ鍵<sub>k, 1</sub> &larr; HKDF(受信チェーン鍵<sub>k, 1</sub>)<br />
送信チェーン鍵<sub>k, 3</sub>, メッセージ鍵<sub>k, 2</sub> &larr; HKDF(受信チェーン鍵<sub>k, 2</sub>)<br />
......

自分の**受信**チェーンは相手の**送信**チェーンと同期している。同じチェーンにおいて、自分の n 番目の受信チェーン鍵は相手の n 番目の送信チェーン鍵と同じである。

### メッセージ鍵

message key

メッセージを暗号化・復号するための鍵。メッセージを送信・受信するたびに送信・受信チェーンを更新して新しいメッセージ鍵を導出し、これを新しいメッセージの暗号化・復号に使う。それぞれのメッセージごとに固有であり、2 個以上の異なるメッセージを同じメッセージ鍵で暗号化することはできない。

## 手順

### 役割

- **Alice**（イニシエーター）は、Bob との間に共通鍵を確立し、Double Ratchet アルゴリズムを使って Bob にメッセージを送る。ただし、メッセージを送るとき、Bob はオフラインである場合がある。
- **Bob**（レスポンダー）は、Alice からのメッセージを受け取って Alice に返信する。ただし、返信を送るとき、Alice はオフラインである場合がある。
- **サーバ**は Alice と Bob の通信を中継する。Alice と Bob が相手に送ったデータを一時的に保持し、対象者がオンラインに復帰するとこのデータを配送する。

### 1. ルート鍵の共有

1. Alice と Bob は [X3DH 鍵合意プロトコル](/cryptography/x3dh-key-agreement-protocol)を使って共通鍵を確立する。この共通鍵をルート鍵<sub>0</sub>（最初のルート鍵）として使う。

前方秘匿性のため、最初のルート鍵はそれぞれのセッションごとに固有である必要がある。

### 2. メッセージの送信（Alice &rarr; Bob 宛）

Alice は Bob にメッセージを送信する。

1. Alice は新しい[ラチェット鍵](#ラチェット鍵)<sub>0</sub>を作成する。<br />Alice のラチェット鍵<sub>0</sub> &larr; 鍵生成()
2. Alice は自分のラチェット鍵<sub>0</sub>と Bob の[前鍵](/cryptography/x3dh-key-agreement-protocol#前鍵)を[非対称ラチェット](#非対称ラチェット)に入力し、新しい [DH 出力](#dh-出力)<sub>0</sub>を得る。<br />DH 出力<sub>0</sub> &larr; HKDF(Alice のラチェット鍵<sub>0</sub>, Bob の前鍵)
3. Alice はルート鍵<sub>0</sub>と DH 出力<sub>0</sub>を[ルート チェーン](#ルート-チェーン)に入力し、新しいルート鍵<sub>1</sub>と[送信チェーン](#送信チェーン)鍵<sub>0, 0</sub>を得る。<br />ルート鍵<sub>1</sub>, 送信チェーン鍵<sub>0, 0</sub> &larr; HKDF(ルート鍵<sub>0</sub>, DH 出力<sub>0</sub>)
4. Alice は送信チェーン鍵<sub>0, 0</sub>を送信チェーンに入力し、新しい送信チェーン鍵<sub>0, 1</sub>とメッセージ鍵<sub>0, 0</sub>を得る。<br />送信チェーン鍵<sub>0, 1</sub>, メッセージ鍵<sub>0, 0</sub> &larr; HKDF(送信チェーン鍵<sub>0, 0</sub>)
5. Alice はメッセージ鍵<sub>0, 0</sub>でメッセージを暗号化する。
6. 暗号化したメッセージと自分のラチェット鍵をサーバに送信する。

さらにメッセージを送る場合は、

7. n=1 とする。
8. Alice は送信チェーン鍵<sub>0, n</sub>を送信チェーンに入力し、新しい送信チェーン鍵<sub>0, n+1</sub>とメッセージ鍵<sub>0, n</sub>を得る。<br />送信チェーン鍵<sub>0, n+1</sub>, メッセージ鍵<sub>0, n</sub> &larr; HKDF(送信チェーン鍵<sub>0, n</sub>)
9. Alice はメッセージ鍵<sub>0, n</sub>でメッセージを暗号化する。
10. 暗号化したメッセージと自分のラチェット鍵をサーバに送信する。
11. n &larr; n+1。
12. すべてのメッセージを暗号化するまで 2.8 から 2.11 までを繰り返す。

ルート鍵やチェーン鍵を更新したあとは、前方秘匿性のため古い鍵を削除する。

### 3. メッセージの受信（Alice &rarr; Bob 宛）

1. Bob は Alice の暗号化されたメッセージとラチェット鍵をサーバから受け取る。
2. Bob は自分の前鍵と Alice のラチェット鍵<sub>0</sub>を非対称ラチェットに入力し、DH 出力<sub>0</sub>を得る。<br />DH 出力<sub>0</sub> &larr; HKDF(Bob の前鍵, Alice のラチェット鍵<sub>0</sub>)
3. Bob はルート鍵<sub>0</sub>と DH 出力<sub>0</sub>をルート チェーンに入力し、新しいルート鍵<sub>1</sub>と受信チェーン鍵<sub>0, 0</sub>を得る。<br />ルート鍵<sub>1</sub>, [受信チェーン](#受信チェーン)鍵<sub>0, 0</sub> &larr; HKDF(ルート鍵<sub>0</sub>, DH 出力<sub>0</sub>)
4. Bob は受信チェーン鍵<sub>0, 0</sub>を受信チェーンに入力し、新しい受信チェーン鍵<sub>0, 1</sub>とメッセージ鍵<sub>0, 0</sub>を得る。<br />受信チェーン鍵<sub>0, 1</sub>, メッセージ鍵<sub>0, 0</sub> &larr; HKDF(受信チェーン鍵<sub>0, 0</sub>)
5. Bob はメッセージ鍵<sub>0, 0</sub>で Alice のメッセージを復号する。

さらにメッセージを受け取った場合は、

6. n=1 とする。
7. Bob は受信チェーン鍵<sub>0, n</sub>を受信チェーンに入力し、新しい受信チェーン鍵<sub>0, n+1</sub>とメッセージ鍵<sub>0, n</sub>を得る。<br />受信チェーン鍵<sub>0, n+1</sub>, メッセージ鍵<sub>0, n</sub> &larr; HKDF(受信チェーン鍵<sub>0, n</sub>)
8. Bob はメッセージ鍵<sub>0, n</sub>で Alice のメッセージを復号する。
9. n &larr; n+1。
10. すべてのメッセージを復号するまで 3.7 から 3.9 までを繰り返す。

### 4. メッセージの送信（Bob &rarr; Alice 宛）

Alice から受け取ったメッセージに Bob が返信する。

1. Bob は新しいラチェット鍵<sub>0</sub>を作成する。<br />Bob のラチェット鍵<sub>0</sub> &larr; 鍵生成()
2. Bob は自分のラチェット鍵<sub>0</sub>と Alice のラチェット鍵<sub>0</sub>を非対称ラチェットに入力し、新しい DH 出力<sub>1</sub>を得る。<br />DH 出力<sub>1</sub> &larr; HKDF(Bob のラチェット鍵<sub>0</sub>, Alice のラチェット鍵<sub>0</sub>)
3. Bob はルート鍵<sub>1</sub>と DH 出力<sub>1</sub>をルート チェーンに入力し、新しいルート鍵<sub>2</sub>と送信チェーン鍵<sub>1, 0</sub>を得る。<br />ルート鍵<sub>2</sub>, 送信チェーン鍵<sub>1, 0</sub> &larr; HKDF(ルート鍵<sub>1</sub>, DH 出力<sub>1</sub>)
4. Bob は送信チェーン鍵<sub>1, 0</sub>を送信チェーンに入力し、新しい送信チェーン鍵<sub>1, 1</sub>とメッセージ鍵<sub>1, 0</sub>を得る。<br />送信チェーン鍵<sub>1, 1</sub>, メッセージ鍵<sub>1, 0</sub> &larr; HKDF(送信チェーン鍵<sub>1, 0</sub>)
5. メッセージ鍵<sub>1, 0</sub>でメッセージを暗号化する。
6. 暗号化したメッセージと自分のラチェット鍵をサーバに送信する。

さらにメッセージを送る場合は、

7. n=1 とする。
8. Bob は送信チェーン鍵<sub>1, n</sub>を送信チェーンに入力し、新しい送信チェーン鍵<sub>1, n+1</sub>とメッセージ鍵<sub>1, n</sub>を得る。<br />送信チェーン鍵<sub>1, n+1</sub>, メッセージ鍵<sub>1, n</sub> &larr; HKDF(送信チェーン鍵<sub>1, n</sub>)
9. Bob はメッセージ鍵<sub>1, n</sub>でメッセージを暗号化する。
10. 暗号化したメッセージと自分のラチェット鍵をサーバに送信する。
11. n &larr; n+1。
12. すべてのメッセージを暗号化するまで 4.8 から 4.11 までを繰り返す。

### 5. メッセージの受信（Bob &rarr; Alice 宛）

1. Alice は Bob の暗号化されたメッセージとラチェット鍵をサーバから受け取る。
2. Alice は自分のラチェット鍵<sub>0</sub>と Bob のラチェット鍵<sub>0</sub>を非対称ラチェットに入力し、DH 出力<sub>1</sub>を得る。<br />DH 出力<sub>1</sub> &larr; HKDF(Bob のラチェット鍵<sub>0</sub>, Alice のラチェット鍵<sub>0</sub>)
3. Alice はルート鍵<sub>1</sub>と DH 出力<sub>1</sub>をルート チェーンに入力し、新しいルート鍵<sub>2</sub>と受信チェーン鍵<sub>1, 0</sub>を得る。<br />ルート鍵<sub>2</sub>, 受信チェーン鍵<sub>1, 0</sub> &larr; HKDF(ルート鍵<sub>1</sub>, DH 出力<sub>1</sub>)
4. Alice は受信チェーン鍵<sub>1, 0</sub>を受信チェーンに入力し、新しい受信チェーン鍵<sub>1, 1</sub>とメッセージ鍵<sub>1, 0</sub>を得る。<br />受信チェーン鍵<sub>1, 1</sub>, メッセージ鍵<sub>1, 0</sub> &larr; HKDF(受信チェーン鍵<sub>1, 0</sub>)
5. Alice はメッセージ鍵<sub>1, 0</sub>で Bob のメッセージを復号する。

さらにメッセージを受け取った場合は、

6. n=1 とする。
7. Alice は受信チェーン鍵<sub>1, n</sub>を受信チェーンに入力し、新しい受信チェーン鍵<sub>1, n+1</sub>とメッセージ鍵<sub>1, n</sub>を得る。<br />受信チェーン鍵<sub>1, n+1</sub>, メッセージ鍵<sub>1, n</sub> &larr; HKDF(受信チェーン鍵<sub>1, n</sub>)
8. Alice はメッセージ鍵<sub>1, n</sub>で Alice のメッセージを復号する。
9. n &larr; n+1。
10. すべてのメッセージを復号するまで 5.7 から 5.9 までを繰り返す。

## 擬似コードによる実装

### メッセージの送信

```js
let ルート鍵;

function メッセージの送信(相手のラチェット鍵, メッセージ) {
  let 暗号化済みメッセージ = [];

  // 自分のラチェット鍵を更新する。
  let 自分のラチェット鍵 = 鍵生成();

  let DH_出力 = ECDH(自分のラチェット鍵, 相手のラチェット鍵);

  // ルート チェーンを更新する。
  let [新しいルート鍵, 送信チェーン鍵] = HKDF(ルート鍵, DH_出力);
  ルート鍵 = 新しいルート鍵;

  for (let m in メッセージ) {
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
let 自分のラチェット鍵;

function メッセージの受信(相手のラチェット鍵, 暗号化済みメッセージ) {
  let メッセージ = [];

  let DH_出力 = ECDH(自分のラチェット鍵, 相手のラチェット鍵);

  // ルート チェーンを更新する。
  let [新しいルート鍵, 受信チェーン鍵] = HKDF(ルート鍵, DH_出力);
  ルート鍵 = 新しいルート鍵;

  for (let m in 暗号化済みメッセージ) {
    // 受信チェーンを更新する。
    let [新しい受信チェーン鍵, メッセージ鍵] = HKDF(受信チェーン鍵);
    受信チェーン鍵 = 新しい受信チェーン鍵;

    // 暗号化済みメッセージ m を復号する。
    メッセージ.push(復号(m, メッセージ鍵));
  }

  return {
    自分のメッセージ鍵,
    メッセージ,
  };
}
```

## 脚注

1. <span id="ref-1">ratchet は「爪車」（逆転止めの爪と組み合わせて、一方向だけに回転するように作られている歯車）の意。</span>

## 参考文献

- M. Marlinspike, T. Perrin (2016). "The double ratchet algorithm". _Signal Foundation_. https://signal.org/docs/specifications/doubleratchet/
- Wikipedia contributors. "Double ratchet algorithm". _Wikipedia_. https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm
- K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). "A formal security analysis of the signal messaging protocol". _Journal of Cryptology_, 33(4), pp. 1914&ndash;1983. https://doi.org/10.1007/s00145-020-09360-1
