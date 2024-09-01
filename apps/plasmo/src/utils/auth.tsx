import { api } from "./api";
import { deleteToken } from "./session-store";

export const signIn = async () => {
    await chrome.runtime.sendMessage({ action: "openSignIn" });
};

export const useUser = () => {
    const { data: session } = api.auth.getSession.useQuery();
    return session?.user ?? null;
};

export const useSignIn = () => {
    // const utils = api.useUtils();
    // const router = useRouter();

    return async () => {
        await signIn();
        // await utils.invalidate(); // TODO 要靠消息机制来异步实现，现在不行
        // router.replace("/");
        // TODO 更新UI｜路由
    };
};

export const useSignOut = () => {
    const utils = api.useUtils();
    const signOut = api.auth.signOut.useMutation();
    // const router = useRouter();

    return async () => {
        const res = await signOut.mutateAsync();
        if (!res.success) return;
        await deleteToken();
        await utils.invalidate();
        // router.replace("/");
    };
};
