<template>
  <div style="background: #ccc; height: 50px">
    <h3>女儿小红: 有存款: {{ money }}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
//引入共同处理的函数
import myMixin from "@/views/Communication/myMixin/myMixin";

export default {
  name: "Daughter",

  // 使用mixin
  mixin: [myMixin],
  data() {
    return {
      money: 20000,
    };
  },

  /* methods: {
    // 小红给爸爸钱的回调函数
    giveMoney(money) {
      //小红的钱减少了50
      this.money -= 100;
      // 需要在子组件的内部,获取到父组件,让父组件的数据加上50
      // 可以通过$parent属性获取到某一个组件父组件,可以操作父组件的数据及方法
      this.$parent.money += money;
    },
  }, */
};
</script>
