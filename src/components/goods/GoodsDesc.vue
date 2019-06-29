<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
    export default {
        name: "GoodsDesc",
        data() {
            return {
                info: {
                    title: '华为(HUAWEI)荣耀6Plus 16G双4G版',
                    content: "<p>荣耀6 Plus,该机型分为两款型号的纤薄机身，支持TDD-LTE/TD-SCDMA/GSMA网络。</p><img src='https://i1.mifile.cn/a1/pms_1550642182.7527088!220x220.jpg' alt=''>"
                } // 图文数据
            }
        },
        created() {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc() {
                this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(result => {
                    if (result.body.status === 0) {
                        this.info = result.body.message[0];
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .goodsdesc-container {
        padding: 4px;

        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }

        .content {
            img {
                width: 100%;
            }
        }
    }
</style>