// 我是路由配置的地方

// 引入vue
import Vue from 'vue'

// 引入vue-router
import VueRouter from "vue-router"

// 使用插件
Vue.use(VueRouter)

// 引入路由配置数组
import routes from '@/router/routes'
import { valid } from 'mockjs'

// 先把VueRouter原型对象的push属性，先保存一份、
let originPush = VueRouter.prototype.push
// 先把VueRouter原型对象的replace属性，先保存一份、
let originReplace = VueRouter.prototype.replace

// 重写push|repliace方法
//第一个参数：告诉原来push方法，你往哪里跳转(传递那些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call || apply区别：
        // 相同点，都可以调用函数一次，都可以篡改函数上下文一次
        // 不同点，call 与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写repliace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
// 向外暴露VueRouter的一个实例
export default new VueRouter({
    // 配置路由
    // routes: routes
    // key:value一致省略v
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的y=0，代表滚动条在最上方，即距离顶部0像素
        return { y: 0 }
    }
})