<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPage', 1)">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPage', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPage', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],

  //   计算属性
  computed: {
    // 计算出总共多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },

    // 计算出连续的页码的起始数字和结束数字[连续页码的数字：至少是5]
    startNumAndEndNum() {
      // 解构出要用到的props数据
      // pageNo：当前第几页
      // total：共多少条数据、
      // pageSize：每页展示几条
      // continues：连续的页码数
      const { pageNo, continues, totalPage } = this;
      // 先定义两个变量存储起始数字与结束变量
      let start = 0,
        end = 0;
      // 判断连续页码数5【至少五页】，如果出现不正常的情况【就是不够5页】
      //   不正常的现象【总页数没有连续的页码多】
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象【连续页码5，但是你的综合页数一定是大于5的】
        // 起始数字
        start = pageNo - parseInt(continues / 2);
        // 比如当前是第8页   连续的页码是5
        // 结束数字
        end = pageNo + parseInt(continues / 2);

        // 把出现不正常的情况【start出现0或负数】
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 纠正end出现不正常的情况，end数字大于总页码
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: #409eff;
}
</style>