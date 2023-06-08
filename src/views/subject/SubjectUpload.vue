<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>项目中心</el-breadcrumb-item>
			<el-breadcrumb-item>上传项目</el-breadcrumb-item></el-breadcrumb>
		<br>

		<el-card class="box-card" style="width:500px;margin:auto;">
      <h2>上传项目</h2>
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
					<el-form-item label="项目名称" prop="title">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="项目类型" prop="type">
						<el-input v-model="form.type"></el-input>
					</el-form-item>
					<el-form-item label="开始日期" prop="startDate">
						<el-input v-model="form.startDate"></el-input>
					</el-form-item>
					<el-form-item label="结束日期" prop="endDate">
						<el-input v-model="form.endDate"></el-input>
					</el-form-item>
					<el-form-item label="金额" prop="money">
						<el-input v-model="form.money"></el-input>
					</el-form-item>
					<el-form-item label="自然基金" prop="fund">
						<el-input v-model="form.fund"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="paperUpload">上传</el-button>
					</el-form-item>
			</el-form>

		</el-card>

      <el-dialog title="温馨提示" :visible.sync="dialogVisible1" width="30%">
        <span>请输入好完整的信息</span>
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
      form: {
        title: '',
        type: '',
        startDate: '',
        endDate: '',
        money: '',
        fund: ''
      },
      rules: {
        title: [{ required: true, message: '标题不可为空', trigger: 'blur' }],
        type: [{ required: true, message: '类型不可为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '开始不可为空', trigger: 'blur' }],
        endDate: [{ required: true, message: '结束不可为空', trigger: 'blur' }],
        money: [{ required: true, message: '不可为空', trigger: 'blur' }],
        fund: [{ required: true, message: '不可为空', trigger: 'blur' }]
      },
			dialogVisible1: false,
		}
	},
	created() {
	
	},
	methods: {
		upsucc(msg) {
			console.log(msg)
			this.$message.success('上传成功！')
		},
		handleChange(value) {
			console.log(value)
		},
    paperUpload() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.axios({
            url: '/api/subject/add',
            method: 'post',
            data: {
              title: this.form.title,
              type: this.form.type,
              startDate: this.form.startDate,
              endDate: this.form.endDate,
              money: this.form.money,
              fund: this.form.fund
            }
          }).then(res => {
            console.log(res)
          })
        } else { this.dialogVisible1 = true }
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
