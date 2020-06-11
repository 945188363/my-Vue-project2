// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import less from 'less'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8888/gateway'

Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.prototype.$message = ElementUI.Message
Vue.use(less)
Vue.use(ElementUI)
Vue.use(VCharts)

Vue.config.productionTip = false

Vue.prototype.getNowFormatDate = function (time) {
  let date = new Date()
  // 选择当前时间的几天前或者几天后
  date.setDate(date.getDate() + time)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  // 补0
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  // 拼接日期字符串
  const currentDate = year + '-' + month + '-' + strDate
  return currentDate
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
