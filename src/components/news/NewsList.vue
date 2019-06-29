<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslists" :key="item.id">
                <router-link :to=" '/home/newsinfo/' + item.id ">   <!--给路由传参-->
                    <img class="mui-media-object mui-pull-left" :src= "item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间: {{ item.add_time | dateFormat}}</span>   <!--时间过滤器-->
                            <span>点击: {{ item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "newslist",
        data(){
            return {
                newslists: [
                    {id: 13, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 1, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 14, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 4, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 15, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 16, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 17, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 18, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 19, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 20, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 21, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 22, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 23, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 24, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'},
                    {id: 25, title: '1季度多家房企利润跌幅超50%去库存促销战打响',add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '房企一季度销售业绩已经陆续公布，克而瑞研究中心统计',click: 10, img_url:'http://pic37.nipic.com/20140113/8800276_184927469000_2.png'}
                ]   // 新闻列表
            }
        },
        created(){
            this.getNewsList();
        },
        methods: {
            getNewsList(){
                // 获取新闻列表
                this.$http.get('api/getnewslist').then(result=>{
                    if(result.body.status === 0){
                        // 如果没有失败，应该把数据保存到 data 上
                        this.newslists = result.body.message;
                    }else {
                        // 失败的
                        Toast("加载轮播图失败。。。")
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .mui-table-view{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex; /*左右对齐*/
            justify-content: space-between;
        }
    }
</style>