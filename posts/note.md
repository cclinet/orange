---
title: "一些笔记"
date: "2023-05-12"
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

## 在 CLion 中使用conda环境

```bash
. /opt/mambaforge/etc/profile.d/conda.sh
export PATH="/opt/mambaforge/bin:/home/cclin/.conda/envs/cuda/bin:$PATH"
conda activate cuda
echo $PATH
```

## 通过 proxy 链接 github

使用443端口

```bash
Host github.com
    HostName ssh.github.com
    Port 443
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_ed25519
    ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
```

## 查看 nvidia GPU 连接方式

```bash
nvidia-smi topo -m
```
