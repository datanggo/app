<template>
  <div>
    <!-- 自定义指令 -->
    <h1 v-upper="msg" @click="getNews"></h1>
    <!-- 我是跟组件 -->
    <!-- 使用其他组件 -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- footer组件在home  或 search显示的 ，注册或者是登录的时候是隐藏的-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
// 引入Header路由
import Header from "./components/Header";

// 引入Footer路由
import Footer from "./components/Footer";
export default {
  name: "app",
  data() {
    return {
      msg: "abc",
    };
  },

  // 注册路由
  components: {
    Header,
    Footer,
  },

  // 挂载完毕
  mounted() {
    // 派发一个action，获取商品分类的三级列表的数据
    // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");

    // 获取用户信息在首页展示
    this.$store.dispatch("getUserInfo");
  },

  // 方法
  methods: {
    getNews() {
      this.$router.push("/communication");
    },
  },
};
</script>
<style lang="">
</style>