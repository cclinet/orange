---
title: "grml-zsh-config 中修改提示的颜色"
date: "2023-02-08"
---

# grml-zsh-config 中修改提示的颜色

在 `.zshrc.local` 中添加下列配置

```bash
zstyle ':prompt:grml:*:items:user' pre '%B%F{while}'
zstyle ':prompt:grml:*:items:host' pre '%B%F{blue}'
zstyle ':prompt:grml:*:items:path' pre '%F{reset}'
```
