<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!-- 面包屑 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }} <i @click="removeKeyword">x</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.slice(2)
              }}<i @click="removeTrademark">x</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }} <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>
        <Selector></Selector>
        <Detail></Detail>
        <HotSale></HotSale>
      </div>
    </div>
  </div>
</template>

<script>
  import Selector from "@/pages/Search/Selector"
  import Detail from "@/pages/Search/Detail"
  import HotSale from "@/pages/Search/HotSale"
  import { mapGetters } from "vuex"

  export default {
    name: "Search",
    data() {
      return {
        searchParams: {
          category1Id: "",
          category2Id: "",
          category3Id: "",
          categoryName: "",
          keyword: "",
          //排序
          order: "",
          //分页功能，代表目前是第几页
          pageNo: 1,
          pageSize: 3,
          //商品属性
          props: [],
          //品牌
          trademark: "",
        },
      }
    },
    computed: {
      ...mapGetters(["goodList", "trademarkList", "attrsList"]),
    },
    components: { Selector, Detail, HotSale },
    methods: {
      getData() {
        this.$store.dispatch("searchInfoList", this.searchParams)
      },
      clearData() {
        //设置成undefined的字段不会带入请求参数
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      },
      removeCategoryName() {
        this.searchParams.categoryName = undefined
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined

        this.$router.push({ name: "Search", params: this.$router.params })
      },
      removeKeyword() {
        this.searchParams.keyword = undefined
        this.$router.push({
          name: "Search",
          query: this.$router.query,
          params: { keyword: undefined },
        })
        this.$bus.$emit("clearKeyword")
      },
      removeTrademark() {
        this.searchParams.trademark = undefined
        this.getData()
      },
      removeAttr(index) {
        this.searchParams.props.splice(index, 1)
        this.getData()
      },
    },
    beforeMount() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    mounted() {
      this.getData()

      this.$bus.$on("tradeMark", (id, name) => {
        this.searchParams.trademark = `${id}:${name}`
        this.getData()
      })

      this.$bus.$on("attr", (id, value, name) => {
        let prop = `${id}:${value}:${name}`
        if (this.searchParams.props.indexOf(prop) == -1) {
          this.searchParams.props.push(prop)
          this.getData()
        }
      })
    },
    watch: {
      $route() {
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        this.getData()
        this.clearData()
      },
    },
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;
    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;
        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;
          li {
            display: inline-block;
            line-height: 18px;
            a {
              color: #666;
              text-decoration: none;
              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }
        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;
          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;
            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            &:hover {
              color: #28a3ef;
            }
          }
        }
      }
    }
  }
</style>