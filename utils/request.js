import { getBaseUrl } from './baseurl'; //默认路径
import { urlParam } from "./index";

const ERROR_MAP = {
    50000:{
        title: '网络较差，请检查网络',
    },
    40000:{
        title: '请联系管理员',
    },
}

const service = async (config = {}) => {
	return new Promise(async (resolve, reject) => {
        console.log('%cconfig拦截, 拦截: ', 'color:blue', '', config);
        const { url, data = {}, method = 'POST' } = config;
		await uni.getNetworkType({
			async complete(res) {
				// networkType: wifi 2g 3g 4g 5g ethernet(有线网络) unknown(Android下不常见的网络类型) none(无网络)
				if (res.networkType === 'none') {
					uni.showToast({
						title: '网络较差，请检查网络',
						icon: 'none'
					})
					return reject({errMsg: '网络较差，请检查网络'})
				} else {
					// let token = uni.getStorageSync("token") || ''
                    await uni.request({
						url: config.method === 'get' ? `${getBaseUrl()}${url}${urlParam(config.params)}` : `${getBaseUrl()}${url}`,
						data,
						method: method.toUpperCase(),
						complete(res) {
                            console.log('%c请求成功: ', 'color:green', res);
                            if (res.statusCode === 200) {
								return resolve(res.data)
                                // if (res.data.code === 20000) {
                                //     return resolve(res.data)
                                // } else if (res.data.errcode || res.data.code) {
                                //     return resolve(res.data)
                                // } else {
                                //     // uni.showToast({
                                //     //     title: ERROR_MAP[res.data.code] || res.data.errmsg || res.errMsg ,
                                //     //     icon: 'none',
                                //     // })
                                //     return reject({errmsg : res.data.errmsg})
                                // }
                            }

							// 请求超时  request:fail timeout:浏览器提示信息  request:fail abort statusCode:-1 timeout: APP提示信息
							if (res.errMsg === 'request:fail timeout' || res.errMsg === 'request:fail abort statusCode:-1 timeout') {
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