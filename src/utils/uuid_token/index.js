// 此处即是引入插件uuid ，其中对象中是as意思是起别名即后面再用到的时候直接v4代表uuidv4
import { v4 as uuidv4 } from "uuid";

// 要生成一个随机的字符串且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid(看一下本地存储里是否有)
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  //   如果没有生成，有了就不用重复生成了
  if (!uuid_token) {
    uuid_token = uuidv4();
    // 如果没有生成完存储到本地
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token;
};
