<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" size="mini">添加</el-button>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 
      当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数
      HintButton此组件只是对el-button进行二次封装
     -->
    <!-- 自定义组件上面定义的这些属性就是利用props给子组件传递参数 -->
    <!--自定义组件上写 @click=""代表的是自定义事件 -->
    <HintButton
      type="success"
      icon="el-icon-delete"
      size="mini"
      title="提示按钮"
      @click="handler"
    ></HintButton>
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from "./HintButton";
export default {
  name: "AttrsListenersTest",
  components: { HintButton },
  methods: {
    // 点击自定义组件时的回调
    handler() {
      alert(66666);
    },
  },
};
</script>
