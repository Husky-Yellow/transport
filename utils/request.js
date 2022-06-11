import { getBaseUrl } from './baseurl'; //默认路径
import { urlParam } from "./index";
import store from '@/store'
const ERROR_MAP = {
    405:{
        title: '身份认证失效,请重新登录',
    },
}

/**
 * @param {String} config.url
 * @param {Object} config.data
 * @param {String} config.method
 * @returns
 */
const service = async (config = {}) => {
	return new Promise(async (resolve, reject) => {
        // console.log('%cconfig拦截, 拦截: ', 'color:blue', '', config);
        const { url, data = {}, method = 'POST' } = config;
		await uni.getNetworkType({
			async complete(res) {
				if (res.networkType === 'none') {
					uni.showToast({
						title: '网络较差，请检查网络',
						icon: 'none'
					})
					return reject({errMsg: '网络较差，请检查网络'})
				} else {
                    await uni.request({
						url: config.method === 'get' ? `${getBaseUrl()}${url}${urlParam(config.params)}` : `${getBaseUrl()}${url}`,
						data:{
							...data,
							token:store.getters.token || uni.getStorageSync('token') || ''
						},
						method: method.toUpperCase(),
						complete(res) {
                            // console.log('%c请求成功: ', 'color:green', res);
                            if (res.statusCode === 200) {
								return resolve(res.data)
                            } else if (res.statusCode === 405) {
								uni.showToast({
									title: ERROR_MAP[res.statusCode].title || '身份认证失效,请重新登录',
									icon: 'none',
								})
								// store.dispatch('user/resetToken')
								return reject('身份认证失效,请重新登录')
							} else if (res.errMsg === 'request:fail timeout' || res.errMsg === 'request:fail abort statusCode:-1 timeout') {
								uni.showToast({
									title: '接口超时',
									icon: 'none'
								})
								return reject({errmsg: '接口超时'})
							}
						}
					})
				}
			}
		})
	})
}
export default service