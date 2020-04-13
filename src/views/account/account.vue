<template>
  <el-card class="box-card">
    <div slot="header">
      <span>账户信息</span>
    </div>
    <div class="text item cardbody">
      <div id="lt">
        <el-form
          ref="accountFormRef"
          :model="accountForm"
          :rules="accountFormRules"
          label-width="100px"
        >
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="accountForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="accountForm.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="accountForm.email"></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input type="textarea" v-model="accountForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-button type="primary" @click="editAccount()">更新账户</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="rt">
        <el-upload action :show-file-list="false" :http-request="httpRequest">
          <img
            v-if="accountForm.photo"
            class="avatar"
            width="200"
            height="200"
            :src="accountForm.photo"
            alt
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </el-card>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  name: 'Account',
  data () {
    return {
      accountForm: {
        id: '',
        name: '',
        mobile: '',
        email: '',
        intro: ''
      },
      accountFormRules: {
        name: [
          { required: true, message: '名字必填' },
          {
            min: 1,
            max: 7,
            message: '名字长度介于1-7个字符之间'
          }
        ],
        email: [
          { required: true, message: '邮箱必填' },
          { type: 'email', message: '邮箱格式不正确' }
        ]
      }
    }
  },
  created () {
    this.getAccountInfo()
  },
  methods: {
    httpRequest (resource) {
      const fd = new FormData()
      fd.append('photo', resource.file)
      const pro = this.$http.patch('/user/photo', fd)
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            this.accountForm.photo = result.data.data.photo
            bus.$emit('upAccountPhoto', result.data.data.photo)
            this.$message.success('头像更新成功')
          }
        })
        .catch(err => {
          return this.$message.error('头像更新失败：' + err)
        })
    },
    editAccount () {
      this.$refs.accountFormRef.validate(valid => {
        if (valid) {
          const pro = this.$http.patch('/user/profile', this.accountForm)
          pro
            .then(result => {
              if (result.data.message === 'OK') {
                bus.$emit('upAccountName', result.data.data.name)
                this.$message.success('修改账号信息成功')
              }
            })
            .catch(err => {
              return this.$message.error('修改失败：' + err)
            })
        }
      })
    },
    getAccountInfo () {
      const pro = this.$http.get('/user/profile')
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            this.accountForm = result.data.data
          }
        })
        .catch(err => {
          return this.$message.error('获得账户失败：' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.cardbody {
  display: flex;
  justify-content: space-between;
  #lt {
    width: 40%;
  }
  #rt {
    width: 30%;
  }
}
</style>
