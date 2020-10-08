<template>
    <div class="system-task-wrap">
        <van-row>
            <van-col span="8" class="t-left p-title">培训任务</van-col>
            <van-col span="8" offset="8" class="t-right more" @click="jumpMore">
                更多
                <van-icon name="arrow" size="12"/>
            </van-col>
        </van-row>
        <van-row 
            v-for="(item, index) in list"
            :key="index"
            class="item-row"
        >
            <van-row class="s-item-row">
                <van-col span="8" class="t-left">
                    <van-image
                        class="img"
                        :src="item.iconUrl || 'https://img.yzcdn.cn/vant/cat.jpeg'"
                    >
                        <template v-slot:error>加载失败</template>
                </van-image>
                </van-col>
                <van-col span="16" class="t-left">
                    <p class="item-title van-ellipsis">{{item.name}}</p>
                    <p class="item-time">{{item.applyStartTime | dataFormat}}</p>
                    <p class="item-time">{{item.applyEndTime| dataFormat }}</p>
                </van-col>
                <van-col span="16" class="item-join">
                    <van-col span="12 t-left">
                        <div class="item-limit">限100人</div>
                    </van-col>
                    <van-col span="12" class="t-right count">已约{{item.applyCount}}</van-col>
                </van-col>
                
            </van-row>
            <div class="van-hairline--bottom" v-if="index !== list.length-1"></div>
        </van-row>
        <p class="tip">—— 我们是有底线的 ——</p>
    </div>
</template>
<script>
import api from '../../api/myitem.js'
import moment from 'moment';
export default {
    filters: {
        dataFormat(val) {
            if(val){
                return moment(val).format('YYYY.MM.DD HH:mm')
            }
		}
    },
    data() {
        return {
            list: [],
            filter: {
                queryString: {
                    pageNum: 1,
                    pageSize: 6,
                },
            },
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            api.getTasks(this.filter).then(({list}) => {
                if (list) {
                    this.list = list;
                }
            })
        },
        jumpMore() {
            this.$router.push({
                path: '/myitem'
            })
        },
    }
}
</script>
<style scoped lang="less">
.system-task-wrap {
    padding: 20px 32px 0;
    .p-title {
        color: #272F55;
        font-size: 34px;
        line-height: 48px;
        font-weight: 500;
    }
    .t-left {
        text-align: left;
    }
    .t-right {
        text-align: right;
    }
    .more {
        color: #A7ADBB;
        font-size: 24px;
        line-height: 48px;
        text-indent: -2px;
        .van-icon {
            bottom: -2px;
        }
    }
    .img {
        width: 200px;
        height: 114px;
        margin-right: 24px;
    }
    .item-title {
        color: #272F55;
        font-size: 30px;
        line-height: 42px;
        font-weight: 500;
    }
    .s-item-row {
        margin-top: 40px;
        padding-bottom: 38px;
    }
    .item-time {
        color: #737386;
        font-size: 24px;
        line-height: 34px;
        margin-top: 8px;
    }
    .count {
        color: #A7ADBB;
        font-size: 22px;
        line-height: 32px;
    }
    .item-join {
        margin-top: 26px;
    }
    .item-limit {
        line-height: 36px;
        padding: 0 8px;
        border: 1px solid #E85A3A;
        border-radius: 4px;
        color: #E85A3A;
        font-size: 22px;
        display: inline-block;
    }
    .tip {
        text-align: center;
        color: #6D6D80;
        font-size: 24px;
        line-height: 120px;
    }
}
</style>