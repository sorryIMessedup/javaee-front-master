<template>
  <div class="wrapper">
    <el-card class="box-card" style="width:800px; margin: auto;">
      <h3>搜索</h3>
      选择您想要搜索的类型，键入其相关内容并点击搜索按钮<br><br>
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select placeholder="请选择类型" v-model="value" slot="prepend">
          <el-option label="标题" value="title" @click="value = 'title'"></el-option>
          <el-option label="作者" value="author" @click="value = 'author'"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="serach"></el-button>
      </el-input>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      value: '',
    }
  },
  created() {
  },
  methods: {
    serach() {
      window.sessionStorage.setItem('searchstring', this.input)
      window.sessionStorage.setItem('searchdirection', this.value)
      this.$router.push('/GoSearchResult')
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