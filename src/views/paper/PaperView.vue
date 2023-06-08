<template>
  <div class="wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的论文</el-breadcrumb-item>
      <br><br>
    </el-breadcrumb>

    <el-card class="box-card" style="width:900px;margin:auto;">
      <el-descriptions title="论文详情" border :column="4">
        <el-descriptions-item label="论文标题" span="4">{{ this.title }}</el-descriptions-item>
        <el-descriptions-item label="作者" span="4">{{ this.author }}</el-descriptions-item>
        <el-descriptions-item label="上传者id" span="2">{{ this.id }}</el-descriptions-item>
        <el-descriptions-item label="论文id" span="2">{{ this.pid }}</el-descriptions-item>
        <el-descriptions-item label="论文分数" span="2">{{ this.score }}</el-descriptions-item>
        <el-descriptions-item label="论文状态" span="2">{{ this.status }}</el-descriptions-item>
        <el-descriptions-item label="论文类型" span="2">{{ this.type }}</el-descriptions-item>
        <el-descriptions-item label="点赞数" span="2">{{ this.likes }}</el-descriptions-item>
        <el-descriptions-item label="发布来源" span="4">{{ this.resource }}</el-descriptions-item>
        <el-descriptions-item label="下载链接" span="4">{{ this.download }}</el-descriptions-item>
        <el-descriptions-item label="知网链接" span="4">{{ this.link }}</el-descriptions-item>
        <el-descriptions-item label="发布日期" span="2">{{ this.publishDate }}</el-descriptions-item>
        <el-descriptions-item label="上传时间" span="2">{{ this.uploadDate }}</el-descriptions-item>
        <el-descriptions-item label="摘要" span="4">{{ this.summary }}</el-descriptions-item>
      </el-descriptions><br><br>

      <el-button type="primary" @click="down">下载pdf</el-button>
      <el-button type="success" @click="like">点赞</el-button>
      <el-button type="danger" @click="change">修改</el-button>
      <el-button round @click="goback">返回</el-button>

    </el-card>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible1" width="30%">
      <span>点赞成功！<br><br></span>
      <span>（一位用户只能点赞一篇论文1次，多点不计噢）</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false" class="edit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      author: '',
      collections: '',
      download: '',
      id: '',
      likes: '',
      link: '',
      pid: '',
      publishDate: '',
      resource: '',
      score: '',
      status: '',
      summary: '',
      title: '',
      type: '',
      uploadDate: '',
      dialogVisible1: false
    }
  },
  created() {
    this.getpaper()
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    getpaper() {
      const paperid = sessionStorage.getItem('paperid')
      this.axios({
        url: '/api/paper/getPaper/' + paperid,
        method: 'get',
        params: {}
      }).then(res => {
        console.log(res)
        this.author = res.data.data.author;
        this.collections = res.data.data.collections;
        this.download = res.data.data.download;
        this.id = res.data.data.id;
        this.likes = res.data.data.likes;
        this.link = res.data.data.link;
        this.pid = res.data.data.pid;
        this.publishDate = res.data.data.publishDate;
        this.resource = res.data.data.resource;
        this.score = res.data.data.score;
        this.status = res.data.data.status;
        this.summary = res.data.data.summary;
        this.title = res.data.data.title;
        this.type = res.data.data.type;
        this.uploadDate = res.data.data.uploadDate;
      })
    },
    like() {
      const paperid = sessionStorage.getItem('paperid')
      this.axios({
        url: '/api/likes/doLike/' + paperid,
        method: 'post',
        params: {}
      }).then(res => {
        console.log(res)
        this.dialogVisible1 = true
      })
    },
    down() {
      window.open(this.download, '_blank')
    },
    change() {
      this.$router.push('/PaperChange')
    }
  }
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}

.container {
  font-family: PingFang SC;
  width: 100%;
}
</style>
