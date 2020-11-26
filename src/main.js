import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.prototype.$filters = {
  dateFilter (value, format = 'datetime') {
    const options = {}
    if (format.includes('date')) {
      options.day = '2-digit'
      options.month = 'long'
      options.year = 'numeric'
    }
    if (format.includes('time')) {
      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit'
    }
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
