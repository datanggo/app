// 当前的这个模块:API进行统一管理
import requests from "./request";

// 引入封装的mock请求文件
import mockRequests from "@/api/mockAjax";

// 三级联动的接口
// /api/product/get/BaseCategoryList   get请求   无参数

// 对外暴露请求函数
export const reqCategoryList = () => {
  // 发请求:axios发请求返回的结果是Promise对象
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};

// 获取banner(Home首页轮播图的图片接口)
export const reqGetBannerLiset = () => {
  return mockRequests.get("/banner");
};

// 获取floor组件的数据
export const reqGetFloorList = () => {
  return mockRequests.get("/floor");
};

// 获取搜索模块数据 地址：/api/list 请求的方式为POST  参数：对象
// 当前的这个接口给服务器传递的params，至少是一个空对象
export const reqGetSearchInfo = (params) => {
  return requests({ url: "/list", method: "post", data: params });
};

// 获取产品详情信息的接口 请求的地址：URL：/api/item{sukId} 请求的方式GET

export const reqGetGoodesInfo = (skuId) =>
  requests({ url: `/item/${skuId} `, method: "get" });

// 将产品添加到购物车的请求接口(或者更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

// 获取购物车列表的数据的接口
export const reqCartList = () => {
  return requests({ url: "cart/cartList", method: "get" });
};

// 删除购物车产品的接口
// URL：/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}

// 修改商品的选中的状态
// url：api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateCheckedByid = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })
}


// 获取验证码的接口  url:api/user/passport/sendCode/{phone} method:"get"
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })

// 用户注册接口 url：api/user/passport/register ||  method:post  携带参数：phone code password
export const reqUserRegister = (data) => requests({ url: "/user/passport/register", data, method: "post" })

// 用户登录的接口 url：/api/user/passport/login    method:post  参数：phone，password
export const reqUserLogin = (data) => {
  return requests({ url: "/user/passport/login", data, method: "post" })
}

// 获取用户的信息【需要带着用户的token向服务器要用户的信息】
// url:api/user/passport/auth/getUserInfo

export const reqUserInfo = () => {
  return requests({ url: "/user/passport/auth/getUserInfo", method: "get" })
}

// 退出登录的接口  url:/user/passport/logout   请求方式  get
export const reqLogout = () => {
  return requests({ url: "/user/passport/logout", method: "get" })
}

//获取用户地址信息的接口  //url:/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = () => {
  return requests({ url: "/user/userAddress/auth/findUserAddressList ", method: "get" })
}

// 获取商品清单   url:/order/auth/trade   method:get
export const reqOrderInfo = () => {
  return requests({ url: "/order/auth/trade ", method: "get" })
}

// url:/order/auth/submitOrder?tradeNo={tradeNo}   method:"post"
// 提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })

// 获取支付信息
// url:/payment/weixin/createNative/{orderId}   method:"get"
export const reqPayInfo = (orderId) => {
  return requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })
}

// 获取支付订单状态
// url:/payment/weixin/queryPayStatus/{orderId}  method:get
export const reqPayStatus = (orderId) => {
  return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })
}
