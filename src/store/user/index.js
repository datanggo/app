//登录与注册的模块
// 引入请求模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"

// 引入token函数
import { setToken, getToken, removeToken } from "@/utils/token"

const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },

    // /存储token
    USERLOGIN(state, token) {
        state.token = token
    },

    // 存储返回来的用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },

    // 清除本地数据
    CLEAR(state) {
        // 把仓库中相关用户信息清空
        state.token = ''
        state.userInfo = {}
        // 把本地存储的token清空
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的接口是把验证码返回了，但是正常情况应该是把验证码发到手机上
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

    // 登录业务【token】
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发的token是用户的唯一标识
        // 将来经常用token向服务器要用户信息
        if (result.code == 200) {
            // 用户已经登录成功且获取到token
            commit("USERLOGIN", result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        // getToken()
        let result = await reqUserInfo()
        // console.log(result);
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

    // 退出登录
    async userLogout({ commit }) {
        // 只是向服务器发请求,通知服务器清除toktn
        let result = await reqLogout()
        if (result.code == 200) {
            //actions里不能直接修改state,必须要提交mutations处理
            commit("CLEAR")
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    }

}
const getters = {}

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters,
}
