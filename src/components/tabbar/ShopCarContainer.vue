<template>
    <div class="shopcar-container">

        <div class="goods-list">

            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <!--Mint-UI 的 Switch 表单组件-->
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src='item.thumb_path' alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->

                                <a href="" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count}}</span>件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // 导入 数字选择框 组件
    import numbox from "../subcomponents/shopcar_numbox.vue";

    export default {
        name: "ShopCarContainer",
        data(){
            return {
                goodslist: [
                    {id: 87, title: '华为(HUAWEI)荣耀6Plus 16G双4G版',sell_price: 2195, thumb_path: 'https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg'},
                    {id: 92, title: '华为(HUAWEI)荣耀6Plus 16G双4G版',sell_price: 2095, thumb_path: 'https://res0.vmallres.com/pimages//product/6901443223459/428_428_1542765557433mp.png'},
                    {id: 94, title: '华为(HUAWEI)荣耀6Plus 16G双4G版',sell_price: 2395, thumb_path: 'https://res0.vmallres.com/pimages//product/6901443292134/428_428_1552440841438mp.png'},
                    {id: 88, title: '华为(HUAWEI)荣耀6Plus 16G双4G版',sell_price: 2395, thumb_path: 'https://ecmb.bdimg.com/tam-ogel/5789e1a952bb587cbbf54360dc78d314_78_59.jpg'}
                ] // 购物车中所有商品的数据
            }
        },
        created(){
            this.getGoodsList();
        },
        methods: {
            getGoodsList(){
                // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
                var idArr = [];
                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id);
                });
                // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
                if(idArr.length <= 0){
                    return;
                }
                // 获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/'+ idArr.join(',')).then(result=>{
                    if (result.body.status === 0) {
                        this.goodslist = result.body.message;
                    }
                })
            },
            remove(id,index){   // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
                this.goodslist.splice(index,1);
                this.$store.commit('removeFormCar',id);
            },
            selectedChanged(id,val){
                // 每当点击开关，把最新的 快关状态，同步到 store 中
                console.log(id + " --- " + val);
                this.$store.commit('updateGoodsSelected',{id, selected: val} )
            }
        },
        components: {
            numbox
        }
    }
</script>

<style scoped lang="scss">
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;

        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;

                img{
                    width: 60px;
                    height: 60px;
                }
                .info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    h1{
                        font-size: 12px;
                    }
                    .price{
                        color: red;
                        font-weight: bold;
                    }
                }
            }
        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>