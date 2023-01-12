---
title: "HTML 中 lang 属性的设置"
date: "2023-01-11"
---

# HTML 中 lang 属性的设置

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
```

一个基础的 html 页面如上所示。抛开其他不谈，我们来研究一下 lang 到底应该怎么写。

## lang 属性

lang 属性定义了元素的语言，我们可以为html的所有元素设置其自己的语言
通常一个网页不会包含很多语言，所以我们通常只在`<html>`标签设置lang属性

lang的标准文件在[RFC5646 也被叫作 BCP47](https://datatracker.ietf.org/doc/html/rfc5646)
所有合法的值可以在 <http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry> 里查询，
不过页面很大，搜索起来也不是很方便

这里是一个[第三方小工具](https://r12a.github.io/app-subtags/)，可以搜索语言，验证属性是否合法

[MDN的参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)

对于简体中文的用户，lang 应该被设置成什么值有很多讨论，比如<https://www.zhihu.com/question/20797118>

## 烦了
资料写在上边了

我放弃了，写 **zh** 了


