<template>
    <div class="container">
        <van-nav-bar
            title="我的消息"
            left-arrow
            @click-left="$router.go(-1)"
        />
        <div class="content ">
            <div class="list">
                <div class="item" v-for="item in list" :key="item.id" @click="handleClickItem(item)">
                    <div class="title">
                        <div class="img">
                            <img src="../../assets/account/message.png" alt="" width="22">
                            
                            <!-- status 0 未读 1 已读 -->
                            <div class="dot" v-if="item.status === 0">
                                <div></div>
                            </div>
                        </div>
                        {{ item.typeName }}
                    </div>
                    
                    <p class="body van-multi-ellipsis--l2">
                        {{ item.content }}
                    </p>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import api from '@/api/account';

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

    created() {
        this.getList();
    },

    methods: {
        getList() {
            api.getMessageList(this.params).then(({ total, list }) => {
                this.total = total;
                this.list = list;
            })
        },

        handleClickItem(item) {
            this.$router.push({
                path: `/message/${item.id}`,
            });

            this.$store.commit('setMessage', item)
        }
    }, 


}
</script>

<style lang="less" scoped>
.content {
    padding: 32px;
    margin-top: 0;
}
.list .item{
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    min-height: 164px;
    padding: 32px;
    margin-bottom: 24px;
    background: #FFFFFF;
    border-radius: 12px;
    box-sizing: border-box;
}
.left {
    text-align: left;
}
.title {
    display: flex;
    flex-flow: row;
    align-items: center;

    margin-bottom: 32px;
    text-align: left;
    font-size: 32px;
    color: #272F55;
}
.body {
    text-align: left;
    font-size: 28px;
    color: #737386;
}
.button {
    width: 128px;
    height: 64px;
    text-align: center;
    line-height: 64px;
    border-radius: 12px;
    border: 1px solid #E85A3A;
    font-size: 28px;
    color: #E85A3A;
}
.img {
    position: relative;
    width: 44px;
    height: 44px;
    margin-right: 16px;
    img {
        width: 44px;
    }
}
.dot {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    background: #FFF1ED;
    border-radius: 50%;

    div {
        width: 12px;
        height: 12px;
        margin: 4px;
        background: #E85A3A;
        border-radius: 50%;
    }
}
</style>