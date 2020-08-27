<template>
  <div class="myInfo">
    <div class="breadcrumb-title">个人资料</div>
    <div style="padding: 20px 10px;">
      <el-form ref="form" label-width="80px">
        <el-form-item label="头像设置">
          <p style="color: #999;font-size: 12px">（仅支持 jpg、png格式，且小于2M）</p>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.Photo" :src="form.Photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.Name" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.Sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="form.MinZuTypeId" placeholder="民族">
            <el-option  v-for="(item) in minZu" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.Telephone" type="number" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="form.Email" placeholder="邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码">
          <el-input v-model="form.QQ" placeholder="QQ号码"></el-input>
        </el-form-item>
        <el-form-item label="微信号码">
          <el-input v-model="form.WeiXin" placeholder="微信号码"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="form.ShenFenZheng" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item label="护照">
          <el-input v-model="form.HuZhao" placeholder="护照"></el-input>
        </el-form-item>
        <el-form-item label="其他证件">
          <el-input v-model="form.QiTaZhengJian" placeholder="其他证件"></el-input>
        </el-form-item>
        <el-form-item label="隶属部门">
          <el-select v-model="form.JiGouId" placeholder="部门">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in buMen" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位名称" class="address-item">
          <el-radio-group v-model="form.ZhiWu">
            <el-radio :label="item.Id" v-for="(item, index) in zhuWu" :key="index">{{item.Name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="籍贯地址" class="address-item">
          <el-select v-model="form.OneId" placeholder="地区" @change="changeOne">
            <el-option :label="item.Name" v-for="(item) in one" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
          <el-select v-model="form.TwoId" placeholder="省份" @change="changeTwo">
            <el-option :label="item.Name" v-for="(item) in two" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
          <el-select v-model="form.ThreeId" placeholder="城市" @change="changeThree">
            <el-option :label="item.Name" v-for="(item) in three" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
          <el-select v-model="form.FourId" placeholder="县级" v-if="four.length > 0">
            <el-option :label="item.Name" v-for="(item) in four" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="warning" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'myInfo',
  data () {
    return {
      buMen: [],
      zhuWu: [],
      minZu: [],
      region: [],
      one: [],
      two: [],
      three: [],
      four: []
    }
  },
  created () {
    this.getBaseData()
    this.GetRegion()
  },
  computed: {
    form () {
      return this.$store.state.userInfo || ''
    }
  },
  watch: {
  },
  methods: {
    // 改变一级  更新二级数据
    changeOne (val) {
      this.form.TwoId = ''
      this.form.ThreeId = ''
      this.form.FourId = ''
      this.two = this.region.filter(v => v.Pid === val)
    },
    // 改变二级  更新三级数据
    changeTwo (val) {
      this.form.ThreeId = ''
      this.form.FourId = ''
      this.three = this.region.filter(v => v.Pid === val)
    },
    // 改变三级  更新四级数据
    changeThree (val) {
      this.form.FourId = ''
      this.four = this.region.filter(v => v.Pid === val)
    },
    onSubmit () {
      this.form.RegionId = this.form.FourId || this.form.ThreeId || this.form.TwoId || this.form.OneId
      serverHttp.EditUserInfo(this.form).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功!')
          location.reload()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.form.Photo = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === ('image/jpeg' || 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('仅支持 JPG/PNG 格式 !')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 获取部门/职务/民族
    getBaseData () {
      serverHttp.GetJiGou().then(res => {
        if (res.code === 0) {
          this.buMen = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      serverHttp.GetZhiWu().then(res => {
        if (res.code === 0) {
          this.zhuWu = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      serverHttp.GetMinZu().then(res => {
        if (res.code === 0) {
          this.minZu = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    GetRegion () {
      serverHttp.GetRegion().then(res => {
        if (res.code === 0) {
          this.region = res.data
          this.one = this.region.filter(v => v.Pid === '0')
          this.two = this.region.filter(v => v.Pid === this.form.OneId)
          this.three = this.region.filter(v => v.Pid === this.form.TwoId)
          this.four = this.region.filter(v => v.Pid === this.form.ThreeId)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .myInfo {
    .breadcrumb-title {
      padding-bottom: 13px;
      border-bottom: 2px solid #e5e5e5;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 500;
      color: #666;
    }

    .el-form-item {
      margin-bottom: 10px;
      overflow: hidden;
      .el-form-item__content{
        max-height: 300px;
      }

      .el-button--warning{
        background-color: #f60;
        border-color: #f60;
        padding: 10px 50px;
      }

      .el-input__inner {
        height: 30px;
      }

      .el-input {
        width: 248px;
      }

      .el-select {
        width: 116px;

        .el-input {
          width: 100%;
        }
      }
    }
    .el-form-item__label{
      color: #333;
    }
    .address-item{
      .el-select{
        margin-right: 10px;
      }
      .el-radio{
        padding: 10px 0;
      }
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
