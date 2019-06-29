<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间: {{ newsinfo.add_time | dateFormat}}</span>   <!--时间过滤器-->
            <span>点击: {{ newsinfo.click}}次</span>
        </p>

        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>  <!--父组件向子组件传值-->
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    // 导入 评论子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "NewsInfo",
        data(){
            return {
                id: this.$route.params.id,   // 将路由地址中传递过来的 Id值，挂载到 data上，方便以后调用
                newsinfo: {id: 13, title: '1季度多家房企利润跌幅超50%去库存促销战打响',click: 1, add_time: '2015-04-16T03:50:28.0000Z',content: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计'}// 新闻对象
            }
        },
        created() {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo(){
                // 获取新闻详情
                this.$http.get('api/getnew/' + this.id).then(result => {  // 根据路由地址里的Id，发送对应ajax请求，获取数据
                    if(result.body.status === 0){
                        this.newsinfo = result.body.message[0];   // 一个id只对应一个对象
                    }else {
                        // 失败的
                        Toast("加载轮播图失败。。。")
                    }
                })
            }
        },
        components: {    // 用来注册子组件的节点
            'comment-box': comment
        }
    }
</script>

<style lang="scss">
    .newsinfo-container{
        padding: 0 4px ;
        .title{
            color: red;
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            color: #226aff;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>