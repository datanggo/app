<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- 子组件:数据来源于父组件 父组件props传递给子组件-->
    <List :todos="todos">
      <!-- 子组件决定不了结构与外观 -->
      <template slot-scope="todo">
        {{ todo }}
        <span :style="{ color: todo.todo.isComplete ? 'green' : 'red' }">{{
          todo.todo.text
        }}</span>
      </template>
    </List>
    <hr />
    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List1 :todos="todos">
      <template slot-scope="{ todo, index }">
        {{ todo }}
        -----<span :style="{ color: todo.isComplete ? 'blue' : 'red' }">{{
          index
        }}</span>
        -----<span :style="{ color: !todo.isComplete ? 'blue' : 'red' }">{{
          todo.text
        }}</span>
      </template>
    </List1>
  </div>
</template>

<script type="text/ecmascript-6">
//引入子组件
import List from "./List";
import List1 from "./List1";

export default {
  name: "ScopeSlotTest",
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: false },
        { id: 4, text: "DDD", isComplete: false },
      ],
    };
  },
  // 注册子组件
  components: {
    List,
    List1,
  },
};
</script>
