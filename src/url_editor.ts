import type { DomainSettings } from './settings'

export interface EditURLOptions {
  domainSettings?: DomainSettings
  // trueの場合、特定ドメイン以外はURLをそのまま返す（domain_specific用）
  domainSpecificOnly?: boolean
}

export default function editURL(baseURL: string, options?: EditURLOptions) : string {
  const domainSettings = options?.domainSettings
  const domainSpecificOnly = options?.domainSpecificOnly ?? false

  let url = new URL(baseURL)
  const protocol = url.protocol + "//"
  const host = url.host
  const path = url.pathname
  const ancher = url.hash

  // ドメイン設定が有効な場合のみ特殊処理を適用
  if(domainSettings?.amazon && host.match(/amazon.co.jp/)){
      // Amazon は特殊な置き換えをする
      return protocol + host + rewriteAmazonJPParameter(path)
  }else if(domainSettings?.youtube && host.match(/www.youtube.com/)){
      // Youtube はビデオIDがパラメータにあるので拾ってくる
      return protocol + host + path + getYoutubeVideoParameter(url.searchParams)
  }

  // 特定ドメインのみ短縮モードの場合、マッチしなければ元のURLをそのまま返す
  if (domainSpecificOnly) {
    return baseURL
  }

  return protocol + host + path + ancher
}


const rewriteAmazonJPParameter = (path: string): string => {
  // pathパラメータで、 dp/[product_code]/ の部分を抜き出す
  const product_code = path.match(/dp\/([A-Z0-9]+)/)
  if(product_code){
      return "/dp/" + product_code[1]
  }
  // 駄目だったらそのまま返す
  return path
}

const getYoutubeVideoParameter = (params: URLSearchParams): string => {
    return "?v=" + params.get("v")
}
