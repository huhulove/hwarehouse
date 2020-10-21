/*
 *@Author: huhulove
 *@Date: 2019-07-23 16:33:29
 *@Email: 2373838484@qq.com
 *@Description: 数据请求
*/

// 请求基本函数
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
// post 请求
export const hrequestPost = (url, data, completeFn, headerData = {}) => {
    return request(url, "post", data, completeFn, headerData)
}
// get 请求
export const hrequestGet = (url, data, completeFn, headerData = {}) => {
    return request(url, "get", data, completeFn, headerData)
}
// form 请求
export const hrequestForm = (url, data, completeFn, headerData = { 'content-type': "application/x-www-form-urlencoded" }) => {
    return request(url, "post", data, completeFn, headerData)
}
// 上传文件
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
// 聊天窗口选择文件
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
// 选择图片
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





