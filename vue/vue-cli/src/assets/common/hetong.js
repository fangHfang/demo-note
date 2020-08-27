import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取合同列表
  GetHeTongListPage: function (data) {
    return axios.get('/B2B/PC_HeTong_Product/GetList', data)
  },
  // 获取合同列表
  GetHeTongTypeInfo: function (data) {
    return axios.get('/B2B/PC_HeTong_Product/GetHeTongTypeInfo', data)
  },
  // 获取合同订单列表
  GetListPageForB2B: function (data) {
    return axios.get('/B2B/PC_HeTong_Order/GetListPageForB2B', data)
  },
  // 获取合同订单详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_HeTong_Order/GetDetail', data)
  },
  // 购买合同
  HeTongAdd: function (data) {
    return axios.post('/B2B/PC_HeTong_Order/Add', data)
  },
  // 付款
  FuKuan: function (data) {
    return axios.post('/B2B/PC_HeTong_Order/FuKuan', data)
  }
}
export default serveHttp
