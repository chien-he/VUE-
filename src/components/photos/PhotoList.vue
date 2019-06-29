<template>
    <div>
        <!-- 顶部滑动条区域  MUI 中的 tab-top-webview-main.html -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--                    设置按需激活-->
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active': '']" v-for="item in cates"
                       :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 底部图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photoinfo/' + item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    // 导入 mui 的js文件
    import mui from "../../lib/mui/js/mui.js";


    export default {
        name: "PhotoList",
        data() {
            return {
                cates: [      // 所有分类的列表数组
                    {title: '全部', id: 0},
                    {title: '家具生活', id: 1},
                    {title: '摄影设计', id: 2},
                    {title: '娱乐', id: 3},
                    {title: '北京', id: 4},
                    {title: '明星', id: 5},
                    {title: '社会', id: 6},
                    {title: '舞蹈', id: 7},
                    {title: '音乐', id: 8}
                ],
                list: [   // 图片列表的数组
                    {
                        id: 50,
                        title: '有气质且带可带的美女组图',
                        img_url: 'http://www.shu800.com/imgh/170_3238.jpg',
                        zhaiyao: '有气质且带可带的美女组图'
                    },
                    {
                        id: 51,
                        title: '有气质且带可带的美女组图',
                        img_url: 'http://www.shu800.com/imgh/170_3242.jpg',
                        zhaiyao: '有气质且带可带的美女组图'
                    },
                    {
                        id: 52,
                        title: '有气质且带可带的美女组图',
                        img_url: 'http://www.shu800.com/imgh/70_83.jpg',
                        zhaiyao: '有气质且带可带的美女组图'
                    },
                    {
                        id: 53,
                        title: '有气质且带可带的美女组图',
                        img_url: 'http://www.shu800.com/imgh/70_3009.jpg',
                        zhaiyao: '有气质且带可带的美女组图'
                    },
                    {
                        id: 54,
                        title: '有气质且带可带的美女组图',
                        img_url: 'http://www.shu800.com/imgh/141_1318.jpg',
                        zhaiyao: '有气质且带可带的美女组图'
                    },
                    {
                        id: 55,
                        title: '有气质且带可带的美女组图',
                        img_url: 'http://www.shu800.com/imgh/141_1319.jpg',
                        zhaiyao: '有气质且带可带的美女组图'
                    }
                ]
            }
        },
        created() {
            this.getAllCategory();
            this.getPhotoListByCateId(0)   // 默认进入页面，就主动请求 所有图片列表的数据
        },
        mounted() {     // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数; 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
            //初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory() {    // 获取所有的图片分类
                this.$http.get('api/getimgcategory').then(result => {
                    if (result.body.status === 0) {
                        result.body.message.unshift({title: '全部', id: 0});  //手动拼接出一个最完整的 分类列表
                        this.cates = result.body.message;
                    } else {
                        // 失败的
                        Toast("获取分类失败！")
                    }
                })
            },
            getPhotoListByCateId(cateId) {    // 根据 分类Id，获取图片列表
                this.$http.get('api/getimages' + cateId).then(result => {
                    if (result.body.status === 0) {
                        this.list = result.body.message;
                    } else {
                        // 失败的
                        Toast("获取图片列表失败！")
                    }
                })
            }
        }
    }


</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0px;
            li {
                background-color: #ccc;
                text-align: center;
                margin-bottom: 10px;
                box-shadow: 0 0 9px #999;
                position: relative;
                img {
                    width: 100%;
                    vertical-align: middle;
                }
                img[lazy=loading] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
                .info{
                    color: white;
                    text-align: left;
                    background-color: rgba(0, 0, 0, 0.4);
                    max-height: 45px;
                    position: absolute;
                    bottom: 0;
                    .info-title{
                        font-size: 14px;
                    }
                    .info-body{
                        font-size: 13px;
                    }
                }
            }
        }
</style>