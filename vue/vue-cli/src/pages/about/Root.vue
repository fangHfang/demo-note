<template>
  <div class="about">
    <div class="root">
      <el-row>
        <el-col :span="5" class="content-left">
          <div>
            <p>关于我们</p>
            <ul>
              <li :class="{'activeType': typeIndex === index, 'clickNone': isclick === true}" @click="changeType(item.Id, index)" v-for="(item, index) in tabList" :key="index">{{item.Name}}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="19" class="content-right">
          <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import commonHttp from '@/assets/common/common'
export default {
  name: 'Root',
  data () {
    return {
      tabList: [],
      typeIndex: 0,
      isclick: false
    }
  },
  methods: {
    getType () {
      commonHttp.GetZiDian({Key: 'wenzhang_guanyuwomen'}).then(res => {
        res.data.wenzhang_guanyuwomen.unshift({Name: '全部', Id: ''})
        this.tabList = res.data.wenzhang_guanyuwomen
      })
    },
    changeType (id, index) {
      this.typeIndex = index
      this.$router.push({name: 'aboutIndex', query: {id: this.$route.query.id, typeId: id, index}})
    }
  },
  watch: {
    '$route' (val) {
      this.typeIndex = val.query.index
      if (val.query.isclick === '0') {
        this.isclick = true
      }
    }
  },
  mounted () {
    if (this.$route.query.isclick === '0') {
      this.typeIndex = Number(this.$route.query.index)
      this.isclick = true
    }
    this.getType()
  }
}
</script>

<style lang="scss">
  .about{
    .root{
      width: 1200px;
      margin: 20px auto;
      .el-col {
        background: #fff;
      }

      .content-left {
        background: #fff;
        width: 20%;
        border: 1px solid #e5e5e5;
        margin-right: 20px;
        padding: 20px 0 0;

        p {
          display: block;
          margin: 0 20px;
          padding-left: 10px;
          padding-bottom: 9px;
          font-size: 20px;
          border-bottom: 1px solid #e5e5e5;
        }

        ul {
          li {
            position: relative;
            margin: 15px 0;
            padding: 5px 40px;
            font-size: 16px;
            border-left: 3px solid transparent;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            transition: all .2s ease-in-out;
            cursor: pointer;
          }
          .activeType{
            border-left-color: #029a3c;
            color: #029a3c;
          }
          .clickNone{
            pointer-events: none;
          }
        }
      }

      .content-right{
        width: calc(80% - 20px);
        border: 1px solid #e5e5e5;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
</style>
