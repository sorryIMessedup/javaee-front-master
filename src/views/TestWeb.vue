<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/PersonalCenter' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		<br>
		<el-form>
			<h2 style="height: 15px">SUBJECT&nbsp;&nbsp;项目测试内容</h2>
			============================================================<br><br>
			【SUBJECT】这个按钮用于测试/subject/list/my/subject，列出当前用户所有的subject。<br>
			【GET】若成功，将在response.data返回一个数组。
			<el-form-item>
				<el-button v-on:click="dotest0">测试list_subject</el-button>
			</el-form-item>
			【SUBJECT】这个按钮用于测试/subject/list/add，已经设置好了一组参数。<br>
			【POST】若成功，将在数据库中添加该subject。这组参数是Mihomo公司。
			<el-form-item><el-button v-on:click="dotest1">测试add</el-button></el-form-item>
			【SUBJECT】这个按钮用于测试/subject/list/delete，已经设置好了一组参数。<br>
			【POST】若成功，将在数据库中删除该subject。传出sid即可，这里是9。
			<el-form-item><el-button v-on:click="dotest2">测试delete</el-button></el-form-item>
			【SUBJECT】这个按钮用于测试/subject/list/update，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中修改该subject。需要传出id，不使用cookie&session。
			<el-form-item><el-button v-on:click="dotest3">测试change</el-button></el-form-item>
			【SUBJECT】这个按钮用于测试/subject/list/pages，可以无参数，也可以有2个参数。<br>
			【GET】若成功，将在response.data中返回。
			<el-form-item><el-button v-on:click="dotest6">测试pages</el-button></el-form-item>
			<h2 style="height: 15px">USER&nbsp;&nbsp;用户测试内容</h2>
			============================================================<br><br>
			【USER】这个按钮用于测试/user/list_users。<br>
			【GET】若成功，将在response.data返回数组。只有管理员用户可以使用此接口。
			<el-form-item><el-button v-on:click="dotest4">测试list_users</el-button></el-form-item>
			【USER】这个按钮用于测试/user/update，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中修改该user。需要传出id，不使用cookie&session。
			<el-form-item><el-button v-on:click="dotest5">测试update</el-button></el-form-item>
			【USER】这个按钮用于测试/user/list/my/info。<br>
			【GET】若成功，将在response.data返回数组。
			<el-form-item><el-button v-on:click="dotest12">测试list/my/info</el-button></el-form-item>
			<h2 style="height: 15px">PAPER&nbsp;&nbsp;论文测试内容</h2>
			============================================================<br><br>
			【PAPER】这个按钮用于测试/paper/getAllPapers/{index}/{size}。<br>
			【GET】默认index=1，size=10，根据实际情况自由设置参数。
			<el-form-item><el-button v-on:click="dotest7">测试getAllPapers</el-button></el-form-item>
			【PAPER】这个按钮用于测试/paper/getPapers，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest10">测试getPapers</el-button></el-form-item>
			【SEARCH】这个按钮用于测试/search/search/{type}/{keyword}，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest8">测试search</el-button></el-form-item>
			【PAPER】这个按钮用于测试/paper/checkPaperStatus，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest9">测试checkPaperStatus</el-button></el-form-item>
			【PAPER】这个按钮用于测试/paper/getPaper，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest11">测试getPaper</el-button></el-form-item>
			【PAPER】这个按钮用于测试/paper/insertPaper，已经设置好了一组参数。<br>
			【POST】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest17">测试insertPaper</el-button></el-form-item>
			<h2 style="height: 15px">LIKES&nbsp;&nbsp;点赞论文接口测试</h2>
			============================================================<br><br>
			【LIKES】这个按钮用于测试/likes/alreadyLike，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest13">测试alreadyLike</el-button></el-form-item>
			【LIKES】这个按钮用于测试/likes/alreadyLikeTest/{id}，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest14">测试alreadyLikeTest</el-button></el-form-item>
			【LIKES】这个按钮用于测试/likes/doLike/{pid}，已经设置好了一组参数。<br>
			【POST】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest15">测试doLike</el-button></el-form-item>
			【LIKES】这个按钮用于测试/likes/doLikeTest/{id}/{pid}，已经设置好了一组参数。<br>
			【GET】若成功，将在数据库中返回。
			<el-form-item><el-button v-on:click="dotest16">测试doLikeTest</el-button></el-form-item>
			=====================================
			<el-form-item><el-button v-on:click="dotest18">测试1年paper</el-button></el-form-item>
			<el-form-item><el-button v-on:click="dotest19">测试1年subject</el-button></el-form-item>
			<el-form-item><el-button v-on:click="dotest20">测试/comment/insertComment</el-button></el-form-item>
			<el-form-item><el-button v-on:click="dotest21">测试/comment/selectAllComments</el-button></el-form-item>
			<el-form-item><el-button v-on:click="dotest22">测试/comment/deleteComment</el-button></el-form-item>
			<el-form-item><el-button v-on:click="dotest23">测试/comment/updateComment</el-button></el-form-item>
			<el-form-item><el-button v-on:click="dotest24">测试1年subject</el-button></el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
  },
  created() {
    this.isManager()
  },
  methods: {
    isManager() {
      const manager = window.sessionStorage.getItem('isManager')
      console.log(manager)
      if (manager == 1 || manager == null) {
        this.$message.error('对不起，你不是管理员，无权限访问')
        this.$router.push('/6') // UserCenter
      } else if (manager == 0) {
        this.$message.success('权限检测通过')
      }
    },
		dotest0() {
			this.axios({
				url: '/api/subject/list/my/subject',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest1() {
			let data0 = {
				"title": "Mihomo_Games",
				"startDate": "2022-11-12",
				"endDate": "2022-12-1",
				"money": 100,
				"fund": 500,
				"company": "Mihomo",
				"download": "downloadURL",
				"type": 1
			};
			//this.axios.post('/api/subject/add', JSON.stringify(data0))
			//.then(res => {
			//    console.log(res);
			//})
			this.axios({
				url: '/api/subject/add',
				method: 'post',
				data: data0,
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600',
				},
			}).then(res => {
				console.log(res);
			})
		},
		dotest2() {
			this.axios({
				url: '/api/subject/delete',
				method: 'post',
				params: {
					"sid": "4"
				},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest3() {
			this.axios({
				url: '/api/subject/update',
				method: 'get',
				params: {
					"sid": "9",
					"title": "Mihomo_Games",
					"startDate": "2022-11-11",
					"endDate": "2022-11-30",
					"money": "101",
					"fund": "501",
					"company": "Mihomo",
					"download": "downloadURL",
					"type": "2",
					"id": "13"
				},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest4() {
			this.axios({
				url: '/api/user/list_users',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest5() {
			this.axios({
				url: '/api/user/update',
				method: 'get',
				params: {
					"id": "28",
					"username": "peoplechanges",
					"mail": "peoplechanges@real.com",
					"password": "12345",
					"code": "23467",
					"img": "",
					"type": "1",
					"isDelete": "0",
					"userId": "13"
				},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest6() {
			this.axios({
				url: '/api/subject/list/pages',
				method: 'get',
				params: {
					"pageNum": "",
					"pageSize": ""
				},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest7() {
			this.axios({
				url: '/api/paper/getAllPapers/1/10',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest8() {
			this.axios({
				url: '/api/search/search/title/t',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest9() {
			this.axios({
				url: '/api/paper/checkPaperStatus/10',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest10() {
			this.axios({
				url: '/api/paper/getPapers/1/10',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest11() {
			this.axios({
				url: '/api/paper/getPaper/10',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest12() {
			this.axios({
				url: '/api/user/list/my/info/26',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		// LIKES
		dotest13() {
			this.axios({
				url: '/api/likes/alreadyLike',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest14() {
			this.axios({
				url: '/api/likes/alreadyLikeTest/10',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest15() {
			this.axios({
				url: '/api/likes/doLike/10',
				method: 'post',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest16() {
			this.axios({
				url: '/api/likes/doLikeTest/10/10',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest17() {
			this.axios({
				url: '/api/paper/insertPaper',
				method: 'post',
				params: {
					"title": "monster3",
					"author": "LiTianSuo",
					"resource": "XiaBeiZe",
					"summary": "nishiyigeyige",
					"type": "1",
					"publishDate": "1919-08-10",
					"uploadDate": "1919-08-11",
					"download": "DownloadURL",
					"link": "LinkURL"
				},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest18() {
			this.axios({
				url: '/api/paper/getPapersByMonth/13/2022',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest19() {
			this.axios({
				url: '/api/subject/getSubjectByMonth/13/2022',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		// comment
		dotest20() {
			this.axios({
				url: '/api/comment/insertComment/13/10/haoxiangsia',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest21() {
			this.axios({
				url: '/api/comment/selectAllComments/10',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest22() {
			this.axios({
				url: '/api/comment/deleteComment/1',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest23() {
			this.axios({
				url: '/api/comment/updateComment/ad242/wosile',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		},
		dotest24() {
			this.axios({
				url: '/api/subject/getSubjectByMonth/13/2022',
				method: 'get',
				params: {},
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:8080',
					'Access-Control-Allow-Credentials': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					'timeout': '600'
				}
			}).then(res => {
				console.log(res);
			})
		}
	}
}
</script>

<style lang="less" scoped>

</style>
