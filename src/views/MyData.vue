<template>
  <el-container>
    <el-header>
      &nbsp;&nbsp;我的数据
    </el-header>
    <el-main>
      <div style="width: 420px; height: 500px; float: left;">
        <el-card style="width: 400px; height: 500px;">
          <span class="text1">欢迎您登录本系统</span> <br><br>
          <div><img :src="headsrc" style="width: 200px; height: 200px;" /></div><br><br>
          <div style="font-size: 24px; font-weight: bold;">欢迎您，{{ this.username }}</div><br>
          <div style="font-size: 22px;">{{ this.email }}</div>
          <div style="font-size: 20px;">{{ this.showUserManagerOrElse }}</div>
        </el-card>
      </div>

      <el-card style="width: 600px; height: 500px;">
        <span class="text1">您一年内的论文/项目数量统计</span> <br><br>
        <div id="myChart" style="width: 500px; height:400px; margin: 0 auto;"></div>
      </el-card>

    </el-main>
  </el-container>
</template>

<script>
export default ({
  data() {
    return {
      username: 'test_user',
      email: '',
      headsrc: require('@/assets/defaultHead.jpg'),
      paperPerMonth: [],
      subjectPerMonth: [],
      radio1: 1,
      radio2: 7,
      title: '论文数据统计',
      myChart: '',
      showUserManagerOrElse: '普通用户'
    }
  },
  methods: {
    getPaperData() {
      this.paperPerMonth.splice(0, this.paperPerMonth.length)
      this.subjectPerMonth.splice(0, this.subjectPerMonth.length)
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
        for (const i in res.data.data)
          this.paperPerMonth[i] = res.data.data[i]
        console.log(res)
        console.log(this.paperPerMonth)
      })
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
        this.subjectPerMonth = res.data.data
        console.log(res)
        console.log(this.subjectPerMonth)
      })
    },
    drawLine() {
      this.myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['论文数量', '项目数量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          smooth: true,
          name: '论文数量',
          type: 'line',
          stack: '总量',
          lineStyle: {
            normal: {
              color: '#702963',
              type: 'solid'
            }
          },
          itemStyle: {
            color: '#702963'
          },
          data: this.paperPerMonth,
        },
        {
          smooth: true,
          name: '项目数量',
          type: 'line',
          stack: '总量',
          data: this.subjectPerMonth
        }
        ]
      })
    }
  },
  created() {
    this.email = window.sessionStorage.getItem('email')
    this.username = window.sessionStorage.getItem('username')
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('myChart'))
    this.getPaperData()
    this.paperPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0]
    this.subjectPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 4]
    this.drawLine()
    console.log(this.paperPerMonth)
    console.log(this.subjectPerMonth)
    const manager = window.sessionStorage.getItem('isManager')
    if (manager == 0) {
      this.showUserManagerOrElse = '管理员'
      window.sessionStorage.setItem('typeName', '管理员')
    }
    else window.sessionStorage.setItem('typeName', '普通用户')
  }
})

</script>

<style lang="less" scoped>
//#myChart {
// position: absolute;
// left: 60%;
// transform: translateX(-50%);
/* 移动元素本身50% */
//}

.text1 {
  font-size: 24px;
  font-weight: bold;
  color: #702963;
}
</style>
