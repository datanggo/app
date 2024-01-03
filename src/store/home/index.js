// 引入请求路径
import { reqCategoryList, reqGetBannerLiset, reqGetFloorList } from '@/api'


//home模块的小仓库
const state = {
    // state中的数据默认的初始值别瞎写，服务器返回的是对象，就写对象，是数组就写数组
    //三级联动的数据
    categoryList: [],

    //轮播图的数据
    bannerList: [],

    // floor中的数据
    floorList: []
}
const mutations = {
    // 修改state中三级联动的数据,因为mutations是修改state的唯一地方
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },

    // 修改state中轮播图的数据
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },

    //修改state中floor中的数据
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    },
}
const actions = {

    // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code === 200) {
            // 如果请求成功，把返回的数据提交给mutations
            commit('CATEGORYLIST', result.data)
        }
    },

    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerLiset();
        // console.log(result);//打印返回结果
        if (result.code === 200) {
            // 如果请求成功，把返回的数据提交给mutations
            commit("BANNERLIST", result.data)
        }
    },

    // 获取floor数据列表
    async getFloorList({ commit }) {
        //发请求
        let result = await reqGetFloorList()
        // 打印请求到的数据
        // console.log(result);
        if (result.code === 200) {
            // 如果请求成功，把返回的数据提交给mutations
            commit('FLOORLIST', result.data)
        }
    }
}
const getters = {}


// 向外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}