- [网址参数](#网址参数)
  - [hgetParams](#hgetparams)
  - [hgetAllParams](#hgetallparams)
  - [hdeleteParams](#hdeleteparams)
- [浏览器内核](#浏览器内核)
  - [hbrowserType](#hbrowsertype)
- [数字](#数字)
  - [hnumberToUpper](#hnumbertoupper)
  - [hnumberToMoney](#hnumbertomoney)
  - [hnumberRandom](#hnumberrandom)
  - [hnumberCompute](#hnumbercompute)
- [字符串](#字符串)
  - [hstrType](#hstrtype)
  - [hstrLevel](#hstrlevel)
  - [hstrTrim](#hstrtrim)
  - [hstrSizeSwitch](#hstrsizeswitch)
  - [hstrFilterTag](#hstrfiltertag)
- [本地存储](#本地存储)
  - [hstorageSet](#hstorageset)
  - [hstorageGet](#hstorageget)
  - [hstorageRemove](#hstorageremove)
  - [hstorageClear](#hstorageclear)
- [时间](#时间)
  - [hmonthRange](#hmonthrange)
  - [hdateInMonth](#hdateinmonth)
  - [hdateRange](#hdaterange)
  - [hdateInYear](#hdateinyear)
  - [hdateFirstInYear](#hdatefirstinyear)
  - [hdateLastInYear](#hdatelastinyear)
  - [hdateIndexInYear](#hdateindexinyear)
  - [hdateByDateIndex](#hdatebydateindex)
  - [hdateSEByWeekIndex](#hdatesebyweekindex)
  - [hweekIndexByDate](#hweekindexbydate)
  - [hdayByDate](#hdaybydate)
  - [htimeBySeconds](#htimebyseconds)
- [数组](#数组)
  - [harrSort](#harrsort)
  - [harrUnique](#harrunique)
  - [harrUnion](#harrunion)
  - [harrIntersect](#harrintersect)
  - [harrRemove](#harrremove)
  - [harrMax](#harrmax)
  - [harrMin](#harrmin)
  - [harrSum](#harrsum)
  - [harrAverage](#harraverage)



## 网址参数

### hgetParams

获取网址中指定查询参数的值

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明         |
| :--- | :----- | ------ | ---- | ------------ |
| name | string |        | 是   | 查询参数名称 |

返回值：

| 查询参数 | 返回值 | 类型   |
| -------- | ------ | ------ |
| 不存在   | null   |        |
| 存在     | 参数值 | string |

### hgetAllParams

获取网址中所有查询参数的值

参数：

| 属性 | 类型   | 默认值   | 必填 |
| ---- | ------ | -------- | ---- |
| url  | string | 当前网址 | 是   |

返回值：

| 查询参数 | 返回值    | 类型   | 说明                                    |
| -------- | --------- | ------ | --------------------------------------- |
| 不存在   | null      |        |                                         |
| 存在     | json 对象 | object | 查询参数名称为 key,  查询参数值为 value |

### hdeleteParams

删除网址中指定的参数

参数：

| 属性 | 类型   | 默认值   | 必填 | 说明           |
| ---- | ------ | -------- | ---- | -------------- |
| name | string |          | 是   | 删除字段的名称 |
| url  | string | 当前网址 | 否   |                |

返回值：

| 参数   | 返回值         | 类型   |
| ------ | -------------- | ------ |
| 存在   | 删除之后的网址 | string |
| 不存在 | 原来传入的网址 | string |

## 浏览器内核

### hbrowserType

WEB浏览器类型以及IE浏览器版本

参数：无

返回值：

| 返回值                    | 类型   | 说明                            |
| ------------------------- | ------ | ------------------------------- |
| IE7，IE8，IE9，IE10，IE11 | string | IE7，IE8，IE9，IE10，IE11浏览器 |
| IE7以下                   | string | IE7以下的低版本浏览器           |
| FF                        | string | 火狐浏览器                      |
| Opera                     | string | 欧朋浏览器                      |
| Edge                      | string | Edge浏览器                      |
| Safari                    | string | 苹果浏览器                      |
| Chrome                    | string | 谷歌浏览器                      |

## 数字

### hnumberToUpper

将数字转换为大写数字（汉字写法）

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明        |
| ---- | ------ | ------ | ---- | ----------- |
| num  | number |        | 是   | >= 0 的数字 |

返回值：

| 返回值                                           | 类型   |
| ------------------------------------------------ | ------ |
| 例如：一亿二千三百四十五万六千七百八十九点二三六 | string |

### hnumberToMoney

将数字转换为金额数字（金额写法）

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明       |
| ---- | ------ | ------ | ---- | ---------- |
| num  | number |        | 是   | >=0 的数字 |

返回值：

| 返回值                                                 | 类型   |
| ------------------------------------------------------ | ------ |
| 例如：壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元贰角叁分陆厘 | string |

### hnumberRandom

指定范围的随机数（整数）

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明       |
| ---- | ------ | ------ | ---- | ---------- |
| min  | number |        | 是   | 最小整数值 |
| max  | number |        | 是   | 最大整数值 |

返回值：规定范围内的一个随机数

### hnumberCompute

解决 JS 中浮点数的基本运算 （ +， -，* ）

参数：

| 属性        | 类型   | 默认值 | 必填 | 说明       |
| ----------- | ------ | ------ | ---- | ---------- |
| num1        | number |        | 是   | >=0 的数字 |
| num2        | number |        | 是   | >=0 的数字 |
| computeType | string | +      | 否   | 运算符号   |

返回值：>=0 的数字

## 字符串

### hstrType

检测字符串是否指定的类型

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明         |
| ---- | ------ | ------ | ---- | ------------ |
| str  | string |        | 是   |              |
| type | string |        | 是   | 指定的类型值 |

type 值:

| 值      | 说明                                                       |
| ------- | ---------------------------------------------------------- |
| phone   | 手机号码                                                   |
| tel     | 座机                                                       |
| card    | 身份证号码                                                 |
| pwd     | 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线 |
| postal  | 邮政编码                                                   |
| QQ      | QQ号码                                                     |
| email   | 邮箱                                                       |
| money   | 金额(小数点2位)                                            |
| URL     | 网址                                                       |
| IP      | IP                                                         |
| date    | 日期时间                                                   |
| number  | 数字                                                       |
| english | 英文                                                       |
| chinese | 中文                                                       |
| lower   | 小写                                                       |
| upper   | 大写                                                       |
| HTML    | HTML标记                                                   |

返回值：如果 type 值在规定范围内，则返回 true / false，如果不在范围内，则返回 true。

### hstrLevel

检测字符串安全等级

参数：

| 属性 | 类型   | 默认值 | 必填 |
| ---- | ------ | ------ | ---- |
| str  | string |        | 是   |

返回值：等级数（0，1，2，3，4）

### hstrTrim

去掉字符串中的空格

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明     |
| ---- | ------ | ------ | ---- | -------- |
| str  | string |        | 是   |          |
| type | number | 1      | 是   | 空格位置 |

type值：

| 值   | 说明     |
| ---- | -------- |
| 1    | 所有空格 |
| 2    | 前后空格 |
| 3    | 前空格   |
| 4    | 后空格   |

返回值：去掉空格之后的字符串

### hstrSizeSwitch

字符串大小写切换

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明     |
| ---- | ------ | ------ | ---- | -------- |
| str  | string |        | 是   |          |
| type | number | 4      | 是   | 转换类型 |

type值：

| 值   | 类型   | 说明       |
| ---- | ------ | ---------- |
| 1    | number | 首字母大写 |
| 2    | number | 首字母小写 |
| 3    | number | 大小写转换 |
| 4    | number | 全部大写   |
| 5    | number | 全部小写   |

### hstrFilterTag

过滤字符串中 html 代码(把<>转换)

参数：

| 属性 | 类型   | 默认值 | 必填 |
| ---- | ------ | ------ | ---- |
| str  | string |        | 是   |

返回值：过滤之后的字符串

## 本地存储

### hstorageSet

设置 localstorage

参数：

| 属性  | 类型                   | 默认值 | 必填 | 说明                           |
| ----- | ---------------------- | ------ | ---- | ------------------------------ |
| key   | string                 |        | 是   |                                |
| value | number\|string\|object |        | 是   | value值不能为undefined或者null |

返回值：无

### hstorageGet

读取 localstorage

参数：

| 属性 | 类型   | 默认值 | 必填 |
| ---- | ------ | ------ | ---- |
| key  | string |        | 是   |

返回值：如果JSON.parse() 方法格式化成功，则返回格式化后的数据，如果不成功则返回初始存储的字符串。

### hstorageRemove

移除指定字段 localstorage

参数：

| 属性 | 类型   | 默认值 | 必填 |
| ---- | ------ | ------ | ---- |
| key  | string |        | 是   |

返回值：无

### hstorageClear

清除 localstorage

参数：无

返回值：无

## 时间

### hmonthRange

获取指定长度的月份集合

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明           |
| ---- | ------ | ------ | ---- | -------------- |
| date | string |        | 是   | 格式为：xxxx-x |
| len  | number |        | 是   | 月数量         |
| dir  | number | 3      | 否   | 方向           |

dir值：

| 值   | 说明       |
| ---- | ---------- |
| 1    | 前几个月   |
| 2    | 后几个月   |
| 3    | 前后几个月 |

返回值：指定月份长度的数组

### hdateInMonth

获取指定月份有多少天

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明           |
| ---- | ------ | ------ | ---- | -------------- |
| date | string |        | 是   | 格式为：xxxx-x |

返回值：天数

### hdateRange

获取指定长度的天数集合

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明              |
| ---- | ------ | ------ | ---- | ----------------- |
| date | string |        | 是   | 格式为：xxxx-x-xx |
| len  | number |        | 是   | 天数量            |
| dir  | number | 3      | 否   | 方向              |

dir值：

| 值   | 说明     |
| ---- | -------- |
| 1    | 前几天   |
| 2    | 后几天   |
| 3    | 前后几天 |

返回值：指定长度的天数集合

### hdateInYear

获取指定年份的天数

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明               |
| ---- | ------ | ------ | ---- | ------------------ |
| time | number |        | 是   | 具体年份或者毫秒数 |

返回值：天数

### hdateFirstInYear

获取指定年份的第一天

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明               |
| ---- | ------ | ------ | ---- | ------------------ |
| time | number |        | 是   | 具体年份或者毫秒数 |

返回值：格式为 xxxx-01-01 00:00:00

### hdateLastInYear

获取指定年份的最后一天

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明               |
| ---- | ------ | ------ | ---- | ------------------ |
| time | number |        | 是   | 具体年份或者毫秒数 |

返回值：格式为 xxxx-12-xx 23:59:59

### hdateIndexInYear

获取指定日期在当年中是第几天

参数：

| 属性 | 类型          | 默认值 | 必填 | 说明                                    |
| ---- | ------------- | ------ | ---- | --------------------------------------- |
| date | string/number |        | 是   | 1、日期格式：xxxx-x-xx; <br />2、毫秒数 |

返回值：第几天

### hdateByDateIndex

根据一年当中第几天返回日期

参数：

| 属性    | 类型   | 默认值 | 必填 |
| ------- | ------ | ------ | ---- |
| year    | number |        | 是   |
| dateNum | number |        | 是   |

返回值：xxxx-x-xx

### hdateSEByWeekIndex

根据一年当中第几周返回当周的开始日期和结束日期

参数：

| 属性      | 类型   | 默认值 | 必填 | 说明   |
| --------- | ------ | ------ | ---- | ------ |
| year      | number |        | 是   | 年份   |
| weekIndex | number |        | 是   | 周索引 |

返回值：json object

| 字段      | 说明     |
| --------- | -------- |
| startDate | 开始日期 |
| endDate   | 结束日期 |

### hweekIndexByDate

获取某个日期在一年的第几周

参数：

| 属性 | 类型          | 默认值 | 必填 | 说明                                    |
| ---- | ------------- | ------ | ---- | --------------------------------------- |
| date | string/number |        | 是   | 1、日期格式：xxxx-x-xx; <br />2、毫秒数 |

返回值：第几周

### hdayByDate

一年当中某一天是星期几

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明 |
| ---- | ------ | ------ | ---- | ---- |
| y    | number |        | 是   | 年   |
| m    | number |        | 是   | 月   |
| d    | number |        | 是   | 日   |

返回值：星期 x

### htimeBySeconds

秒数转换为时分秒字符串

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明     |
| ---- | ------ | ------ | ---- | -------- |
| s    | number |        | 是   | 秒数     |
| type | string |        | 否   | 转换类型 |

type值：

| 值   | 说明 |
| ---- | ---- |
| h    | 小时 |
| m    | 分钟 |
| s    | 秒   |

返回值：例如：1h2m3s

## 数组

### harrSort

数组进行简单排序

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明     |
| ---- | ------ | ------ | ---- | -------- |
| arr  | object |        | 是   |          |
| type | number |        | 是   | 排序方式 |

type值：

| 值   | 说明     |
| ---- | -------- |
| 1    | 从小到大 |
| 2    | 从大到小 |
| 3    | 随机     |

返回值：数组

### harrUnique

数组去重

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明     |
| ---- | ------ | ------ | ---- | -------- |
| arr  | object |        | 是   |          |
| type | number |        | 是   | 去重类型 |

type值：

| 值   | 说明       |
| ---- | ---------- |
| 1    | 严格去重   |
| !1   | 非严格去重 |

返回值：数组

### harrUnion

两个数组的并集

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明  |
| ---- | ------ | ------ | ---- | ----- |
| a    | object |        | 是   | 数组A |
| b    | object |        | 是   | 数组B |

返回值：数组

### harrIntersect

两个数组的交集

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明  |
| ---- | ------ | ------ | ---- | ----- |
| a    | object |        | 是   | 数组A |
| b    | object |        | 是   | 数组B |

返回值：数组

### harrRemove

删除数组中的某个元素

参数：

| 属性 | 类型          | 默认值 | 必填 | 说明 |
| ---- | ------------- | ------ | ---- | ---- |
| arr  | object        |        | 是   | 数组 |
| item | number/string |        | 是   |      |

返回值：数组

### harrMax

数组中最大值

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明 |
| ---- | ------ | ------ | ---- | ---- |
| arr  | object |        | 是   | 数组 |

返回值：最大值

### harrMin

数组中最小值

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明 |
| ---- | ------ | ------ | ---- | ---- |
| arr  | object |        | 是   | 数组 |

返回值：最小值

### harrSum

数组中各项累加和

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明 |
| ---- | ------ | ------ | ---- | ---- |
| arr  | object |        | 是   | 数组 |

返回值：和

### harrAverage

数组平均值

参数：

| 属性 | 类型   | 默认值 | 必填 | 说明 |
| ---- | ------ | ------ | ---- | ---- |
| arr  | object |        | 是   | 数组 |

返回值：平均值