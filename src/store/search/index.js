// 引入请求接口
import { reqGetSearchInfo } from "@/api"

//search模块的小仓库
const state = {
    //仓库初始状态是数组还是对象要根据返回来的数据看
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块的数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个函数reqGetSearchInfo()在调用获取服务器数据的时候，至少应该传递一个参数(空对象)
        // params形参：是当用户派发actions的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        // 如果请求成功提交到mutations
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

// getters计算属性：在项目中为了简化数据而生
const getters = {
    // 在项目当中getters主要的作用是：简化仓库中的数据
    // 可以把将来在组件当中需要用到的数据简化一下，【将来组件当中用到的数据可以直接使用】
    goodsList(state) {
        // 当前形参state是当前仓库的state，并不是大仓库的
        // 如果服务器的数据回来了返回一个对象，但是假如没有网络应该返回的是undefined，所以至少返回一个数组
        return state.searchList.goodsList || []

    },

    trademarkList(state) {
        return state.searchList.trademarkList || []
    },

    attrsList(state) {
        return state.searchList.attrsList || []
    }
}


// 向外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}