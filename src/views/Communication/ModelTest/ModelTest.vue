<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>
    <br />
    <h2>深入v-model原理(vue2)</h2>
    <!-- 
      原生的DOM当作是有oninput事件的，它经常结合表单元素一起使用，当表单元素的内容发生变化的时候就会触发一次回调
     vue2:可以通过value与input事件实现v-modul功能
     -->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>{{ msg }}</span>
    <!--深入学习v-modul：实现父子组件数据同步(实现父子通信）-->
    <!-- 
      :value到底是什么?这是props,父子组件通信
      @input:并非原生DOM的事件,而是自定义事件,因为绑定的是自定义标签
     -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>
    <!-- 简化的 写法是直接利用v-model的这一特性 -->
    <CustomInput v-model="msg"></CustomInput>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  data() {
    return {
      msg: "我爱塞北的大雪呀",
    };
  },
  components: {
    CustomInput,
  },
};
</script>
