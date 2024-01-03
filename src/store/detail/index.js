// 我是商品详情的小仓库

import { reqGetGoodesInfo, reqAddOrUpdateShopCart } from "@/api/index";

// 引入封装的uuid临时游客身份生成器
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodesInfo: {},

  // 游客的临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODSINFO(state, goodesInfo) {
    state.goodesInfo = goodesInfo;
  },
};
const actions = {
  // 获取产品信息
  async getGoodesInfo({ commit }, skuId) {
    // 发请求并把参数带过去
    let result = await reqGetGoodesInfo(skuId);
    // 判断是否请求成功
    if (result.code == 200) {
      // 请求成功后提交给mutations处理
      commit("GETGOODSINFO", result.data);
    }
  },

  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车(发请求)，前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回了一个code==200 ，表示请求成功
    // 因为服务器没有返回其余的数据，因此不需要再提交到mutations
    // 当前的这个函数如果执行会返回一个promise
    // async函数执行返回的一定是一个promise对象
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);

    if (result.code == 200) {
      // 代表服务器加入成功
      return "ok";
    } else {
      // 否则就是失败，返回失败提示
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {
  // 简化数据
  // 路径导航
  categoryView(state) {
    // state.goodesInfo起始的状态是空对象，其返回值是undefind，所以直接返回会有警报，所以至少返回是一个空对象
    return state.goodesInfo.categoryView || {};
  },
  // 产品信息
  skuInfo(state) {
    return state.goodesInfo.skuInfo || {};
  },
  // 产品售卖属性
  spuSaleAttrList(state) {
    return state.goodesInfo.spuSaleAttrList || [];
  },
};

// 对外暴露对象
export default {
  state,
  mutations,
  actions,
  getters,
};
