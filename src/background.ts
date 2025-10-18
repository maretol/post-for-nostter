console.log("start")

import { postPage, postUrl } from "./post"
import editURL from "./url_editor"
import { loadSettings } from "./settings"

// アイコン左クリック: 投稿画面を新しいタブで開く
async function leftClickListener(tab: chrome.tabs.Tab){
    console.log("clicked!")
    console.log("tabID : ", tab.id)
    console.log("url : ", tab.url)
    console.log("title : ", tab.title)
    if (typeof tab.url !== 'undefined' && typeof tab.title !== 'undefined'){
        const settings = await loadSettings()

        // 標準の投稿挙動に応じてURLを処理
        let url = tab.url
        if (settings.defaultPostBehavior === 'short') {
            // すべて短縮: パラメータ削除 + ドメイン別処理を適用
            url = editURL(tab.url, settings.domainSettings)
        } else if (settings.defaultPostBehavior === 'domain_specific') {
            // 特定のドメインのみ短縮: ドメイン別処理のみ適用
            url = editURL(tab.url, settings.domainSettings)
        }
        // 'raw'の場合はそのまま

        postPage(url, tab.title)
    }
}

async function contextMenuListner(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab){
    if(info.menuItemId === "open_options"){
        // オプションページを新しいタブで開く
        chrome.runtime.openOptionsPage()
    }else if(info.menuItemId === "post_for_nostter"){
        if (typeof tab !== 'undefined' && typeof tab.url !== 'undefined' && typeof tab.title !== 'undefined'){
            const settings = await loadSettings()
            const url = editURL(tab.url, settings.domainSettings)
            postPage(url, tab.title)
        }
    }else if(info.menuItemId === "post_for_nostter_raw_url"){
        if (typeof tab !== 'undefined' && typeof tab.url !== 'undefined' && typeof tab.title !== 'undefined'){
            postPage(tab.url, tab.title)
        }
    }else if(info.menuItemId === "post_from_clipboard"){
        if(tab?.id !== undefined){
            chrome.tabs.sendMessage(tab.id, {command: "postFromClipboard"})
        }
    }else if(info.menuItemId === "post_link_url"){
        // リンク右クリック時: リンク先URLのみを投稿
        if(info.linkUrl){
            postUrl(info.linkUrl)
        }
    }
}

// アイコンクリックのリスナー
chrome.action.onClicked.addListener(leftClickListener);
// コンテキストメニューの登録とリスナー
chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        id: "open_options",
        title: "オプション",
        contexts: ["action"]
    })
    chrome.contextMenus.create({
        id: "post_for_nostter",
        title: "URLをできるだけ短くしてポスト",
    })
    chrome.contextMenus.create({
        id: "post_for_nostter_raw_url",
        title: "URLを加工しないでポスト",
    })
    chrome.contextMenus.create({
        id: "post_link_url",
        title: "リンク先のURLを投稿",
        contexts: ["link"]
    })
    // 将来実装予定
    // chrome.contextMenus.create({
    //     id: "post_from_clipboard",
    //     title: "クリップボードの内容で投稿",
    // })
})
chrome.contextMenus.onClicked.addListener(contextMenuListner)
