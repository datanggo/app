<template>
  <div>
    小明的爸爸现在有{{ money }}元
    <h2>不使用sync修改符</h2>
    <!-- 
      :money：是父组件给子组件传递的props
      @update:money：给子组件绑定的自定义事件只不过名字叫做update:money
      目前现在这种操作：其实和v-model很像 可以实现父子组件数据的同步
     -->
    <Child :money="money" @update:money="money = $event"></Child>
    <h2>使用sync修改符</h2>
    <!-- 
      :money.sync：第一，父组件给子组件传递了一个props为money
      第二，给子组件绑定了一个自定义事件，而且自定义事件的名称为update:money
     -->
    <Child2 :money.sync="money"></Child2>
    <h2>使用v-model修改符</h2>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",
  data() {
    return {
      money: 10000,
    };
  },
  components: {
    Child,
    Child2,
  },
};
</script>
