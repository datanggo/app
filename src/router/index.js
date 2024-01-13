// 我是路由配置的地方

// 引入vue
import Vue from 'vue'

// 引入vue-router
import VueRouter from "vue-router"

// 引入仓库，使用仓库中的数据
import store from "@/store"

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

let router = new VueRouter({
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

// 全局守卫-前置全局守卫配置对象
/* router.beforeEach(async (to, from, next) => {
    // to：可以获取到你要跳转到哪个路由信息
    // from：可以获取到从哪个路由来的信息
    // next：是否放行的函数
    // next();//直接调用即没有条件的放行
    // next("/login")//放行到指定的路由当中
    // 用户登录了才会有token，未登录就不会有
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    next()
    if (token) {
        // 用户已经登录了还想去/login
        if (to.path == "/login") {
            next("/")//即跳转到当前页面
        } else {
            // 登录了但是去的不是login[其他路径]

            // 如果用户信息已经有了,直接跳转，如果没有用户信息，则发请求获取用户信息后再跳转
            if (name) {
                next()
            } else {
                // 没有用户信息
                try {
                    // 获取用户信息在首页展示  派发actions让仓库存储信息
                    await store.dispatch("getUserInfo")
                    // 获取数据成功即放行
                    next()
                } catch (error) {
                    // 用户登录了，但是没有获取到用户信息
                    //token失效了，获取不到用户的信息
                    // 清除token
                    await store.dispatch("userLogout")
                    next("/login")
                }
            }

        }
    } else {
        // 未登录
        next()
    }

}) */

router.beforeEach(async (to, from, next) => {
    // to:获取到要跳转到的路由信息
    // from：从哪个路由跳转到的
    // 方便测试统一放行 
    // next()

    // 获取仓库中的token----可以确定用户登录了
    let token = store.state.user.token

    // 获取到登录后的属性值
    let name = store.state.user.userInfo.name
    if (token) {
        // 用户登录了
        if (to.path == "/login" || to.path == "/register") {
            // 已经登录了还想去登录页和注册页不放行
            next("/")
        } else {
            // 已经登录了，但是去的是非登录页和注册页
            if (name) {
                // 如果登录且有用户信息，直接放行
                next()
            } else {
                // 登录了但是没有用户信息
                try {
                    // 先获取用户信息再放行
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    // token失效会请求失败
                    await store.dispatch("userLogout")
                    next("/login")
                }
            }
        }
    } else {
        // 用户未登录
        next()
    }
})


// 向外暴露VueRouter的一个实例
export default router