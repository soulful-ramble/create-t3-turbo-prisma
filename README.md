# Forked from

https://github.com/t3-oss/create-t3-turbo

# Technology stack

- Turborepo
- Next.js (for web)
- Prisma
- Trpc
- Tailwind
- Wxt | Plasmo (for browser extension)
  - https://cn.v2ex.com/t/1013150
- React Native (for mobile application)(missing tests, because I am not familiar with React Native.)

# About; Prisma

## Reference

Forked repo change prisam to drizzle
https://github.com/t3-oss/create-t3-turbo/pull/477/files#diff-f8de965273949793edc0fbfe249bb458c0becde39b2e141db087bcbf5d4ad5e3

# Bugfix

// bug: expo start fails
// https://github.com/t3-oss/create-t3-turbo/issues/1137
// https://github.com/Shopify/flash-list/issues/896#issuecomment-2254905572

# 浏览器插件登录

和expo很相似
expo是依靠服务端重定向到App的deep link.（有空总结一下）
插件也很类似，具体步骤如下

1. 在content script（页面1）点击登录按钮，会打开一个新tab，路由是 /api/auth/signin
2. 在新tab（页面2）登录成功后，服务端重定向到一个“成功页”，query参数带上token
3. 在新tab（页面2）background script监听到成功页链接被访问，就发送携带token的消息。
4. content script（页面2）接受token，并存储token，实现登录。
