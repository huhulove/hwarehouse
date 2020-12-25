// ----------------- 加载 public config.json 文件 --------------
import axios from 'axios';
import { Message } from 'element-ui';

export const huploadConfigJson = () => {
	return new Promise((resolve, reject) => {
		axios
			.get('/envConfig.json')
			.then(res => {
				resolve(res.data);
			})
			.catch(error => {
				Message.error('加载config.json文件出错！');
				reject(error);
			});
	});
};

// ---------------------- 网址参数 -----------------------------
/*
 * @Author: huhulove
 * @Date: 2019-07-30 10:12:50
 * @Email: 2373838484@qq.com
 * @Description: 网址参数 - 获取指定参数值
 */
export const hgetParams = name => {
	const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
	const r = decodeURI(window.location.search)
		.substr(1)
		.match(reg);

	if (r != null) return r[2];
	return null;
};
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 11:58:04
 *@Description: 网址参数 - 获取网址中全部参数返回JSON对象
 */
export const hgetAllParams = (url = window.location.href) => {
	const pa = url.substring(url.indexOf('?') + 1);
	const arrS = pa.split('&');
	const rs = {};
	for (let i = 0, len = _arrS.length; i < len; i++) {
		const pos = arrS[i].indexOf('=');
		if (pos !== -1) {
			const name = arrS[i].substring(0, pos);
			const value = window.decodeURIComponent(arrS[i].substring(pos + 1));
			rs[name] = value;
		}
	}
	return _rs;
};
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 11:59:15
 *@Description: 网址参数 - 删除网址中的参数
 */
export const hdeleteParams = (name, url = window.location.href) => {
	let tempUrl = url;
	const baseUrl = `${tempUrl.split('?')[0]}?`;
	const query = tempUrl.split('?')[1];
	if (query.indexOf(name) > -1) {
		const obj = {};
		const arr = query.split('&');
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].split('=');
			const zeroItem = arr[i][0];
			const firstItem = arr[i][1];
			obj[zeroItem] = firstItem;
		}
		delete obj[name];
		tempUrl = `${baseUrl}${JSON.stringify(obj)
			.replace(/["{}]/g, '')
			.replace(/:/g, '=')
			.replace(/,/g, '&')}`;
		return tempUrl;
	}
	return tempUrl;
};

// ---------------------- 浏览器内核 -----------------------------

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 13:53:49
 *@Description: 浏览器内核 - WEB浏览器类型以及IE浏览器版本
 */
export const hbrowserType = () => {
	const { userAgent } = navigator; // 取得浏览器的userAgent字符串
	const isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
	const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; // 判断是否IE浏览器
	const isEdge = userAgent.indexOf('Edge') > -1; // 判断是否IE的Edge浏览器
	const isFF = userAgent.indexOf('Firefox') > -1; // 判断是否Firefox浏览器
	const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1; // 判断是否Safari浏览器
	const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; // 判断Chrome浏览器
	if (isIE) {
		const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
		reIE.test(userAgent);
		const fIEVersion = parseFloat(RegExp[' $1 ']);
		if (fIEVersion === 7) {
			return 'IE7';
		}
		if (fIEVersion === 8) {
			return 'IE8';
		}
		if (fIEVersion === 9) {
			return 'IE9';
		}
		if (fIEVersion === 10) {
			return 'IE10';
		}
		if (fIEVersion === 11) {
			return 'IE11';
		}
		return 'IE7以下'; // IE版本过低
	}
	if (isFF) return 'FF';
	if (isOpera) return 'Opera';
	if (isEdge) return 'Edge';
	if (isSafari) return 'Safari';
	if (isChrome) return 'Chrome';
};

// ---------------------- 阿拉伯数字 -----------------------------

/*
 * @Author: huhulove
 * @Date: 2019-07-30 10:55:17
 * @Email: 2373838484@qq.com
 * @Description: 阿拉伯数字 - 转换成大写数字
 */
