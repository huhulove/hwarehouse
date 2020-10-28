- [htoast](#htoast)
- [hwxGuideMask](#hwxguidemask)
- [hmobileType](#hmobiletype)

### htoast

轻提示

参数：

| 属性     | 类型     | 默认值         | 必填 | 说明     |
| -------- | -------- | -------------- | ---- | -------- |
| str      | string   |                | 是   |          |
| bgColor  | string   | rgba(0,0,0,.6) | 否   | 背景色   |
| txtColor | string   | \#fff          | 否   | 字体颜色 |
| callback | function |                | 否   | 回调函数 |

返回值：无

### hwxGuideMask

微信浏览器中的引导层

参数：

| 属性     | 类型   | 默认值 | 必填 | 说明           |
| -------- | ------ | ------ | ---- | -------------- |
| guideImg | string |        | 否   |                |
| maskImg  | string |        | 否   | 遮罩层图片路径 |

返回值：无

### hmobileType

手机浏览器内核

参数：无

返回值：

| 值      | 说明         |
| ------- | ------------ |
| mobile  | 手机浏览器   |
| ios     | 苹果浏览器   |
| android | 安卓浏览器   |
| IPhone  | IPhone浏览器 |
| IPad    | IPad浏览器   |
| weixin  | 微信浏览器   |
| weibo   | 微博浏览器   |

