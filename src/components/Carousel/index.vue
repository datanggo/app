<template lang="">
    <div>
        <div class="swiper-container"  ref="cur" id="floor1Swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                                            <img :src='carousel.imgUrl'>
                                        </div>
                                        
                                    </div>
                                    <!-- 如果需要分页器 -->
                                    <div class="swiper-pagination"></div>

                                    <!-- 如果需要导航按钮 -->
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>
                                </div>
    </div>
</template>
<script>
// 引入swiper轮播图插件
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ["list"],

  watch: {
    list: {
      //此项配置，即无论数据是否发生变化，运行到此处立即监听一次
      // 为什么watch监听不到list数据，因为此数据没有发生变化，因为是从父组件传递过来的
      immediate: true,
      handler(newvalue, oldvalue) {
        // 监听到数据已经有了，但是v-for动态渲染的结构还是没办法确定的，因此还是需要用到$nextTick（）
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 如果需要分页器,即点击小球的时候切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>
<style lang="">
</style>