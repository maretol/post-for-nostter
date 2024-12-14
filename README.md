# post-for-nostter
閲覧中のページのURLとタイトルをnostter投稿するChrome拡張

## download

[Chrome拡張ストアリンク](
https://chromewebstore.google.com/detail/post-for-nostter/abifdocleldfpalofpbjlndgmojmijab?authuser=0&hl=ja)

## build

```
$ npm run build
```

## how to work

以下のURLを新しいページで開く
```
https://nostter.app/post?content={url-encoded-text-here}
```

投稿する際に不要なクエリパラメータは削除しているが、もし必要な場合はアイコン右クリック（または普通に右クリック）のコンテキストメニューからURLを加工しないでポストを洗濯

### 特別扱い

- Youtube -> ビデオIDがクエリパラメータなのでそのIDだけは残す
- Amazonの商品ページはちょっと変えてる
