import { getBaseUrl } from "~utils/base-url";
import { setToken } from "~utils/session-store";

export { }
console.log("HELLO WORLD FROM BGSCRIPTS")

const sessionTokenKey = "session_token";

chrome.action.onClicked.addListener((tab) => {
    // chrome.runtime.sendMessage({ action: "toggleSlider" }) 不行 TODO 看看为啥
    chrome.tabs.sendMessage(tab.id, { action: "toggleSlider" })
    return true;
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openSignIn") {
        const baseUrl = getBaseUrl();
        const signInUrl = `${baseUrl}/api/auth/signin`;
        const resultPage = `${baseUrl}/login-success`;

        chrome.tabs.create({ url: `${signInUrl}?ext-redirect=${encodeURIComponent(resultPage)}` }, (tab) => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.url.match(resultPage) && changeInfo.url.match(baseUrl)) {
                    const url = new URL(changeInfo.url);
                    setToken(url.searchParams.get(sessionTokenKey));
                    // 在callback里面删除tab
                    chrome.tabs.sendMessage(sender.tab.id, { action: "tokenChange", sessionToken: url.searchParams.get(sessionTokenKey), url: changeInfo.url }).then(() => {
                        chrome.tabs.remove(tabId);
                    })
                }

                return true;
            })
            return true;
        });
    }
    return true;
});




