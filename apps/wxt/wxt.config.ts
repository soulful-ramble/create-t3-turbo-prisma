import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],

  srcDir: "src",

  manifest: {
    action: {}, // 没有这个没法给图标加事件
  }
});
