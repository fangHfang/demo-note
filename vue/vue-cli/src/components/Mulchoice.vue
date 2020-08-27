<template>
  <div>
  <div class="ScreenBox">
    <div class="searchGroup clearfix">
      <div v-for="(item,index) in listData" :key="index" v-if="item.length || item.items.length">
        <dl>
          <dt v-if="index === 'ChanPinZhuTi'">产品主题</dt>
          <dt v-if="index === 'JieGeFanWei'">价格范围</dt>
          <dt v-if="index === 'WangFanJiaoTong'">往返交通</dt>
          <dt v-if="index === 'XianLuLeiXing'">线路类型</dt>
          <dt v-if="index === 'YouWanTianShu'">游玩天数</dt>
          <dt v-if="index === 'twos'">目<em style="margin:0 6px 0 7px;">的</em>地</dt>
          <dt v-if="index === 'MuDiDi' && item.items.length">目<em style="margin:0 6px 0 7px;">的</em>地</dt>
          <dd v-if="index !== 'ChuFaCity'" :class="{hauto:element[index] && element[index].isMore}">
            <div :id="index" class="clearfix" v-if="item.length || item.items.length">
              <span @click="addChooseHandle('',index,0)"><em :class="{current:data[index] === 0}">不限</em></span>
              <span v-if="index !== 'MuDiDi'" @click="addChooseHandle(option,index,childIndex+1)" v-for="(option,childIndex) in item" :key="childIndex"><em :class="{current:data[index] === childIndex+1}">{{option.Name ? option.Name : option.name}}</em></span>
              <span v-if="index === 'MuDiDi' && item.items.length && item.items" @click="addChooseHandle(option,index,childIndex+1)" v-for="(option,childIndex) in item.items" :key="childIndex"><em :class="{current:data[index] === childIndex+1}">{{option.name}}</em></span>
            </div>
            <span v-if="element[index] && element[index].height > 46 && !element[index].isMore" class="more" @click="showMoreInfo(index, true)">更多</span>
            <span v-if="element[index] && element[index].height > 46 && element[index].isMore" class="more current" @click="showMoreInfo(index, false)">收起</span>
          </dd>
        </dl>
      </div>
      <div>
        <dl class="choice" v-if="Object.keys(choose).length>0">
          <dt>已选条件</dt>
          <dd>
            <span v-for="(item, key) in choose" :key="key">{{item.Name || item.name}}<i @click="removeHandle(key)"></i></span>
            <span class="cancel" @click="clearType">清除所有条件</span>
          </dd>
        </dl>
      </div>
      <div class="moreSearch clearfix">
        <div class="SearchSort">
          <ul class="clearfix">
            <li :class="{current:allIndex!=''}"><span @click="toSort('0')">综合<i :class="allIndex === 'sort' ? 'up' : 'down'"></i></span></li>
            <li :class="{current:arriveIndex!=''}"><span @click="toSort('1')">天数<i :class="arriveIndex === 'sort' ? 'up' : 'down'"></i></span></li>
            <li :class="{current:priceIndex!=''}"><span @click="toSort('2')">价格<i :class="priceIndex === 'sort' ? 'up' : priceIndex === 'hsort' ? 'down' : ''"></i></span></li>
          </ul>
        </div>
        <div class="SearchPrices">
          <ul class="clearfix">
            <li><el-input type="number" v-model="data.MinPrice" placeholder="最低价"></el-input></li>
            <li class="separator">-</li>
            <li><el-input type="number" v-model="data.MaxPrice" placeholder="最高价"></el-input></li>
            <li class="pricesbtn">
              <span @click="data.MinPrice = '', data.MaxPrice=''">清除价格</span>
              <span class="pricesure" @click="confirm">确定</span>
            </li>
          </ul>
        </div>
        <div class="SearchPage">
          <span class="SearchPageNum">页码：<em>{{pager.page}}</em>/{{Math.ceil(pager.total /10)}}</span>
          <span class="prev" :class="pager.page===1?'disabled':''" @click="changePage('prev')"><i></i></span>
          <span class="next" :class="pager.page===Math.ceil(pager.total /10)?'disabled':''" @click="changePage('next')"><i></i></span>
        </div>
        <!--<div v-if="Object.keys(listData).length>5" class="moreSearchBtn">展开更多筛选条件</div>-->
      </div>
    </div>
  </div>
  </div>
  <!--<div class="viewsHome">
    <el-row class="mul-choice">
      <div class="option-list">
        <div v-for="(item,index) in listData" :key="item.title" style="position: relative;overflow: hidden;border-bottom: 1px dashed #ddd;" :style="{height: element[index] && element[index].isMore ? 'auto' : '46px'}">
          {{element}}
          <dl v-if="index !== 'MuDiDi'" :title="index" :style="{'padding-right': element[index] && element[index].height > 45 ? '70px' : '0'}">
            <dt class="option-title" v-if="index === 'ChanPinZhuTi'">产品主题</dt>
            <dt class="option-title" v-if="index === 'JieGeFanWei'">价格范围</dt>
            <dt class="option-title" v-if="index === 'WangFanJiaoTong'">往返交通</dt>
            <dt class="option-title" v-if="index === 'XianLuLeiXing'">线路类型</dt>
            <dt class="option-title" v-if="index === 'YouWanTianShu'">游玩天数</dt>
            <dt class="option-title" v-if="index === 'twos'">城市国家</dt>
            <dd v-if="index !== 'ChuFaCity'">
              <span class="option-item" :class="{elect: data[index] === 0}" @click="addChooseHandle('',index,0)">全部</span>
              <span v-for="(option,childIndex) in item" :key="childIndex" @click="addChooseHandle(option,index,childIndex+1)"
                    :class="{elect:data[index] === childIndex+1}"
                    class="option-item"

              >{{option.Name ? option.Name : option.name}}</span>
            </dd>
          </dl>
          <dl :title="index" v-if="item.items && item.items.length && index === 'MuDiDi'">
            <dt class="option-title" v-if="index === 'MuDiDi'&&item.items.length">目的地</dt>
            <dd :style="{'height': 'auto'}">
              <span class="option-item" :class="{elect: data[index] === 0}" @click="addChooseHandle('',index,0)">全部</span>
              <span
                v-for="(option,childIndex) in item.items"
                :key="childIndex"
                @click="addChooseHandle(option,index,childIndex+1)"
                :class="{elect:data[index] === childIndex+1}"
                class="option-item"
              >{{option.name}}</span>
            </dd>
          </dl>
          <p v-if="element[index] && element[index].height > 46" @click="showMoreInfo(index, true)" class="moreShow">更多 <i class="el-icon-caret-bottom"></i></p>
          <p v-if="element[index] && element[index].height > 46 && element[index].isMore" @click="showMoreInfo(index, false)" class="moreShow">收起 <i class="el-icon-caret-top"></i></p>
        </div>
        <dl>
          <dt class="option-title">已选条件</dt>
          <dd>
            <span class="current" v-for="(item, key) in choose" :key="key">
              {{item.Name || item.name}}
              <i @click="removeHandle(key)" class="el-icon-close"></i>
            </span>
            <span class="clear-data" @click="clearType">清除已选条件</span>
          </dd>
        </dl>
        <div style="padding: 0 30px;" class="filter-item">
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="all noShow" @click="toSort('0')" :class="allIndex === 'sort' ? 'acitveTop': 'acitveBottom'">综合
                <span class="icon-filter"><i class="el-icon-caret-top"></i><i class="el-icon-caret-bottom"></i></span></span> |
              <span class="all noShow" @click="toSort('1')" :class="arriveIndex === 'sort' ? 'acitveTop': 'acitveBottom'">天数
                <span class="icon-filter"><i class="el-icon-caret-top"></i><i class="el-icon-caret-bottom"></i></span></span> |
              <span class="all noShow" @click="toSort('2')" :class="priceIndex === 'sort' ? 'acitveTop': 'acitveBottom'">价格
                <span class="icon-filter"><i class="el-icon-caret-top"></i><i class="el-icon-caret-bottom"></i></span></span>
            </el-col>
            <el-col :span="12">
              <div class="price-box">
                <div>
                  <input type="text" v-model="data.MinPrice" placeholder="最低价"/> -
                  <input type="text" v-model="data.MaxPrice" placeholder="最高价"/>
                </div>
                <div class="newPrice"><span class="clearPrice" @click="data.MinPrice = '', data.MaxPrice=''">清除价格</span><el-tag @click="confirm">确定</el-tag></div>
              </div>
            </el-col>
            <el-col v-if="pager" :span="4" style="float: right">
              页码 <i style="color: #F60">1</i>/1
              <i class="el-icon-caret-left btn-pager"></i><i class="el-icon-caret-right btn-pager"></i>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>-->
