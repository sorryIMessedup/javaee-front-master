<template>
  <div class="wrapper">
    <el-card class="box-card" style="width:800px; margin: auto;">
      <h3>搜索</h3>
      您的搜索结果是<br><br>
      <el-table :data="this.resultList">
        <el-table-column label="标题" prop="title" width="300"></el-table-column>
        <el-table-column label="作者" prop="author" width="150"></el-table-column>
        <el-table-column label="摘要" prop="summary" width="300"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchstring: '',
      searchdirection: '',
      resultList: []
    }
  },
  created() {
    this.doserach()
  },
  methods: {
    doserach() {
      this.searchstring = window.sessionStorage.getItem('searchstring')
      this.searchdirection = window.sessionStorage.getItem('searchdirection')
      this.axios({
        url: '/api/search/search/' + this.searchdirection + '/' + this.searchstring,
        method: 'get'
      }).then(res => {
        console.log(res)
        this.resultList = res.data.data
      })
    }
  }
}
</script>

<style>
.el-select .el-input {
  width: 150px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.wrapper {
  height: 100vh;
  overflow: hidden;
}

.searchbox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
}

.box {
  margin: 0px auto
}
</style>