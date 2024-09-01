import { getBaseUrl } from "~/utils/base-url";
import { setToken } from "~/utils/session-store";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  const sessionTokenKey = "session_token";

  browser.action.onClicked.addListener((tab) => {
    // browser.runtime.sendMessage({ action: "toggleSlider" }) 不行 TODO 看看为啥
    browser.tabs.sendMessage(tab.id!, { action: "toggleSlider" });
    return true;
  })

  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "openSignIn") {
      const baseUrl = getBaseUrl();
      const signInUrl = `${baseUrl}/api/auth/signin`;
      const resultPage = `${baseUrl}/login-success`;

      const newTab = await browser.tabs.create({ url: `${signInUrl}?ext-redirect=${encodeURIComponent(resultPage)}` });
      browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === newTab.id && changeInfo.url?.match(resultPage) && changeInfo.url.match(baseUrl)) {
          const url = new URL(changeInfo.url);
          setToken(url.searchParams.get(sessionTokenKey)!);
          // 在callback里面删除tab
          browser.tabs.sendMessage(sender.tab!.id!, { action: "tokenChange", sessionToken: url.searchParams.get(sessionTokenKey), url: changeInfo.url }).then(() => {
            browser.tabs.remove(tabId);
          })
        }
        return true;
      })
      return true;
    }
    return true;
  });
});
