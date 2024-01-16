// 引入路由组件
import Home from "@/pages/Home";
// import Login from "@/pages/Login";    ///下面采用路由懒加载的形式引入
import Register from "@/pages/Register";
// import Search from "@/pages/Search";  ///下面采用路由懒加载的形式引入
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"

/* 
路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */
/* const foo = () => {
  console.log(1111);
  return import("@/pages/Home")
} */
// 简写方式为
/* {
  path: "/home",
  component: ()=>import("@/pages/Home"),
  meta: { show: true },
}, */

export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder"
      }
    ]
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 如果是从shopcart跳到trade放行，否则路由不跳
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: "/detail/:skuId?",
    component: Detail,
    meta: { show: true },
  },
  {
    path: "/home",
    component: Home,
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    name: "search",
    // 4：路由组件能不能传递props数据？
    // 布尔值的写法:params
    // props: true
    // 对象写法:额外的给路由组件传递props
    // props: { a: 1, b: 2 }
    // 函数写法：可以把params参数，query参数，通过props传递给路由组件
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k };
    },
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  // 重定向，在项目跑起来的时候，访问 / 时立马让页面重新定向到首页
  {
    path: "/",
    redirect: "/home",
  },
];
