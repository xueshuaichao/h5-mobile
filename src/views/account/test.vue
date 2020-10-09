<template>
    <div class="container">
        <van-nav-bar
            title="我的测试"
            left-arrow
            @click-left="$router.go(-1)"
        />
        <div class="content ">
            <div class="list">
                <div class="item" v-for="item in list" :key="item.paperId">
                    <div class="left"> 
                        <div class="title"> {{ item.sceneName }} </div>
                        <div class="time"> {{ item.commitTime }} </div>
                    </div>
                    <div class="button" @click="handleClickItem(item.paperId)">
                        查看
                    </div>
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
            api.getMyExam(this.params).then(({ total, list }) => {
                this.total = total;
                this.list = list;
            })
        },

        handleClickItem(id) {
            this.$router.push({
                path: '/result',
                query: {
                    id,
                },
            });
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
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    height: 160px;
    padding: 32px;
    margin-bottom: 32px;
    background: #FFFFFF;
    border-radius: 12px;
    box-sizing: border-box;
}
.left {
    text-align: left;
}
.title {
    margin-bottom: 16px;
    font-size: 32px;
    color: #272F55;
}
.time {
    font-size: 24px;
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
</style>