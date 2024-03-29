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
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: isComprehensiveOrder }"
                  @click="changeOrder(1)"
                >
                  <a
                    >综合
                    <span v-show="isOrderDescend">⬇</span>
                    <span v-show="!isOrderDescend">⬆</span>
                  </a>
                </li>
                <li :class="{ active: isPriceOrder }" @click="changeOrder(2)">
                  <a
                    >价格
                    <span v-show="isOrderDescend">⬇</span>
                    <span v-show="!isOrderDescend">⬆</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continue="5"
          ></Pagination>
        </div>
        <HotSale></HotSale>
      </div>
    </div>
  </div>
</template>

<script>
  import Selector from "@/pages/Search/Selector"
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
          order: "1:desc",
          //分页功能，代表目前是第几页
          pageNo: 1,
          //每页展示多少数据
          pageSize: 4,
          //商品属性
          props: [],
          //品牌
          trademark: "",
        },
      }
    },
    computed: {
      ...mapGetters(["goodList", "trademarkList", "attrsList", "total"]),
      isComprehensiveOrder() {
        return this.searchParams.order.indexOf("1") != -1
      },
      isPriceOrder() {
        return this.searchParams.order.indexOf("2") != -1
      },
      isOrderDescend() {
        return this.searchParams.order.indexOf("desc") != -1
      },
    },
    components: { Selector, HotSale },
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
      changeOrder(flag) {
        let splits = this.searchParams.order.split(":")
        if (flag === 1) {
          if (this.isComprehensiveOrder) {
            //change order by descend or ascend
            this.searchParams.order = `1:${splits[1] == "desc" ? "asc" : "desc"}`
          } else {
            this.searchParams.order = `1:${splits[1]}`
          }
        } else if (flag === 2) {
          if (this.isPriceOrder) {
            this.searchParams.order = `2:${splits[1] == "desc" ? "asc" : "desc"}`
          } else {
            this.searchParams.order = `2:${splits[1]}`
          }
        }
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

      //分页组件回调函数
      this.$bus.$on("pageNo", (n) => {
        this.searchParams.pageNo = n
        this.getData()
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

      .details {
        margin-bottom: 5px;
        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;
          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;
              li {
                float: left;
                line-height: 18px;
                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }
                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .goods-list {
          margin: 20px 0;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;
              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;
                  a {
                    color: #666;
                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }
                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }
                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }
                .operate {
                  padding: 12px 15px;
                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }
                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;
                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }
                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;
                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>