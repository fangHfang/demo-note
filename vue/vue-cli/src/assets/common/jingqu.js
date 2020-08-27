import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取景区列表
  GetListPageForB2B: function (data) {
    return axios.get('/B2B/PC_Scenic_Product/GetListPage', data)
  },
  // 获取景区详情
  GetDetailForB2B: function (data) {
    return axios.get('/B2B/PC_Scenic_Product/GetDetail', data)
  },
  // 获取酒店推荐列表
  GetJiuDianListForTuiJian: function (data) {
    return axios.get('/B2B/PC_Scenic_Product/GetJiuDianListForTuiJian', data)
  },
  // 获取酒店周边推荐列表
  GetJiuDianListForZhouBianTuiJian: function (data) {
    return axios.get('/B2B/PC_Scenic_Product/GetJiuDianListForZhouBianTuiJian', data)
  },
  // 获取附近酒店列表
  GetJiuDianListForFuJin: function (data) {
    return axios.get('/B2B/PC_Scenic_Product/GetJiuDianListForFuJin', data)
  },
  // 获取景区订单列表
  GetList: function (data) {
    return axios.get('/B2B/PC_Scenic_Order/GetList', data)
  },
  // 获取景区订单详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_Scenic_Order/GetDetail', data)
  }
}
export default serveHttp
