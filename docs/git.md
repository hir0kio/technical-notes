# Git リポジトリのデータ構造

[Git](https://git-scm.com/) リポジトリのデータ構造を解説する。

Git は、それぞれの[コミット](#コミット)のファイルとディレクトリの構造を有向非巡回グラフとして保持し、あるファイルが更新されたときにほかの更新されていないファイルを重複して保持しないようにする、効率的なデータ構造を採用している。

## 前提条件

次のディレクトリ構造を持つ一般的な [Node.js](https://nodejs.org/) アプリを Git で管理すると想定する。

```
$ tree

.
├── LICENSE
├── node_modules
├── package.json
├── src
│   ├── greet.js
│   └── main.js
└── yarn.lock

2 directories, 5 files
```

```
$ npm start

> start
> node src/main.js

Hello, world!
```

```
$ git add --all
$ git commit --message "Initial commit"

[main (root-commit) 6113c9c] Initial commit
 6 files changed, 38 insertions(+)
```

## 主な概念

### コミット

Git リポジトリに保存されているスナップショット。それぞれのコミットは 1 個のルート [ツリー](#ツリー)とコミット メッセージを持つ。

```
// 初回コミットの内容。

$ git cat-file -p 6113c9c

tree af59ed6e0324f1dedec03ff15db0914d34a19040 // ルート ツリーの ID。
author John Doe <john@example.com> 1659082424 +0900
committer John Doe <john@example.com> 1659082424 +0900

Initial commit // コミット メッセージ。
```

### ツリー

Git リポジトリに保存されているファイルとディレクトリの構造。それぞれのツリーは 0 個以上の子ツリーと [blob](#blob) を持つ。

```
// 初回コミット 6113c9c のルート ツリーの内容。

$ git cat-file -p af59ed6

100644 blob 3c3629e647f5ddf82548912e337bea9826b434af	.gitignore
100644 blob 0b8d5593e3d3ce3632b39ad715eae9dcf5a79576	LICENSE
100644 blob 47c110a78489db134cc149af617dacbb7a2f0ead	package.json
040000 tree 5ab1e26e05f9794626efec70017221f289481652	src
100644 blob fb57ccd13afbd082ad82051c2ffebef4840661ec	yarn.lock
```

```
// 初回コミット 6113c9c の src ツリーの内容。

$ git cat-file -p 5ab1e26

100644 blob 60b8dd5db82fa899a2dedbe2914e357bd28a20fd	greet.js
100644 blob 2f491a19f04f3f1ae0aacd6ad3507d6b40157620	main.js
```

### blob

Git リポジトリに保存されているファイル。

```
// コミット 6113c9c の src/main.js の blob の内容。

$ git cat-file -p 2f491a1

const { greet } = require("./greet");

greet();
```

```
// コミット 6113c9c の src/greet.js の blob の内容。

$ git cat-file -p 60b8dd5

module.exports.greet = function () {
  console.log("Hello, world!");
};
```

### ID

それぞれの[コミット](#コミット)・[ツリー](#ツリー)・[blob](#blob) を一意に識別するハッシュ値。

### commitish

コミットを識別する値（_e.g._ コミット ID、ブランチ名、タグ名）。

## 操作

Git リポジトリに各種操作を行うときの Git の挙動を解説する。

- [コミット](#コミット)
- [チェックアウト](#チェックアウト)

### コミット

```
$ git add [コミットするファイルまたはディレクトリのパス]
$ git commit --message [コミット メッセージ]
```

`git add` でステージした変更をコミットする。

#### ファイルを更新

`src/greet.js` と `src/main.js` に次の変更を加える。

```diff
diff --git a/src/greet.js b/src/greet.js
index 60b8dd5..072525f 100644
--- a/src/greet.js
+++ b/src/greet.js
@@ -1,3 +1,7 @@
 module.exports.greet = function () {
   console.log("Hello, world!");
 };
+
+module.exports.greetInJapanese = function () {
+  console.log("こんにちは、世界！");
+};
```

```diff
diff --git a/src/main.js b/src/main.js
index 2f491a1..ee8b9e7 100644
--- a/src/main.js
+++ b/src/main.js
@@ -1,3 +1,3 @@
-const { greet } = require("./greet");
+const { greetInJapanese } = require("./greet");

-greet();
+greetInJapanese();
```

---

```
$ npm start

> start
> node src/main.js

こんにちは、世界！
```

#### 変更内容をコミット

変更内容をコミットする。

```
$ git add src/greet.js src/main.js
$ git commit --message "Second commit"

[main 94f40f8] Second commit
 2 files changed, 6 insertions(+), 2 deletions(-)
```

```
$ git cat-file -p 94f40f8

tree c0a304f05cb143202c8defc8a2e5f3dddc69d2ef
parent 6113c9c5a4b4875feb1d437874ffcec314eab071 // 1 つ前のコミットの ID。
author John Doe <john@example.com> 1659088061 +0900
committer John Doe <john@example.com> 1659088061 +0900

Second commit
```

#### ツリーを比較

古いコミットと新しいコミットのツリーを比較する。

##### 古いコミットのツリー

```
// 古いコミット 6113c9c のルート ツリーの内容。

$ git cat-file -p af59ed6

100644 blob 3c3629e647f5ddf82548912e337bea9826b434af	.gitignore
100644 blob 0b8d5593e3d3ce3632b39ad715eae9dcf5a79576	LICENSE
100644 blob 47c110a78489db134cc149af617dacbb7a2f0ead	package.json
040000 tree 5ab1e26e05f9794626efec70017221f289481652	src
100644 blob fb57ccd13afbd082ad82051c2ffebef4840661ec	yarn.lock
```

```
// 古いコミット 6113c9c の src ツリーの内容。

$ git cat-file -p 5ab1e26

100644 blob 60b8dd5db82fa899a2dedbe2914e357bd28a20fd	greet.js
100644 blob 2f491a19f04f3f1ae0aacd6ad3507d6b40157620	main.js
```

##### 新しいコミットのツリー

```
// 新しいコミット 94f40f8 のルート ツリーの内容。

$ git cat-file -p c0a304f

100644 blob 3c3629e647f5ddf82548912e337bea9826b434af	.gitignore
100644 blob 0b8d5593e3d3ce3632b39ad715eae9dcf5a79576	LICENSE
100644 blob 47c110a78489db134cc149af617dacbb7a2f0ead	package.json
040000 tree 8b3e69511f8483401402cd147ec881ac7e5cf897	src
100644 blob fb57ccd13afbd082ad82051c2ffebef4840661ec	yarn.lock
```

```
// 新しいコミット 94f40f8 の src ツリーの内容。

$ git cat-file -p 8b3e695

100644 blob 072525ff8507219395111b1023bfde3af1057324	greet.js
100644 blob ee8b9e7dc848c81888c4d6a9865ebf2738b7badc	main.js
```

---

変更した `src/greet.js` と `src/main.js` の blob の ID と、それを格納する `src` ディレクトリのツリーの ID のみが変化しており、それ以外のツリーと blob は古いコミットと新しいコミットで共有されていることがわかる。

### チェックアウト

```
$ git checkout [commitish]
```

現在の[コミット](#コミット)のルート [ツリー](#ツリー)と指定されたコミットのルート ツリーを比較し、差分をワーキング ディレクトリに適用する。

## 付録

- [0001-Initial-commit.patch](appendixes/git/0001-Initial-commit.patch)
- [0002-Second-commit.patch](appendixes/git/0002-Second-commit.patch)
