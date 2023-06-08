<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文中心</el-breadcrumb-item>
      <el-breadcrumb-item>上传论文</el-breadcrumb-item></el-breadcrumb>
    <br>

    <el-card class="box-card" style="width:500px;margin:auto;">
      <h2>上传论文</h2>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="论文标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="论文作者" prop="author">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="引用来源" prop="resource">
            <el-input v-model="form.resource"></el-input>
          </el-form-item>
          <el-form-item label="论文摘要" prop="summary">
            <el-input v-model="form.summary"></el-input>
          </el-form-item>
          <el-form-item label="论文类型" prop="type">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="发表日期" prop="publishDate">
            <el-input v-model="form.publishDate" placeholder="yyyy-MM-dd"></el-input>
          </el-form-item>
          <el-form-item label="上传日期" prop="uploadDate">
            <el-input v-model="form.uploadDate" placeholder="yyyy-MM-dd"></el-input>
          </el-form-item>
          <el-form-item label="知网链接" prop="link">
            <el-input v-model="form.link"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="paperUpload">上传</el-button>
          </el-form-item>
      </el-form>

      <el-dialog title="温馨提示" :visible.sync="dialogVisible2" width="30%">
        <span>请输入好完整的信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible2 = false" class="edit">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="选择文件" :visible.sync="dialogVisible1" width="30%">
        <el-upload class="upload-demo" action="/api/paper/uploadFile/" :data="{
          'title': this.form.title,
          'id': this.id
          }" :headers="{
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Credentials': 'true',
          }" :on-success="upsucc">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
          <div slot="tip" class="el-upload__tip">上传需要时间，请稍等</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        title: '',
        author: '',
        resource: '',
        summary: '',
        type: '',
        publishDate: '',
        uploadDate: '',
        download: '',
        link: '',
        id: ''
      },
      rules: {
        title: [{ required: true, message: '标题不可为空', trigger: 'blur' }],
        author: [],
        resource: [],
        summary: [],
        type: [{ required: true, message: '类型不可为空', trigger: 'blur' }],
        publishDate: [{ required: true, message: '日期不可为空', trigger: 'blur' }],
        uploadDate: [{ required: true, message: '日期不可为空', trigger: 'blur' }],
        download: [],
        link: []
      },
      newpaperid: 'monster',
      dialogVisible1: false,
      dialogVisible2: false,
    }
  },
  created() {
    this.id = window.sessionStorage.getItem('userid')
   },
  mounted() {
    
  },
  methods: {
    upsucc(msg) {
      console.log(msg)
      this.$message.success('上传成功！')
    },
    paperUpload() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.axios({
            url: '/api/paper/insertPaper',
            method: 'post',
            params: {
              id: window.sessionStorage.getItem('userid'),
              title: this.form.title,
              author: this.form.author,
              resource: this.form.resource,
              summary: this.form.summary,
              type: this.form.type,
              publishDate: this.form.publishDate,
              uploadDate: this.form.uploadDate,
              link: this.form.link
            }
          }).then(res => {
            console.log(res)
          })
          this.dialogVisible1 = true
          return true
        } else {
          this.dialogVisible2 = true
          return false
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.el-selec .el-input {
  width: 300px;
}
</style>
