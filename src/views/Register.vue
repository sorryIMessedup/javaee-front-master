<template>
    <div class="login-wrap">
        <img src="../assets/ecnu.png" style="height: 80px; padding-bottom: 5%;">
        <el-form ref="registerForm" :model="form" :rules="rules" class="login-box" label-width="80px">
            <h3 class="login-title">项目论文科研管理平台</h3>
            <p class="aux">注册界面</p>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" placeholder="用户账号" v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="密码" v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" placeholder="邮箱" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input type="text" v-model="form.code"></el-input>
                <el-button @click="sendCode('registerForm')">发送邮箱验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doRegister('registerForm')" class="edit">注册</el-button>
                <el-button type="info" @click="doLogin">返回</el-button>
            </el-form-item>
            <el-dialog
                title="温馨提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>请先输入好完整的信息</span>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false" class="edit">确 定</el-button>
            </span>
            </el-dialog>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data: function () {
        return {
            form: {
                username: '',
                password: '',
                email: '',
                code: ''
            },
            rules: {
                username: [
                    {required: true, message: '用户名不可为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不可为空', trigger: 'blur'}
                ],
                email: [
                    {type:'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
                ],
            },
            dialogVisible: false
        }
    },
    methods: {
        handleClose(done) {
            done();
        },
        sendCode(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    this.axios({
                        method: 'get',
                        url: '/api/user/register/'+vm.form.username+'/'+vm.form.password+'/'+vm.form.email
                    }).then(function (response) {
                        console.log(response);
                        if (response.data.commonErrorCode == null) {
                            vm.$message.success("发送验证码成功！");
                            return true;
                        } else if (response.data.commonErrorCode == "MAIL_USED_ERROR") {
                            vm.$message.warning("已发送验证码，请稍后再试！");
                            return false;
                        } else {
                            vm.$message.warning("未知错误！ "+response.data.commonErrorCode);
                            return false;
                        }
                    })
                } else {
                    this.dialogVisible = true;
                    return false;
                }
            });
        },
        doRegister(formName) {
            var vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid && vm.form.code != null) {
                    this.axios({
                        method: 'get',
                        url: '/api/user/check/'+vm.form.email+'/'+'/'+vm.form.code
                    }).then(function (response) {
                        console.log(response);
                        if (response.data.commonErrorCode == null) {
                            vm.$message.success("注册成功！");
                            return true;
                        } else if (response.data.commonErrorCode == "VERIFY_FAILED") {
                            vm.$message.error("验证码错误！");
                            return false;
                        } else if (response.data.commonErrorCode == "SYSTEM_INTERNAL_ANOMALY") {
                            vm.$message.warning("尚未发送验证码，或其已失效！");
                        } else {
                            vm.$message.error("未知错误！ "+response.data.commonErrorCode);
                            return false;
                        }
                    })
                } else {
                    this.dialogVisible = true;
                    return false;
                }
            });
        },
        doLogin: function () {
            this.$router.push('/')
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
    color:#FFFFFF;
    background-color: #702963;
    border-color: #702963;
}.edit:hover,
.edit:focus {
    background:  var(--el-button-horver-color);
    border-color: var(--el-button-horver-color);
    color: var(--el-button-font-color);
}

</style>