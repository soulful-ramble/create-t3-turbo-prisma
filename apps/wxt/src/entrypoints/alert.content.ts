export default defineContentScript({
  matches: ['*://*.google.com/*'],
  runAt: 'document_start',
  main() {
    console.log('Hello content.');

    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // if (message.name === "show-dialog") {
      //   alert('show-dialog');
      // }
    })
  }
});
