
function postPage(url: string, title: string) {
  const message = createMessage(title, url)
  openPostTab(message)
}

function openPostTab(message: string){
  const postUrl = "https://nostter.app/post"

  const parameters = {content: message}
  const paramString = new URLSearchParams(parameters).toString()
  chrome.tabs.create({url: postUrl+"?"+paramString})
};

const createMessage = (title: string, url: string): string => {
  return title + "\n" + url + "\n"
}

export { postPage, openPostTab, createMessage }
