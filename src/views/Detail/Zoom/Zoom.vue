<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageList[currentIndex].imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  // 接收父级传递过来的props
  props: ["skuImageList"],

  data() {
    return {
      currentIndex: 0,
    };
  },
  // 挂载完成
  mounted() {
    // 全局事件总线获取兄弟组件传递过来的索引值
    this.$bus.$on("getIndex", (index) => {
      // console.log(index);
      // 修改当前响应式数据
      this.currentIndex = index;
    });
  },
  // 方法
  methods: {
    handler(event) {
      // 大图片
      let big = this.$refs.big;
      // 遮罩层
      let mask = this.$refs.mask;
      // 距离大盒子边框的距离
      let leftA = event.offsetX - mask.offsetWidth / 2;
      let topA = event.offsetY - mask.offsetHeight / 2;
      // 约束范围
      if (leftA <= 0) leftA = 0;
      if (leftA >= mask.offsetWidth) leftA = mask.offsetWidth;
      if (topA <= 0) topA = 0;
      if (topA >= mask.offsetHeight) topA = mask.offsetHeight;
      // 修改遮罩层的left和top值
      mask.style.left = leftA + "px";
      mask.style.top = topA + "px";
      // 操作大图片移动
      big.style.left = -2 * leftA + "px";
      big.style.top = -2 * topA + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
