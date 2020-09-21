<template>
    <div class="container">
        <van-nav-bar
            title="设置"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="content">
            <van-cell-group>
                <van-cell title="姓名" is-link url="/setting/name" />
                <van-cell title="修改头像" is-link url="/setting/photo"/>
                <van-cell title="修改密码" is-link url="/setting/password"/>
                <van-cell title="修改手机号" is-link url="/setting/phone"/>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
// import api from '../../api/account';

export default {
    name: 'Setting',
    
    methods: {
       onClickLeft() {

       },
       
       
    },
}   
</script>

<style lang="less" scoped>
.list {

}

.item {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    height: 70px;
    line-height: 70px;
    padding: 0 15px;
    background: pink;
}
</style>