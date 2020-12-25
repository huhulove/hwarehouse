import { Message } from 'element-ui';
import axios from 'axios';
const request = axios.create();

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:39:31
 *@Description: axios - 请求拦截器
 */
request.interceptors.request.use(
	config => {
		config.headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
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
request.interceptors.response.use(
	response => {
		const { code } = response.data;
		if (code === 401) {
			// 未授权
			router.push({
				path: '/login',
				querry: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转
			});
			hremoveStorage('token');
			return Promise.reject();
		}
		if (code === 500) {
			const { msg } = response.data;
			Message.error(msg);
			return Promise.reject();
		}
		if (code === 1000) {
			Message.error('请检查网络连接');
			return Promise.reject();
		}
		const { msg } = response.data;
		Message.closeAll();
		Message.success(msg);
		return response.data.result;
	},
	error => {
		Message.error('接口请求报错');
		return Promise.reject(error);
	}
);

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:41:14
 *@Description: axios - get 方法
 */
export function hgetRequest(url, params = {}) {
	return new Promise((resolve, reject) => {
		request
			.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err);
			});
	});
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:45:53
 *@Description: axios - post 方法
 */
export function hpostRequest(url, data = {}) {
	return new Promise((resolve, reject) => {
		request.post(url, data).then(
			response => {
				resolve(response.data);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:46:20
 *@Description: axios - patch 方法
 */
export function hpatchRequest(url, data = {}) {
	return new Promise((resolve, reject) => {
		request.patch(url, data).then(
			response => {
				resolve(response.data);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:46:38
 *@Description: axios - put 方法
 */
export function hputRequest(url, data = {}) {
	return new Promise((resolve, reject) => {
		request.put(url, data).then(
			response => {
				resolve(response.data);
			},
			err => {
				reject(err);
			}
		);
	});
}
