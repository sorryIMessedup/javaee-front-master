<template>
  <div class="login-wrap">
    <img src="../assets/ecnu.png" style="height: 80px; padding-bottom: 5%;">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">项目论文科研管理平台</h3>
      <p class="aux">登录界面</p>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" placeholder="请输入用户名" v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="doLogin('loginForm')" class="edit">登录</el-button>
        <el-button type="info" v-on:click="doRegister">注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      done();
    },
    doLogin(formName) {
      var vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: 'get',
            url: '/api/user/login/' + vm.form.username + '/' + vm.form.password,
            data: {},
            headers: {
              'Access-Control-Allow-Credentials': 'true',
              'timeout': '600',
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            console.log(response);
            if (response.data.commonErrorCode == null) {
              vm.$message.success("登录成功！")
              window.sessionStorage.setItem('username', vm.form.username)
              window.sessionStorage.setItem('userid', response.data.data)
              vm.$router.push('/Main');
              return true;
            } else if (response.data.commonErrorCode == "USER_NOT_EXIST") {
              vm.$message.error("该用户不存在！");
              return false;
            } else if (response.data.commonErrorCode == "LOGIN_FAILED") {
              vm.$message.error("密码错误！");
              return false;
            }
            else {
              vm.$message.error("登陆错误！" + response.data.commonErrorCode);
              return false;
            }
          })
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    doRegister: function () {
      this.$router.push('/Register');
    },
    getinfo() {

    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  //box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background-image: url("../assets/bg.jpg");
  background-color: #702963;
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 110%;
  padding-top: 1%;
}

.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 0 auto;
  padding: 0px 35px 15px 35px;
  background-color: #FFFFFF;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  margin-bottom: -10px;
  line-height: 30px;
  text-align: left;
  font-size: 26px;
  font-weight: bolder;
  color: #000000;
  text-shadow: 1px 1px 0px #909399;
}

.aux {
  font-size: 21px;
  color: #909399;
  font-weight: medium;
  padding-bottom: 10px;
}

.edit {
  color: #FFFFFF;
  background-color: #702963;
  border-color: #702963;
}

.edit:hover,
.edit:focus {
  background: var(--el-button-horver-color);
  border-color: var(--el-button-horver-color);
  color: var(--el-button-font-color);
}
</style>
