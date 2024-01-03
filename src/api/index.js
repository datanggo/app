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
