import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://*.plasmo.com/*"]
}

window.addEventListener("load", () => {
  console.log("content script loaded")

})
