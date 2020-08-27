import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取攻略信息列表
  GetListPage: function (data) {
    return axios.get('/B2B/PC_XinXi_GongLue/GetListPage', data)
  },
  // 获取攻略信息热门列表
  GetListForReMen: function (data) {
    return axios.get('/B2B/PC_XinXi_GongLue/GetListForReMen', data)
  },
  // 获取攻略信息详情
  GetDetail: function (data) {
    return axios.get('/B2B/WAP_XinXi_GongLue/GetDetail', data)
  }
}
export default serveHttp
