// 我是购物车的仓库
//引入请求接口
import { reqCartList } from "@/api";

const state = {};
const mutations = {};
const actions = {
  // 获取购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    // 测试是否能获取购物车的数据
    console.log(result);
  },
};
const getters = {};

// 向外暴露对象
export default {
  state,
  mutations,
  actions,
  getters,
};
