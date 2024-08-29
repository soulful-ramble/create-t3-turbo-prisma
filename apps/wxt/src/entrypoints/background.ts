export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  browser.action.onClicked.addListener((tab) => {
    console.log("clicked", tab.id);
    if (!tab.id) throw new Error("tab id not found");
    browser.tabs.sendMessage(tab.id, {
      name: "show-dialog"
    });
    browser.tabs.sendMessage(tab.id, {
      name: "toggle-slider"
    });
  });

});
