export default {
    // 对外暴露的对象,可以放置组件重复的业务逻辑
    // 方法
    methods: {
        // 小明给爸爸的回调函数
        geiQian(money) {
            // 小明的钱减50
            this.money -= money;
            // 需要在子组件内部,获取到父组件,让父组件的数据加上50
            // 可以通过$parent属性获取到某一组父组件,可以操作父组件的数据与方法
            this.$parent.money += money;
        },
    },

    //    挂载完毕
    mounted() {
        console.log("mixin混入被使用了");
    },
}