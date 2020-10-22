/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:03:10
 *@Description: 本地存储数据 - 设置
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
	wx.setStorageSync(key, _value)
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:03:31
 *@Description: 本地存储数据 - 读取
*/
export const hgetStorage = (key) => {
	let _value = wx.getStorageSync(key);
	try {
		let _newValue = JSON.parse(_value);
		return _newValue;
	} catch (error) {
		return _value
	}
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:03:43
 *@Description: 本地存储数据 - 移除指定字段
*/
export const hremoveStorage = (key) => {
	wx.removeStorageSync(key)
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:03:57
 *@Description: 本地存储数据 - 移除所有字段
*/
export const hclearStorage = () => {
	wx.clearStorage();
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:06:48
 *@Description: 底部导航栏 - 设置角标
*/
export const hsetTabBarBadge = (index, content) => {
	wx.setTabBarBadge({
        index: index,
        text: content
    })
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:07:20
 *@Description:  底部导航栏 - 移除角标
*/
export const hremoveTabBarBadge = (index) => {
    wx.removeTabBarBadge({
        index: index
    })
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:35:57
 *@Description: 导航 - 页面跳转
*/
export const hnavigateTo = (url, type) => {
    switch (type) {
        case "tab":
            wx.switchTab({
                url: url,
            })
            break;
        case "redirect":
            wx.redirectTo({
                url: url,
            })
            break;
        default:
            wx.navigateTo({
                url: url,
            })
            break;
    }
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:35:57
 *@Description: 导航 - 页面回退
*/
export const hnavigateBack = (num) => {
    wx.navigateBack({
        delta: num
    })
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:36:58
 *@Description: loading - 显示
*/
export const hshowLoading = (title="加载中") => {
    return new Promise( (resolve, reject)=>{
        wx.showLoading({
            title: title,
            mask: true,
            success: function (res) { 
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            },
            complete: function (res) { },
        })
    } )
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:39:28
 *@Description: loading - 隐藏
*/
export const hhideLoading = ()=>{
    wx.hideLoading();
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:40:10
 *@Description: toast - 显示
*/
export const hshowToast = (content="操作成功", duration=1500, icon="none", image="") => {
    return new Promise( (resolve, reject)=>{
        wx.showToast({
            title: content,
            icon: icon,
            image: image,
            duration: duration,
            mask: true,
            success: function (res) { 
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            },
            complete: function (res) { },
        })
    } )
}
/*
 *@Author: huhulove
 *@Date: 2019-07-29 14:23:03
 *@Email: 2373838484@qq.com
 *@Description: 圆角按钮 canvas
 *@param {CanvasContext} ctx canvas上下文
 *@param {number} x 圆角矩形选区的左上角 x坐标
 *@param {number} y 圆角矩形选区的左上角 y坐标
 *@param {number} w 圆角矩形选区的宽度
 *@param {number} h 圆角矩形选区的高度
 *@param {number} r 圆角的半径
*/
export const hroundRect = (ctx, bgColor = "#fff", x, y, w, h, r) => {
   // 开始绘制
   ctx.beginPath()
   // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
   // 这里是使用 fill 还是 stroke都可以，二选一即可
   ctx.setFillStyle(bgColor)
   // ctx.setStrokeStyle('transparent')
   // 左上角
   ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

   // border-top
   ctx.moveTo(x + r, y)
   ctx.lineTo(x + w - r, y)
   ctx.lineTo(x + w, y + r)
   // 右上角
   ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

   // border-right
   ctx.lineTo(x + w, y + h - r)
   ctx.lineTo(x + w - r, y + h)
   // 右下角
   ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

   // border-bottom
   ctx.lineTo(x + r, y + h)
   ctx.lineTo(x, y + h - r)
   // 左下角
   ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

   // border-left
   ctx.lineTo(x, y + r)
   ctx.lineTo(x + r, y)

   // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
   ctx.fill()
   // ctx.stroke()
   ctx.closePath()
   // 剪切
   // ctx.clip()
}
/* 
 * @Author: huhulove
 * @Date: 2019-10-21 14:05:53
 * @Email: 2373838484@qq.com
 * @Description: 微信列表中更多数据通用方法   0 => 没有更多数据   1  => 有更多数据   -1  =>  下拉刷新操作或者页面初始化操作
*/
export const hmoreData = (page, oldData, data, isDefaultTip = true, defaultTip = "没有更多数据") => {
	if (page == 1) {
		return {
			isHasMore: -1,
			hdata: data
		};
	}
	if (page > 1) {
		if (!data.length) {
			isDefaultTip && hshowToast(defaultTip)
			return {
				isHasMore: 0,
				hdata: oldData
			};
		}
		let _newData = oldData.concat(data);
		return {
			isHasMore: 1,
			hdata: _newData
		}
	}
}

/* 
 * @Author: huhulove
 * @Date: 2019-10-25 11:12:25
 * @Email: 2373838484@qq.com
 * @Description: 一键复制  复制到剪切板
*/
export const hsetClipboard = (str)=>{
    return new Promise( (resolve, reject)=>{
        wx.setClipboardData({
            data : str,
            success (res){
                resolve(res)
            },
            fail (res){
                reject(res)
            }
        })
    } )
}

/* 
 * @Author: huhulove
 * @Date: 2019-10-25 14:59:40
 * @Email: 2373838484@qq.com
 * @Description: 选择微信收货地址
*/
export const hchooseAddress = ()=>{
    return new Promise( (resolve, reject)=>{
        wx.chooseAddress({
            success (res){
                resolve(res)
            }
        })
    } )
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:42:27
 *@Description: 数据请求 - 基本函数
*/
const request = (url, method, data, completeFn, headerData) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: method,
            data: data,
            header: headerData,
            success: (res) => {
                // 返回数据拦截后可以进行统一处理
                // resolve(res.data.data);

                // ppgo 项目
                if (res.data.code == 1) {       // 成功
                    resolve(res.data.data);
                }
                if (res.data.code == 2) {       // 服务报错
                    reject("请检查网络连接!");
                }
                if (res.data.code == 3) {       // 接口成功，用户输入数据错误
                    reject(res.data.message);
                }
                if (res.data.code == 0) {       // ？？？？
                    reject(res.data.message)
                }
            },
            fail: (res) => {
                reject(res);
            },
            complete: () => {
                completeFn && completeFn();
            }
        })
    })
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:43:45
 *@Description: 数据请求 - post 请求
*/
export const hrequestPost = (url, data, completeFn, headerData = {}) => {
    return request(url, "post", data, completeFn, headerData)
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:44:09
 *@Description: 数据请求 - get 请求
*/
export const hrequestGet = (url, data, completeFn, headerData = {}) => {
    return request(url, "get", data, completeFn, headerData)
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:44:31
 *@Description: 数据请求 - form 请求
*/
export const hrequestForm = (url, data, completeFn, headerData = { 'content-type': "application/x-www-form-urlencoded" }) => {
    return request(url, "post", data, completeFn, headerData)
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:44:48
 *@Description: 数据请求 - 上传文件
*/
export const huploadFile = (upload, tempFilePath, name = "file", completeFn, headerData = {}, formData = {}) => {
    // headerData = { "Content-type": "multipart/form-data" }
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: upload,
            filePath: tempFilePath,
            name: name,
            header: headerData,
            formData: formData,
            success: function (res) {
                resolve(JSON.parse(res.data).data)
            },
            fail: function (res) {
                reject(res)
            },
            complete: function () {
                completeFn && completeFn()
            }
        })
    })
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:46:27
 *@Description: 聊天窗口选择文件
*/
export const hchooseMessageFile = (count = 1, type = "file") => {
    return new Promise((resolve, reject) => {
        wx.chooseMessageFile({
            count: count,
            type: type,
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            }
        });
    });
}
/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 10:46:41
 *@Description: 选择图片
*/
export const hchooseImg = (count = 1, sizType = ["compressed"], sourceType) => {
    return new Promise( (resolve, reject)=>{
        wx.chooseImage({
            count : count,
            sizeType : sizType,
            sourceType : sourceType,
            success : function(res){
                resolve(res)
            },
            fail : function(res){
                reject(res)
            }
        })
    } )
}
/*
 *@Author: huhulove
 *@Date: 2019-07-24 09:56:07
 *@Email: 2373838484@qq.com
 *@Description: 授权信息
*/
export const hauthorize = (name) => {
    return new Promise((resolve, reject) => {
        let authName = `scope.${name}`;
        wx.getSetting({
            success(res) {
                if (res.authSetting[authName]) {
                    resolve(true)
                } else {
					resolve(false)
                }
            },
			fail(res){
				reject(res)
			}
        })
    })
}
/*
 *@Author: huhulove
 *@Date: 2019-07-24 10:06:43
 *@Email: 2373838484@qq.com
 *@Description: 微信登录
*/
export const hlogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err);
            }
        })
    })
}
/* 
 * @Author: huhulove
 * @Date: 2019-09-04 13:55:38
 * @Email: 2373838484@qq.com
 * @Description: 获取用户信息
*/
export const hgetUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: (res) => {
                resolve(res);
            },
            fail : (res)=>{
                reject(res);
            }
        })
    })
}





