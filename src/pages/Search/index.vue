<template>
  <div>
    <TypeNav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <Bread />
        <!--selector-->
        <Selector />
        <!--details-->
        <Detail />
        <!--hotsale-->
        <HotSale />
      </div>
    </div>
  </div>
</template>

<script>
  import Bread from "@/pages/Search/Bread"
  import Selector from "@/pages/Search/Selector"
  import Detail from "@/pages/Search/Detail"
  import HotSale from "@/pages/Search/HotSale"
  import { mapState } from "vuex"

  export default {
    name: "Search",
    computed: {
      ...mapState({
        searchList: (state) => state.search.searchInfoList,
      }),
    },
    components: { Bread, Selector, Detail, HotSale },
    mounted() {
      this.$store.dispatch("searchInfoList")
    },
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;
    .py-container {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>