import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取航班列表
  GetJiPiaoListPage: function (data) {
    return axios.get('/B2B/PC_JiPiao_HaiJingProduct/GetJiPiaoListPage', data)
  },
  // 获取城市
  GetCity: function (data) {
    return axios.get('/B2B/PC_JiPiao_HaiJingProduct/GetCity', data)
  },
  // 获取航空公司
  GetAirlineEnum: function (data) {
    return axios.get('/B2B/PC_JiPiao_HaiJingProduct/GetAirlineEnum', data)
  },
  // 获取排序类型
  GetOrderTypeEnum: function (data) {
    return axios.get('/B2B/PC_JiPiao_HaiJingProduct/GetOrder_typeEnum', data)
  },
  // 获取排序方式
  GetOrderByEnum: function (data) {
    return axios.get('/B2B/PC_JiPiao_HaiJingProduct/GetOrder_byEnum', data)
  },
  // 获取舱位等级
  GetClassType: function (data) {
    return axios.get('/B2B/PC_JiPiao_HaiJingProduct/GetClass_Type', data)
  },
  // 获取航班动态
  GetShiKeListPage (data) {
    return axios.get('/B2B/PC_JiPiao_HaiJingProduct/GetShiKeListPage', data)
  },
  // 获取机票订单列表
  GetList (data) {
    return axios.get('/B2B/PC_JiPiao_Order/GetList', data)
  },
  // 获取机票订单详情
  GetDetail (data) {
    return axios.get('/B2B/PC_JiPiao_Order/GetDetail', data)
  },
  // 获取机票订单明细
  GetDetails (data) {
    return axios.get('/B2B/PC_JiPiao_Order/GetDetails', data)
  },
  // 获取机票订单名单
  GetMingDans (data) {
    return axios.get('/B2B/PC_JiPiao_Order/GetMingDans', data)
  },
  // 取消订单
  CanCelOrder (data) {
    return axios.post('/B2B/PC_JiPiao_Order/CanCelOrder', data)
  }
}
export default serveHttp
