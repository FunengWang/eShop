<template>
  <div class="spec-preview">
    <img :src="url" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="url" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        currentIndex: 0,
      }
    },
    props: ["skuImageList"],
    computed: {
      url() {
        return this.skuImageList[this.currentIndex].imgUrl
      },
    },
    methods: {
      handler(event) {
        let mask = this.$refs.mask
        let left = event.offsetX - mask.offsetWidth / 2
        let top = event.offsetY - mask.offsetHeight / 2
        if (left <= 0) left = 0
        if (left >= mask.offsetWidth) left = mask.offsetWidth
        if (top <= 0) top = 0
        if (top >= mask.offsetHeight) top = mask.offsetHeight
        mask.style.left = left + "px"
        mask.style.top = top + "px"

        let big = this.$refs.big
        big.style.left = -2 * left + "px"
        big.style.top = -2 * top + "px"
      },
    },
    mounted() {
      this.$bus.$on("changeImgUrl", (index) => {
        this.currentIndex = index
      })
    },
  }
</script>

<style lang="less" scoped>
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