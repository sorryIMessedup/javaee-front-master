<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的论文</el-breadcrumb-item>
      <br><br>
    </el-breadcrumb>
    <el-card class="box-card">
      <div>这里显示的是由您上传的论文，只有管理员可以查看所有人上传的论文（搜索功能无此限制）。<br>
        审核状态：0-正在审核，1-已通过，-1-未通过。
      </div><br>
      <el-row>
        <el-col :span="9">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="paperList.slice((pageNum - 1) * pageSize, pageNum * pageSize)" border stripe>
        <el-table-column fixed label="标题" prop="title" width="150"></el-table-column>
        <el-table-column label="作者" prop="author" width="150"></el-table-column>
        <el-table-column label="论文编号" prop="pid" width="100"></el-table-column>
        <el-table-column label="上传者id" prop="id" width="100"></el-table-column>
        <el-table-column label="发表日期" prop="publishDate" width="150"></el-table-column>
        <el-table-column label="上传日期" prop="uploadDate" width="150"></el-table-column>
        <el-table-column label="收藏数" prop="collections" width="70"></el-table-column>
        <el-table-column label="点赞数" prop="likes" width="70"></el-table-column>
        <el-table-column label="审核状态" prop="status" width="80"></el-table-column>
        <!--document, delete, edit-->
        <!--showpaper, removePaper, changepaper (scope.row.pid)-->
        <el-table-column label="操作" fixed="right" width="190">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看论文" placement="top">
              <el-button type="primary" icon="el-icon-document" size="mini"
                @click="showpaper(scope.row.pid)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑论文" placement="top">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="changepaper(scope.row.pid)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除论文" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removePaper(scope.row.pid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[1, 2, 5, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      paperList: [
        // 预置数据
        {
          "pid": "114514",
          "title": "沼气的制造原理 卷1",
          "author": "田所浩二",
          "resource": "XiaBeiZe",
          "summary": "nishiyigeyige",
          "type": "1",
          "publishDate": "1919-08-10",
          "uploadDate": "1919-08-11",
          "download": "DownloadURL",
          "link": "LinkURL",
          "likes": "10",
          "collections": "9",
          'status': '1'
        },
        {
          "pid": "114515",
          "title": "沼气的制造原理 卷2",
          "author": "田所浩二",
          "resource": "XiaBeiZe",
          "summary": "nishiyigeyige",
          "type": "1",
          "publishDate": "1919-08-10",
          "uploadDate": "1919-08-11",
          "download": "DownloadURL",
          "link": "LinkURL",
          "likes": "10",
          "collections": "9",
          'status': '0'
        }
      ],
      total: 0
    }
  },
  created() {

    this.getUserPaper()
  },
  methods: {
    // 获取当前所需要展示是数据
    getUserPaper() {
      this.axios({
        url: '/api/paper/getPapers2',
        method: 'get',
        params: {},
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/x-www-form-urlencoded',
          'timeout': '600'
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          let tmp = res.data.data
          for (const elem in tmp) {
            if (elem.status == '1') elem.status = '已通过'
            else if (elem.status == '0') elem.status = '正在审核'
            else if (elem.status == '-1') elem.status = '未通过'
          }
          console.log(tmp)
          this.paperList = tmp
          this.total = res.data.data.length
        } else {
          this.$message.error(res)
        }
      })
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.pageSize = newSize
      this.getUserPaper()
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.pageNum = newPage
      this.getUserPaper()
    },
    async removePaper(pid) {
      const confirmResult = await this.$confirm('此操作将永久删除该论文, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        this.axios({
          url: '/api/paper/deletePaper/' + pid,
          method: 'get',
          params: {}
        }).then(res => {
            console.log(res)
            if (res.data.code == 0) {
              this.$message.success('已经删除该论文')
              this.getUserPaper()
            } else {
              this.$message.error(res)
            }
          })
      }
    },
    showpaper(id) {
      window.sessionStorage.setItem('paperid', id)
      this.$router.push('/PaperView')
    },
    changepaper(id) {
      window.sessionStorage.setItem('paperid', id)
      this.$router.push('/PaperChange')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
