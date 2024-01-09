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
  }
</script>

<style>
</style>
