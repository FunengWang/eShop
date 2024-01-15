<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouse in list" :key="carouse.id">
        <img :src="carouse.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper from "swiper"
  export default {
    //轮播图组件
    name: "Carousel",
    props: ["list"],
    watch: {
      list: {
        //立即监听，组件初始化后即开始监听
        immediate: true,
        handler() {
          this.$nextTick(() => {
            new Swiper(this.$refs.swiper, {
              loop: true,
              pagination: {
                el: ".swiper-pagination",
              },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            })
          })
        },
      },
    },
  }
</script>

<style>
</style>