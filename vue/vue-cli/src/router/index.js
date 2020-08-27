import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/pages/Root'
// 登录 注册 忘记密码
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Forget from '@/pages/Forget'
// 首页
import Index from '@/pages/index/Index'
// 自营酒店
import Hotel from '@/pages/hotel/Hotel'
import HotelListInfo from '@/pages/hotel/ListInfo'
import HotelOrder from '@/pages/hotel/Order'
import HotelOrder1 from '@/pages/hotel/step/Order1'
import HotelOrder2 from '@/pages/hotel/step/Order2'
import HotelOrder3 from '@/pages/hotel/step/Order3'
// 艺龙酒店
import NewHotel from '@/pages/yl_hotel/Hotel'
import NewHotelListInfo from '@/pages/yl_hotel/ListInfo'
import NewYuDing from '@/pages/yl_hotel/YuDing'
// 航班动态
import planeSearchIndex from '@/pages/planeSearch/Index'
// 企业名录
import businessIndex from '@/pages/business/Index'
import businessDetail from '@/pages/business/Detail'
// 门店名录
import storeIndex from '@/pages/store/Index'
// 旅游
import Tour from '@/pages/tour/Tour'
import TourInfo from '@/pages/tour/TourInfo'
import TourOrder from '@/pages/tour/Order'
import TourOrder1 from '@/pages/tour/step/Order1'
import TourOrder2 from '@/pages/tour/step/Order2'
import TourOrder3 from '@/pages/tour/step/Order3'
import TourOrder4 from '@/pages/tour/step/Order4'
import TourOrder5 from '@/pages/tour/step/Order5'
import TourBaoXian from '@/pages/tour/baoXianDetail'

import TourOrderHetong from '@/pages/tour/OrderHetong'
import TourOrderHetong1 from '@/pages/tour/stepHetong/OrderHetong1'
import TourOrderHetong2 from '@/pages/tour/stepHetong/OrderHetong2'
import TourOrderHetong3 from '@/pages/tour/stepHetong/OrderHetong3'
import TourOrderHetong4 from '@/pages/tour/stepHetong/OrderHetong4'
// 关于我们
import AboutRoot from '@/pages/about/Root'
import AboutIndex from '@/pages/about/Index'
import AboutDetail from '@/pages/about/Detail'
// 新闻
import NewsRoot from '@/pages/news/Root'
import NewsIndex from '@/pages/news/Index'
import NewsDetail from '@/pages/news/Detail'
// 政务信息
import ZhengWuRoot from '@/pages/zhengwu/Root'
import ZhengWuIndex from '@/pages/zhengwu/Index'
import ZhengWuDetail from '@/pages/zhengwu/Detail'
// 资讯信息
import ZiXunRoot from '@/pages/zixun/Root'
import ZiXunIndex from '@/pages/zixun/Index'
import ZiXunDetail from '@/pages/zixun/Detail'
// 游玩攻略
import GuideRoot from '@/pages/guide/Root'
import GuideIndex from '@/pages/guide/Index'
import GuideDetail from '@/pages/guide/Detail'
// 景区
import ScenicIndex from '@/pages/scenic/Index'
import ScenicDetail from '@/pages/scenic/Detail'
import ScenicOrder from '@/pages/scenic/Order'
import ScenicOrder1 from '@/pages/scenic/step/Order1'
import ScenicOrder2 from '@/pages/scenic/step/Order2'
// 火车
import TrainIndex from '@/pages/train/Index'
import TrainDetail from '@/pages/train/Detail'
// 机票
import PlaneIndex from '@/pages/plane/Index'
import PlaneDetail from '@/pages/plane/Detail'
// 购买合同
import ContractPageIndex from '@/pages/contract/Index'
import ContractOrder from '@/pages/contract/Order'
import ContractOrder1 from '@/pages/contract/step/Order1'
import ContractOrder2 from '@/pages/contract/step/Order2'

// 录入合同订单
import LuRuDingDan1 from '@/pages/lurudingdan/Order1'
import LuRuDingDan2 from '@/pages/lurudingdan/Order2'
import LuRuDingDan3 from '@/pages/lurudingdan/Order3'
import LuRuDingDan4 from '@/pages/lurudingdan/Order4'
import LuRuDingDan5 from '@/pages/lurudingdan/Order5'
import LuRuDingDan6 from '@/pages/lurudingdan/Order6'

