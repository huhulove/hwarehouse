axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:39:31
 *@Description: axios - 请求拦截器
*/
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:40:54
 *@Description: axios - 响应拦截器
*/
axios.interceptors.response.use(
    response => {
        if (response.data.errCode == 2) {
            router.push({
                path: "/login",
                querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:41:14
 *@Description: axios - get 方法
*/
export function hrequestGet(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:45:53
 *@Description: axios - post 方法
*/
export function hrequestPost(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:46:20
 *@Description: axios - patch 方法
*/
export function hrequestPatch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:46:38
 *@Description: axios - put 方法
*/
export function hrequestPut(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}