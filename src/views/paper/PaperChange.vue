<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文中心</el-breadcrumb-item>
      <el-breadcrumb-item>更新论文</el-breadcrumb-item></el-breadcrumb>
    <br>

    <el-card class="box-card" style="width:500px;margin:auto;">
      <h2>修改论文</h2>
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
          <el-input v-model="form.publishDate"></el-input>
        </el-form-item>
        <el-form-item label="上传日期" prop="uploadDate">
          <el-input v-model="form.uploadDate"></el-input>
        </el-form-item>
        <el-form-item label="知网链接" prop="link">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="paperChange">修改</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="温馨提示" :visible.sync="dialogVisible2" width="30%">
        <span>请输入好完整的信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible2 = false" class="edit">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="温馨提示" :visible.sync="dialogVisible1" width="30%">
        <span>上传成功！</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible1 = false" class="edit">确 定</el-button>
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
        link: ''
      },
      rules: {
        title: [{ required: true, message: '标题不可为空', trigger: 'blur' }],
        author: [],
        resource: [],
        summary: [],
        type: [{ required: true, message: '类型不可为空', trigger: 'blur' }],
        publishDate: [{ required: true, message: '日期不可为空', trigger: 'blur' }],
        uploadDate: [{ required: true, message: '日期不可为空', trigger: 'blur' }],
        link: []
      },
      dialogVisible1: false,
      dialogVisible2: false,
    }
  },
  created() {
    this.paperinit()
  },
  methods: {
    paperinit() {
      const paperid = sessionStorage.getItem('paperid')
      this.axios({
        url: '/api/paper/getPaper/' + paperid,
        method: 'get',
        params: {}
      }).then(res => {
        console.log(res)
        this.form.author = res.data.data.author;
        this.form.link = res.data.data.link;
        this.form.publishDate = res.data.data.publishDate;
        this.form.resource = res.data.data.resource;
        this.form.summary = res.data.data.summary;
        this.form.title = res.data.data.title;
        this.form.type = res.data.data.type;
        this.form.uploadDate = res.data.data.uploadDate;
      })
    },
    paperChange() {
      const paperid = sessionStorage.getItem('paperid')
      const userid = sessionStorage.getItem('userid')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.axios({
            url: '/api/paper/updateInfo/'+paperid+'/'+this.form.title+'/'+this.form.author+'/'+this.form.resource+'/'+this.form.summary+'/'+this.form.link,
            method: 'get',
            params: {}
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
    }
  }
}
</script>

<style lang="less" scoped>
.el-selec .el-input {
  width: 300px;
}
</style>