</template>
<script>
import serverHttp from '@/assets/common/tour'
export default {
  name: 'Mulchoice',
  props: {
    datalist: {
      required: true
    },
    pager: {
      type: Object
    },
    // 为1时为机票
    type: {
      type: String
    },
    plane: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      count: 0,
      formInline: {
        value1: '',
        value2: '',
        user: '',
        region: '',
        text: '酒店名称'
      },
      choose: {},
      data: {
        ChanPinZhuTi: 0,
        ChuFaCity: 0,
        JieGeFanWei: 0,
        MuDiDi: 0,
        WangFanJiaoTong: 0,
        XianLuLeiXing: 0,
        YouWanTianShu: 0,
        twos: 0,
        MaxPrice: '',
        MinPrice: '',
        OrderByType: '',
        OrderByValue: ''
      },
      allIndex: 'sort',
      priceIndex: '',
      arriveIndex: '',
      MuDiDiId: '',
      listData: [],
      element: {}
    }
  },
  watch: {
    'data.MuDiDi' (val) {
      if (this.choose && this.choose.MuDiDi) {
        this.MuDiDiId = this.choose.MuDiDi.id
        this.data.twos = 0
        this.getMuDis()
      }
      if (val === 0) {
        this.$delete(this.listData, 'twos')
      }
    },
    'datalist' (val) {
      this.listData = val
      this.$nextTick(() => {
        this.element = {}
        // let arr = document.querySelectorAll('.option-list div dl')
        let arr = document.querySelectorAll('.searchGroup dl dd div')
        for (let i in arr) {
          if (Number(i) || Number(i) === 0) {
            this.element[arr[i].id] = {
              height: arr[i].offsetHeight,
              isMore: false
            }
          }
        }
      })
      let obj = this.$route.query
      if (obj) {
        for (let i in obj) {
          if (i !== 'id' && i !== 'KeyWord') {
            this.$set(this.choose, i, JSON.parse(obj[i]))
            for (let j in this.listData) {
              if (j === i) {
                if (j !== 'MuDiDi') {
                  this.listData[j].forEach((v, index) => {
                    if (JSON.parse(obj[i]).ZiDianId === v.Id) {
                      this.data[i] = index + 1
                    }
                  })
                }
              }
            }
          }
        }
        this.$emit('choose', this.choose)
      }
    },
    'pager' (val) {
      this.pager = val
      this.changePage()
    }
  },
  created () {
  },
  methods: {
    addChooseHandle (option, index, i) {
      // 使用set添加对象
      this.$set(this.data, index, i)
      this.$set(this.choose, index, option)
      if (i === 0) {
        this.$delete(this.choose, index)
      }
      this.$emit('choose', this.choose)
    },
    removeHandle (key) {
      this.$delete(this.choose, key)
      this.data[key] = 0
      this.$emit('choose', this.choose)
    },
    /**
     * 清除所选条件
     */
    clearType () {
      this.choose = {}
      for (let key in this.datalist) {
        this.$set(this.data, key, 0)
      }
      this.$emit('choose', this.choose)
    },
    /**
     * 排序筛选
     */
    toSort (type) {
      if (type === '0') {
        if (this.allIndex === 'sort') {
          this.allIndex = 'hsort'
          this.$emit('hotelSort', {sort: 'Default'})
        } else {
          this.allIndex = 'sort'
          this.$emit('hotelSort', {sort: 'DistanceAsc'})
        }
        this.priceIndex = ''
        this.arriveIndex = ''
        this.data.OrderByValue = this.allIndex === 'sort' ? 0 : 1
      } else if (type === '2') {
        if (this.priceIndex === 'sort') {
          this.priceIndex = 'hsort'
          this.$emit('hotelSort', {sort: 'RateAsc'})
        } else {
          this.priceIndex = 'sort'
          this.$emit('hotelSort', {sort: 'RateDesc'})
        }
        this.allIndex = ''
        this.arriveIndex = ''
        this.data.OrderByValue = this.priceIndex === 'sort' ? 0 : 1
      } else {
        if (this.arriveIndex === 'sort') {
          this.arriveIndex = 'hsort'
          this.$emit('hotelSort', {sort: 'Default'})
        } else {
          this.arriveIndex = 'sort'
          this.$emit('hotelSort', {sort: 'StarRankDesc'})
        }
        this.allIndex = ''
        this.priceIndex = ''
        this.data.OrderByValue = this.arriveIndex === 'sort' ? 0 : 1
      }
      this.data.OrderByType = type
      this.$emit('sort', this.data)
    },
    // 获取下级目的地
    getMuDis () {
      let obj = {}
      serverHttp.getMuDiDis({
        LanMuId: this.$route.query.id,
        MuDiDiId: this.MuDiDiId
      }).then(res => {
        if (res.code === 0) {
          for (let key in this.datalist) {
            if (key === 'MuDiDi') {
              this.$set(obj, 'MuDiDi', this.datalist[key])
              this.$set(obj, 'twos', res.data.items)
            } else {
              this.$set(obj, key, this.datalist[key])
            }
          }
          this.listData = obj
        } else {
          this.$message.error(res.mag)
        }
      })
    },
    confirm () {
      this.$emit('sort', this.data)
    },
    showMoreInfo (index, item) {
      let obj = this.element
      let arr = {}
      for (let i in obj) {
        if (i === index) {
          arr[i] = {
            height: obj[i].height,
            isMore: item
          }
        } else {
          arr[i] = {
            height: obj[i].height,
            isMore: false
          }
        }
      }
      this.element = arr
    },
    changePage (type) {
      if (type === 'next' && this.pager.page !== Math.ceil(this.pager.total / 10)) {
        this.pager.page = this.pager.page + 1
        this.$emit('changePage', (this.pager.page))
      } else if (this.pager.page !== 1) {
        this.pager.page = this.pager.page - 1
        this.$emit('changePage', (this.pager.page))
      }
    }
  }
}
</script>
<style lang="scss">
  .clearfix:before, .clearfix:after{content:"\0020";display:block;height:0;overflow:hidden;}
  .clearfix:after{clear:both;}
  .clearfix{zoom:1;}
  .searchGroup .more:after,
  .searchGroup .more:hover:after,
  .searchGroup .more.current:after,
  .SearchPage .prev i,
  .SearchPage .next i,
  .SearchPage .prev:hover i,
  .SearchPage .next:hover i,
  .SearchPage .prev.disabled i,
  .SearchPage .next.disabled i,
  .SearchSort li i,
  .choice span i,
  .moreSearchBtn:after,
  .moreSearchBtn:hover:after,
  .searchGroup .more.current:after,
  .searchGroup a i,
  .moreSearchBtn.open:after{background: url("/static/all.png") no-repeat}
  .ScreenBox{
    position: relative;
    z-index: 2;
    margin-bottom: 15px;
    background-color: #fff;
    border-style: solid;
    border-color: #029a3c #e5e5e5 #e5e5e5;
    border-width: 2px 1px 1px;
  }
  .searchGroup{
    > div{
      dl{
        background: #fff;
        line-height: 45px;
        overflow: hidden;
        border-top:1px dashed #ddd;
        &.searchhide{
          display: none;
        }
      }
      &:first-child dl{
        border-top:none;
      }
    }
    dt{
      float:left;
      padding-right:20px;
      width:78px;
      color: #888;
      text-align: right;
    }
    dd{
      position: relative;
      float:left;
      width:1100px;
      height: 45px;
      overflow: hidden;
      div{
        float:left;
        width:1035px;
        overflow: hidden
      }
      &.hauto{height:auto}
      > div{
        > span{
          float:left;
          margin-right:15px;
          text-align: center;
          overflow: hidden;
          em{
            cursor: pointer;
            padding:3px 6px;
            &:hover{background-color: #fff3e4;color: #f60;text-decoration: none}
            &.current{background-color: #ff6d25;color: #fff;}
          }
        }
      }
    }
    .checkbox span{
      a{
        position: relative;
        i{
          position:absolute;
          top:5px;
          left:4px;
          width:13px;
          height:13px;
          background-color:#fff;
          background-position: -125px -74px;
        }
        &.current i{background-position: -125px -88px;}
      }
      &:first-child a{padding-left:6px;}
    }
    .more{
      position:relative;float:right;padding: 0 18px;color: #029a3c;cursor: pointer;
      &:after{position:absolute;top:20px;right:8px;content:'';width:7px;height: 4px;background-position: -68px -4px;}
      &:hover{
        color: #f60;text-decoration: none;
        &:after{background-position: -68px -12px;}
      }
      &.current{
        &:after{background-position: -68px 0}
        &:hover:after{background-position: -68px -8px;}
      }
    }
  }
  .choice{
    dt{color: #666;}
    span{
      position: relative;
      float:left;
      display: block;
      margin-top:10px;
      margin-right:10px;
      padding:0 21px 0 6px;
      height: 22px;
      line-height: 22px;
      background: #fff;
      color:#555;
      border: 1px dashed #ff5704;
      &:hover{cursor: default;}
      > i{
        position:absolute;
        top:7px;
        right:6px;
        display:block;
        width:9px;
        height:9px;
        background-position: -88px 0;
        cursor:pointer;
        transition: all .3s ease-in 0s;
        &:hover{-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg); transform:rotate(180deg);}
      }
      &.cancel{
        border: none;
        cursor: pointer;
        &:hover{
          color: #f60;
          text-decoration: underline;
        }
      }
    }
  }
  /*moreSearch*/
  .moreSearch{position: relative;background-color: #fff;border-top:1px dashed #ddd}
  .moreSearchBtn{
    position: absolute;
    right:8px;
    margin-top:-1px;
    width:150px;
    height:36px;
    line-height:36px;
    text-align:center;
    background: #fff;
    color: #029a3c;
    border: 1px solid #e5e5e5;
    border-top:1px solid #fff;
    cursor: pointer;
    &:after{position: absolute;top:16px;right:15px;content: '';width:7px;height:4px;background-position: -68px -4px;}
    &:hover,
    &.open:hover{color: #f60}
    &:hover:after{background-position: -68px -12px;}
    &.open{
      &:after{background-position: -68px 0}
      &:hover:after{background-position: -68px -8px;}
    }
  }
  /*sort*/
  .SearchSort{
    float: left;
    li{
      float: left;
      padding: 15px 0;
      cursor: pointer;
      span{
        position:relative;
        display: block;
        padding:0 25px;
        border-left:1px solid #ccc;
        height: 14px;
        line-height: 12px;
        &:hover{color: #f60;}
      }
      &:first-child span{border-left:none}
      &.current span{color: #f60;}
      i{
        position: absolute;
        top:1px;
        margin-left:3px;
        width:7px;
        height:10px;
        background-position: -262px 0;
      }
      &.current i{
        &.up{background-position: -269px 0;}
        &.down{background-position: -276px 0;}
      }
    }
  }
  /*searchprices*/
  .SearchPrices{
    position:absolute;
    top:0;
    left:230px;
    float:left;
    background-color: #fff;
    padding:8px 10px;
    width: 148px;
    &:hover{
      box-shadow: 0 0 5px 2px #dcdcdc;
      .pricesbtn{display: block}
    }
    li{
      float: left;
      line-height: 26px;
      .el-input__inner{padding:0 0 0 8px;width:68px;height:22px;line-height: 19px;border: 1px solid #ddd;border-radius: 0;font-size: 12px}
      &.separator{padding:0 3px;color: #999;}
      &.pricesbtn{
        display:none;
        margin-top:8px;
        span{
          display:inline-block;
          width:68px;
          height:24px;
          line-height: 24px;
          text-align: center;
          color: #999;
          font-size: 12px;
          cursor: pointer;
          &.pricesure{
            margin-left:7px;
            background-color: #ff7800;
            color: #fff;
            border-radius: 2px;
          }
        }
      }
    }
  }
  /*searchpage*/
  .SearchPage{
    position: absolute;
    top:11px;
    right:270px;
    width:150px;
    line-height: 22px;
    text-align: right;
    .prev,
    .next{
      display:inline-block;
      margin-left:5px;
      width:20px;
      height:20px;
      border: 1px solid #ddd;
      cursor: pointer;
      &:hover{border-color: #f80}
      i{
        float: left;
        display: block;
        width:5px;
        height:9px;
      }
      &.disabled{
        border-color: #ddd
      }
    }
    .prev{
      i{background-position: -78px -9px;margin:6px 0 0 6px;}
      &:hover i{background-position: -78px -18px;}
      &.disabled i,
      &.disabled:hover i{background-position: -78px 0;}
    }
    .next{
      i{background-position: -83px -9px;margin:6px 0 0 8px;}
      &:hover i{background-position: -83px -18px;}
      &.disabled i,
      &.disabled:hover i{background-position: -83px 0;}
    }
  }
  .SearchPageNum{
    display: inline-block;
    margin-right:5px;
    font-size: 12px;
    vertical-align: top;
    em{color: #f60;}
  }
</style>
