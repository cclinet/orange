---
title: "一些笔记"
date: "2023-02-16"
---

## CMake 在 subdirectory 中 使用 import

常规的 targets 是 global 的，然而 IMPORTED target 默认为 local，因此需要加上 GLOBAL

```cmake
add_library(xxx SHARED IMPORTED GLOBAL)
```

参考 <https://stackoverflow.com/questions/72935947/cmake-imported-targets-in-add-subdirectory-not-available-in-main-cmakelists-txt>

<https://cmake.org/cmake/help/latest/command/add_library.html#imported-libraries>

## grml-zsh-config 中修改提示的颜色

在 `.zshrc.local` 中添加下列配置

```bash
zstyle ':prompt:grml:*:items:user' pre '%B%F{while}'
zstyle ':prompt:grml:*:items:host' pre '%B%F{blue}'
zstyle ':prompt:grml:*:items:path' pre '%F{reset}'
```

## C++ 构造函数

微软的文档 <https://learn.microsoft.com/zh-cn/cpp/cpp/constructors-cpp?view=msvc-170>
