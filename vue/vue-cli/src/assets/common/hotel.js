import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取酒店列表
  GetListPageForB2B: function (data) {
    return axios.get('/B2B/PC_Hotel_Product/GetListPage', data)
  },
  // 获取酒店详情
  GetDetailForB2B: function (data) {
    return axios.get('/B2B/PC_Hotel_Product/GetDetail', data)
  },
  // 获取热门酒店列表
  GetListForReMen: function (data) {
    return axios.get('/B2B/PC_Hotel_Product/GetListForReMen', data)
  },
  // 获取周边推荐酒店列表
  GetListForTuiJian: function (data) {
    return axios.get('/B2B/PC_Hotel_Product/GetListForZhouBianTuiJian', data)
  },
  // 获取酒店订单列表
  GetList: function (data) {
    return axios.get('/B2B/PC_Hotel_Order/GetListPage', data)
  },
  // 获取酒店订单详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_Hotel_Order/GetDetail', data)
  },
  // 获取酒店预定信息
  GetYuDing: function (data) {
    return axios.get('/B2B/PC_Hotel_Order/GetYuDing', data)
  }
}
export default serveHttp
