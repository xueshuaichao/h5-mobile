<template>
    <div class="account">
        <div class="top">
            <img src="../../assets/images/portrait.png" alt />
            <p class="userName">张三</p>
        </div>
        <van-row gutter="20">
            <van-col span="6">
                <van-icon name="bookmark-o" size="30" />
                <p>我的培训</p>
            </van-col>
            <van-col span="6">
                <van-icon name="medal-o" size="30" />
                <p>我的证书</p>
            </van-col>
            <van-col span="6">
                <van-icon name="description" size="30" />
                <p>我的测评</p>
            </van-col>
            <van-col span="6">
                <van-icon name="records" size="30" />
                <p>我的简历</p>
            </van-col>
        </van-row>
        <van-index-bar>
            <van-cell title="实名认证">
                <van-icon name="arrow" />
            </van-cell>
            <van-cell title="我的足迹">
                <van-icon name="arrow" />
            </van-cell>
            <van-cell title="客服">
                <van-icon name="arrow" />
            </van-cell>
            <van-cell title="关于我们">
                <van-icon name="arrow" />
            </van-cell>
            <van-cell title="设置">
                <van-icon name="arrow" />
            </van-cell>
        </van-index-bar>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="less">
.account {
    .van-row {
        width: 90%;
        margin: 0 auto;
    }
    .van-index-bar__sidebar {
        display: none;
    }
    .van-cell__title {
        text-align: left;
    }
}
</style>
<style lang="less" scoped>
.top {
    width: 100%;
    height: 120px;
    background: url(../../assets/images/8@2x.png) no-repeat;
    background-size: cover;
    text-align: left;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 15px;
    img {
        width: 80px;
        vertical-align: middle;
    }
    .userName {
        display: inline-block;
        margin-left: 15px;
    }
}
</style>
