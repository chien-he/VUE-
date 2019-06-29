// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
// 手动安装VueRouter
Vue.use(VueRouter);

// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io/';
// 全局启用 emulateJSON 选项
Vue.http.options.emulateJSON = true;


// 导入 MUI 的样式表
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// // 按需导入 Mint-UI 中的组件
// import {Header, Swipe, SwipeItem,Button,Lazyload  } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// 改为全部导入就能实现懒加载的小图标了
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

// 导入自己的 router.js 路由模块
import router from './router.js'

// 导入 App 根组件
import App from './App.vue'

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
});

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(App),
    router: router //挂载路由对象到 VM 实例上
});