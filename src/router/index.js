import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const routes= []
const router = new VueRouter({
    routes
//这里就是路由的配制项
// routes: [
//  {
// path: '/这里可给路由地址一个名字',
// component:''  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
//  }
//   ]
})
export default router