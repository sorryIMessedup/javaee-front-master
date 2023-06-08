<template>
  <el-container class="home-container">
    <!--页面头部-->
    <el-header style="height: 80px;">
      <div style="width: 500px; display: block; padding-left: 20px;">
        <div style="font-size: 24px;">论文项目管理系统<br></div>
        <div style="font-size: 18px; font-family: 'Times New Roman', Times, serif;">
          Thesis & Project Management System</div>
      </div>
      <span style="font-size: 22px;">欢迎，{{ this.user }}</span>
      <img src="../assets/ecnu.png" style="height: 65px; padding-right: 0%;">
      <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>
    <!--页面主体-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '220px'">
        <div class="toggle-button" @click="toggleCollapse">
          <span>{{ content1 }}</span>
        </div>
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409EFF" :unique-opened="true"
          :collapse="isCollapse" :collapse-transition="false" :router="true">
          <el-menu-item index="MyData">
            <i class="el-icon-menu"></i>
            <span slot="title">我的数据</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>论文中心</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-user"></i>
              <span>我的论文</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-upload2"></i>
              <span>上传论文</span>
            </el-menu-item>
            <el-menu-item index="2-3">
              <i class="el-icon-search"></i>
              <span>搜索论文</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-suitcase"></i>
              <span>项目中心</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-user"></i>
              <span>我的项目</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-upload2"></i>
              <span>上传项目</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="6">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>管理员</span>
            </template>
            <el-menu-item index="7-1">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="7-2">
              <i class="el-icon-document"></i>
              <span>查看所有论文</span>
            </el-menu-item>
            <el-menu-item index="7-3">
              <i class="el-icon-box"></i>
              <span>Web测试</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧主体内容-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Main',
  data() {
    return {
      userId: 0,
      isCollapse: false,
      content1: '>>>',
      i: 0,
      user: 'UserName'
    }
  },
  created() {
    this.getnickname()
    this.getUserInfo()
  },
  methods: {
    getnickname() {
      const user0 = sessionStorage.getItem('username')
      console.log(user0)
      if (user0 != null) this.user = user0
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      this.i = this.i + 1
      if (this.i % 2 == 0) {
        this.content1 = '<<<'
      } else this.content1 = '>>>'
    },
    getUserInfo() {
      this.userId = window.sessionStorage.getItem('userid');
      this.axios({
        url: '/api/user/list/my/info/' + this.userId,
        method: 'get',
        params: {},
        headers: {
          // 'withCredentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/x-www-form-urlencoded',
          'timeout': '600'
        }
      }).then(res => {
        console.log(res);
        window.sessionStorage.setItem('isManager', res.data.data.type);
        window.sessionStorage.setItem('email', res.data.data.mail);
      })
    }
  }
}
</script>

<style lang="less">
.home-container {
  font-family: '微软雅黑';
  min-width: 1350px;
  height: 100%;
}

.el-header {
  background-image: linear-gradient(to bottom right, #702963, #702963);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 24px;

  >div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #545c64;

  .el-menu {
    border-right: 0;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
