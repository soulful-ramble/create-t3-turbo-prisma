export { }
console.log("HELLO WORLD FROM BGSCRIPTS")


chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { name: "toggle-slider" })
})