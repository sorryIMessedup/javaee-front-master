<template>
    <div>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <br>
      <el-card class="box-card">
      <el-row>
          <el-col :span="9">
              <el-input placeholder="请输入内容" >
              <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </el-col>
      </el-row>

      <el-table :data="userList" border stripe>
          <el-table-column fixed label="用户id" prop="id" width="100"></el-table-column>
          <el-table-column fixed label="用户名" prop="username" width="150"></el-table-column>
          <el-table-column label="用户类型" prop="type" width="100"></el-table-column>
          <el-table-column label="用户邮箱" prop="mail" width="200"></el-table-column>
          <el-table-column label="操作" >
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="删除该用户" placement="top">
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
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
  data () {
    return {
      pageNum: 1,
      pageSize: 5,
      userList: [],
      total: 0
    }
  },
  created () {
    this.isManager()
  },
  methods: {
    isManager () {
      const manager = window.sessionStorage.getItem('isManager')
      console.log(manager)
      if (manager == 1 || manager == null) {
        this.$message.error('对不起，你不是管理员，无权限访问')
        this.$router.push('/6') // UserCenter
      } else if (manager == 0) {
        this.$message.success('权限检测通过')
        this.getUser()
      }
    },
    getUser () {
      this.axios({
        url: '/api/user/list_users',
        method: 'get',
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.userList = res.data.data
            this.total = res.data.data.total
          } else {
            this.$message.error(res)
          }
        })
    },
    handleSizeChange (newSize) {
      console.log(newSize)
      this.pageSize = newSize
      this.getUser()
    },
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.pageNum = newPage
      this.getUser()
    },
    async removeUser (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
          url: '/api/user/deleteuser/' + id,
          method: 'get',
          params: {
            userId: id
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.code == 0) {
              this.$message.success('已经删除用户')
              this.getUser()
            } else {
              this.$message.error(res.data)
            }
          })
      }
    },
  }
}
</script>

<style lang="less" scoped>

</style>
