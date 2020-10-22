/* 
 * @Author: huhulove
 * @Date: 2019-07-30 10:12:50
 * @Email: 2373838484@qq.com
 * @Description: 操作网址参数 - 获取指定参数值
*/
export const hgetParams = (name) => {

    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    let r = decodeURI(window.location.search).substr(1).match(reg);

    if (r != null) return r[2]; return null;
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 11:58:04
 *@Description: 操作网址参数 - 获取网址中全部参数返回JSON对象
*/
export const hgetAllParams = (url = window.location.href) => {

    let _pa = url.substring(url.indexOf('?') + 1),

        _arrS = _pa.split('&'),

        _rs = {};

    for (let i = 0, _len = _arrS.length; i < _len; i++) {

        let pos = _arrS[i].indexOf('=');

        if (pos == -1) {

            continue;

        }

        let name = _arrS[i].substring(0, pos);

        let value = window.decodeURIComponent(_arrS[i].substring(pos + 1));

        _rs[name] = value;

    }

    return _rs;

}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 11:59:15
 *@Description: 操作网址参数 - 删除网址中的参数
*/
export const hdeleteParams = (name, url = window.location.href) => {

    let baseUrl = url.split('?')[0] + '?';

    let query = url.split('?')[1];

    if (query.indexOf(name) > -1) {

        let obj = {}

        let arr = query.split("&");

        for (let i = 0; i < arr.length; i++) {

            arr[i] = arr[i].split("=");

            obj[arr[i][0]] = arr[i][1];

        };

        delete obj[name];

        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");

        return url

    } else {

        return url;

    }
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 13:53:49
 *@Description: 浏览器内核 - WEB浏览器类型以及IE浏览器版本
*/
export const hbrowserType = () => {

    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

    let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器

    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器

    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器

    let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器

    let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器

    let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {

        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");

        reIE.test(userAgent);

        let fIEVersion = parseFloat(RegExp["$1"]);

        if (fIEVersion == 7) return "IE7"

        else if (fIEVersion == 8) return "IE8";

        else if (fIEVersion == 9) return "IE9";

        else if (fIEVersion == 10) return "IE10";

        else if (fIEVersion == 11) return "IE11";

        else return "IE7以下"//IE版本过低

    }

    if (isFF) return "FF";

    if (isOpera) return "Opera";

    if (isEdge) return "Edge";

    if (isSafari) return "Safari";

    if (isChrome) return "Chrome";
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 10:55:17
 * @Email: 2373838484@qq.com
 * @Description: 阿拉伯数字 - 转换成大写数字
*/
export const hnumberToUpper = (num) => {
    let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");

    let BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");

    let a = ("" + num).replace(/(^0*)/g, "").split(".");

    let k = 0;

    let re = "";

    for (let i = a[0].length - 1; i >= 0; i--) {

        switch (k) {

            case 0:

                re = BB[7] + re;

                break;

            case 4:

                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")

                    .test(a[0]))

                    re = BB[4] + re;

                break;

            case 8:

                re = BB[5] + re;

                BB[7] = BB[5];

                k = 0;

                break;
        }

        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)

            re = AA[0] + re;

        if (a[0].charAt(i) != 0)

            re = AA[a[0].charAt(i)] + BB[k % 4] + re;

        k++;

    }

    // 加上小数部分(如果有小数部分)
    if (a.length > 1) {

        re += BB[6];

        for (var i = 0; i < a[1].length; i++)

            re += AA[a[1].charAt(i)];

    }

    if (re == '一十')

        re = "十";

    if (re.match(/^一/) && re.length == 3)

        re = re.replace("一", "");

    return re;
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 13:55:52
 *@Description: 阿拉伯数字 - 转换大写金额
*/
export const hnumberToMoney = (num) => {
    let Num = num;
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num == "number") {

        Num = new String(Num);

    };

    Num = Num.replace(/,/g, "") //替换tomoney()中的“,”

    Num = Num.replace(/ /g, "") //替换tomoney()中的空格

    Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符

    if (isNaN(Num)) { //验证输入的字符是否为数字

        //alert("请检查小写金额是否正确");

        return "";

    };

    //字符处理完毕后开始转换，采用前后两部分分别转换
    let part = String(Num).split(".");

    let newchar = "";

    let lowerCaseNum = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

    //小数点前进行转化
    for (let i = part[0].length - 1; i >= 0; i--) {

        if (part[0].length > 10) {

            return "超过10亿了";

            //若数量超过拾亿单位，提示
        }

        let tmpnewchar = ""

        let perchar = part[0].charAt(i);

        tmpnewchar = lowerCaseNum[parseInt(perchar)] + tmpnewchar;

        switch (part[0].length - i - 1) {

            case 0:

                tmpnewchar = tmpnewchar + "元";

                break;

            case 1:

                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";

                break;

            case 2:

                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";

                break;

            case 3:

                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";

                break;

            case 4:

                tmpnewchar = tmpnewchar + "万";

                break;

            case 5:

                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";

                break;

            case 6:

                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";

                break;

            case 7:

                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";

                break;

            case 8:

                tmpnewchar = tmpnewchar + "亿";

                break;

            case 9:

                tmpnewchar = tmpnewchar + "拾";

                break;

        }

        newchar = tmpnewchar + newchar;

    }

    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {

        if (part[1].length > 2) {

            // alert("小数点之后只能保留两位,系统将自动截断");
            part[1] = part[1].substr(0, 2)

        }

        for (let i = 0; i < part[1].length; i++) {

            let tmpnewchar = "";

            let perchar = part[1].charAt(i);

            tmpnewchar = lowerCaseNum[parseInt(perchar)] + tmpnewchar;

            if (i == 0) tmpnewchar = tmpnewchar + "角";

            if (i == 1) tmpnewchar = tmpnewchar + "分";

            newchar = newchar + tmpnewchar;

        }

    }

    //替换所有无用汉字
    while (newchar.search("零零") != -1) {

        newchar = newchar.replace("零零", "零");
    }

    newchar = newchar.replace("零亿", "亿");

    newchar = newchar.replace("亿万", "亿");

    newchar = newchar.replace("零万", "万");

    newchar = newchar.replace("零元", "元");

    newchar = newchar.replace("零角", "");

    newchar = newchar.replace("零分", "");

    if (newchar.charAt(newchar.length - 1) == "元") {

        newchar = newchar + "整"

    }

    return newchar;
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 10:59:31
 * @Email: 2373838484@qq.com
 * @Description: 字符串 - 检测字符串类型
*/
export const hstrType = (str, type) => {

    switch (type) {

        case 'phone':   //手机号码

            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);

        case 'tel':     //座机

            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);

        case 'card':    //身份证

            return /^\d{15}|\d{18}$/.test(str);

        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线

            return /^[a-zA-Z]\w{5,17}$/.test(str)

        case 'postal':  //邮政编码

            return /[1-9]\d{5}(?!\d)/.test(str);

        case 'QQ':      //QQ号

            return /^[1-9][0-9]{4,9}$/.test(str);

        case 'email':   //邮箱

            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);

        case 'money':   //金额(小数点2位)

            return /^\d*(?:\.\d{0,2})?$/.test(str);

        case 'URL':     //网址

            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)

        case 'IP':      //IP

            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);

        case 'date':    //日期时间

            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)

        case 'number':  //数字

            return /^[0-9]$/.test(str);

        case 'english': //英文

            return /^[a-zA-Z]+$/.test(str);

        case 'chinese': //中文

            return /^[\u4E00-\u9FA5]+$/.test(str);

        case 'lower':   //小写

            return /^[a-z]+$/.test(str);

        case 'upper':   //大写

            return /^[A-Z]+$/.test(str);

        case 'HTML':    //HTML标记

            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);

        default:

            return true;

    }
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 14:01:51
 *@Description: 字符串 - 检测字符串密码强度
