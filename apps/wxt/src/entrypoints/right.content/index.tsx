// 1. Import the style
import { Button } from '@acme/ui/button';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { X } from "lucide-react"

import '~/global.css';
import './right.css'
import { cn } from '@acme/ui';

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


export default defineContentScript({
    matches: ['<all_urls>'],
    // 2. Set cssInjectionMode
    cssInjectionMode: 'ui',

    async main(ctx) {
        // 3. Define your UI
        const ui = await createShadowRootUi(ctx, {
            name: 'example-ui',
            position: 'overlay',
            onMount: (container) => {
                // Container is a body, and React warns when creating a root on the body, so create a wrapper div
                const app = document.createElement('div');
                container.append(app);

                // Create a root on the UI container and render a component
                const root = ReactDOM.createRoot(app);
                root.render(<Content />);
                return root;
            },
            onRemove: (root) => {
                // Unmount the root when the UI is removed
                root?.unmount();
            },
        });

        // 4. Mount the UI
        ui.mount();
    },
});

