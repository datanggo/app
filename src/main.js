//我是入口文件
// 引入vue
import Vue from 'vue'
// 引入根组件
import App from './App.vue'

// 关闭生产提示
Vue.config.productionTip = false

// 三级联动的组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
// 分页器--全局组件
import Pagination from '@/components/Pagination'

// 引入elementUI插件,按需引入
import { Button, MessageBox } from 'element-ui';

// 注册全局组件需要用到的方法,第一个参数：全局组件的名字   第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
// 注册全局组件-分页器
Vue.component(Pagination.name, Pagination)

// 注册使用elementUI
Vue.component(Button.name, Button)
// element注册组件的时候还有一种方式是挂载到组件实例身上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert


// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'


// 引入MockServe.js -----mock数据
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.min.css'

// 统一接收api文件夹夹里面的全部请求函数
import * as API from "@/api"
// 上面的意思即引入api文件里暴露的所有对象,重名为API


new Vue({
  render: h => h(App),
  // /全局事件总线$bus配置
  beforeCreate() {
    // 定义全局事件总线
    Vue.prototype.$bus = this
    // 自定义 的全局调用API的方法
    Vue.prototype.$API = API
  },

  // 注册路由：地下的写法是key和value一致省略value
  // 注册路由信息：当这里书写router时，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多一个属性为$store
  store
}).$mount('#app')
