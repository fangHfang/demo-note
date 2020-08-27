import axios from '../../../plugin/axios'
const serveHttp = {
  // 余额明细记录
  GetMoneyLogs: function (data) {
    return axios.get('/B2B/PC_User_User/GetMyMoneyLogs', data)
  },
  // 获取余额
  GetUserMoney: function (data) {
    return axios.get('/B2B/PC_User_User/GetMyMoney', data)
  },
  // 充值记录
  GetChongZhiLogs: function (data) {
    return axios.get('/B2B/PC_User_User/GetChongZhiLogs', data)
  },
  // 充值
  AddChongZhiLog: function (data) {
    return axios.post('/B2B/PC_User_User/AddChongZhiLog', data)
  },
  // 删除充值记录
  DeleteChongZhiLog: function (data) {
    return axios.post('/B2B/PC_User_User/DeleteChongZhiLog', data)
  },
  // 提现记录
  GetTiXianLogs: function (data) {
    return axios.get('/B2B/PC_User_User/GetTiXianLogs', data)
  },
  // 提现
  AddTiXianLog: function (data) {
    return axios.post('/B2B/PC_User_User/AddTiXianLog', data)
  },
  // 删除提现记录
  DeleteTiXianLog: function (data) {
    return axios.post('/B2B/PC_User_User/DeleteTiXianLog', data)
  },
  // 银行账户列表
  GetUserAccountList: function (data) {
    return axios.get('/B2B/PC_User_User/GetMyAccountList', data)
  },
  // 获取某个银行账户信息
  GetAccountInfo: function (data) {
    return axios.get('/B2B/PC_User_User/GetAccountInfo', data)
  },
  // 保存/修改 某个银行账户信息
  EditAccount: function (data) {
    return axios.post('/B2B/PC_User_User/EditAccount', data)
  },
  // 解绑银行卡
  DeleteAccount: function (data) {
    return axios.post('/B2B/PC_User_User/DeleteAccount', data)
  },
  // 保存用户信息
  EditUserInfo: function (data) {
    return axios.post('/B2B/PC_User_User/UpdateMyInfo', data)
  },
  // 修改密码
  UpdatePass (data) {
    return axios.post('/B2B/PC_User_User/ChangePassword', data)
  },
  // 获取订单列表
  GetList (data) {
    return axios.get('/B2B/PC_Tour_Order/GetList', data)
  },
  // 获取部门
  GetJiGou (data) {
    return axios.get('/B2B/PC_User_User/GetJiGou', data)
  },
  // 获取职务
  GetZhiWu (data) {
    return axios.get('/B2B/PC_User_User/GetZhiWu', data)
  },
  // 获取地址
  GetRegion (data) {
    return axios.get('/B2B/PC_User_User/GetRegion', data)
  },
  // 获取民族
  GetMinZu (data) {
    return axios.get('/B2B/PC_User_User/GetMinZu', data)
  },
  // 获取名单
  GetMingDans (data) {
    return axios.get('/B2B/PC_Tour_Order/GetMingDans', data)
  },
  // 获取充值账户
  GetChongZhiAccount (data) {
    return axios.get('/B2B/PC_User_User/GetChongZhiAccount', data)
  },
  // 获取提现账户
  GetTiXianAccount (data) {
    return axios.get('/B2B/PC_User_User/GetTiXianAccount', data)
  },
  // 获取微店信息
  GetWeChatShop (data) {
    return axios.get('/B2B/PC_User_User/GetMyWeChatShop', data)
  },
  // 保存微店信息
  EditMyWeChatShop (data) {
    return axios.post('/B2B/PC_User_User/EditMyWeChatShop', data)
  },
  // 获取电子签名
  GetSign (data) {
    return axios.get('/B2B/PC_User_User/GetSign', data)
  },
  // 获取收件列表
  GetShouJianList (data) {
    return axios.get('/B2B/PC_User_User/GetShouJianList', data)
  },
  // 获取发件列表
  GetFaJianList (data) {
    return axios.get('/B2B/PC_User_User/GetFaJianList', data)
  },
  // 客户取消订单
  CustomerCancel (data) {
    return axios.post('/B2B/PC_Tour_Order/CustomerCancel', data)
  },
  // 获取游客列表
  GetYouKeList (data) {
    return axios.get('/B2B/PC_User_User/GetYouKeList', data)
  },
  // 添加游客
  AddYuanGong (data) {
    return axios.post('/B2B/PC_Tour_Order/AddYuanGong', data)
  },
  // 发件 作废
  UpdateEmailState (data) {
    return axios.post('/B2B/PC_User_User/UpdateEmailState', data)
  },
  // 获取通知类型
  GetNoticeType (data) {
    return axios.get('/B2B/PC_User_User/GetNoticeType', data)
  },
  // 获取通知级别
  GetNoticeLevel (data) {
    return axios.get('/B2B/PC_User_User/GetNoticeLevel', data)
  },
  // 添加通知
  AddFaJian (data) {
    return axios.post('/B2B/PC_User_User/AddFaJian', data)
  },
  // 获取通知对象
  GetNoticeUser (data) {
    return axios.get('/B2B/PC_User_User/GetNoticeUser', data)
  },
  // 查看收件信息
  GetShouJianInfo (data) {
    return axios.get('/B2B/PC_User_User/GetShouJianInfo', data)
  },
  // 查看发件信息
  GetFaJianInfo (data) {
    return axios.get('/B2B/PC_User_User/GetFaJianInfo', data)
  },
  // 查看回复列表
  GetShouJianReplayList (data) {
    return axios.get('/B2B/PC_User_User/GetShouJianReplayList', data)
  },
  // 查看回复列表
  GetFaJianReplayList (data) {
    return axios.get('/B2B/PC_User_User/GetFaJianReplayList', data)
  },
  // 阅读回复
  Replay (data) {
    return axios.post('/B2B/PC_User_User/Replay', data)
  },
  // 添加电子收据
  AddShouJu (data) {
    return axios.post('/B2B/PC_Tour_Order/AddShouJu', data)
  },
  // 作废电子收据
  CancelShouJu (data) {
    return axios.post('/B2B/PC_Tour_Order/UpdateShouJuFlag', data)
  },
  // 获取电子收据详情
  GetShouJuDetail (data) {
    return axios.get('/B2B/PC_Tour_Order/GetShouJuDetail', data)
  },
  // 获取旅游订单详情
  GetDetail (data) {
    return axios.get('/B2B/PC_Tour_Order/GetDetail', data)
  }
}
export default serveHttp
