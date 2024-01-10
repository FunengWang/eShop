<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 @mouseenter="enterShow" @mouseleave="leaveShow" class="all">
        全部商品分类
      </h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="routeToSearch">
            <div class="item" v-for="c1 in categoryList" :key="c1.id">
              <h3 @mouseenter.once="getChildCategoryList(c1.id)">
                <a :data-category-name="c1.name" :data-category1-id="c1.id">{{
                  c1.name
                }}</a>
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.childCategories"
                  :key="c2.id"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-category-name="c2.name"
                        :data-category2-id="c2.id"
                        >{{ c2.name }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.childCategories" :key="c3.id">
                        <a
                          :data-category-name="c3.name"
                          :data-category3-id="c2.id"
                          >{{ c3.name }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"

  export default {
    name: "TypeNav",
    data() {
      return {
        show: true,
      }
    },
    computed: {
      ...mapState({
        categoryList: (state) => {
          let list = state.home.categoryList
          return list.length >= 17 ? list.slice(0, 16) : list
        },
      }),
    },
    methods: {
      getChildCategoryList(id) {
        this.$store.dispatch("categoryList2", id)
      },
      routeToSearch(event) {
        let { categoryName, category1Id, category2Id, category3Id } =
          event.target.dataset
        if (categoryName) {
          let location = { name: "Search" }
          let query = { categoryName: categoryName }
          if (category1Id) {
            query.category1Id = category1Id
          } else if (category2Id) {
            query.category2Id = category2Id
          } else {
            query.category3Id = category3Id
          }
          location.query = query
          if(this.$route.params){
            location.params = this.$route.params
          }
          this.$router.push(location)
        }
      },
      enterShow() {
        this.show = true
      },
      leaveShow() {
        if (this.$route.path != "/home") {
          this.show = false
        }
      },
    },
    mounted() {
      if (this.$route.path != "/home") {
        this.show = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 481px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &:hover {
              .item-list {
                display: block;
              }
            }
          }

          .item:hover {
            background-color: skyblue;
          }
        }
      }

      //过度动画的样式
      .sort-enter {
        height: 0px;
      }

      .sort-enter-to {
        height: 481px;
      }

      .sort-enter-active {
        transition: all .5s linear;
      }
    }
  }
</style>