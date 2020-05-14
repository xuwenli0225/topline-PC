<template>
  <el-container>
    <el-aside :width="isCollapse? '45px': '200px'">
      <el-menu
        background-color="#323745"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/welcome" :width="isCollapse? '45px': '200px'">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :width="isCollapse? '45px': '200px'">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/articleadd">发布文章</el-menu-item>
          <el-menu-item index="/article">文章列表</el-menu-item>
          <el-menu-item index="/comments">评论列表</el-menu-item>
          <el-menu-item index="/material">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/fans" :width="isCollapse? '45px': '200px'">
          <i class="el-icon-location"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/account" :width="isCollapse? '45px': '200px'">
          <i class="el-icon-location"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i
            :class="isCollapse? 'el-icon-s-unfold': 'el-icon-s-fold'"
            @click="isCollapse=!isCollapse;"
          ></i>
          <span>信息创造价值</span>
        </div>
        <div id="rt">
          <span style="margin: 0 25px;">消息</span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="photo" width="40" height="40" style="margin-right: 10px;" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="account()">账户信息</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  data () {
    return {
      isCollapse: false,
      tmpname: '',
      tmpphoto: ''
    }
  },
  created () {
    bus.$on('upAccountName', nm => {
      const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
      userinfo.name = nm
      window.sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
      this.tmpname = nm
    })
    bus.$on('upAccountPhoto', ph => {
      const userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
      userinfo.photo = ph
      window.sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
      this.tmpphoto = ph
    })
  },
  methods: {
    account () {
      this.$router.push('/account')
    },
    logout () {
      this.$confirm('确认要退出系统吗？', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.clear()
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  },
  computed: {
    name () {
      return (
        this.tmpname ||
        JSON.parse(window.sessionStorage.getItem('userinfo')).name
      )
    },
    photo () {
      return (
        this.tmpphoto ||
        JSON.parse(window.sessionStorage.getItem('userinfo')).photo
      )
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: rgb(50, 55, 69);
  }
  .el-header {
    padding: 0 9px 0 10px;
    display: flex;
    min-width: 800px;
    justify-content: space-between;
    #lt {
      height: 100%;
      width: 40%;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    #rt {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        height: 100%;
      }
      img {
        border-radius: 50%;
      }
    }
  }
  .el-main {
    // background-color: rgb(242, 243, 245);
    background-color: #fff;
  }
}
</style>
