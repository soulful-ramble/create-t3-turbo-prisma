# WXT + React

This template should help get you started developing with React in WXT.

# Issue

## Issue with resolve wildcard exports

详情：有一个相似的[https://github.com/vitejs/vite/issues/12284]问题，已经解决，不知道为什么仍然不能解析 wildcard exports
解决：packages/ui 被迫使用 named exports
