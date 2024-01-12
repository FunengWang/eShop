<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li @click="prePage" class="prev disabled">
          <a>«上一页</a>
        </li>
        <li
          v-for="n in range"
          :key="n"
          :class="{ active: pageNo == n }"
          @click="changePageNo(n)"
        >
          <a>{{ n }}</a>
        </li>
        <li class="dotted"><span>...</span></li>
        <li @click="nextPage" class="next">
          <a>下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{ totalPage }}页&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      pageSize: {
        //每一页展示多少数据
        type: Number,
      },
      pageNo: {
        //当前处于第几页
        type: Number,
      },
      total: {
        //整个分页一共要展示多少数据
        type: Number,
      },
      continue: {
        //分页连续页码个数
        type: Number,
      },
    },
    computed: {
      totalPage() {
        return Math.ceil(this.total / this.pageSize)
      },
      range() {
        let startNo = 0
        let endNo = 0
        if (this.continue > this.totalPage) {
          startNo = 1
          endNo = this.totalPage
        } else {
          //每次连续的分页间隔是5,1~5,6~10,确保pageNo落在此区间内
          for (let i = 0; i < this.totalPage; i++) {
            let lowLimit = 5 * i + 1
            let upLimit = 5 * (i + 1)
            if (this.pageNo >= lowLimit && this.pageNo <= upLimit) {
              startNo = lowLimit
              endNo = upLimit
            }
          }
        }
        let arr = []
        for (let i = startNo; i <= endNo; i++) {
          arr.push(i)
        }
        return arr
      },
    },
    methods: {
      changePageNo(n) {
        this.$bus.$emit("pageNo", n)
      },
      prePage() {
        if (this.pageNo > 1) {
          this.changePageNo(this.pageNo - 1)
        }
      },
      nextPage() {
        if (this.pageNo < this.totalPage) {
          this.changePageNo(this.pageNo + 1)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .page {
    text-align: center;
    width: 733px;
    height: 66px;
    overflow: hidden;
    float: right;
    .sui-pagination {
      margin: 18px 0;
      ul {
        margin-left: 0;
        margin-bottom: 0;
        vertical-align: middle;
        width: 490px;
        float: left;
        li {
          line-height: 18px;
          display: inline-block;
          a {
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            border: 1px solid #e0e9ee;
            margin-left: -1px;
            font-size: 14px;
            padding: 9px 18px;
            color: #333;
          }
          &.active {
            a {
              background-color: #fff;
              color: #e1251b;
              border-color: #fff;
              cursor: default;
            }
          }
          &.prev {
            a {
              background-color: #fafafa;
            }
          }
          &.disabled {
            a {
              color: #999;
              cursor: default;
            }
          }
          &.dotted {
            span {
              margin-left: -1px;
              position: relative;
              float: left;
              line-height: 18px;
              text-decoration: none;
              background-color: #fff;
              font-size: 14px;
              border: 0;
              padding: 9px 18px;
              color: #333;
            }
          }
          &.next {
            a {
              background-color: #fafafa;
            }
          }
        }
      }
      div {
        color: #333;
        font-size: 14px;
        float: right;
        width: 241px;
      }
    }
  }
</style>