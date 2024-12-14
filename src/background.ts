console.log("start")

import { postPage } from "./post"
import editURL from "./url_editor"

function leftClickListener(tab: chrome.tabs.Tab){
    console.log("clicked!")
    console.log("tabID : ", tab.id)
    console.log("url : ", tab.url)
    console.log("title : ", tab.title)
    if (typeof tab.url !== 'undefined' && typeof tab.title !== 'undefined'){
        const url = editURL(tab.url)
        postPage(url, tab.title)
    }
}

function contextMenuListner(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab){
    if(info.menuItemId === "post_for_nostter"){
        if(typeof tab !== 'undefined'){
            leftClickListener(tab)
        }
    }else if(info.menuItemId === "post_for_nostter_raw_url"){
        if (typeof tab !== 'undefined' && typeof tab.url !== 'undefined' && typeof tab.title !== 'undefined'){
            postPage(tab.url, tab.title)
        }
    }else if(info.menuItemId === "post_from_clipboard"){
        if(tab?.id !== undefined){
            chrome.tabs.sendMessage(tab.id, {command: "postFromClipboard"})
        }
    }
}

// アイコンクリックのリスナー
chrome.action.onClicked.addListener(leftClickListener);
// コンテキストメニューの登録とリスナー
chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        id: "post_for_nostter",
        title: "URLをできるだけ短くしてポスト",
    })
    chrome.contextMenus.create({
        id: "post_for_nostter_raw_url",
        title: "URLを加工しないでポスト",
    })
    // 将来実装予定
    // chrome.contextMenus.create({
    //     id: "post_from_clipboard",
    //     title: "クリップボードの内容で投稿",
    // })
})
chrome.contextMenus.onClicked.addListener(contextMenuListner)
