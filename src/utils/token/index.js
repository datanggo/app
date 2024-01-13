// 对外暴露

// 存储token
export const setToken = (token) => {
    // 用户已经登录成功且获取到token
    // 持久化存储token
    localStorage.setItem("TOKEN", token)
}

// 获取token、
export const getToken = () => {
    // 这里一定要有返回值
    return localStorage.getItem("TOKEN")
}

// 清除token
export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}