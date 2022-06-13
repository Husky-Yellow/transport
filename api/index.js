import request from "@/utils/request";

/** 登陆
 * @param {String} data.phonenum 手机号
 * @param {String} data.password 密码
 */
 export const login = data => request({
    url: '/api/login/cangKuUserLogin',
    method: "post",
    data
})

/** 供应商端订单展示
 * @param {Number} data.type 1:货车驾驶员;2:返修
 * @param {String} data.page 分页
 * @param {String} data.num 分页
 * @link https://www.showdoc.com.cn/1905271757088925/8705220544635051
 */
 export const gysUserStaffShow = data => request({
    url: "/api/gys/userStaff/show",
    method: "post",
    data
})

/** 供应商端订单展示
 * @param {String} data.type 1:预约;2:取货;3:维修
 * @param {String} data.status 1:生成订单->仓库端待审核;2:仓库审核通过;3:仓库审核拒绝;4:仓库接受成功;5:仓库拒绝接受6撤销
 * @param {String} data.page 分页
 * @param {String} data.num 分页
 * @link https://www.showdoc.com.cn/1905271757088925/8705259227905710
 */
export const orderOrderList = data => request({
    url: '/api/gys/order/orderList',
    method: "post",
    data
})

/** 供应商端展示人员添加和修改
 * @param {String} data.type 1:货车驾驶员;2:返修
 * @param {String} data.id id存在修改接口,不存在添加接口
 * @param {String} data.tel 电话号
 * @param {String} data.name 姓名
 * @param {String} data.license_plate 车牌照 当添加驾驶员才传
 * @link https://www.showdoc.com.cn/1905271757088925/8705231215525608
 */
export const userStaffEditPost = data => request({
    url: '/api/gys/userStaff/editPost',
    method: "post",
    data
})

/** 供应商撤单
 * @param {String} data.id 订单id
 * @link https://www.showdoc.com.cn/1905271757088925/8705277575299433
 */
export const ordeUuserCancel = data => request({
    url: '/api/gys/order/userCancel',
    method: "post",
    data
})