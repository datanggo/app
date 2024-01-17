<template>
  <ul>
    <li v-for="(item, index) in todos" :key="index">
      <!-- 坑：熊孩子挖到坑，父亲填坑 -->
      <!-- 数据来源于父亲：但是子组件决定不了结构与外网-->
      <!-- 使用到作用域插槽slot -->
      <slot :todo="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    todos: Array,
  },
};
</script>