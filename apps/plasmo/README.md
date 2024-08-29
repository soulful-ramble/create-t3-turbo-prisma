# Attention

1. 使用tailwind 时注意 tailwind 一些css变量声明在:root伪类上，会导致变量找不到。需要做一些额外处理。
   https://docs.plasmo.com/quickstarts/with-tailwindcss 末尾有写。

   ```javascript
   import cssText from "data-text:~style.css"

   export const getStyle = () => {
     const style = document.createElement("style")
     style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
     return style
   }
   ```

# Issue

整体体验可以，但有一些小问题

1. react 等依赖的版本若设置为`catlog:`,会报错，只能设置为明确版本

2. @acme/ui 包中代码 对自身的 import, 无法被识别，只能改为

```javascript
// import {cn } from '@acme/ui';
import { cn } from "."
```

3. 热更新较慢
