// 这里是自定义指令

// vue插件一定暴露的是一个对象
let myPlugins = {}
// 且这个对象一定要有install方法
myPlugins.install = function (Vue, options) {
    console.log("调用", Vue, options);
    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.directive
    // Vue.component
    // Vue.filter
    Vue.directive(options.name, (element, params) => {
        console.log(element, params)
        element.innerHTML = params.value.toUpperCase()
    })
}

export default myPlugins