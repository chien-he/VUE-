<template>
    <div class="app-container">
        <!-- 顶部 Header 区域 -->
        <!--    用MintUI的header组件-->
        <mt-header fixed title="Vue商城项目">
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <!-- 中间的 路由 router-view 区域 -->
        <transition>
            <router-view></router-view>
        </transition>

        <!-- 底部 Tabbar 区域 -->
        <!--        用mui的tabbar-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item1" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item1" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item1" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge " id="badge">{{ $store.getters.getAllCount }}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item1" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>


    </div>
</template>

<script>
    export default{
        data(){
            return {
                flag: false
            }
        },
        created(){  // 3. 刚开始进入时，默认是/home，设置一下
            this.flag = this.$route.path === "/home" ? false : true;
        },
        methods: {
            goBack(){  // 1. 点击后退
                this.$router.go(-1);
            }
        },
        watch: {   // 2. 监听url地址是不是/home
            "$route.path": function (newVal) {
                if (newVal === "/home"){
                    this.flag = false;
                }else{
                    this.flag = true;
                }
            }
        }
    }
</script>


<style lang="scss" scoped>
    .app-container {
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;  /*解决顶部和底部出现滚动条*/
    }

    .v-enter{
        opacity: 0;
        transform: translateX(100%);  /*设置从右侧进入*/
    }

    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%); /*设置从左侧消失*/
        position: absolute; /*解决中间组件会从下面飘到上面*/
    }

    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }

    /* 改类名，解决 tabbar 点击无法切换的问题*/
    .mui-bar-tab .mui-tab-item1 {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292
    }

    .mui-bar-tab .mui-tab-item1.mui-active {
        color: #007aff
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon:active {
        background: 0 0
    }

    .mint-header-title{
        z-index: 99;
    }
</style>
