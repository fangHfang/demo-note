import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取政务信息列表
  GetListPage: function (data) {
    return axios.get('/B2B/PC_XinXi_ZiXun/GetListPage', data)
  },
  // 获取政务信息列表
  GetListForReMen: function (data) {
    return axios.get('/B2B/PC_XinXi_ZiXun/GetListForReMen', data)
  },
  // 获取政务信息详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_XinXi_ZiXun/GetDetail', data)
  }
}
export default serveHttp
