<template>
  <div style="background: #ccc; height: 80px">
    <h2>Event2组件</h2>
    <button @click="$emit('click', '自定义事件click被触发了')">
      触发自定义click事件</button
    ><br />
    <button @click="$emit('xxx', 'xxx自定义事件触发了')">
      分发自定义xxx事件</button
    ><br />
  </div>
</template>