// 发票
import InvoiceIndex from '@/pages/invoice/Index'
import InvoiceOrder from '@/pages/invoice/Order'
// 我的
import MemberRoot from '@/pages/member/Root'
import MemberIndex from '@/pages/member/Index'
import MemberTourOrder from '@/pages/member/order/tourOrder'
import MemberTourHeTong from '@/pages/member/order/hetong'
import MemberTourHeTongDetail from '@/pages/member/order/hetongDetail'
import MemberTourHeTongInfo from '@/pages/member/order/hetongInfo'
import MemberTourDetail from '@/pages/member/order/tourDetail'

// 酒店订单
import MemberHotelOrder from '@/pages/member/order/hotelOrder'
import MemberHotelDetail from '@/pages/member/order/hotelDetail'

// 景区订单
import MemberScenicOrder from '@/pages/member/order/scenicOrder'
import MemberScenicDetail from '@/pages/member/order/scenicDetail'

// 景区订单
import MemberFaPiaoOrder from '@/pages/member/order/fapiaoOrder'
import MemberFaPiaoDetail from '@/pages/member/order/fapiaoDetail'

// 机票订单
import MemberJiPiaoOrder from '@/pages/member/order/jipiaoOrder'
import MemberJiPiaoDetail from '@/pages/member/order/jipiaoDetail'

// 火车订单
import MemberHuoCheOrder from '@/pages/member/order/huocheOrder'
import MemberHuoCheDetail from '@/pages/member/order/huocheDetail'

