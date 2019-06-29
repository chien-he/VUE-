<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

        <!--        mint-ui 的 button组件-->
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>


    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "comment",
        data(){
            return {
                pageIndex: 1,   // 默认展示第一页数据
                comments: [
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:28.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:29.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:30.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:31.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:32.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:33.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:34.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:35.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:36.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:37.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:38.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:39.0000Z',content: '我来评论一下啦'},
                    {user_name: '匿名用户', add_time: '2015-04-16T03:50:40.0000Z',content: '我来评论一下啦'}

                ] , // 所有的评论数据
                msg: ''  // 评论输入的内容
            }
        },
        created(){
            this.getComments()
        },
        methods:{
            getComments(){   // 获取评论
                this.$http.get('api/getcomments/' + this.id + '?pageindex='+ this.pageIndex).then(result => {
                    if(result.body.status === 0){
                        // this.comments = result.body.message;
                        // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                        this.comments = this.comments.concat(result.body.message);
                    }else {
                        // 失败的
                        Toast("获取评论失败！")
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComments();
            },
            postComment(){
                // 校验是否为空内容
                if(this.msg.trim().length === 0){  // trim去除字符串两边的空格
                    return Toast('评论内容不能为空！')
                }

                // 发表评论
                // post 方法接收三个参数：
                // 参数1： 要请求的URL地址
                // 参数2： 要提交给服务器的数据，要以对象形式提交给服务器
                // 参数3： 是一个配置对象，要以哪种表单数据类型提交过去， { emulateJSON: true }, 以普通表单格式，将数据提交给服务器 application/x-www-form-urlencoded
                this.$http.post('api/postcomment/'+ this.$route.params.id, {content: this.msg.trim()} ).then(result=>{
                    if (result.body.status === 0){
                        // 拼接出一个评论对象
                        var cmt = {
                            user_name: '匿名用户',
                            add_time: Date.now(),
                            content: this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg = '';
                    }
                })
            }
        },
        props: ['id']    // 父组件向子组件传值
    }
</script>

<style scoped lang="scss">
    .cmt-container {
        h3 {
            font-size: 18px;
        }

        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list {
            margin: 5px 0;

            .cmt-item {
                font-size: 13px;

                .cmt-title {
                    background-color: #ccc;
                    line-height: 30px;
                }

                .cmt-body {
                    text-indent: 2em;
                    line-height: 35px;
                }
            }
        }
    }

</style>