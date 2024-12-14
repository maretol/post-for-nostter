# post-for-nostter
閲覧中のページのURLとタイトルをnostter投稿するChrome拡張

## build

```
$ npm run build
```

## how to work

以下のURLを新しいページで開く
```
https://nostter.app/post?content={url-encoded-text-here}
```

投稿する際に不要なクエリパラメータは削除している（オプションでオン・オフしたい）

### 特別扱い

- Youtube -> ビデオIDがクエリパラメータなのでそのIDだけは残す
- Amazonの商品ページはちょっと変えてる