export const hnumberToUpper = num => {
	const AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
	const BB = ['', '十', '百', '千', '万', '亿', '点', ''];
	const a = num
		.toString()
		.replace(/(^0*)/g, '')
		.split('.');
	let k = 0;
	let re = '';
	for (let i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
			case 0:
				re = BB[7] + re;
				break;
			case 4: {
				const regStr = `0{4}//d{${a[0].length - i - 1}}$`;
				if (!new RegExp(regStr).test(a[0])) {
					re = BB[4] + re;
				}
				break;
			}
			case 8:
				re = BB[5] + re;
				[, , , , , BB[7]] = BB;
				k = 0;
				break;
			default:
				return;
		}
		if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) re = AA[0] + re;
		if (a[0].charAt(i) !== 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
		k++;
	}
	// 加上小数部分(如果有小数部分)
	if (a.length > 1) {
		re += BB[6];
		for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
	}
	if (re === '一十') re = '十';
	if (re.match(/^一/) && re.length === 3) re = re.replace('一', '');
	return re;
};
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 13:55:52
 *@Description: 阿拉伯数字 - 转换大写金额
 */
export const hnumberToMoney = num => {
	let Num = num;
	// 判断如果传递进来的不是字符的话转换为字符
	if (typeof Num === 'number') {
		Num = Num.toString();
	}
	Num = Num.replace(/,/g, ''); // 替换tomoney()中的“,”
	Num = Num.replace(/ /g, ''); // 替换tomoney()中的空格
	Num = Num.replace(/￥/g, ''); // 替换掉可能出现的￥字符
	const r = Number.isNaN(Num);
	if (r) {
		// 验证输入的字符是否为数字
		// alert("请检查小写金额是否正确");
		return '';
	}
	// 字符处理完毕后开始转换，采用前后两部分分别转换
	const part = String(Num).split('.');
	let newchar = '';
	const lowerCaseNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	// 小数点前进行转化
	for (let i = part[0].length - 1; i >= 0; i--) {
		if (part[0].length > 10) {
			return '超过10亿了';
			// 若数量超过拾亿单位，提示
		}
		let tmpnewchar = '';
		const perchar = part[0].charAt(i);
		tmpnewchar = lowerCaseNum[parseInt(perchar, 10)] + tmpnewchar;
		switch (part[0].length - i - 1) {
			case 0:
				tmpnewchar = `${tmpnewchar}元`;
				break;
			case 1:
				if (perchar !== 0) {
					tmpnewchar = `${tmpnewchar}拾`;
				}
				break;
			case 2:
				if (perchar !== 0) {
					tmpnewchar = `${tmpnewchar}佰`;
				}
				break;
			case 3:
				if (perchar !== 0) {
					tmpnewchar = `${tmpnewchar}仟`;
				}
				break;
			case 4:
				tmpnewchar = `${tmpnewchar}万`;
				break;
			case 5:
				if (perchar !== 0) {
					tmpnewchar = `${tmpnewchar}拾`;
				}
				break;
			case 6:
				if (perchar !== 0) {
					tmpnewchar = `${tmpnewchar}佰`;
				}
				break;
			case 7:
				if (perchar !== 0) {
					tmpnewchar = `${tmpnewchar}仟`;
				}
				break;
			case 8:
				tmpnewchar = `${tmpnewchar}亿`;

				break;

			case 9:
				tmpnewchar = `${tmpnewchar}拾`;
				break;
			default:
				return;
		}
		newchar = tmpnewchar + newchar;
	}
	// 小数点之后进行转化
	if (Num.indexOf('.') !== -1) {
		if (part[1].length > 2) {
			// alert("小数点之后只能保留两位,系统将自动截断");
			part[1] = part[1].substr(0, 2);
		}

		for (let i = 0; i < part[1].length; i++) {
			let tmpnewchar = '';

			const perchar = part[1].charAt(i);

			tmpnewchar = lowerCaseNum[parseInt(perchar, 10)] + tmpnewchar;
			if (i === 0) {
				tmpnewchar = `${tmpnewchar}角`;
			}
			if (i === 1) {
				tmpnewchar = `${tmpnewchar}分`;
			}
			if (i === 2) {
				tmpnewchar = `${tmpnewchar}厘`;
			}
			if (i === 3) {
				tmpnewchar = `${tmpnewchar}毫`;
			}
			newchar = `${newchar}${tmpnewchar}`;
		}
	}
	// 替换所有无用汉字
	while (newchar.search('零零') !== -1) {
		newchar = newchar.replace('零零', '零');
	}
	newchar = newchar.replace('零亿', '亿');
	newchar = newchar.replace('亿万', '亿');
	newchar = newchar.replace('零万', '万');
	newchar = newchar.replace('零元', '元');
	newchar = newchar.replace('零角', '');
	newchar = newchar.replace('零分', '');
	if (newchar.charAt(newchar.length - 1) === '元') {
		newchar = `${newchar}整`;
	}
	return newchar;
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 17:05:30
 * @Description: 阿拉伯数字 - 随机数范围
 */
export const hnumberRandom = (min, max) => {
	if (min && max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	}
	return null;
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 17:17:17
 * @param    {[String]}         runType [运算符号]
 * @Description: 阿拉伯数字 - 解决javascript浮点数四则运算( + - * / )运算BUG
 * 备注：该方法只适应于 参数1 和 参数2小数点后 3位 之内(含3)的计算  不支持除法
 */
export const hnumberCompute = (num1, num2, computeType = '+') => {
	let sq1 = null;
	let sq2 = null;
	let m = null;
	try {
		sq1 = num1.toString().split('.')[1].length;
	} catch (e) {
		sq1 = 0;
	}
	try {
		sq2 = num2.toString().split('.')[1].length;
	} catch (e) {
		sq2 = 0;
	}
	m = 10 ** Math.max(sq1, sq2);
	switch (computeType) {
		case '+':
			return (num1 * m + num2 * m) / m;
		case '-':
			return (num1 * m - num2 * m) / m;
		case '*':
			return (num1 * m * (num2 * m)) / (m * m);
		default:
			return undefined;
	}
};

// ---------------------- 字符串 -----------------------------

/*
 * @Author: huhulove
 * @Date: 2019-07-30 10:59:31
 * @Email: 2373838484@qq.com
 * @Description: 字符串 - 检测字符串类型
 */
export const hstrType = (str, type) => {
	switch (type) {
		case 'phone': // 手机号码
			return /^1[3|4|5|7|8][0-9]{9}$/.test(str);

		case 'tel': // 座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);

		case 'card': // 身份证
			return /^\d{15}|\d{18}$/.test(str);

		case 'pwd': // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^[a-zA-Z]\w{5,17}$/.test(str);

		case 'postal': // 邮政编码
			return /[0-9]\d{5}(?!\d)/.test(str);

		case 'QQ': // QQ号
			return /^[1-9][0-9]{4,10}$/.test(str);

		case 'email': // 邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);

		case 'money': // 金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);

		case 'URL': // 网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(str);

		case 'IP': // IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);

		case 'date': // 日期时间
			return /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})-(\d{2})-(\d{2})$/.test(str);

		case 'number': // 数字
			return /^[0-9]$/.test(str);

		case 'english': // 英文
			return /^[a-zA-Z]+$/.test(str);

		case 'chinese': // 中文
			return /^[\u4E00-\u9FA5]+$/.test(str);

		case 'lower': // 小写
			return /^[a-z]+$/.test(str);

		case 'upper': // 大写
			return /^[A-Z]+$/.test(str);

		case 'HTML': // HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);

		default:
			return true;
	}
};
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 14:01:51
 *@Description: 字符串 - 检测字符串密码强度
 */
