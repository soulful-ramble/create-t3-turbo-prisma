import { useEffect } from "react"
import { api } from "~/utils/api"


export const TokenUpdate = () => {
    const utils = api.useUtils()
    useEffect(() => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === "tokenChange") {
                console.log('token changed', message.sessionToken, message)
                utils.invalidate()
            }
        })
    }, [])

    return null
}

