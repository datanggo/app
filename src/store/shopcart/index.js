// 我是购物车的仓库
//引入请求接口
import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";

const state = {
  cartList: []
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
};
const actions = {
  // 获取购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    // // 测试是否能获取购物车的数据
    // console.log(result);
    if (result.code == 200) {
      commit("GETCARTLIST", result.data)
    }

  },

  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error("faile"))
    }
  },

  // 修改购物车某一个产品的状态
  async updateCheckedByid({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // 删除全部勾选的产品
  // async deleteAllCheckedCart({ dispatch, getters }) {
  deleteAllCheckedCart(context) {
    // context即上下文，小仓库，身上除了有commit(提交mutations修改state) getters(计算属性) dispatch(派发actions) state(当前仓库的数据)
    // 解构赋值
    let { dispatch, getters } = context
    // 获取购物车当中全部的产品(是一个数组)

    // 定义变量接收返回的每一项数据
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : '';
      // 将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise)
    });

    // 只要全部的p1|p2都成功，返回的结果即为成功，如果有一个失败返回的即为失败的结果
    return Promise.all(PromiseAll)
  },

  // 修改全部产品的状态
  updateAllCartIsChecked(context, isChecked) {
    // context即上下文，小仓库，身上除了有commit(提交mutations修改state) getters(计算属性) dispatch(派发actions) state(当前仓库的数据)
    // 解构赋值
    let { dispatch, state } = context
    // 声明一个空数组接收每一次item的返回值
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let Promise = dispatch("updateCheckedByid", { skuId: item.skuId, isChecked })
      PromiseAll.push(Promise)
    });

    // 返回最终的结果
    return Promise.all(PromiseAll)
  }
};
const getters = {
  // 简化属性值
  cartList(state) {
    return state.cartList[0] || {}
  },


};

// 向外暴露对象
export default {
  state,
  mutations,
  actions,
  getters,
};
