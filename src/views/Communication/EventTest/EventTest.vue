<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生DOM绑定系统事件 -->
    <button @click="handler">原生DOM绑定原生事件</button>
    <!-- // Event1组件：非原生的DOM节点，而绑定的click事件是原生的DOM事件，所以不会触发，而是拿click当作一个自定义事件了 -->
    <!-- <Event1 @click="handler1"></Event1> -->
    <!-- 加上.native修饰符之后就可以当作原生的DOM事件进行触发 -->
    <!-- @click.native
          可以把自定义事件变为原生的DOM事件
          其原理是：当前的click事件其实是给子组件的根节点绑定了单击事件，利用到了事件的委派
    -->
    <Event1 @click.native="handler1"></Event1>
    <!-- 下面的写发是给原生的DOM绑定自定义事件 
         给原生的DOM绑定自定义事件是没有意义的，因为没办法触发$emit的
    -->
    <button @xxx="handler2">原生DOM绑定自定义事件</button>
    <!-- 组件标签 -->
    <Event2 @click="handler3" @xxx="handler3"></Event2>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";

export default {
  name: "EventTest",

  components: {
    Event1,
    Event2,
  },

  methods: {
    //原生DOM事件的回调
    handler(event) {
      console.log("原生DOM单击事件", event);
    },
    // Event1组件的事件回调
    handler1() {
      console.log("Event1组件的事件回调");
    },
    // 原生的DOM绑定自定义事件
    handler2(params) {
      console.log();
    },
    // Event2自定义事件的回调
    handler3(params) {
      console.log(params);
    },
  },
};
</script>
