---
description: 相手とリアルタイムにやり取りすることなく一方的に鍵共有を完了することができる認証付き鍵共有プロトコル。
---

# X3DH 鍵合意プロトコル

X3DH key agreement protocol

相手とリアルタイムにやり取りすることなく一方的に鍵共有を完了することができる[認証付き鍵共有](https://en.wikipedia.org/wiki/Authenticated_Key_Exchange)プロトコル。

## 特徴

### 非同期性

相手が事前にサーバに公開した情報をもとに、相手とリアルタイムにやり取りすることなく一方的に鍵共有を完了し、共通鍵を得ることができる。このため、[前方秘匿性](https://ja.wikipedia.org/wiki/Forward_secrecy)を保証するよう設計されたほかの一般的な鍵共有プロトコルと異なり、非同期的な鍵共有が可能となっている。

共有後は必要な情報をサーバに送信しておき、相手は任意のタイミングでサーバからこの情報を取得してプロトコルを実行し、同じ共通鍵を得る。

### 相互認証

鍵共有セッションの参加者はそれぞれが自分の永続鍵を持っていることが暗号学的に保証される。

### 否認可能性

詳細は「[Plausible deniability#Use in cryptography](https://en.wikipedia.org/wiki/Plausible_deniability#Use_in_cryptography)」を参照

第三者は誰と誰が通信したかや通信の内容についての第三者に公開可能な暗号学的証明を得られない。

### 前方秘匿性

詳細は「[Forward secrecy](https://ja.wikipedia.org/wiki/Forward_secrecy)」を参照

ある鍵共有セッションで使われた永続鍵が将来のある時点で危殆化した場合でも、第三者はそのセッションで共有した共通鍵を復元できない。

## 用語

K. Cohn-Gordon _et al._ (2020) に登場する用語にそれぞれ次の訳語を与えた。

| 原語             | 訳語         |
| ---------------- | ------------ |
| ephemeral key    | 一時鍵       |
| ephemeral prekey | 一時前鍵     |
| identity key     | 永続鍵       |
| prekey           | 前鍵         |
| prekey bundle    | 前鍵バンドル |

## 定義

### 一時鍵

鍵共有セッションの initiator がセッションごとに作成するユニークな使い捨ての鍵。前方秘匿性のため、initiator は共通鍵が導出できしだい一時鍵の秘密鍵を削除する。

### 一時前鍵

鍵共有ごとに消費される使い捨ての鍵。

### 永続鍵

鍵共有セッションで自分の identity を証明するための鍵。

### 前鍵

前もってサーバに公開しておく鍵。鍵共有後に [Double Ratchet アルゴリズム](/cryptography/signal-protocol/double-ratchet-algorithm)で最初の[ルート鍵](/cryptography/signal-protocol/double-ratchet-algorithm#用語)として使う。

### 前鍵バンドル

鍵共有を開始する際にサーバから受け取るデータ。以下が含まれる。

- 永続鍵の公開鍵
- 前鍵の公開鍵
- 前鍵の公開鍵の永続鍵による電子署名
- 一時前鍵の公開鍵（もしあれば）

## 手順

Bob が自分の鍵をサーバに登録し、Alice がそれを使って Bob がオフラインの間に秘密鍵を確立する例を解説する。

### 前鍵バンドルの登録

まず、Bob は以下の [ECC](https://ja.wikipedia.org/wiki/楕円曲線暗号) 鍵ペアを作成する。

- 永続鍵
- 前鍵
- 複数の一時前鍵

また、Bob は作成した前鍵の公開鍵を永続鍵で[電子署名](https://ja.wikipedia.org/wiki/楕円曲線DSA)する。

次に、Bob は作成した鍵ペアの公開鍵と電子署名をサーバに登録する。

前方秘匿性のため、Bob はサーバに登録した前鍵を定期的に交換し、古い前鍵を削除すべきである。また、一時前鍵は鍵共有ごとに消費されるため、サーバは Bob の一時前鍵の残りが少なくなってきたら Bob にそのことを通知し、Bob に新しい一時前鍵を登録させる必要がある。なお、一時前鍵が枯渇した場合、プロトコルは続行できるが前方秘匿性の保証は弱まる。詳細は[#鍵の危殆化](#鍵の危殆化)を参照。

### メッセージの送信

Bob と共通鍵を確立してデータを送りたい Alice は、以下の ECC 鍵ペアを作成する。

- 永続鍵
- 一時鍵

次に、Alice はサーバから Bob の前鍵バンドルを取得する。これには以下が含まれる。

- Bob の永続鍵の公開鍵
- Bob の前鍵の公開鍵
- Bob の前鍵の永続鍵による電子署名
- ［Bob の一時前鍵の公開鍵］

Alice は、Bob の前鍵バンドルに含まれる前鍵の電子署名を検証し、前鍵が第三者によって差し替えられていないことを確認する。

次に、Alice は以下の [ECDH 鍵共有](https://ja.wikipedia.org/wiki/楕円曲線ディフィー・ヘルマン鍵共有)を行う。

```
DH1 = ECDH(Alice の永続鍵, Bob の前鍵の公開鍵)
DH2 = ECDH(Alice の一時鍵, Bob の永続鍵の公開鍵)
DH3 = ECDH(Alice の一時鍵, Bob の前鍵の公開鍵)
ms = KDF(DH1 || DH2 || DH3)
```

Bob の前鍵バンドルに一時前鍵が含まれている場合は、以下を実行する。

```
DH4 = ECDH(Alice の一時鍵, Bob の一時前鍵の公開鍵)
ms = KDF(DH1 || DH2 || DH3 || DH4)
```

_DH1_ と _DH2_ は相互認証を提供し、_DH3_ と _DH4_ は前方秘匿性を提供する。つまり、Alice と Bob の永続鍵を持たない第三者は _DH1_ と _DH2_ を導出できず、将来永続鍵が危殆化した場合でも使われた前鍵と一時鍵が削除されたあとは _DH3_ と _DH4_ を導出できない。

上記の手順で共通鍵 _ms_ が得られたら、前方秘匿性のため Alice は一時鍵の秘密鍵を削除する。

次に、Alice は共通鍵 _ms_ を使って送りたいデータを[認証付き暗号](https://ja.wikipedia.org/wiki/認証付き暗号) authenticated encryption with associated data で暗号化し、以下の情報を関連データとして付加したメッセージを作成して Bob に送信する。

- Alice の永続鍵の公開鍵
- Alice の一時鍵の公開鍵
- ［Alice が使った Bob の一時前鍵の識別子（例: ハッシュ値）］

### メッセージの受信

Alice のメッセージを受け取った Bob は、以下の ECDH 鍵共有を行う。

```
DH1 = ECDH(Bob の前鍵、Alice の永続鍵の公開鍵)
DH2 = ECDH(Bob の永続鍵, Alice の一時鍵の公開鍵)
DH3 = ECDH(Bob の前鍵, Alice の一時鍵の公開鍵)
ms = KDF(DH1 || DH2 || DH3)
```

Alice のメッセージに Alice が使った Bob の一時前鍵が記載されている場合は、以下を実行し、前方秘匿性のためその一時前鍵を削除する。

```
DH4 = ECDH(Bob の一時前鍵, Alice の一時鍵の公開鍵)
ms = KDF(DH1 || DH2 || DH3 || DH4)
```

Bob は Alice と同じ共通鍵 _ms_ を得ることができた。Bob は Alice のメッセージを復号し、Alice と同じ共通鍵を得られたことを確認する。

### 鍵の合意後

共通鍵を確立したあとは、この鍵を使って共通鍵暗号方式で通信することもできるが、前方秘匿性や [post-compromise security](/cryptography/post-compromise-security) を保証する [Double Ratchet アルゴリズム](/cryptography/signal-protocol/double-ratchet-algorithm)を使うことが推奨される。

## 補足事項

### 永続鍵の検証

鍵共有を行う前に、Alice と Bob は信頼されている通信チャネルを用いてそれぞれが相手の正しい永続鍵を持っていることを検証する必要がある。これを行わない場合、Alice は Bob の前鍵バンドルが第三者によって差し替えられていないことを保証できず、Bob は通信相手が Alice であることの暗号学的な保証を得られない。

### 鍵の危殆化

- 永続鍵が危殆化した場合、第三者はその鍵の所有者に成りすまして鍵共有を行ったり、所有者が参加する鍵共有セッションに中間者攻撃を仕掛けたりすることができる。
- 永続鍵と前鍵が危殆化し、
  - 鍵共有セッションで一時前鍵が**使われている**場合、第三者はそのセッションで合意した共通鍵を復元できない。
  - 鍵共有セッションで一時前鍵が**使われていない**場合、第三者はそのセッションで合意した共通鍵を復元することができる。

前鍵を頻繁に交換し、サーバ上の一時前鍵を枯渇させないようにすることで、共通鍵が危殆化するリスクを抑えることができる。

### 一時前鍵の枯渇

先に述べた通り、将来のある時点で永続鍵と前鍵が危殆化しても、鍵共有セッションで一時前鍵が使われておりこれが危殆化していない場合、第三者はそのセッションで合意した共通鍵を復元できない。

そこで、悪意のある第三者がサーバに大量に前鍵バンドルを要求し、故意に一時前鍵を枯渇させることによって、前方秘匿性のレベルを弱める攻撃が考えられる。

これに対する対策として、IP アドレスごとに前鍵バンドルのリクエストの回数を制限する、[CAPTCHA](https://ja.wikipedia.org/wiki/CAPTCHA) を要求するなどが考えられる。

## 参考文献

- M. Marlinspike, T. Perrin (2016). "The X3DH key agreement protocol". _Signal Foundation_. https://signal.org/docs/specifications/x3dh/
- K. Cohn-Gordon, C. Cremers, B. Dowling, L. Garratt, D. Stebila (2020). "A formal security analysis of the signal messaging protocol". _Journal of Cryptology_, 33(4), pp. 1914&ndash;1983. https://doi.org/10.1007/s00145-020-09360-1
