/*
 *@ Author: huhulove
 *@ Date: 2019-07-30 10:04:28
 *@ Email: 2373838484@qq.com
 *@ Description: 轻提示
*/
export const htoast = (str, bgColor = "rgba(0,0,0,.6)", txtColor = "#fff", callback) => {

    let oToast = document.querySelector("#toast");

    oToast && oToast.remove();

    let oToastDiv = document.createElement('div');

    oToastDiv.setAttribute("id", "toast");

    let oToastCon = document.createElement("span");

    oToastCon.innerHTML = str;

    oToastCon.setAttribute("style", `background:${bgColor};color:${txtColor};padding:10px 20px;border-radius:20px;font-size:14px;max-width:88%;display:inline-block`)

    oToastDiv.appendChild(oToastCon)

    oToastDiv.setAttribute("style", `text-align:center;position:fixed;left:0;right:0;z-index:1111;margin:0 auto;bottom:60px;max-width:90%;opacity:1`)

    let oBody = document.querySelectorAll("body")[0];

    oBody.appendChild(oToastDiv);

    setTimeout(function () {

        oToastDiv.remove();

        callback && callback();

    }, 1500)

}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 10:09:43
 * @Email: 2373838484@qq.com
 * @Description: 微信浏览器中的引导层
*/
export const hwxGuideMask = (guideImg = "http://cdn.ttce.cn/ttce/images/iknow.png", maskImg = "http://cdn.ttce.cn/ttce/images/clickThis.png") => {

    var oMask = document.createElement("div");

    oMask.setAttribute("id", "amask");

    oMask.setAttribute("style", "background:rgba(0,0,0,.8);width:100%; height:100%; position:fixed; z-index:100; top:0; left:0; z-index:100000;")

    oMask.innerHTML = '<img style = "position:absolute; right:30px; top:0px; width:50%" src= "' + maskImg + '" /><img id = "ikown" style = "position:absolute; left:50%; margin-left:-15%; bottom:200px; width:30%" src = ' + guideImg + ' />'

    let oBody = document.querySelectorAll("body")[0];

    oBody.appendChild(oMask);

    var oIkownBtn = document.querySelector("#ikown");

    var oAmask = document.querySelector("#amask")

    oIkownBtn.onclick = function () {

        oBody.removeChild(oAmask)

    }
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 10:31:57
 * @Email: 2373838484@qq.com
 * @Description: 浏览器内核 - 手机类型   Android / IOS / Mobile 
*/
export const hmobileType = () => {
    let u = navigator.userAgent;

    let app = navigator.appVersion;

    return {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
        iPhone: u.indexOf("iPhone") > -1,
        iPad: u.indexOf("iPad") > -1,
        weixin: /MicroMessenger/i.test(u),
        weibo: /WeiBo/i.test(u),
    };
}
/* 
 * @Author: huhulove
 * @Date: 2019-07-30 10:34:18
 * @Email: 2373838484@qq.com
 * @Description: JS  尝试调起本地APP 否则跳转下载页面
*/
export const hjsCallApp = (callAppUrl, downloadAppUrl, time = 1000, mask = hwxGuideMask) => {

    if (hmobileType().weixin) {

        mask && mask();

    } else {

        if (callAppUrl) {

            window.location.href = callAppUrl;

        }

        setTimeout(function () {

            if (downloadAppUrl) {

                window.location.href = downloadAppUrl;

            }

        }, time);

    }
}













