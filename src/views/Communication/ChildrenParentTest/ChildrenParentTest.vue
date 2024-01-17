<template>
  <div>
    <h2>BABA有存款: {{ money }}</h2>
    <button @click="JQFromXM(100)">找小明借钱100</button><br />
    <button @click="JQFromXH(150)">找小红借钱150</button><br />
    <button @click="JQFromAll(200)">找所有孩子借钱200</button><br />
    <br />
    <!-- 小明 -->
    <!-- ref可以获取节点(组件标签) -->
    <!-- 在Vue组件当中可以通过ref获取子组件,就可以进行操作子组件数据及方法 -->
    <Son ref="xm" />
    <br />
    <!-- 小红 -->
    <Daughter ref="xh" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    // 找小明借钱的回调
    JQFromXM(money) {
      // 父组件的钱数累加100元
      this.money += money;
      // this.$refs.xm可以获取到子组件的节点及数据(可以操作子组件的数据以及方法)
      // console.log(this.$refs.xm);
      // 小明的总钱数累减100元
      this.$refs.xm.money -= money;
    },

    // 向小红借钱
    JQFromXH(money) {
      this.money += money;
      this.$refs.xh.money -= money;
    },

    // 找全部的孩子借用200
    JQFromAll(money) {
      this.money += 2 * money;
      // 组件实例自身拥有一个属性$children,可以获取到当前组件中全部的子组件
      // console.log(this.$children);
      this.$children.forEach((item) => {
        item.money -= 200;
      });
    },

    /* // 切记别这样书写:如果子组件过多,第0项可能不是小明
    this.$children[0].money -= 200
    this.$children[2].money -= 200 */
  },

  components: {
    Son,
    Daughter,
  },
};
</script>

<style></style>
