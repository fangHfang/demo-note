<template>
  <div class="order-content">
    <div class="wrapper">
      <step :current="current" :list="list"></step>
      <div class="order-info">
        <div class="panel">
          <div class="panel-title"><i class="chanpin"></i>基本信息</div>
          <div class="panel-content">
            <div class="panel-group">
              <label>线路信息：</label>
              <span>
                <el-radio-group v-model="linetype" @change="changeType">
                  <el-radio :label="1">选择产品（不可以修改）</el-radio>
                  <el-radio :label="2">复制产品（可以修改）</el-radio>
                  <el-radio :label="3">新建产品</el-radio>
                </el-radio-group>
              </span>
            </div>
            <div class="panel-group" v-if="linetype==1 || linetype==2">
              <label>选择产品：</label>
              <span><i @click="saleDialog = true">选择</i><span>产品名称</span></span>
            </div>
            <template v-if="linetype==2 || linetype==3">
              <div class="panel-group">
                <label>线路名称：</label>
                <span>线路名称线路名称线路名称</span>
              </div>
              <div class="panel-group">
                <label>名称描述：</label>
                <el-input type="text"></el-input>
              </div>
              <div class="panel-group">
                <label>出发地区：</label>
                <el-select multiple placeholder="所在区域">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="panel-group">
                <label>旅游天数：</label>
                <span>
                  <el-input class="price-txt"></el-input><span>天</span>
                  <el-input class="price-txt"></el-input><span>晚</span>
                </span>
              </div>
              <div class="panel-group">
                <label>国内目的地：</label>
                <span><i @click="saleDialog = true">选择</i></span>
              </div>
              <div class="panel-group">
                <label>国际目的地：</label>
                <span><i @click="saleDialog = true">选择</i></span>
              </div>
              <div class="panel-group">
                <label>出发交通：</label>
                <span>
                  <el-radio-group>
                    <el-radio :label="1">火车</el-radio>
                    <el-radio :label="2">飞机</el-radio>
                    <el-radio :label="3">汽车</el-radio>
                  </el-radio-group>
                </span>
              </div>
              <div class="panel-group">
                <label>返回交通：</label>
                <span>
                  <el-radio-group>
                    <el-radio :label="1">火车</el-radio>
                    <el-radio :label="2">飞机</el-radio>
                    <el-radio :label="3">汽车</el-radio>
                  </el-radio-group>
                </span>
              </div>
              <div class="panel-group">
                <label>购物点：</label>
                <span>
                  <el-input class="price-txt"></el-input><span>个</span>
                </span>
              </div>
              <div class="panel-group">
                <label>自费点：</label>
                <span>
                  <el-input class="price-txt"></el-input><span>个</span>
                </span>
              </div>
              <div class="panel-group">
                <label>线路类型：</label>
                <span>
                  <el-radio-group>
                    <el-radio :label="1">周边游</el-radio>
                    <el-radio :label="2">国内游</el-radio>
                    <el-radio :label="3">出境游</el-radio>
                  </el-radio-group>
                </span>
              </div>
              <div class="panel-group">
                <label>产品主题：</label>
                <span>
                  <el-checkbox>主题</el-checkbox>
                  <el-checkbox>主题</el-checkbox>
                  <el-checkbox>主题</el-checkbox>
                  <el-checkbox>主题</el-checkbox>
                </span>
              </div>
              <div class="panel-group">
                <label>合同模板：</label>
                <el-select multiple placeholder="选择游客合同">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="panel-group">
                <label>行程内容：</label>
                <el-input
                  type="textarea"
                  :rows="15"
                  placeholder="行程内容">
                </el-input>
              </div>
            </template>
          </div>
        </div>
        <div class="panel panel-btn">
          <el-button @click="next">下一步</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import step from '@/components/step'
export default {
  name: 'Order1',
  components: {step},
  data () {
    return {
      list: ['第一步: 产品', '第二步: 预订', '第三步: 名单', '第四步: 保险', '第五步: 合同', '第六步: 交团'],
      current: 0,
      linetype: 1,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    changeType (e) {
      this.linetype = e
    },
    next () {
      this.$router.push({name: 'LuRuDingDan2'})
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/order";

</style>
