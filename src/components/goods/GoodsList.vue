<template>
    <div class="goods-list">

        <!--        <router-link class="goods-item" v-for="item in goodslist" :key="item.id" tag="div" to="'/home/goodsinfo/' + item.id">-->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <!--        </router-link>-->

        <mt-button type="danger" size="large"  @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        data(){
            return {
                pageindex: 1, // 分页的页数
                goodslist: [  // 存放商品列表的数组
                    {id: 87, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:28.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 88, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:29.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://res0.vmallres.com/pimages//frontLocation/content/iihZLWNeHr2LVE7pXTKw.jpg',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 89, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:30.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://res0.vmallres.com/pimages//frontLocation/content/jydOBP0RiOlY6SDFCygr.png',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 90, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:31.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://res0.vmallres.com/pimages//frontLocation/content/aGayfeV0IXfXFopY6eqB.png',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 91, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:32.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://res0.vmallres.com/pimages//product/6901443295562/428_428_1555730643978mp.png',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 92, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:33.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://res0.vmallres.com/pimages//product/6901443264797/428_428_1539245339725mp.png',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 93, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:34.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://res0.vmallres.com/pimages//product/6901443292134/428_428_1552440841438mp.png',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 94, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:35.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://res0.vmallres.com/pimages//product/6901443229925/428_428_1554945431912mp.png',sell_price: 2195,market_price: 2499, stock_quantity: 60},
                    {id: 95, title: '华为(HUAWEI)荣耀6Plus 16G双4G版', add_time: '2015-04-16T03:50:35.0000Z',zhaiyao: '荣耀6Plus，该机型分为两款型号',click: 0, img_url: 'https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg',sell_price: 2195,market_price: 2499, stock_quantity: 60}
                ]
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList(){    // 获取商品列表
                this.$http.get('api/getgoods?pageindex='+ this.pageindex).then(result=>{
                    if (result.body.status === 0){
                        // this.goodslist = result.body.message;
                        // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getGoodsList();
            },
            goDetail(id){      // 使用JS的形式进行路由导航
                // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
                // 其中： this.$route 是路由【参数对象】，获取所有路由中的参数， params, query 都属于它
                // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

                // 1. 最简单的
                // this.$router.push("/home/goodsinfo/" + id);
                // 2. 传递对象
                // this.$router.push({ path: "/home/goodsinfo/" + id });
                // 3. 传递命名的路由
                this.$router.push({name: 'goodsinfo', params:{id} })
            }

        }
    }
</script>

<style scoped lang="scss">
    .goods-list{  /*经典两列布局*/
        display: flex;
        flex-wrap: wrap; /*换行*/
        justify-content: space-between; /*内容均匀分布*/
        padding: 7px;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;

            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>