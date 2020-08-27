import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取火车车站查询
  GetTrainStationList: function (data) {
    return axios.get('/B2B/PC_HuoChe_TongChengProduct/GetTrainStationList', data)
  },
  // 获取火车车站列表查询
  GetList: function (data) {
    return axios.get('/B2B/PC_HuoChe_TongChengProduct/GetList', data)
  },
  // 获取火车订单列表
  GetListOrder: function (data) {
    return axios.get('/B2B/PC_HuoChe_Order/GetList', data)
  },
  // 获取火车订单详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_HuoChe_Order/GetDetail', data)
  },
  // 取消火车订单
  CancelOrder: function (data) {
    return axios.post('/B2B/PC_HuoChe_Order/CancelOrder', data)
  }
}
export default serveHttp
