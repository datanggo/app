// 引入路由组件
import Home from "@/views/Home";
// import Login from "@/views/Login";    ///下面采用路由懒加载的形式引入
import Register from "@/views/Register";
// import Search from "@/views/Search";  ///下面采用路由懒加载的形式引入
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";
import Trade from "@/views/Trade"
import Pay from "@/views/Pay"
import PaySuccess from "@/views/PaySuccess"
import Center from "@/views/Center"
// 引入二级路由组件
import MyOrder from "@/views/Center/myOrder"
import GroupOrder from "@/views/Center/groupOrder"

/* 
路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */
/* const foo = () => {
  console.log(1111);
  return import("@/views/Home")
} */
// 简写方式为
/* {
  path: "/home",
  component: ()=>import("@/views/Home"),
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
    component: () => import("@/views/Search"),
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
    component: () => import("@/views/Login"),
    meta: { show: false },
  },
  // 重定向，在项目跑起来的时候，访问 / 时立马让页面重新定向到首页
  {
    path: "/",
    redirect: "/home",
  },


  {
    path: '/communication',
    component: () => import('@/views/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/views/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/views/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/views/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/views/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/views/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/views/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
];
