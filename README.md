# message.js
[![npm version](https://img.shields.io/npm/v/@yaohaixiao/message.js)](https://www.npmjs.com/package/@yaohaixiao/message.js)
![Gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/gh/yaohaixiao/message.js/message.min.js?compression=gzip&label=gzip%20size)
[![prettier code style](https://img.shields.io/badge/code_style-prettier-07b759.svg)](https://prettier.io)
[![Coverage](https://codecov.io/gh/yaohaixiao/message.js/branch/main/graph/badge.svg)](https://codecov.io/gh/yaohaixiao/message.js)
[![npm downloads](https://img.shields.io/npm/dt/@yaohaixiao/message.js)](https://npmcharts.com/compare/@yaohaixiao/message.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/message.js.svg)](https://github.com/yaohaixiao/message.js/blob/main/LICENSE)

message.js - 一个小巧实用的 JavaScript 提示信息工具库！


## 特点

- 原生 JavaScript 编写；
- 支持 UMD 规范；
- 提供功能独立的 ES6 模块代码；
- 配置灵活，调用简单；
- 体积小；



## 浏览器支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Opera |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edge                                                                                                                                                                                            | last 10 versions                                                                                                                                                                                           | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                   |




## 安装说明

message.js 提供多种安装方式的支持： npm 安装、加载 CDN 资源、以及本地资源调用。


### npm install

```shell
npm i @yaohaixiao/message.js
```

### CDN 调用

```html
<link href="https://cdn.jsdelivr.net/gh/yaohaixiao/message.js/message.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/message.js/message.min.js"></script>
```

### 调用本地JS文件

```html
<link href="path/to/message.min.css" rel="stylesheet" /></script>
<script src="path/to/message.min.js"></script>
```

## Usage

message.js 调用起来十分便捷，配置信息也十分丰富。

```js
// 导入 Message 模块
import Message from '@yaohaixiao/message.js/message'

// 使用静态方法
Message.info({
  duration: 5,
  message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
})


Message.success({
  round: true,
  message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
})


Message.warning({
  effect: 'light',
  message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
})


Message.error({
  effect: 'plain',
  message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
})


// 使用 Message 对象创建实例
// 详细 options 配置，请查看 API 文档中的说明
new Message({
  id: 'info-001',
  type: 'info',
  effect: 'default',
  round: false,
  offset: 30,
  duration: 6,
  delay: 2,
  message: '<a href="https://github.com/yaohaixiao/message.js">message.js</a> - 一个小巧实用的 JavaScript 提示信息工具库。',
  customClass: '',
  closable: true,
  visible: true,
  dangerouslyUseHTMLString: true,
  beforeClose: null
})
```


## API Documentation

API 文档地址：[https://yaohaixiao.github.io/message.js](https://yaohaixiao.github.io/message.js)


## License
Licensed under MIT License.
