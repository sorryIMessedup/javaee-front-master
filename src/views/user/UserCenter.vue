<template>

  <el-container>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="width:350px;margin:auto;">
      <el-dialog title="" :visible.sync="submitDialog" width="30%">
        <span>确认提交?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitUserInfo">确 定</el-button>
        </span>
      </el-dialog>

      <el-form label-width="80px" id="userInfo" ref="formLabels" :model="formLabels" :rules="rules">
        点击头像即可更换头像<br><br>
        <el-form-item label="用户头像">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
            style="margin: 0 auto">
            <img v-if="headsrc" :src="headsrc" class="avatar" style="margin:auto">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="formLabels.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="formLabels.username"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="formLabels.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabels.email"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('formLabels')">提交</el-button>
        <el-button type="warning" @click="removeUser()">注销</el-button>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>

const checkPhone = (rule, value, callback) => {
  const reg = /^1[345789]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入11位手机号'))
  } else {
    callback()
  }
}

export default ({
  data() {
    return {
      optionsDisable: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      headsrc: require('@/assets/defaultHead.jpg'),
      submitDialog: false,
      formLabels: {
        school: '',
        accountNum: '',
        gender: '',
        name: '',
        nickname: '',
        email: '',
        grade: '',
        major: '',
        telephone: '',
        portrait: ''
      },
      rules: {
        name: [
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        nickname: [
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        telephone: [
          { type: 'number', validator: checkPhone, message: '请填写正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getUserInfo() {
      this.axios({
        url: '/api/user/test_user',
        method: 'post',
        params: {},
        headers: {
          // 'withCredentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/x-www-form-urlencoded',
          'timeout': '600'
        }
      }).then(res => {
        console.log(res)
        this.formLabels.userId = window.sessionStorage.getItem('userid')
        this.formLabels.accountNum = window.sessionStorage.getItem('username')
        this.formLabels.type = window.sessionStorage.getItem('isManager')
        this.formLabels.gender = res.data.data.gender
        this.formLabels.name = res.data.data.name
        this.formLabels.nickname = res.data.data.nickname
        this.formLabels.email = window.sessionStorage.getItem('email')
        this.formLabels.grade = res.data.data.grade
        this.formLabels.major = res.data.data.major
        this.formLabels.telephone = res.data.data.telephone
        this.formLabels.portrait = res.data.data.portrait
        this.formLabels.school = res.data.data.school
      })
    },
    async removeUser() {
      console.log(window.sessionStorage.getItem('userId'))
      const confirmResult = await this.$confirm('此操作将永久删除该账号，不可再使用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消注销')
      } else {
        this.axios({
          url: '/api/user/delete',
          method: 'post',
          params: {
            userId: window.sessionStorage.getItem('userId')
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.code == 0) {
              this.$message.success('已注销')
            } else {
              this.$message.error(res.data.commonErrorCode.errorReason)
            }
            window.sessionStorage.clear()
            this.$router.replace('/')
          })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitDialog = true
          console.log(this.formLabels.grade)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitUserInfo() {
      this.submitDialog = false
      this.axios({
        url: '/api/user/update',
        method: 'post',
        data: {
          nickname: this.formLabels.nickname,
          name: this.formLabels.name,
          gender: this.formLabels.gender,
          school: this.formLabels.school,
          major: this.formLabels.major,
          grade: this.formLabels.grade,
          email: this.formLabels.email,
          telephone: this.formLabels.telephone,
          portrait: this.formLabels.portrait
        }
      })
        .then(res => { console.log(res) })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    this.getUserInfo()
  }
})
</script>

<style>
#userInfo {
  margin: 0 auto;
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
</style>
