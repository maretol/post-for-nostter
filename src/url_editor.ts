export default function editURL(baseURL: string) : string {
  let url = new URL(baseURL)
  const protocol = url.protocol + "//"
  const host = url.host
  const path = url.pathname
  const ancher = url.hash
  if(host.match(/amazon.co.jp/)){
      // Amazon は特殊な置き換えをする
      return protocol + host + rewriteAmazonJPParameter(path)
  }else if(host.match(/www.youtube.com/)){
      // Youtube はビデオIDがパラメータにあるので拾ってくる
      return protocol + host + path + getYoutubeVideoParameter(url.searchParams)
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
