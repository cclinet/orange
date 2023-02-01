---
title: "CMake 在 subdirectory 中 使用 import"
date: "2023-02-01"
---

# CMake 在 subdirectory 中 使用 import

常规的 targets 是 global 的，然而 IMPORTED target 默认为 local，因此需要加上 GLOBAL

```cmake
add_library(xxx SHARED IMPORTED GLOBAL)
```

参考 <https://stackoverflow.com/questions/72935947/cmake-imported-targets-in-add-subdirectory-not-available-in-main-cmakelists-txt>

<https://cmake.org/cmake/help/latest/command/add_library.html#imported-libraries>
