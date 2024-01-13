<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">￥{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn" href="###">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入store映射属性
import { mapGetters } from "vuex";

// 引入节流插件
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",

  // 挂载完成
  mounted() {
    // 挂载完毕，调用函数获取数据
    this.getDate();
  },

  // 方法
  methods: {
    // 获取购物车个人的数据
    getDate() {
      // 派发actions
      this.$store.dispatch("getCartList");
    },

    // 节流插件 的使用
    handler: throttle(async function (type, disNum, cart) {
      // 派发actions通知服务器修改产品个数
      // console.log(disNum); //disNum即是修改的值: +变化量(1) -变化量（-1） input修改完的数  cart身上又id
      switch (type) {
        // 加号
        case "add":
          // 带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          /* if (disNum > 1) {
            disNum = -1;
          } else {
            disNum = 0;
          } */
          // 如果出现了产品的个数小于1，传递给服务器的个数为0
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //用户输入最终的量是非法的(带有汉字)
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 属于正常的情况，需要取整，带给服务器的是变化的量  用户输入进来的 - 起始的个数
            disNum = parseInt(disNum) - cart.skuNum;
          }

          break;
      }

      // 派发actions
      try {
        // 表示修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再次获取服务器最新的数据进行展示
        this.getDate();
      } catch (error) {}
    }, 700),
    /* // 修改购物数量的回调
    async handler(type, disNum, cart) {
      // 派发actions通知服务器修改产品个数
      // console.log(disNum); //disNum即是修改的值: +变化量(1) -变化量（-1） input修改完的数  cart身上又id
      switch (type) {
        // 加号
        case "add":
          // 带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          /* if (disNum > 1) {
            disNum = -1;
          } else {
            disNum = 0;
          } */
    // 如果出现了产品的个数小于1，传递给服务器的个数为0
    /*   disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //用户输入最终的量是非法的(带有汉字)
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 属于正常的情况，需要取整，带给服务器的是变化的量  用户输入进来的 - 起始的个数
            disNum = parseInt(disNum) - cart.skuNum;
          }

          break;
      } 

      // 派发actions
      try {
        // 表示修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再次获取服务器最新的数据进行展示
        this.getDate();
      } catch (error) {}
    }, */

    // 删除某一个产品的操作
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        // 如果删除成功,再次获取服务器最新的数据进行展示
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },

    // 修改某个产品的勾选状态
    async updateChecked(cart, event) {
      // console.log(event.target.checked);
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedByid", {
          skuId: cart.skuId,
          isChecked, //: event.target.checked ? "1" : "0",
        });
        // 如果修改数据成功，需要再次获取成功的数据
        this.getDate();
      } catch (error) {
        // 如果失败弹出失败信息
        alert(error.message);
      }
    },

    // 删除全部选中的商品
    // 这个回调没办法删除有用的数据
    async deleteAllCheckedCart() {
      try {
        // 派发actions
        await this.$store.dispatch("deleteAllCheckedCart");
        // 再发请求获取购物车列表
        // 如果修改数据成功，需要再次获取成功的数据
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },

    // 修改产品的全部按钮的状态
    async updateAllCartChecked(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        // 派发actions
        await this.$store.dispatch("updateAllCartIsChecked", isChecked);
        // 重新获取数据
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
  },

  // 计算属性
  computed: {
    ...mapGetters(["cartList"]),
    // 购物车的数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算购买产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    // 判断复选框是否全选
    isAllChecked() {
      // 遍历数组里面的数组，只要全部元素都是1====》真  否则为假
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
