<template>
  <div class="planeCityList" v-cloak>
    <div class="city"  v-clickOutside="hideCityDialog">
      <el-input type="text" :placeholder="placeholderName" v-model="name" suffix-icon="el-icon-arrow-down"
                @focus="showCityDialog"></el-input>
      <div class="city-components" v-if="showCity">
        <ul class="filter-tabar clearfix">
          <li v-for="(item,index) in cityListKey" :key="index" :class="{active:upCityListIndex==index}"
              @mouseenter="upCityListKey(index)">{{item}}
          </li>
        </ul>
        <div class="city-content">
          <ul v-for="(item, tabIndex) in upCityList" :key="tabIndex" class="clearfix">
            <label>{{item.ckey}}</label>
            <div class="city-item">
              <li v-for="(ritem, index) in item.cityList" :key="index" @click="selectDepCity(ritem)">
                {{ritem.RegionNameCn}}
              </li>
              <!--            @click="selectDepCity(ritem)"-->
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/yl_hotel'
export default {
  name: 'cityList',
  props: {
    placeholderName: {
      type: String,
      default: '出发城市'
    },
    defulteCity: {
      type: String
    }
  },
  data () {
    return {
      showCity: false,
      upCityListIndex: 0,
      upCityList: [],
      cityListKey: [],
      cityList: [],
      name: '',
      list: {}
    }
  },
  watch: {
    'list' () {
      this.changeData()
    },
    'defulteCity' (val) {
      this.name = val
    }
  },
  created () {
    this.name = this.defulteCity
    this.getListData()
  },
  directives: {
    // 点击外部隐藏下拉选择城市框  解决input blur bug导致的先关闭下拉选项框才赋值的问题
    clickOutside: {
      bind (el, binding, vnode) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }

        el._vueClickOutside_ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind (el, binding) {
        document.removeEventListener('click', el._vueClickOutside_)
        delete el._vueClickOutside_
      }
    }
  },
  methods: {
    hideCityDialog () {
      this.showCity = false
    },
    showCityDialog () {
      this.showCity = true
    },
    getListData () {
      serverHttp.GetDestination({}).then(res => {
        let cityarr = res.data
        let arr = []
        cityarr.forEach(item => {
          if (!arr[item.jianPin.charAt(0)]) {
            arr[item.jianPin.charAt(0)] = [item]
          } else {
            arr[item.jianPin.charAt(0)].push(item)
          }
        })
        this.list = arr
        this.changeData()
      })
    },
    changeData () {
      let arr = []
      for (let gkey in this.list) {
        arr.push({
          ckey: gkey,
          cityList: this.list[gkey]
        })
      }
      arr = arr.sort((li1, li2) => li1.ckey.charCodeAt(0) - li2.ckey.charCodeAt(0))
      let chunk = 4
      let result = []
      for (var i = 0, j = arr.length; i < j; i += chunk) {
        result.push(arr.slice(i, i + chunk))
      }
      let cityListKey = []
      result.map(item => {
        let ckeys = ''
        item.map(ritem => {
          ckeys += ritem.ckey
        })
        cityListKey.push(ckeys)
      })
      this.cityListKey = cityListKey
      this.cityList = result
      this.upCityList = result
      this.upCityList = this.cityList[this.upCityListIndex]
    },
    upCityListKey (index) {
      this.upCityListIndex = index
      this.upCityList = this.cityList[index]
    },
    selectDepCity (item) {
      this.name = item.RegionNameCn
      this.$emit('changeItem', item)
      this.showCity = false
    }
  }
}
</script>

<style lang="scss">
  [v-cloak] {
    display: none;
  }
  .planeCityList {
    display: inline-block;

    .city {
      position: relative;

      .el-input__icon {
        line-height: 31px;
      }

      .city-components {
        position: absolute;
        background: #fff;
        width: 600px;
        /*height: 200px;*/
        box-shadow: 0 0 4px 0 rgba(117, 117, 117, 0.5);
        border-radius: 2px;
        padding: 10px 11px;
        z-index: 1000;
      }
    }

    .clearfix {
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }

    li {
      list-style: none;
    }

    ul {
      padding: 0;
      margin: 0;
    }

    .filter-tabar {
      border-bottom: 1px solid #d7d7d7;
      cursor: pointer;

      li {
        text-align: center;
        padding: 10px;
        float: left;
        font-size: 12px;
        margin: 0 4px;
        margin-bottom: -1px;
        position: relative;

        &.active {
          border-bottom: 1px solid #3aa400;
        }
      }
    }

    .city-content {
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px 13px 0 13px;

      label {
        display: block;
        float: left;
        width: 20px;
        margin-bottom: 5px !important;
        font-size: 12px !important;
        margin-left: 0 !important;
        color: #f60 !important;
        margin-right: 10px;
        margin-top: 5px;
      }

      .city-item {
        width: calc(100% - 30px);
        overflow: hidden;

        li {
          padding: 6px 0;
          float: left;
          text-align: left;
          font-size: 12px;
          margin-right: 14px;
          cursor: pointer;
        }
      }
    }
  }
</style>
