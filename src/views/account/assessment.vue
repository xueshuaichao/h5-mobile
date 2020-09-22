<template>
    <div class="container assessment">
        <van-nav-bar
            title="个人评估"
            left-arrow
            @click-left="onClickLeft"
            right-text="分享"
            @click-right="onClickRight"
        />
        <div class="content">
            <p class="tip">Hi,这是您的学习数据</p>
            <van-grid :column-num="5">
                <van-grid-item>
                    <p class="title">今天学习</p>
                    <p class="num">{{learnData.todayLearnTime}}小时</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="title">上周学习</p>
                    <p class="num">{{ learnData.lastWeekLearnTime }}小时</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="title">上月学习</p>
                    <p class="num">{{ learnData.lastMonthLearnTime }}小时</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="title">累计学习</p>
                    <p class="num">{{ learnData.totalLearnTime }}小时</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="title">学分</p>
                    <p class="num">{{ learnData.score }}</p>
                </van-grid-item>
            </van-grid>

            <div class="progress">
                <p>任务进度</p>
                <van-progress :percentage="learnData.taskProgress" stroke-width="8" />
                <p>选学进度</p>
                <van-progress :percentage="learnData.electiveProgress" stroke-width="8" />
            </div>
        </div>

        <!-- 分享 -->
        <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
        />

        
    </div>
</template>
<script>
import { Toast } from 'vant';
import api from '@/api/account';

export default {
    name: 'Assessment',
    data() {
        return {
            showShare: false,
            learnData: {
                todayLearnTime: 99,// 今日学长
                lastWeekLearnTime: 150, // 上周学长
                lastMonthLearnTime: 251, // 上月学长
                totalLearnTime: 100,//总学长
                score: 10.2,// 学分
                taskProgress: 30,// 任务进度
                electiveProgress: 40 // 选学进度
            },
            options: [
                { name: '分享至好友/群', icon: 'wechat' },
                { name: '分享至朋友圈', icon: 'weibo' },
            ],
        }
    },

    created() {
        this.getStatisticsOfLearn();
    },

    methods: {
        async getStatisticsOfLearn() {
            const res = await api.getStatisticsOfLearn();
            this.learnData = res; 
        },

        onClickLeft() {
            this.$router.go(-1);
        },

        onClickRight() {
            this.showShare = true;
        },

        onSelect(option) {
            Toast(option.name);
            this.showShare = false;
        },
    }
}
</script>
<style lang="less">

.assessment {
    .tip {
        text-align: left;
        padding: 0 30px;
    }
    .title{
        font-size: 26px;
    }
    .van-grid-item__content {
        padding: 0; 
    }

    .progress {
        padding: 0 30px;
        & > p{
            text-align: left;
        }
    }
}
</style>>