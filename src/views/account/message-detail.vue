<template>
    <div class="container">
        <van-nav-bar
            title="我的消息"
            left-arrow
            @click-left="$router.go(-1)"
        />
        <div class="content">
            <div class="title">
                <img src="../../assets/account/message.png" alt="">
                <div class="text">
                    <p class="type">{{ info.typeName }}</p>
                    <p class="time"> {{ info.createTime }} </p>
                </div>
            </div>

            <div class="body">
                {{ info.content }}
            </div>
        </div>
    </div>    
</template>
<script>

export default {
    name: 'Test',
    data() {
        return {
            params: {
                pageNum: 1,
                pageSize: 10,
            },
            list: [],
            total: 0,
        }
    },
    
    computed: {
        info() {
            return this.$store.state.message 
        }
    },
}
</script>

<style lang="less" scoped>
.content {
    padding: 32px;
    background: white;
    height: 100%;
    text-align: left;
}

.title {
    display: flex;
    flex-flow: row;

    img {
        width: 44px;
        height: 44px;
        margin-right: 16px;
    }
}

.text {
    .type {
        font-size: 32px;
        color: #272F55;
        margin-bottom: 8px;
    }

    .time {
        font-size: 26px;
        color: #A7ADBB;
    }
}

.body {
    padding-top: 32px;
    font-size: 32px;
    color: #272F55;
}

</style>