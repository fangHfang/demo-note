import axios from '../../../plugin/axios'
const serveHttp = {
  // 获取公共字典
  GetZiDian: function (data) {
    return axios.get('/B2B/PC_Common/GetZiDian', data)
  },
  // 获取公共地点
  GetRegion: function (data) {
    return axios.get('/B2B/PC_Common/GetRegion', data)
  }
}
export default serveHttp
