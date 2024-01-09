<template>
  <h2>Search Component</h2>
</template>

<script>
  export default {
    name: "Search",
    computed:{
      keyword(){
        return this.$route.params.keyword
      }
    },
    props:[]
  }
</script>

<style>
</style>