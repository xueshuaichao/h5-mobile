<template>
    <div class="Professional">
        <van-nav-bar title="职业测评" left-arrow @click-left="back" />
        <div class="t">
            <img src="../../assets/images/Professional3.png" alt />
            <div class="text">
                <p class="name">Hi，张三</p>
                <p class="tip">您还未进行水平测试</p>
            </div>
            <van-button type="info" plain to="index">开始测评</van-button>
        </div>
        <div class="step1 step">
            <!-- <p>企业能力测评</p> -->
        </div>
        <div class="step2 step">
            <!-- <p>中级职称测评</p> -->
        </div>
        <div class="step3 step">
            <!-- <p>人力资源管理能力测评</p> -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        back() {
            this.$router.back();
        }
    }
};
</script>
<style lang="less">
.Professional {
    .van-button--plain.van-button--info {
        color: #02b38a;
        width: 74px;
        height: 26px;
        font-size: 12px;
        border: 0;
        padding: 0;
        position: absolute;
        right: 15px;
        top: 25px;
    }
}
</style>
<style lang="less" scoped>
.Professional {
    p {
        margin: 0;
    }
    .t {
        width: 690px;
        margin: 30px auto;
        background: linear-gradient(
            116deg,
            rgba(44, 193, 171, 1) 0%,
            rgba(2, 169, 159, 1) 100%
        );
        box-shadow: 0px 0px 20px 0px rgba(3, 180, 139, 0.2);
        border-radius: 16px;
        box-sizing: border-box;
        text-align: left;
        padding: 32px;
        position: relative;
        img {
            width: 96px;
            margin-right: 16px;
            vertical-align: top;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            color: #fff;
            .name {
                font-size: 32px;
                font-weight: 600;
                margin-bottom: 16px;
            }
            .tip {
                font-size: 24px;
                font-weight: 600;
            }
        }
    }
    .step {
        width: 690px;
        margin: 0 auto 30px;
        height: 380px;
        background-size: 100%;
        position: relative;
        p {
            font-size: 32px;
            font-weight: 400;
            color: rgba(39, 47, 85, 1);
            line-height: 32px;
        }
    }
    .step1 {
        background-image: url(../../assets/images/Professiona1.png);
    }
    .step2 {
        background-image: url(../../assets/images/Professional22.png);
    }
    .step3 {
        background-image: url(../../assets/images/Professional4.png);
    }
}
</style>