<template>
    <!--    注意：在 .vue 的组件中，template 中必须有且只有唯一的根元素进行包裹，一般都用 div 当作唯一的根元素-->
    <div>
        <!-- 使用 Mint-UI swipe 轮播图组件 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <mt-swipe-item v-for="(item,i) in lunbotuList" :key="i">
                <img :src="item" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 九宫格 到 6宫格 的改造工程 使用 `MUI` 的 `grid-default.html`-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../六宫格小图标/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../六宫格小图标/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../六宫格小图标/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../六宫格小图标/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../六宫格小图标/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../六宫格小图标/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </a></li>
        </ul>

    </div>

</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "HomeContainer",
        data() {
            return {
                lunbotuList: [
                    'http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg',
                    'http://www.itcast.cn/images/slidead/BEIJING/2017511009514700.jpg',
                    'http://www.itcast.cn/images/slidead/BEIJING/2017421414422600.jpg']   // 保存轮播图的数组
            }
        },
        created() {
            this.getLunbotu();
        },
        methods: {
            getLunbotu() {
                // 获取轮播图数据的方法
                this.$http.get('http://vue.studyit.io/api/getlunbo').then(res => {
                    console.log(res.body);
                    if (res.body.status === 0) {
                        // 成功了
                        this.lunbotuList = res.body.message;
                        Toast("加载轮播图成功")
                    } else {
                        // 失败的
                        Toast("加载轮播图失败。。。")
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 200px;

        .mint-swipe-item {
            &:nth-child(1) {
                background-color: red;
            }

            &:nth-child(2) {
                background-color: green;
            }

            &:nth-child(3) {
                background-color: yellow;
            }

            img { /*让图片自适应大小*/
                width: 100%;
                height: 100%;
            }
        }
    }

    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
        img{
            width: 60px;
            height: 60px;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
</style>