import MemberMyInfo from '@/pages/member/my/myInfo'
import MemberUpdatePass from '@/pages/member/my/updatePass'
import MemberBankCard from '@/pages/member/my/bankCard'
import MemberDemandIndex from '@/pages/member/demand/index'
import MemberDemandAdd from '@/pages/member/demand/add'
import MemberDemandGet from '@/pages/member/demand/get'
import MemberDemandMoney from '@/pages/member/demand/money'
import MemberMyStore from '@/pages/member/store/myStore'
import MemberMySign from '@/pages/member/my/sign'
import MemberMyNotice from '@/pages/member/my/notices'
import MemberMyNoticeAdd from '@/pages/member/my/noticesAdd'
import MemberMyInfoView from '@/pages/member/my/infoView'
import MemberMyBindWeiXin from '@/pages/member/my/bindWeiXin'
// 合同模板
import ContractIndex from '@/pages/hetong/index'
import ContractGJ from '@/pages/hetong/GJ'
import ContractBook from '@/pages/hetong/book'
import ContractChangeTuan from '@/pages/hetong/changeTuan'
import ContractGN from '@/pages/hetong/GN'
import ContractPersonList from '@/pages/hetong/personList'
import ContractTourList from '@/pages/hetong/tourList'
import ContractTW from '@/pages/hetong/TW'
import ContractFuJia from '@/pages/hetong/FuJia'
import ContractWeiTuo from '@/pages/hetong/weiTuoContract'
import ContractPrinting from '@/pages/hotel/printing'
import ContractReceipt from '@/pages/hetong/receipt'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'root',
    meta: {
      title: '首页'
    },
    redirect: '/index',
    component: Root,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '首页'
        },
        component: Index
      }, {
        path: '/jiudiansanfang/index',
        name: 'ylHotelIndex',
        meta: {
          title: '艺龙酒店'
        },
        component: NewHotel
      }, {
        path: '/jiudiansanfang/detail',
        name: 'ylHotelListInfo',
        meta: {
          title: '酒店详情页'
        },
        component: NewHotelListInfo
      }, {
        path: '/jiudiansanfang/yuding',
        name: 'ylYuDing',
        meta: {
          title: '酒店预订'
        },
        component: NewYuDing
      }, {
        path: '/jiudian/index',
        name: 'hotelIndex',
        meta: {
          title: '自营酒店'
        },
        component: Hotel
      }, {
        path: '/jiudian/detail',
        name: 'HotelListInfo',
        meta: {
          title: '酒店详情页'
        },
        component: HotelListInfo
      }, {
        path: '/jiudian/order',
        name: 'HotelOrder',
        meta: {
          title: '旅游预定'
        },
        component: HotelOrder,
        redirect: '/jiudian/order1',
        children: [
          {
            path: '/jiudian/order1',
            name: 'HotelOrder1',
            meta: {
              title: '预定'
            },
            component: HotelOrder1
          },
          {
            path: '/jiudian/order2',
            name: 'HotelOrder2',
            meta: {
              title: '入住名单'
            },
            component: HotelOrder2
          },
          {
            path: '/jiudian/order3',
            name: 'HotelOrder3',
            meta: {
              title: '付款'
            },
            component: HotelOrder3
          }
        ]
      }, {
        path: '/xianlu/index',
        name: 'tourIndex',
        meta: {
          title: '旅游'
        },
        component: Tour
      }, {
        path: '/xianlu/detail',
        name: 'tourDetail',
        meta: {
          title: '旅游详情页'
        },
        component: TourInfo
      }, {
        path: '/xianlu/order',
        name: 'tourOrder',
        meta: {
          title: '旅游预定'
        },
        component: TourOrder,
        redirect: '/xianlu/order1',
        children: [
          {
            path: '/xianlu/order1',
            name: 'tourOrder1',
            meta: {
              title: '预定'
            },
            component: TourOrder1
          },
          {
            path: '/xianlu/order2',
            name: 'tourOrder2',
            meta: {
              title: '名单'
            },
            component: TourOrder2
          },
          {
            path: '/xianlu/order3',
            name: 'tourOrder3',
            meta: {
              title: '保险'
            },
            component: TourOrder3
          },
          {
            path: '/xianlu/order4',
            name: 'tourOrder4',
            meta: {
              title: '合同'
            },
            component: TourOrder4
          },
          {
            path: '/xianlu/order5',
            name: 'tourOrder5',
            meta: {
              title: '付款'
            },
            component: TourOrder5
          }
        ]
      }, {
        path: '/xianlu/orderHetong',
        name: 'tourOrderHetong',
        meta: {
          title: '旅游预定'
        },
        component: TourOrderHetong,
        redirect: '/xianlu/orderHetong1',
        children: [
          {
            path: '/xianlu/orderHetong1',
            name: 'tourOrderHetong1',
            meta: {
              title: '产品信息'
            },
            component: TourOrderHetong1
          },
          {
            path: '/xianlu/orderHetong2',
            name: 'tourOrderHetong2',
            meta: {
              title: '订单信息'
            },
            component: TourOrderHetong2
          },
          {
            path: '/xianlu/orderHetong3',
            name: 'tourOrderHetong3',
            meta: {
              title: '名单'
            },
            component: TourOrderHetong3
          },
          {
            path: '/xianlu/orderHetong4',
            name: 'tourOrderHetong4',
            meta: {
              title: '保险'
            },
            component: TourOrderHetong4
          }
        ]
      }, {
        path: '/jipiaosearch/index',
        name: 'planeSearchIndex',
        meta: {
          title: '航班动态'
        },
        component: planeSearchIndex
      }, {
        path: '/minglu/index',
        name: 'businessIndex',
        meta: {
          title: '企业名录'
        },
        component: businessIndex
      }, {
        path: '/minglu/detail',
        name: 'businessDetail',
        meta: {
          title: '企业详情'
        },
        component: businessDetail
      }, {
        path: '/mendian/index',
        name: 'storeIndex',
        meta: {
          title: '门店名录'
        },
        component: storeIndex
      }, {
        path: '/guanyuwomen/root',
        name: 'aboutRoot',
        meta: {
          title: '关于我们'
        },
        component: AboutRoot,
        redirect: '/guanyuwomen/index',
        children: [
          {
            path: '/guanyuwomen/index',
            name: 'aboutIndex',
            meta: {
              title: '关于我们'
            },
            component: AboutIndex
          }, {
            path: '/guanyuwomen/detail',
            name: 'aboutDetail',
            meta: {
              title: '关于我们详情'
            },
            component: AboutDetail
          }
        ]
      }, {
        path: '/xinwen/root',
        name: 'newsRoot',
        meta: {
          title: '信息文章'
        },
        component: NewsRoot,
        redirect: '/xinwen/index',
        children: [
          {
            path: '/xinwen/index',
            name: 'newsIndex',
            meta: {
              title: '信息文章'
            },
            component: NewsIndex
          }, {
            path: '/xinwen/detail',
            name: 'newsDetail',
            meta: {
              title: '文章详情'
            },
            component: NewsDetail
          }
        ]
      }, {
        path: '/zhengwu/root',
        name: 'zhengwuRoot',
        meta: {
          title: '政务信息'
        },
        component: ZhengWuRoot,
        redirect: '/zhengwu/index',
        children: [
          {
            path: '/zhengwu/index',
            name: 'zhengwuIndex',
            meta: {
              title: '政务信息'
            },
            component: ZhengWuIndex
          }, {
            path: '/zhengwu/detail',
            name: 'zhengwuDetail',
            meta: {
              title: '信息详情'
            },
            component: ZhengWuDetail
          }
        ]
      }, {
        path: '/zixun/root',
        name: 'zixunRoot',
        meta: {
          title: '资讯信息'
        },
        component: ZiXunRoot,
        redirect: '/zixun/index',
        children: [
          {
            path: '/zixun/index',
            name: 'zixunIndex',
            meta: {
              title: '资讯信息'
            },
            component: ZiXunIndex
          }, {
            path: '/zixun/detail',
            name: 'zixunDetail',
            meta: {
              title: '信息详情'
            },
            component: ZiXunDetail
          }
        ]
      }, {
        path: '/gonglue/root',
        name: 'guideRoot',
        meta: {
          title: '游记攻略'
        },
        component: GuideRoot,
        redirect: '/gonglue/index',
        children: [
          {
            path: '/gonglue/index',
            name: 'guideIndex',
            meta: {
              title: '游记攻略'
            },
            component: GuideIndex
          }, {
            path: '/gonglue/detail',
            name: 'guideDetail',
            meta: {
              title: '攻略详情'
            },
            component: GuideDetail
          }
        ]
      }, {
        path: '/contract/index',
        name: 'contractPageIndex',
        meta: {
          title: '合同'
        },
        component: ContractPageIndex
      }, {
        path: '/contract/order',
        name: 'contractOrder',
        meta: {
          title: '合同购买'
        },
        component: ContractOrder,
        redirect: '/contract/order1',
        children: [
          {
            path: '/contract/order1',
            name: 'ContractOrder1',
            meta: {
              title: '购买'
            },
            component: ContractOrder1
          },
          {
            path: '/contract/order2',
            name: 'ContractOrder2',
            meta: {
              title: '付款'
            },
            component: ContractOrder2
          }
        ]
      }, {
        path: '/invoice/index',
        name: 'InvoiceIndex',
        meta: {
          title: '发票'
        },
        component: InvoiceIndex
      }, {
        path: '/invoice/order',
        name: 'InvoiceOrder',
        meta: {
          title: '预定'
        },
        component: InvoiceOrder
      }, {
        path: '/jingqu/index',
        name: 'scenicIndex',
        meta: {
          title: '景区'
        },
        component: ScenicIndex
      }, {
        path: '/jingqu/detail',
        name: 'scenicDetail',
        meta: {
          title: '景区'
        },
        component: ScenicDetail
      },
      {
        path: '/jingqu/order',
        name: 'ScenicOrder',
        meta: {
          title: '景区预订'
        },
        component: ScenicOrder,
        redirect: '/jingqu/order1',
        children: [
          {
            path: '/jingqu/order1',
            name: 'ScenicOrder1',
            meta: {
              title: '预定'
            },
            component: ScenicOrder1
          },
          {
            path: '/jingqu/order2',
            name: 'ScenicOrder2',
            meta: {
              title: '付款'
            },
            component: ScenicOrder2
          }
        ]
      }, {
        path: '/huoche/index',
        name: 'trainIndex',
        meta: {
          title: '火车列表'
        },
        component: TrainIndex
      }, {
        path: '/huoche/detail',
        name: 'trainDetail',
        meta: {
          title: '火车预定'
        },
        component: TrainDetail
      }, {
        path: '/jipiao/index',
        name: 'planeIndex',
        meta: {
          title: '机票列表'
        },
        component: PlaneIndex
      }, {
        path: '/jipiao/detail',
        name: 'planeDetail',
        meta: {
          title: '机票详情'
        },
        component: PlaneDetail
      }, {
        path: '/lurudingdan/order1',
        name: 'LuRuDingDan1',
        meta: {
          title: '产品'
        },
        component: LuRuDingDan1
      }, {
        path: '/lurudingdan/order2',
        name: 'LuRuDingDan2',
        meta: {
          title: '预订'
        },
        component: LuRuDingDan2
      }, {
        path: '/lurudingdan/order3',
        name: 'LuRuDingDan3',
        meta: {
          title: '名单'
        },
        component: LuRuDingDan3
      }, {
        path: '/lurudingdan/order4',
        name: 'LuRuDingDan4',
        meta: {
          title: '保险'
        },
        component: LuRuDingDan4
      }, {
        path: '/lurudingdan/order5',
        name: 'LuRuDingDan5',
        meta: {
          title: '合同'
        },
        component: LuRuDingDan5
      }, {
        path: '/lurudingdan/order6',
        name: 'LuRuDingDan6',
        meta: {
          title: '交团'
        },
        component: LuRuDingDan6
      }, {
        path: '/member/root',
        name: 'memberRoot',
        meta: {
          title: '个人中心'
        },
        component: MemberRoot,
        redirect: '/member/index',
        children: [
          {
            path: '/member/index',
            name: 'memberIndex',
            meta: {
              title: '会员首页'
            },
            component: MemberIndex
          },
          {
            path: '/member/tourIndex',
            name: 'memberTourIndex',
            meta: {
              title: '旅游订单'
            },
            component: MemberTourOrder
          },
          {
            path: '/member/heTong',
            name: 'memberTourHeTong',
            meta: {
              title: '纸质合同'
            },
            component: MemberTourHeTong
          },
          {
            path: '/member/heTongDetail',
            name: 'memberTourHeTongDetail',
            meta: {
              title: '合同明细'
            },
            component: MemberTourHeTongDetail
          },
          {
            path: '/member/heTongInfo',
            name: 'memberTourHeTongInfo',
            meta: {
              title: '合同明细'
            },
            component: MemberTourHeTongInfo
          },
          {
            path: '/member/tourDetail',
            name: 'memberTourDetail',
            meta: {
              title: '旅游详情'
            },
            component: MemberTourDetail
          },
          {
            path: '/member/hotelIndex',
            name: 'memberHotelOrder',
            meta: {
              title: '酒店订单'
            },
            component: MemberHotelOrder
          },
          {
            path: '/member/hotelDetail',
            name: 'memberHotelDetail',
            meta: {
              title: '酒店详情'
            },
            component: MemberHotelDetail
          },
          {
            path: '/member/scenicIndex',
            name: 'memberScenicOrder',
            meta: {
              title: '景区订单'
            },
            component: MemberScenicOrder
          },
          {
            path: '/member/scenicDetail',
            name: 'memberScenicDetail',
            meta: {
              title: '景区详情'
            },
            component: MemberScenicDetail
          },
          {
            path: '/member/jipiaoIndex',
            name: 'memberJiPiaoOrder',
            meta: {
              title: '机票订单'
            },
            component: MemberJiPiaoOrder
          },
          {
            path: '/member/jipiaoDetail',
            name: 'memberJiPiaoDetail',
            meta: {
              title: '机票详情'
            },
            component: MemberJiPiaoDetail
          },
          {
            path: '/member/huocheIndex',
            name: 'memberHuoCheOrder',
            meta: {
              title: '火车票订单'
            },
            component: MemberHuoCheOrder
          },
          {
            path: '/member/huocheDetail',
            name: 'memberHuoCheDetail',
            meta: {
              title: '火车票详情'
            },
            component: MemberHuoCheDetail
          },
          {
            path: '/member/fapiaoIndex',
            name: 'memberFaPiaoOrder',
            meta: {
              title: '发票订单'
            },
            component: MemberFaPiaoOrder
          },
          {
            path: '/member/fapiaoDetail',
            name: 'memberFaPiaoDetail',
            meta: {
              title: '发票详情'
            },
            component: MemberFaPiaoDetail
          },
          {
            path: '/member/myInfo',
            name: 'memberMyInfo',
            meta: {
              title: '我的资料'
            },
            component: MemberMyInfo
          },
          {
            path: '/member/mySign',
            name: 'MemberMySign',
            meta: {
              title: '我的签名'
            },
            component: MemberMySign
          },
          {
            path: '/member/myNotice',
            name: 'MemberMyNotice',
            meta: {
              title: '内部消息'
            },
            component: MemberMyNotice
          },
          {
            path: '/member/myNoticeAdd',
            name: 'MemberMyNoticeAdd',
            meta: {
              title: '添加通知'
            },
            component: MemberMyNoticeAdd
          },
          {
            path: '/member/myBindWeiXin',
            name: 'MemberMyBindWeiXin',
            meta: {
              title: '添加通知'
            },
            component: MemberMyBindWeiXin
          },
          {
            path: '/member/updatePass',
            name: 'memberUpdatePass',
            meta: {
              title: '修改密码'
            },
            component: MemberUpdatePass
          },
          {
            path: '/member/bankCard',
            name: 'memberBankCard',
            meta: {
              title: '银行账户'
            },
            component: MemberBankCard
          },
          {
            path: '/member/store',
            name: 'memberMyStore',
            meta: {
              title: '我的微店'
            },
            component: MemberMyStore
          },
          {
            path: '/member/demandIndex',
            name: 'memberDemandIndex',
            meta: {
              title: '我的余额'
            },
            component: MemberDemandIndex
          },
          {
            path: '/member/demandAdd',
            name: 'memberDemandAdd',
            meta: {
              title: '充值记录'
            },
            component: MemberDemandAdd
          },
          {
            path: '/member/demandGet',
            name: 'memberDemandGet',
            meta: {
              title: '提现记录'
            },
            component: MemberDemandGet
          },
          {
            path: '/member/demandMoney',
            name: 'memberDemandMoney',
            meta: {
              title: '余额明细'
            },
            component: MemberDemandMoney
          }
        ]
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: Login
  }, {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: Register
  }, {
    path: '/forget',
    name: 'forget',
    meta: {
      title: '忘记密码'
    },
    component: Forget
  }, {
    path: '/contract/index',
    name: 'contractIndex',
    meta: {
      title: '团队一日游合同'
    },
    component: ContractIndex
  }, {
    path: '/contract/GJ',
    name: 'contractGJ',
    meta: {
      title: '团队出境旅游合同'
    },
    component: ContractGJ
  }, {
    path: '/contract/book',
    name: 'contractBook',
    meta: {
      title: '授权委托书'
    },
    component: ContractBook
  }, {
    path: '/contract/changeTuan',
    name: 'contractChangeTuan',
    meta: {
      title: '转并团书面证明'
    },
    component: ContractChangeTuan
  }, {
    path: '/contract/GN',
    name: 'contractGN',
    meta: {
      title: '团队境内旅游合同'
    },
    component: ContractGN
  }, {
    path: '/contract/WT',
    name: 'contractWT',
    meta: {
      title: '团队境内旅游合同'
    },
    component: ContractWeiTuo
  }, {
    path: '/contract/personList',
    name: 'contractPersonList',
    meta: {
      title: '旅游报名表'
    },
    component: ContractPersonList
  }, {
    path: '/contract/tourList',
    name: 'contractTourList',
    meta: {
      title: '行程单'
    },
    component: ContractTourList
  }, {
    path: '/contract/TW',
    name: 'contractTW',
    meta: {
      title: '大陆居民赴台湾地区旅游合同'
    },
    component: ContractTW
  }, {
    path: '/contract/FuJia',
    name: 'contractFuJia',
    meta: {
      title: '附加条款'
    },
    component: ContractFuJia
  }, {
    path: '/hetong/receipt',
    name: 'contractReceipt',
    meta: {
      title: '电子收据'
    },
    component: ContractReceipt
  }, {
    path: '/xianlu/baoXian',
    name: 'tourBaoXian',
    meta: {
      title: '保险方案详情'
    },
    component: TourBaoXian
  }, {
    path: '/member/myInfoView',
    name: 'MemberMyInfoView',
    meta: {
      title: '信息查看'
    },
    component: MemberMyInfoView
  }, {
    path: '/hotel/printing',
    name: 'contractPrinting',
    meta: {
      title: '打印旅游名单'
    },
    component: ContractPrinting
  }
  ]
})
// 全局路由守卫  需登录才能进入
// 进入路由前设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let login = localStorage.getItem('token')
  let path = to.path
  if (path === '/login' || path === '/register' || path === '/forget') {
    next()
    return
  }
  if (login) {
    next()
  } else {
    setTimeout(() => {
      next({
        path: '/login'
      })
    }, 1500)
  }
})
export default router
