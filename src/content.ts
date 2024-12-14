import { openPostTab } from "./post"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message received", message)
  if(message.command="postFromClipboard"){
    navigator.clipboard.readText().then((text) => {
      console.log("clipboard text : ", text)
      openPostTab(text)
      sendResponse({result: "success"})
    })
  }
})

console.log("content script loaded")