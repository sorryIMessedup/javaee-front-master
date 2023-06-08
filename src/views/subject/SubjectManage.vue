<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的项目</el-breadcrumb-item>
      <br><br>
    </el-breadcrumb>

    <el-card class="box-card">
      <div>在这里，您可以查看所有人发布的项目。</div><br>
      <el-row>
        <el-col :span="9">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="paperList.slice((pageNum - 1) * pageSize, pageNum * pageSize)" border stripe>
        <el-table-column fixed label="项目ID" prop="sid" width="70"></el-table-column>
        <el-table-column label="项目名称" prop="title" width="150"></el-table-column>
        <el-table-column label="项目类型" prop="type" width="100"></el-table-column>
        <el-table-column label="起始日期" prop="startDate" width="150"></el-table-column>
        <el-table-column label="结束日期" prop="endDate" width="150"></el-table-column>
        <el-table-column label="金额" prop="money" width="70"></el-table-column>
        <el-table-column label="自然基金" prop="fund" width="80"></el-table-column>
        <el-table-column label="操作" fixed="right" width="190">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑项目" placement="top">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="changepaper(scope.row.sid)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除项目" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removePaper(scope.row.sid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="pageNum"
        :page-sizes="[1, 2, 5, 10]" 
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper"
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
        {
          'sid': '114514',
          'title': '一个一个一个项目',
          'type': '创新创业类',
          'startDate': '1919-08-10',
          'endDate': '1919-08-11',
          'money': '10',
          'fund': '9',
          'collections': '100',
          'likes': '100'
        },
        {
          'sid': '114515',
          'title': '一个一个一个项目',
          'type': '创新创业类',
          'startDate': '1919-08-10',
          'endDate': '1919-08-11',
          'money': '10',
          'fund': '9',
          'collections': '100',
          'likes': '100'
        }
      ],
      total: 0
    }
  },
  created() {
    this.getUserPaper()
  },
  methods: {
    getUserPaper() {
      this.axios({
        url: '/api/subject/getAllSubjects/1/100',
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
          this.paperList = res.data.data
          this.total = this.paperList.length
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
    async removePaper(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
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
          url: '/api/subject/delete',
          method: 'post',
          params: {
            sid: id
          }
        })
          .then(res => {
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
      window.sessionStorage.setItem('subjectid', id)
      this.$router.push('/SubjectView')
    },
    changepaper(id) {
      window.sessionStorage.setItem('subjectid', id)
      this.$router.push('/SubjectChange')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
