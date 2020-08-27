<template>
  <div style="background: #fff;" class="tour-order-root">
    <div class="tour-order">
      <step :current="current" :list="list"></step>
      <router-view/>
    </div>

  </div>
</template>

<script>
import step from '@/components/step'
export default {
  name: 'OrderHetong',
  components: {step},
  data () {
    return {
      list: ['第一步: 产品信息', '第二步: 订单信息', '第三步: 名单', '第四步: 保险'],
      // tab进度条
      current: 0,
      // -------------------------------------------
      form: {
        name: '',
        remark: '',
        phone: '',
        region: '',
        type1: 1,
        type2: 1,
        type3: '1'
      },
      topHeight: 0,
      dialogFormVisible: false,
      dialog2: false,
      fileList: [],
      // 投保信息
      baoXian: [{time: '08: 20', address: '山西省太原市小店区研发技术部', type: '1'}, {time: '20: 00', address: '山西省太原市小店区技术部，ddddd', type: '2'}],
      baoXianData: {
        id: ''
      },
      dialog3: false,
      multipleSelection: [],
      // 付款
      dialog4: false,
      val: {
        HtType: '1'
      },
      OrderId: '',
      // 常旅客
      personDialog: false,
      // 销售员工
      saleDialog: false,
      // 修改合同
      contactDialog: false
    }
  },
  created () {
    this.current = Number(this.$route.query.current) || 0
  },
  watch: {
    '$route' (val) {
      this.current = val.query.current
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/order";
  .tour-order-root{
    .tour-order{
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .content{
        margin-top: 20px;
        overflow: hidden;
        position: relative;
        .con-left{
          width: 100%;
          float: left;
          .base-allInfo{
            font-size: 14px;
            p{
              color: #333;
              line-height: 32px;
              overflow: hidden;
              .base-all-item:first-child{
                display: inline-block;
                width: 90px;
                float: left;
                margin-right: 8px;
                text-align: right;
                color: #666;
              }
              .base-all-item:last-child{
                float: right;
                width: calc(100% - 100px);
                display: inline-block;
                color: #333;
                .el-input__icon{
                  line-height: 30px;
                }
              }
            }
          }
          .lf-con-item{
            padding: 25px 25px 10px;
            margin-bottom: 20px;
            font-size: 13px;
            border: 1px solid #eee;
            border-top: 2px solid #ddd;
            .item-header{
              background: #f8f8f8;
              margin-bottom: 25px;
              line-height: 43px;
              font-size: 20px;
              color: #333;
              .base-info{
                width: 43px;
                height: 43px;
                display: block;
                float: left;
                position: relative;
                &:before{
                  position: absolute;
                  top: 7px;
                  left: 6px;
                  content: '';
                  width: 30px;
                  height: 30px;
                  background: url("/static/all.png") no-repeat;
                }
              }
              span{
                margin-left: 23px;
              }
              .base-icon1{
                background: #09c;
                &:before{
                  height: 29px;
                  background-position: -228px -182px;
                }
              }
              .base-icon2{
                background: #f39c12;
                &:before{
                  top: 8px;
                  height: 32px;
                  background: url('/static/icon/renshu.png') no-repeat
                }
              }
              .base-icon3{
                background: #8e44ad;
                &:before{
                  top: 6px;
                  height: 32px;
                  background: url('/static/icon/ziyuan.png') no-repeat
                }
              }
              .base-icon4{
                background: #F6442C;
                &:before{
                  top: 6px;
                  height: 32px;
                  background: url("/static/icon/address.png") no-repeat;
                }
              }
              .base-icon5{
                background: #f39c12;
                &:before{
                  top: 8px;
                  height: 32px;
                  background: url("/static/icon/renshu.png") no-repeat;
                }
              }
              .base-icon6{
                background: #53a93f;
                &:before{
                  top: 6px;
                  left: 7px;
                  height: 33px;
                  background-position: -161px -178px;
                }
              }
            }
            .el-input__inner{
              height: 32px;
            }
            .el-form-item__label{
              color: #333;
            }
            .el-form-item{
              margin-bottom: 8px;
            }
          }
          .lf-con-next{
            padding: 15px;
            border: 1px solid #ffdbb2;
            background: #fffceb;
            margin-bottom: 20px;
            /*span{*/
            /*  color: #666;*/
            /*  font-size: 14px;*/
            /*  i{*/
            /*    font-size: 18px;*/
            /*    color: #ff9419;*/
            /*    em{*/
            /*      font-size: 30px;*/
            /*    }*/
            /*  }*/
            /*}*/
            p{
              width: 158px;
              height: 40px;
              display: inline-block;
              float: right;
              background: #ff9419;
              line-height: 40px;
              color: #fff;
              font-weight: bold;
              border-radius: 2px;
              text-align: center;
              font-size: 16px;
              cursor: pointer;
              z-index: 999;
            }
          }
          .el-table{
            .el-input__icon{
              line-height: 30px;
            }
          }
        }
        .con-right-item{
          width: 252px;
          position: absolute;;
          top: 0;
          right: 0;
          z-index: 999;
          .con-right{
            width: 250px;
            float: right;
            border: 1px solid #eee;
            background: #fff;
            .con1{
              padding: 0 10px;
              height: 42px;
              line-height: 42px;
              background-color: #fb9125;
              color: #fff;
              font-size: 16px;
              font-weight: bold;
            }
            .con2{
              margin: 0 10px;
              border-bottom: 1px solid #ddd;
              line-height: 39px;
              font-size: 14px;
              color: #666;
              overflow: hidden;
              span:first-child{
                float: left;
                margin-left: 8px;
              }
              span:last-child{
                float: right;
                margin-right: 8px;
              }
            }
            .con2:nth-last-child(2){
              border-bottom: none;
            }
            .con3{
              padding: 15px 0 15px 10px;
              border-top: 1px solid #ffdbb2;
              background: #fffceb;
              color: #666;
              font-size: 16px;
              font-weight: bold;
              white-space: nowrap;
              span:last-child{
                color: #f60;
                font-size: 23px;
              }
            }
          }
        }
        .isFixed{
          height: auto;
          position: fixed;
          right: calc((100% - 1200px)/2);
          top: 0;
          margin: 0 auto;
          z-index: 0;
        }
      }
    }
    /*快捷添加弹窗*/
    .dialog1{
      .el-dialog__body{
        padding: 20px;
        .choose-title{
          font-size: 16px;
          padding-left: 8px;
          border-left: 3px solid #f60;
          line-height: 20px;
          margin-bottom: 15px;
        }
        .title1{
          background: #f2dede;
          color: #a94442;
          border: 1px solid #ebccd1;
          padding: 10px 15px;
          border-radius: 3px;
        }
        .title2{
          margin: 10px 0;
          padding: 10px;
          overflow: hidden;
          border: 1px solid #e2e2e2;
        }
        .title3{
          @extend .title2;
          overflow: hidden;
          border-radius: 5px;
          padding: 0;
          height: 100%;
          .small-title{
            width: 100px;
            min-height: 40px;
            text-align: right;
            box-sizing: border-box;
            padding: 10px;
            display: block;
            margin-right: 10px;
            background: #e2e2e2;
            float: left;
          }
          .right-con{
            line-height: 40px;
            box-sizing: border-box;
            width: calc(100% - 110px);
            display: inline-block;
            float: right;
            .el-select{
              height: 30px;
              .el-input__inner{
                height: 30px;
              }
            }
          }
        }
        .el-textarea__inner{
          height:160px;
        }
      }
      .person-item{
        padding: 20px 30px;
        margin-bottom: 15px;
        border: 1px solid #dde4ed;
        background: #f2f5f9;
        position: relative;
        .person-num{
          width: 66px;
          border: 1px solid #e9e9e9;
          text-align: center;
          position: absolute;
          left: 43px;
          top: 20px;
          p:first-child{
            height: 48px;
            line-height: 48px;
            background: #fff;
            font-size: 13px;
            border: 1px solid #ddd;
            color: #20a832;
            i{
              font-size: 24px;
            }
          }
        }
        .form-person{
          margin-left: 100px;
        }
        .el-form-item__content{
          .person-choose{
            margin-left: 20px;
            color: #09c;
            cursor: pointer!important;
            &:hover{
              color: #f60;
            }
          }
        }
        .el-form-item{
          margin-bottom: 5px;
        }
      }
    }
    .dialog3{
      .el-form-item{
        background: #eee;
        .el-form-item__label{
          color: #000;
        }
        .el-input{
          .el-input__inner{
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .el-form-item:last-child{
        padding: 10px 10px 10px 0;
      }
    }
  }
</style>
