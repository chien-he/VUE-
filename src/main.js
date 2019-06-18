// 入口文件
import Vue from 'vue'

// 按需导入 Mint-UI 中的组件
import {Header} from 'mint-ui'
Vue.component(Header.name, Header)

// 导入 MUI 的样式表
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 导入 App 根组件
import App from './App.vue'


var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(App)
});