<template>
  <div>
    <Header />
    <Footer />
  </div>
</template>

<script>
  import Footer from "./components/Footer/Footer"
  import Header from "./components/Header/Header"

  export default {
    name: "App",
    components: {
      Header,
      Footer
    },
  }
</script>

<style>
</style>
