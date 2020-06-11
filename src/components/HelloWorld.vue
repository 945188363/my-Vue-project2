<template>
  <el-scrollbar>
    <div style="height: 600px;">
      <div class="layer">
        <div class="line">
          <!--一周访问统计-->
          <h4>一周访问统计</h4>
          <button @click="changeType">切换图表类型</button>
          <ve-chart :data="chartData"
                    :settings="chartSettings"
                    :loading="loading"
                    :data-empty="dataEmpty">
          </ve-chart>
        </div>
        <div class="line">
          <h4>一周API访问前五名</h4>
          <ve-ring :data="ringData"></ve-ring>
        </div>
      </div>
      <div class="layer">
        <div class="line">
          <!--服务器性能指标-->
          <h4>服务器性能指标</h4>
          <ve-gauge :data="gaugeData"
                    :settings="gaugeSettings"
                    :loading="loading">
          </ve-gauge>
        </div>
        <div class="line">
          <!--整体数据展示-->
          <h4>整体数据展示</h4>
          <ve-funnel :data="funnelData"></ve-funnel>

        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    this.typeArr = ['line', 'histogram', 'pie']
    this.index = 0
    this.funnelSettings = {
      dimension: '状态',
      metrics: '数值'
    }
    this.gaugeSettings = {
      dataType: {
        '占比': 'percent'
      },
      seriesMap: {
        '占比': {
          min: 0,
          max: 1
        }
      }
    }
    return {
      dataEmpty: false,
      loading: true,
      chartSettings: { type: this.typeArr[this.index] },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: []
      },
      gaugeData: {
        columns: ['type', 'value'],
        rows: []
      },
      funnelData: {
        columns: ['状态', '数值'],
        rows: [
          { '状态': '展示', '数值': 900 },
          { '状态': '访问', '数值': 600 },
          { '状态': '点击', '数值': 300 },
          { '状态': '订单', '数值': 100 }
        ]
      },
      ringData: {
        columns: ['API名称', '访问次数'],
        rows: []
      }
    }
  },
  methods: {
    changeType: function () {
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings = { type: this.typeArr[this.index] }
    },
    async QueryCount () {
      this.loading = true
      // 当前日期
      const endTime = this.getNowFormatDate(1)
      // 七天前日期
      const startTime = this.getNowFormatDate(-7)
      // 拼接参数字符串
      const param = '?endTime=' + endTime + '&startTime=' + startTime
      const response = await this.$http.get('/queryCount' + param)
      console.log(response)
      let countData = new Map()
      let totalData = new Map()
      response.data['data'].forEach((item) => {
        let time = this.parseDate(item['Time'].slice(0, 10))
        if (countData.has(time)) {
          countData.set(time, countData.get(time) + 1)
        } else {
          countData.set(time, 1)
        }
        if (totalData.has(item['ApiName'])) {
          totalData.set(item['ApiName'], totalData.get(item['ApiName']) + 1)
        } else {
          totalData.set(item['ApiName'], 1)
        }
      })
      countData.forEach((v, k, map) => {
        this.chartData.rows.push(
          {
            '日期': k, '访问用户': v
          }
        )
      })
      // 先转成array排序 再转成map回来
      let arrayObj = Array.from(totalData)
      // map降序排序
      arrayObj.sort((a, b) => {
        return b[1] - a[1]
      })
      // 如果map长度小于5则全放入
      if (arrayObj.length <= 5) {
        arrayObj.forEach(row => {
          this.ringData.rows.push(
            {
              'API名称': row[0], '访问次数': row[1]
            }
          )
        })
      } else {
        // 放入前五数据
        let index = 0
        arrayObj.forEach(row => {
          if (index < 5) {
            this.ringData.rows.push(
              {
                'API名称': row[0], '访问次数': row[1]
              }
            )
          }
          index++
        })
      }
      this.loading = false
    },
    parseDate (date) {
      let strArr = date.split('-')
      return strArr[1] + '月' + strArr[2] + '日'
    },
    async QueryCpuPencent () {
      const response = await this.$http.get('/queryCpu')
      console.log(response)
      let cpuPercent = response.data['data'].toFixed(2) / 100
      this.gaugeData.rows.push(
        { type: '占比', value: cpuPercent }
      )
    }
  },
  created: function () {
  },
  mounted: function () {
    this.QueryCount()
    this.QueryCpuPencent()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .line{
    width: 500px;
    height: 400px;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .layer{
    margin-top: 5px;
    margin-bottom: 20px;
    justify-content: space-around;
    display: flex;
  }
</style>
