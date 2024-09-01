import '~/global.css';
import './right.css'
import { useState, useEffect, Suspense } from "react"
import { Button } from "@acme/ui/button"
import { X } from "lucide-react"
import { cn } from '@acme/ui';
import { useSignIn, useSignOut, useUser } from "~/utils/auth"
import { TRPCProvider } from '~/utils/api'
import { TokenUpdate } from "~/compoents/TokenUpdate"
import { CreatePostForm, PostCardSkeleton, PostList } from "~/compoents/Posts"
import ReactDOM from 'react-dom/client';


function ExtensionAuth() {
    const user = useUser();
    const signIn = useSignIn();
    const signOut = useSignOut();

    return <div className="flex flex-col items-center">
        <div className="pb-2 text-center text-5xl font-bold text-foreground">
            Create <span className="text-primary">T3</span> Turbo
        </div>
        <span className="pb-2 text-center text-xl font-semibold text-black">
            {user?.name ? `Logged in as ${user.name}` : "Not logged in"}
        </span>
        <Button
            className="w-48 text-center"
            onClick={() => (user ? signOut() : signIn())}
            color={"#5B65E9"}
        >
            {user ? "Sign Out" : "Sign In With Discord"}
        </Button>
    </div>
}

const Content = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === "toggleSlider") {
                setShow(bool => !bool)
            }
        });
    }, [])
    return <div id="inner-wrapper"
        className={cn(show ? "translate-x-0" : "translate-x-full", "shadow-lg shadow-black bg-white")}
    >
        <div className='flex justify-between flex-row-reverse'>
            <Button size={"icon"} variant="ghost" onClick={() => {
                setShow(false)
            }}>
                <X />
            </Button>
        </div>
        <ExtensionAuth />
        <TokenUpdate />
        <div className="px-10 py-10">
            <CreatePostForm />
            <div className="w-full max-w-2xl overflow-y-scroll">
                <Suspense
                    fallback={
                        <div className="flex w-full flex-col gap-4">
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                        </div>
                    }
                >
                    <PostList />
                </Suspense>
            </div>
        </div>

    </div>
}

function App() {
    return <TRPCProvider>
        <Content />
    </TRPCProvider>
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
                root.render(<App />);
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

