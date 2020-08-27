import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取艺龙酒店列表列表
  GetListPage: function (data) {
    return axios.get('/B2B/PC_Hotel_ElongProduct/GetListPage', data)
  },
  // 获取艺龙酒店详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_Hotel_ElongProduct/GetDetail', data)
  },
  // 获取地点
  GetDestination: function (data) {
    return axios.get('/B2B/PC_Hotel_ElongProduct/GetDestination', data)
  }
}
export default serveHttp