*/
export const hpasswordLevel = (str) => {
    var Lv = 0;

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

    if (/[\.|-|_]/.test(str)) {

        Lv++;

    }

    return Lv;
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 设置
*/
export const hsetStorage = (key, value) => {
    if (value == undefined || value == null) {
        console.warn("value值不能为undefined或者null");
        return false;
    }
    let _value = "";
    switch (typeof value) {
        case "number":
            _value = value;
            break;
        case "string":
            _value = value;
            break;
        case "object":
            _value = JSON.stringify(value);
            break;
    }
    localStorage.setStorage(key, _value)
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 读取
*/
export const hgetStorage = (key) => {
    let _value = localStorage.getStorage(key);
    try {
        let _newValue = JSON.parse(_value);
        return _newValue;
    } catch (error) {
        return _value
    }
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 移除指定字段
*/
export const hremoveStorage = (key) => {
    localStorage.removeStorage(key)
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 11:03:54
 * @Email: 2373838484@qq.com
 * @Description: 本地存储 - 移除所有字段
*/
export const hclearStorage = () => {
    localStorage.clearStorage();
}
/*
 * @Author: huhulove
 * @Date: 2019-09-09 11:20:45
 * @Email: 2373838484@qq.com
 * @Description: 日期 - 返回指定长度的月份集合
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
 * @return {Array} 数组
 *
 * @example   GetMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
 *
 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
*/
export const HgetMonths = (time, len, dir) => {

    let mm = new Date(time).getMonth();

    let yy = new Date(time).getFullYear();

    let direction = isNaN(dir) ? 3 : dir;

    let index = mm;

    let monthArr = [];

    let FormatNext = () => {

        let _arrn = [];

        for (let i = 0; i < len; i++) {

            index++;

            _arrn.push(index);

        }

        return _arrn;

    }

    let FormatPre = () => {

        let _arrp = [];

        for (let i = 1; i <= len; i++) {

            _arrp.push(index - i);

        }

        return hsort(_arrp, 1);

    }

    let FormatCurr = () => {

        let _arr = [];

        _arr = FormatPre();

        return _arr.concat([mm]).concat(FormatNext());

    }

    let YearMonth = (year, month) => {

        let miy = "";

        let nyear = "";

        let nmonth = "";

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

            nmonth = month

        }

        console.log(nmonth);

        return nyear + "-" + (nmonth + 1);

    }

    let ReturnMonth = (marr) => {

        let _arr = [];

        for (let i = 0, len = marr.length; i < len; i++) {

            _arr.push(YearMonth(yy, marr[i]));

        }

        return _arr;

    }

    switch (direction) {

        case 1:

            monthArr = FormatPre();

            return ReturnMonth(monthArr);

            break;

        case 2:

            monthArr = FormatNext();

            return ReturnMonth(monthArr);

            break;

        case 3:

            monthArr = FormatCurr();

            return ReturnMonth(monthArr);

            break;

    }
};
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-22 14:15:46
 * @Description: 日期 - 获取某月有多少天
 * @param    time 				[ "2018-2" ]
 * @return   Number
 * @explame  GetDatesOfMonth( "2018-2" )  => 28
 * 
 * 备注 ：对应的月份数字前不能加上0  即： 02 = 2
 *  
 */
export const hgetDatesOfMonth = (time) => {

    let date = new Date(time);

    let year = date.getFullYear();

    let mouth = date.getMonth() + 1;

    let days;

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {

        days = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28;

    } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {

        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31

    } else {

        //其他月份，天数为：30.
        days = 30

    }

    return days

};
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 14:22:08
 *@Description: 日期 - 一年当中某一天是星期几
*/
export const honeDay = (y, m, d) => {
    var myDate = new Date();
    myDate.setFullYear(y, m - 1, d);
    var week = myDate.getDay()
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
    }
}
/*
 * @ClassAuthor: huhulove
 * @Email: 2373838484@qq.com
 * @Date: 2020-10-22 14:22:23
 * @Description: 数组 - 数组进行简单排序
 * @param    arr  			[ [1,3,2,4,2,5,6] ]
 * @param    type 			[ 1 => 从小到大   2 => 从大到小   3 => 随机 ]
 * @example  Sort( [1,3,2,4,2,5,6], 2 ) = > [6, 5, 4, 3, 2, 2, 1]
 */
export const hsort = (arr, type) => {

    return arr.sort(function (a, b) {

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

    })

}






