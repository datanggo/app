<template>
  <div>
    <!-- 可以巧妙的利用a标签实现按钮带有提示功能 -->
    <a :title="title">
      <!-- 下面的这种写法v-bind不能用简写形式":" -->
      <!-- 下面的这种写法v-on不能用简写形式"@" -->
      <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
    </a>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["title"],
  mounted() {
    // $attrs属于组件的一个属性，可以获取到父组件传递过来的props数据
    // 对于子组件而言，父组件给的数据可以利用props接收，但是需要注意，
    // 如果子组件通过props接收的属性，在$attrs属性当中是获取不到的
    console.log(this.$attrs);
    // $listeners，它也是组件实例自身的一个属性，它可以获取到父组件给子组件传递的自定义事件
    console.log(this.$$listeners);
  },
};
</script>

<style scoped></style>
