import Vue from 'vue'
import App from './App.vue'

import router from './router/index'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入样式直接import 路径就可以了
import './style/base.css'



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
