import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import loader from '@/components/app/loader'
import currencyFilter from '@/filters/currency.filter'
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import Paginate from 'vuejs-paginate'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.component('loader', loader)
Vue.filter('currency', currencyFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyB0mbysDWGMRLxcNkc5m2-PuYkloeQ8cvE',
  authDomain: 'first-vue-project-3bb05.firebaseapp.com',
  databaseURL: 'https://first-vue-project-3bb05.firebaseio.com',
  projectId: 'first-vue-project-3bb05',
  storageBucket: 'first-vue-project-3bb05.appspot.com',
  messagingSenderId: '471082550899',
  appId: '1:471082550899:web:ebfc4e7aeb0f29c68acc06'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
