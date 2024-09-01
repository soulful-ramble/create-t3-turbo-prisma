import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import rightStyleText from "data-text:./right.css";
import styleText from "data-text:~/global.css";
import { X } from "lucide-react";
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";
import { Suspense, useEffect, useState } from "react";

import { CreatePostForm, PostCardSkeleton, PostList } from "~compoents/Posts";
import { TokenUpdate } from "~compoents/TokenUpdate";
import { TRPCProvider } from "~utils/api";
import { useSignIn, useSignOut, useUser } from "~utils/auth";

export const config: PlasmoCSConfig = {
    // matches: ["https://*.plasmo.com/*"],
    matches: ["<all_urls>"],
    all_frames: true,
};

export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style");
    // https://docs.plasmo.com/quickstarts/with-tailwindcss
    const t = styleText.replaceAll(":root", ":host(plasmo-csui)");
    style.textContent = `
        ${rightStyleText}
        ${t}
    `;
    return style;
};

function ExtensionAuth() {
    const user = useUser();
    const signIn = useSignIn();
    const signOut = useSignOut();

    return (
        <div className="flex flex-col items-center">
            <div className="pb-2 text-center text-5xl font-bold text-foreground">
                Create <span className="text-primary">T3</span> Turbo
            </div>
            <span className="pb-2 text-center text-xl font-semibold text-black">
                {user?.name ? `Logged in as ${user?.name}` : "Not logged in"}
            </span>
            <Button
                className="w-48 text-center"
                onClick={() => (user ? signOut() : signIn())}
                color={"#5B65E9"}
            >
                {user ? "Sign Out" : "Sign In With Discord"}
            </Button>
        </div>
    );
}

const Content = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === "toggleSlider") {
                setShow((bool) => !bool);
            }
        });
    }, []);
    return (
        <div
            id="inner-wrapper"
            className={cn(
                show ? "translate-x-0" : "translate-x-full",
                "shadow-lg shadow-black bg-white",
            )}
        >
            <div className="flex justify-between flex-row-reverse">
                <Button
                    size={"icon"}
                    variant="ghost"
                    onClick={() => {
                        setShow(false);
                    }}
                >
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
    );
};

export default function App() {
    return (
        <TRPCProvider>
            <Content />
        </TRPCProvider>
    );
}
