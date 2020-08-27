<template>
  <div>
  <div class="ScreenBox">
    <div class="searchGroup clearfix">
      <div v-for="(item,index) in listData" :key="index" v-if="item.length || item.items.length">
        <dl>
          <dt>目的地</dt>
          <dd :class="{hauto:element[index] && element[index].isMore}">
            <div :id="index" class="clearfix" v-if="item.length || item.items.length">
              <span @click="addChooseHandle(option,index,childIndex+1)" v-for="(option,childIndex) in item" :key="childIndex"><em :class="{current:data[index] === childIndex+1}">{{option.Name ? option.Name : option.name}}</em></span>
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
            <li :class="{current:allIndex!=''}"><span @click="toSort('0')">出发时间<i :class="allIndex === 'sort' ? 'up' : 'down'"></i></span></li>
            <li :class="{current:arriveIndex!=''}"><span @click="toSort('1')">抵达时间<i :class="arriveIndex === 'sort' ? 'up' : 'down'"></i></span></li>
            <li :class="{current:priceIndex!=''}"><span @click="toSort('2')">价格<i :class="priceIndex === 'sort' ? 'up' : priceIndex === 'hsort' ? 'down' : ''"></i></span></li>
          </ul>
        </div>
        <!-- <div class="SearchPrices">
          <ul class="clearfix">
            <li><el-input type="number" v-model="data.MinPrice" placeholder="最低价"></el-input></li>
            <li class="separator">-</li>
            <li><el-input type="number" v-model="data.MaxPrice" placeholder="最高价"></el-input></li>
            <li class="pricesbtn">
              <span @click="data.MinPrice = '', data.MaxPrice=''">清除价格</span>
              <span class="pricesure" @click="confirm">确定</span>
            </li>
          </ul>
        </div> -->
        <div class="SearchPage" v-if="pager">
          <span class="SearchPageNum">页码：<em>{{pager.page}}</em>/{{Math.ceil(pager.total /10)}}</span>
          <span class="prev disabled"><i></i></span>
          <span class="next"><i></i></span>
        </div>
        <!--<div v-if="Object.keys(listData).length>5" class="moreSearchBtn">展开更多筛选条件</div>-->
      </div>
    </div>
  </div>
  </div>
</template>
<script>
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
          this.$emit('jipiaoSort', {byType: '1', type: '1'})
        } else {
          this.allIndex = 'sort'
          this.$emit('jipiaoSort', {byType: '1', type: '2'})
        }
        this.priceIndex = ''
        this.arriveIndex = ''
        this.data.OrderByValue = this.allIndex === 'sort' ? 0 : 1
      } else if (type === '2') {
        if (this.priceIndex === 'sort') {
          this.priceIndex = 'hsort'
          this.$emit('jipiaoSort', {byType: '3', type: '1'})
        } else {
          this.priceIndex = 'sort'
          this.$emit('jipiaoSort', {byType: '3', type: '2'})
        }
        this.allIndex = ''
        this.arriveIndex = ''
        this.data.OrderByValue = this.priceIndex === 'sort' ? 0 : 1
      } else {
        if (this.arriveIndex === 'sort') {
          this.arriveIndex = 'hsort'
          this.$emit('jipiaoSort', {byType: '2', type: '1'})
        } else {
          this.arriveIndex = 'sort'
          this.$emit('jipiaoSort', {byType: '2', type: '2'})
        }
        this.allIndex = ''
        this.priceIndex = ''
        this.data.OrderByValue = this.arriveIndex === 'sort' ? 0 : 1
      }
      this.data.OrderByType = type
      this.$emit('sort', this.data)
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
