<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <div class="form-title">用户注册</div>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="手机号码">
            <i slot="prefix" class="iconfont icon-mobile"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="校验码">
            <i slot="prefix" class="iconfont icon-yanzhengma"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="xieyi" style="text-align: left;">
          <el-checkbox style="margin-right: 10px;" v-model="loginForm.xieyi"></el-checkbox>
          <span>我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import '@/assets/js/gt.js'
import '@/assets/font/iconfont.css'
export default {
  data () {
    var xieyiTest = function (rule, value, callback) {
      value ? callback() : callback(new Error('请遵守协议'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '246810',
        xieyi: true
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号必填' },
          { pattern: /^1[35789]\d{9}$/, message: '请填写11位手机号' }
        ],
        code: [{ required: true, message: '校验码必填' }],
        xieyi: [{ validator: xieyiTest }]
      }
    }
  },
  methods: {
    register () {
      // 对登录表单做整体的校验，符合规则就跳转到登录页面
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          const val = {
            mobile: this.loginForm.mobile,
            code: '246810'
          }
          const pro = this.$http.post('/authorizations', {
            row: val
          })
          pro
            .then(result => {
              this.$message.success('账号注册成功')
              this.$router.push('/login')
            })
            .catch(err => {
              return this.$message.error('获得极验秘钥信息错误：' + err)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: gray;
  background-image: url('./login_bg.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 410px;
    height: 345px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .form-title {
      line-height: 28px;
      vertical-align: top;
      font-size: 20px;
      color: #222;
      display: inline-block;
      margin-right: 30px;
      padding-bottom: 8px;
      font-weight: 500;
      font-family: 'PingFangSC';
    }
    .el-form {
      width: 75%;
    }
  }
}
</style>
