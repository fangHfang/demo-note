import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取关于我们列表
  GetListPage: function (data) {
    return axios.get('/B2B/PC_XinXi_GuanYuWoMen/GetListPage', data)
  },
  // 获取关于我们详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_XinXi_GuanYuWoMen/GetDetail', data)
  }
}
export default serveHttp
