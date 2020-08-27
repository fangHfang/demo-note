import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取发票产品列表
  GetFaPiaoListPage: function (data) {
    return axios.get('/B2B/PC_FaPiao_Product/GetListForB2B', data)
  },
  // 获取发票
  GetDetailInfo: function (data) {
    return axios.get('/B2B/PC_FaPiao_Product/GetDetailInfo', data)
  },
  // 获取发票订单列表
  GetListPage: function (data) {
    return axios.get('/B2B/PC_FaPiao_Order/GetListPage', data)
  },
  // 获取发票订单详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_FaPiao_Order/GetDetail', data)
  }
}
export default serveHttp
