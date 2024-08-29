import { useState, useEffect } from "react"
import { Button } from "@acme/ui/button"
import { X } from "lucide-react"
import styleText from "data-text:~/global.css"
import rightStyleText from "data-text:./right.css"
import type { PlasmoGetStyle } from "plasmo"
import type { PlasmoCSConfig } from "plasmo"
import { cn } from '@acme/ui';

export const config: PlasmoCSConfig = {
    matches: ["https://*.plasmo.com/*"],
    all_frames: true
}

export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style")
    // https://docs.plasmo.com/quickstarts/with-tailwindcss
    const t = styleText.replaceAll(':root', ':host(plasmo-csui)')
    style.textContent = `
        ${rightStyleText}
        ${t}
    `
    return style
}

const Content = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.name === "toggle-slider") {
                setShow(bool => !bool)
            }
        });
    }, [])
    return <div id="inner-wrapper"
        className={cn(show ? "translate-x-0" : "translate-x-full", "bg-pink-300")}
    >
        <div className='flex flex-row justify-between'>
            <Button>Custom button - right area</Button>
            <Button size={"icon"} onClick={() => {
                setShow(false)
            }}>
                <X />
            </Button>
        </div>

    </div>
}


export default Content
