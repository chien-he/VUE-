<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 用 vue-preview 这个缩略图插件-->
        <div class="thumb">
            <vue-preview :slides="slide"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现成的 评论子组件 -->
        <cmt-box :id="id"></cmt-box>  <!--父组件把数据传到子组件内部-->
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    // 导入评论子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "PhotoInfo",
        data() {
            return {
                id: this.$route.params.id,    // 从路由中获取到的 图片Id
                photoinfo: {    // 图片详情
                    id: 53,
                    title: '清新有活力的公寓设计，用色彩焕然一新',
                    click: 3,
                    add_time: '2015-04-16T03:50:28.0000Z',
                    content: 'WS为华沙的一处公寓做了设计，初看的色彩，面积最大的公共空间，包括客厅，餐厅和厨房采用了黄且轻快的蓝色调卧室，被芥末绿铺满的卫生间，减少配饰的使用'
                },
                slide: [    // 缩略图的数组
                    {src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg', w: 600, h: 400},
                    {src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg', w: 600, h: 400},
                    {
                        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=349748608,3155129856&fm=27&gp=0.jpg',
                        w: 600,
                        h: 400
                    }
                ]
            }
        },
        created() {
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods: {
            getPhotoInfo() {  // 获取图片的详情
                this.$http.get("api/getimageInfo/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.photoinfo = result.body.message[0];
                    } else {
                        // 失败的
                        Toast("获取图片详情失败！")
                    }
                })
            },
            getThumbs() {  // 获取缩略图
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        // 循环每个图片数据，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                        });
                        // 把完整的数据保存到 list 中
                        this.slide = result.body.message;
                    }
                })
            }
        },
        components: {
            // 注册 评论子组件
            'cmt-box': comment
        }
    }
</script>

<style lang="scss">
    .photoinfo-container {
        padding: 3px;

        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content {
            font-size: 13px;
            line-height: 30px;
        }

        .thumb {
            .my-gallery {
                display: flex;
                flex-wrap: wrap;
                figure {
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        height: 50px;
                    }
                }
            }

        }
    }

</style>