export const hstrLevel = str => {
	let Lv = 0;

	if (str.length < 6) {
		return Lv;
	}

	if (/[0-9]/.test(str)) {
		Lv++;
	}

	if (/[a-z]/.test(str)) {
		Lv++;
	}

	if (/[A-Z]/.test(str)) {
		Lv++;
	}

	if (/[.|-|_]/.test(str)) {
		Lv++;
	}

	return Lv;
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:59:42
 * @Description: 字符串 - 去除空格
 * @param    {[Number]}         type [ 1-所有空格  2-前后空格  3-前空格 4-后空格 ]
 */
export const hstrTrim = (str, type = 1) => {
	switch (type) {
		case 1:
			return str.replace(/\s+/g, '');

		case 2:
			return str.replace(/(^\s*)|(\s*$)/g, '');

		case 3:
			return str.replace(/(^\s*)/g, '');

		case 4:
			return str.replace(/(\s*$)/g, '');

		default:
			return str;
	}
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 17:01:14
 * @Description: 字符串 - 大小写转换
 * @param    {[Number]}         type [ 1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写 ]
 */
export const hstrSizeSwitch = (str, type = 4) => {
	switch (type) {
		case 1:
			return str.replace(/\b\w+\b/g, word => {
				return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
			});

		case 2:
			return str.replace(/\b\w+\b/g, word => {
				return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
			});

		case 3:
			return str
				.split('')
				.map(word => {
					if (/[a-z]/.test(word)) {
						return word.toUpperCase();
					}
					return word.toLowerCase();
				})
				.join('');
		case 4:
			return str.toUpperCase();
		case 5:
			return str.toLowerCase();
		default:
			return str;
	}
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 17:02:19
 * @Description: 字符串 - 过滤html代码(把<>转换)
 */
export const hstrFilterTag = str => {
	str = str.replace(/&/gi, '&amp;');

	str = str.replace(/</gi, '&lt;');

	str = str.replace(/>/gi, '&gt;');

	str = str.replace(' ', '&nbsp;');

	return str;
};

// ---------------------- 本地存储 -----------------------------

/*
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 设置
 */
export const hsetStorage = (key, value) => {
	if (value === undefined || value == null) {
		console.warn('value值不能为undefined或者null');
		return false;
	}
	let value_temp = '';
	switch (typeof value) {
		case 'number':
			value_temp = value;
			break;
		case 'string':
			value_temp = value;
			break;
		case 'object':
			value_temp = JSON.stringify(value);
			break;
		default:
	}
	// localStorage.setStorage(key, _value)
	localStorage.setItem(key, value_temp);
};
/*
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 读取
 */
export const hgetStorage = key => {
	// let _value = localStorage.getStorage(key);
	const value = localStorage.getItem(key);
	try {
		const newValue = JSON.parse(value);
		return newValue;
	} catch (error) {
		return value;
	}
};
/*
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 移除指定字段
 */
export const hremoveStorage = key => {
	// localStorage.removeStorage(key)
	localStorage.removeItem(key);
};
/*
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 移除所有字段
 */
export const hclearStorage = () => {
	// localStorage.clearStorage();
	localStorage.clear();
};

// ---------------------- 数组 -----------------------------

/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-22 14:22:23
 * @Description: 数组 - 数组进行简单排序
 * @param    arr  			[ [1,3,2,4,2,5,6] ]
 * @param    type 			[ 1 => 从小到大   2 => 从大到小   3 => 随机 ]
 * @example  Sort( [1,3,2,4,2,5,6], 2 ) = > [6, 5, 4, 3, 2, 2, 1]
 */
export const harrSort = (arr, type) => {
	return arr.sort((a, b) => {
		switch (type) {
			case 1:
				return a - b;

			case 2:
				return b - a;

			case 3:
				return Math.random() - 0.5;

			default:
				return arr;
		}
	});
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:40:25
 * @Description: 数组 - 数组去重
 * @param    {[Array]}          arr  []
 * @param    {[Number]}         type [ 1 => 严格去重 "2" / 2 数据类型不一样 不在去重范围内; !1 => 非严格去重 "2" / 2 数据类型不一样 在去重范围内; ]
 * @example  harrUnique([1,2,2,3,4,6,"2"], 1)  => [1, 2, 3, 4, 6, "2"]
 *           harrUnique([1,2,2,3,4,6,"2"])  => [1, 2, 3, 4, 6]
 */
export const harrUnique = (arr, type) => {
	let r = [];
	let NaNBol = true;

	for (let i = 0; i < arr.length; i++) {
		if (type !== 1) {
			for (let j = i + 1; j < arr.length; j++) {
				if (arr[i] === arr[j]) {
					arr.splice(j, 1); // console.log(arr[j]);
					j--;
				}
			}
			r = arr;
		}
		if (arr[i] !== r[i]) {
			if (NaNBol && r.indexOf(arr[i]) === -1) {
				r.push(arr[i]);
				NaNBol = false;
			}
		} else if (r.indexOf(arr[i]) === -1) {
			r.push(arr[i]);
		}
	}
	return r;
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:48:11
 * @Description: 数组 - 求两个集合的并集
 * @example  harrUnion([12,34,56], [65,12,34]) => [12, 34, 56, 65]
 */
export const harrUnion = (a, b) => {
	const newArr = a.concat(b);

	return harrUnique(newArr);
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:49:37
 * @Description: 数组 - 求两个集合的交集
 * @example  harrIntersect([2,3,4,3,5], [1,5,4,3,2,67]) => [2, 3, 4, 5]
 */
export const harrIntersect = (a, b) => {
	const a_temp = harrUnique(a);

	const r = [];

	a_temp.map(o => {
		if (b.indexOf(o) !== -1) {
			r.push(o);
		}
		return undefined;
	});

	return r;
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:50:57
 * @Description: 数组 - 删除其中一个元素
 * @example  $.fn.htools.Remove([1,2,3,4,56,7], 1) => [2, 3, 4, 56, 7]
 */
export const harrRemove = (arr, item) => {
	const index = arr.indexOf(item);

	if (index > -1) {
		arr.splice(index, 1);
	}

	return arr;
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:52:38
 * @Description: 数组 - 最大值
 * @param    {[Array]}         arr [description]
 */
export const harrMax = arr => {
	return Math.max.apply(null, arr);
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:54:01
 * @Description: 数组 - 最小值
 * @param    {[Array]}         arr [description]
 */
export const harrMin = arr => {
	return Math.min.apply(null, arr);
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:55:08
 * @Description: 数组 - 数组求和
 * @param    {[Array]}          arr [数字集合]
 */
export const harrSum = arr => {
	return arr.reduce((pre, cur) => {
		return pre + cur;
	});
};
/*
 * @Author: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 16:56:06
 * @Description: 数组 - 数组平均值
 * @param    {[Array]}         arr [数字集合]
 */
export const harrAverage = arr => {
	return harrSum(arr) / arr.length;
};

// ---------------------- 时间 -----------------------------

/*
 * @Author: huhulove
 * @Date: 2019-09-09 11:20:45
 * @Email: 2373838484@qq.com
 * @Description: 时间 - 返回指定长度的月份集合
 * @param  {date} 时间
 * @param  {len} 长度
 * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
 * @return {Array} 数组
 *
 * @example   GetMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
 *
 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
 */
export const hmonthRange = (date, len, dir = 3) => {
	const mm = new Date(date).getMonth();
	const yy = new Date(date).getFullYear();
	// let direction = isNaN(dir) ? 3 : dir;
	const direction = dir;
	let index = mm;
	let monthArr = [];
	const FormatNext = () => {
		const arrn_temp = [];
		for (let i = 0; i < len; i++) {
			index++;
			arrn_temp.push(index);
		}
		return arrn_temp;
	};
	const FormatPre = () => {
		const arrp_temp = [];
		for (let i = 1; i <= len; i++) {
			arrp_temp.push(index - i);
		}
		return harrSort(arrp_temp, 1);
	};
	const FormatCurr = () => {
		let arr_temp = [];
		arr_temp = FormatPre();
		return arr_temp.concat([mm]).concat(FormatNext());
	};
	const YearMonth = (year, month) => {
		let miy = '';
		let nyear = '';
		let nmonth = '';
		if (month < 0) {
			miy = Math.floor(month / 12);
			nyear = year + miy;
			nmonth = Math.abs(miy) * 12 + month;
		}
		if (month >= 12) {
			miy = Math.floor(month / 12);
			nyear = year + miy;
			nmonth = month % 12;
		}
		if (month >= 0 && month < 12) {
			miy = Math.floor(month / 12);
			nyear = year + miy;
			nmonth = month;
		}
		return `${nyear}-${nmonth + 1}`;
	};
	const ReturnMonth = marr => {
		const arr_temp = [];
		for (let i = 0, len = marr.length; i < len; i++) {
			arr_temp.push(YearMonth(yy, marr[i]));
		}
		return arr_temp;
	};

	switch (direction) {
		case 1:
			monthArr = FormatPre();
			return ReturnMonth(monthArr);
		case 2:
			monthArr = FormatNext();
			return ReturnMonth(monthArr);
		case 3:
			monthArr = FormatCurr();
			return ReturnMonth(monthArr);
		default:
			return undefined;
	}
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-22 14:15:46
 * @Description: 时间 - 获取某月有多少天
 * @param    date 				"2018-2"
 * @return   Number
 * @explame  GetDatesOfMonth( "2018-2" )  => 28
 *
 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
 *
 */
export const hdateInMonth = date => {
	const date_temp = new Date(date);
	const year = date_temp.getFullYear();
	const mouth = date_temp.getMonth() + 1;
	let days;
	// 当月份为二月时，根据闰年还是非闰年判断天数
	if (mouth === 2) {
		days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
	} else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
		// 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
		days = 31;
	} else {
		// 其他月份，天数为：30.
		days = 30;
	}
	return days;
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:10:39
 * @Description: 时间 - 返回指定长度的天数集合
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
 * @return {Array} 数组
 * @example date.GetDates('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
 *
 */
export const hdateRange = (date, len, diretion = 3) => {
	const tt = new Date(date);
	const getDay = day => {
		const t = new Date(date);
		t.setDate(t.getDate() + day);
		const m = t.getMonth() + 1;
		return `${t.getFullYear()}-${m}-${t.getDate()}`;
	};
	const arr = [];
	if (diretion === 1) {
		for (let i = 1; i <= len; i++) {
			arr.unshift(getDay(-i));
		}
	} else if (diretion === 2) {
		for (let i = 1; i <= len; i++) {
			arr.push(getDay(i));
		}
	} else {
		for (let i = 1; i <= len; i++) {
			arr.unshift(getDay(-i));
		}
		arr.push(`${tt.getFullYear()}-${tt.getMonth() + 1}-${tt.getDate()}`);
		for (let i = 1; i <= len; i++) {
			arr.push(getDay(i));
		}
	}
	// return diretion === 1
	//	? arr.concat([tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()])
	//	: diretion === 2 ? [tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()].concat(arr) : arr
	return arr;
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:38:54
 * @Description: 时间 - 获取某年的第一天
 * @param    time 				[ "2018" => ( String ) / 1517903434628 => ( Number ) ]
 * @return   String
 * @example  GetFirstDateOfYear( "2018" / 946684800000 ) => "2018-01-01 00:00:00" / "2000-01-01 00:00:00";
 */
export const hdateFirstInYear = time => {
	const year = new Date(time).getFullYear();
	return `${year}-01-01 00:00:00`;
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:41:17
 * @Description: 时间 - 获取某年最后一天
 * @param    time 				[ "2018" => ( String ) / 1517903434628 => ( Number ) ]
 * @return   String
 * @example  GetLastDateOfYear( "2018" / 946684800000 ) => "2018-12-31 23:59:59" / "2000-12-31 23:59:59";
 */
export const hdateLastInYear = time => {
	const year = new Date(time).getFullYear();
	const dateString = `${year}-12-01 00:00:00`;
	const endDay = hdateInMonth(dateString);
	return `${year}-12-${endDay} 23:59:59`;
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:30:29
 * @Description: 时间 - 获取某年有多少天
 * @param    time 					[ "2018" => ( String ) / 946684800000 => ( Number ) ]
 * @return   Number
 * @example  GetDatesOfYear( "2018" / 946684800000 ) => 365 / 366
 */
export const hdateInYear = time => {
	const firstDayYear = hdateFirstInYear(time);
	const lastDayYear = hdateLastInYear(time);
	const numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000;
	return Math.ceil(numSecond / (24 * 3600));
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:36:58
 * @Description: 时间 - 获取某个日期是当年中的第几天
 * @param    time 				[ "2018" => ( String ) / 1518192000000 => ( Number ) ]
 * @return   Number
 * @example  hdateIndexInYear( "2018-2-10" / 1518192000000 )   => 41 / 41
 *
 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
 */
export const hdateIndexInYear = date => {
	const firstDateYear = hdateFirstInYear(date);
	const numSecond = (new Date(date).getTime() - new Date(firstDateYear).getTime()) / 1000;
	return Math.floor(numSecond / (24 * 3600)) + 1;
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:44:21
 * @Description: 时间 - 根据一年当中第几天返回日期
 * @param {*} arr
 * @param {*} type
 */
export const hdateByDateIndex = (year, dateNum) => {
	const firstDate_mitime = new Date(`${year}-1-1`).getTime();
	const time = (dateNum - 1) * 24 * 60 * 60 * 1000;
	const allTime = firstDate_mitime + time;
	const myDate = new Date(allTime);
	return `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`;
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:51:40
 * @Description: 时间 - 根据一年当中第几周返回当周的开始日期和结束日期
 */
export const hdateSEByWeekIndex = (year, weekIndex) => {
	// 获取当年1月1号是星期几
	const startDateDay = new Date(year, 0, 1).getDay();
	// 如果year年1月1号刚好是星期天
	if (startDateDay === 0) {
		const allDate = (weekIndex - 1) * 7 - 1;
		return {
			startDate: hdateByDateIndex(year, allDate),
			endDate: hdateRange(hdateByDateIndex(year, allDate), 6, 2)[5]
		};
	}
	// 如果year年1月1号刚好不是星期天
	if (startDateDay !== 0) {
		if (weekIndex === 1) {
			const weekLastDay = 6;
			return {
				startDate: `${year}-1-1`,
				endDate: hdateRange(`${year}-1-1`, weekLastDay - startDateDay, 2)[weekLastDay - startDateDay - 1]
			};
		}
		const allDate = (weekIndex - 1) * 7;
		const startDate = hdateRange(`${year}-1-1`, startDateDay, 1)[0];
		return {
			startDate: hdateRange(startDate, allDate, 2)[allDate - 1],
			endDate: hdateRange(hdateRange(startDate, allDate, 2)[allDate - 1], 6, 2)[5]
		};
	}
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:42:47
 * @Description: 时间 - 获取某个日期在这一年的第几周
 * @param    date 				[ "2018" => ( String ) / 1518192000000 => ( Number ) ]
 * @param    type               0 -> 星期天     1  -> 星期一
 * @return   Number
 * @example  hweekIndexByDate( "2018-2-10" / 1518192000000 )   => 6 / 6
 *
 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
 *
 */
export const hweekIndexByDate = (date, type = 0) => {
	const numdays = hdateIndexInYear(date);
	const y = new Date(date).getFullYear();
	const firstDateDay = new Date(y, 0, 1).getDay();
	if (type === 0) {
		if (firstDateDay !== 0) {
			return Math.ceil((numdays + 6 - firstDateDay) / 7);
		}
		return Math.ceil(numdays / 7);
	}
	if (type === 1) {
		if (firstDateDay !== 1) {
			return Math.ceil((numdays + (firstDateDay === 0 ? 7 : firstDateDay - 1)) / 7);
		}
		return Math.ceil(numdays / 7);
	}
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-22 14:22:08
 * @Description: 时间 - 一年当中某一天是星期几
 */
export const hdayByDate = (y, m, d) => {
	const myDate = new Date();
	myDate.setFullYear(y, m - 1, d);
	const week = myDate.getDay();
	switch (week) {
		case 0:
			return '星期日';
		case 1:
			return '星期一';
		case 2:
			return '星期二';
		case 3:
			return '星期三';
		case 4:
			return '星期四';
		case 5:
			return '星期五';
		case 6:
			return '星期六';
		default:
	}
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-23 15:18:52
 * @Description: 时间 - 秒数转换为时分秒字符串
 * @param  {s} 秒数
 * @return {String} 字符串
 * @example htimeBySeconds(3610) // -> 1h0m10s
 *          htimeBySeconds(3610, "h")  // -> 1h
 */
export const htimeBySeconds = (s, type) => {
	const h = parseInt(s / 3600, 10);

	const m = parseInt((s - h * 3600) / 60, 10);

	const s_temp = s - h * 3600 - m * 60;

	switch (type) {
		case 'h':
			return `${h}h`;
		case 'm':
			return `${m}m`;
		case 's':
			return `${s_temp}s`;
		default:
			return `${h}h${m}m${s_temp}s`;
	}
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-12-10 12:03:48
 * @Description: 时间 - 格式化日期时间
 * @param  {time} 日期
 * @return {format} 日期格式
 * @example
 */
export const htimeFormat = (time, format = '{y}-{m}-{d} {h}:{i}:{s}') => {
	if (arguments.length === 0) {
		return null;
	}
	let date = null;
	if (typeof time === 'undefined' || time === null || time === 'null') {
		return '';
	}
	if (typeof time === 'object') {
		date = time;
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time, 10);
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time *= 1000;
		}
		date = new Date(time);
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	};
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key];
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value];
		}
		if (result.length > 0 && value < 10) {
			value = `0${value}`;
		}
		return value || 0;
	});
	return time_str;
};
