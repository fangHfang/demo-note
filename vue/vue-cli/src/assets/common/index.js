import axios from '../../../plugin/axios'
const serveHttp = {
  // 登录
  login: function (data) {
    return axios.post('/B2B/Oauth/Login', data)
  },
  // 获取PC端站点+顶部图片+导航
  SiteInfo: function (data) {
    return axios.get('/B2B/PC_Site_Site/GetPCInfo_TopPic_DaoHang', data)
  },
  // 获取用户信息
  getUserInfo: function (data) {
    return axios.get('/B2B/PC_User_User/GetMyInfo', data)
  },
  // 幻灯片
  getBanner: function (data) {
    return axios.get('/B2B/PC_Site_Home/GetBanners', data)
  },
  // 获取中间导航及产品
  getBodyMuLu: function (data) {
    return axios.get('/B2B/PC_Site_Home/GetBodyLanMu', data)
  },
  // 获取顶部左侧导航
  leftLanMu: function (data) {
    return axios.get('/B2B/PC_Site_Home/GetLeftLanMu', data)
  },
  // 获取站点信息
  GetSiteInfo (data) {
    return axios.get('/B2B/PC_Site_Site/GetInfo', data)
  }
}
export default serveHttp
