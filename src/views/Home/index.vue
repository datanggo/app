<template lang="">
    <div>
       <!-- 三级联动的全局组件使用：三级联动已经注册为全局组件，不需要再重新引入 -->
       <TypeNav> </TypeNav>
       <ListContainer></ListContainer>
       <Recommend></Recommend>
       <Rank></Rank>
       <Like></Like>
       <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
       <Brand></Brand>
       <!-- <button @click="add">点击我加1</button> -->
       <!-- 使用仓库中的数据 -->
       <!-- <span>仓库中的数据{{count}}</span> -->
       <!-- <button>点击我减1</button> -->
    </div>
</template>
<script>
// 引入其余的组件
// 轮播图
import ListContainer from "@/views/Home/ListContainer";
// 今日推荐
import Recommend from "@/views/Home/Recommend";
// 商品推荐
import Rank from "@/views/Home/Rank";
// 猜你喜好
import Like from "@/views/Home/Like";
// 楼层
import Floor from "@/views/Home/Floor";
// 商标
import Brand from "@/views/Home/Brand";

// 引入vuex映射方法
import { mapState } from "vuex";

export default {
  name: "",
  // 注册组件
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  // 计算属性
  computed: {
    //遍历仓库中的数据
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },

  // 事件方法
  mounted() {
    //派发action,获取floor中的数据
    this.$store.dispatch("getFloorList");

    // this.$store.dispatch("getUserInfo");
  },
};
</script>
<style lang="">
</style>