<template>
  <div style="background: #ccc; height: 50px">
    <h2>input包装组件----{{ value }}</h2>
    <!-- 
      :value:这是动态的属性值不是props传参,因为是原生的DOM
      @input:同样是给原生的DOM绑定的原生事件
     -->
    <input :value="value" @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "CustomInput",
  props: ["value"],
};
</script>
