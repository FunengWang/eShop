<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
  import Footer from "./components/Footer"
  import Header from "./components/Header"

  export default {
    name: "App",
    computed: {},
    components: {
      Header,
      Footer,
    },
    mounted() {
      //APP.vue属于根组件，只会加载一次，把消耗资源的操作放在此方法中，提高性能,消耗资源的操作不适合放在频繁创建、消亡的组件中
      this.$store.dispatch("categoryList")
    },
  }
</script>

<style>
</style>
