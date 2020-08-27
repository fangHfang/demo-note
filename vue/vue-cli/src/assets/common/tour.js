import axios from '../../../plugin/axios'

const serverApi = {
  // -----------------------------------列表所需
  // 获取产品列表搜索条件
  searchList: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetSearchConditions', data)
  },
  // 获取产品列表搜索条件
  productList: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetList', data)
  },
  // 获取产品下级目的地
  getMuDiDis: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetMuDiDis', data)
  },
  // 获取产品下级目的地
  GetAllMuDiDis: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetAllMuDiDis', data)
  },
  // 获取热门目的地
  getHotmuDiDi: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetHotmuDiDi', data)
  },
  // 获取热门目的地
  getCity: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetCitys', data)
  },
  // 获取热门产品列表
  getHotProductList: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetHotProductList', data)
  },
  // -----------------------------------详情所需
  // 获取产品列表详情
  GetDetail: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetDetail', data)
  },
  // 获取产品的团期报价
  GetPriceData: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetRiLiPriceData', data)
  },
  // 获取产品的每日报价
  GetPriceByDate: function (data) {
    return axios.get('/B2B/PC_Tour_Product/GetPriceByDate', data)
  },
  // --------------------------------------------预定所需
  // -----------------------------------预定
  // 获取预定信息
  GetYuDing: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetYuDing', data)
  },
  // 获取团散类型
  GetEnumByTuanSanLeiXing: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetEnumByTuanSanLeiXing', data)
  },
  // 获取员工
  GetKeHuByYuanGong: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetKeHuByYuanGong', data)
  },
  // 获取部门
  GetBuMen: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetBuMen', data)
  },
  // 获取业务类型
  GetEnumByYeWuLeiXing: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetEnumByYeWuLeiXing', data)
  },
  // 获取我的游客
  GetKeHuByMyGeRen: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetKeHuByMyGeRen', data)
  },
  // 获取同行
  GetKeHuByTongHang: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetKeHuByTongHang', data)
  },
  // 获取商旅企业
  GetKeHuByFeiTongHang: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetKeHuByFeiTongHang', data)
  },
  // 下订单
  OrderAdd: function (data) {
    return axios.post('/B2B/PC_Tour_Order/Add', data)
  },
  // 修改订单
  OrderEdit: function (data) {
    return axios.post('/B2B/PC_Tour_Order/Edit', data)
  },
  // -----------------------------------名单
  // 获取某订单的预定信息
  GetYuDingInfo: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetYuDingInfo', data)
  },
  // 获取常旅客列表
  GetChnagLvKeList: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetChangLvKeList', data)
  },
  // 获取名单
  GetMingDans: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetMingDans', data)
  },
  // 快捷添加名单
  AddQuickMingDans: function (data) {
    return axios.post('/B2B/PC_Tour_Order/AddQuickMingDans', data)
  },
  // 导入名单
  DaoRuMingDans: function (data) {
    return axios.post('/B2B/PC_Tour_Order/DaoRuMingDans', data)
  },
  // 清空名单
  ClearMingDan: function (data) {
    return axios.post('/B2B/PC_Tour_Order/ClearMingDans', data)
  },
  // 手动添加名单
  AddMingDans: function (data) {
    return axios.post('/B2B/PC_Tour_Order/AddMingDans', data)
  },
  // 删除单个名单
  RemoveMingDan: function (data) {
    return axios.post('/B2B/PC_Tour_Order/DeleteMingDan', data)
  },
  // 修改单个名单
  EditMingDan: function (data) {
    return axios.post('/B2B/PC_Tour_Order/EditMingDan', data)
  },
  // 选择常旅客
  ChooseChnagLvKe: function (data) {
    return axios.post('/B2B/PC_Tour_Order/ChooseChangLvKe', data)
  },
  // -----------------------------------保险
  // 获取某线路订单下的所有投保信息
  GetBaoDanOrders: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetBaoDanOrders', data)
  },
  // 获取保险方案集合
  GetBaoXianResources: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetBaoXianResources', data)
  },
  // 获取某保险方案的报价信息
  GetBaoXianInfo: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetBaoXianInfo', data)
  },
  // 投保
  AddBaoXianOrder: function (data) {
    return axios.post('/B2B/PC_Tour_Order/AddBaoXianOrder', data)
  },
  // 退保
  CancelBaoXianOrder: function (data) {
    return axios.post('/B2B/PC_Tour_Order/CancelBaoXianOrder', data)
  },
  // -----------------------------------合同
  // 生成电子合同
  AddHeTongCode: function (data) {
    return axios.post('/B2B/PC_Tour_Order/AddHeTongCode', data)
  },
  // 打印合同详情
  getContractPerson: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetHeTongDetail', data)
  },
  // 获取修改合同信息
  getEditContractInfo: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetHeTongEditDetail', data)
  },
  // 提交修改合同信息
  saveEditContractInfo: function (data) {
    return axios.post('/B2B/PC_Tour_Order/SaveHeTong', data)
  },
  // 获取签名信息
  GetSign: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetSign', data)
  },
  // // 验证签名信息
  // verifyQianming: function (data) {
  //   return axios.post('/lvyou.order/verifyQianming', data)
  // },
  // // 提交签名
  // getContractSign: function (data) {
  //   return axios.post('/lvyou.order/SaveSign', data)
  // },
  // -----------------------------------付款
  // 获取某订单的付款记录
  GetPayList: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetPayList', data)
  },
  // 支付信息
  GetPayConfigs: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetPayConfigs', data)
  },
  // 支付
  AddPay: function (data) {
    return axios.post('/B2B/PC_Tour_Order/AddPay', data)
  },
  // 获取某订单详情
  GetPay: function (data) {
    return axios.get('/B2B/PC_Tour_Order/GetPay', data)
  },
  // 获取某订单详情
  TuiPay: function (data) {
    return axios.post('/B2B/PC_Tour_Order/TuiPay', data)
  },
  // 获取电子收据列表
  GetShouJuList (data) {
    return axios.get('/B2B/PC_Tour_Order/GetShouJuList', data)
  },
  // 确认交团
  JiaoTuan (data) {
    return axios.post('/B2B/PC_Tour_Order/JiaoTuan', data)
  }
}
export default serverApi
