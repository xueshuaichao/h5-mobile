<template>
    <div class="assessment">
        <van-nav-bar
            title="个人评估"
            left-arrow
            @click-left="onClickLeft"
            right-text="分享"
            @click-right="onClickRight"
        />
        <div class="content">
            <p class="tip">
                <img src="../../assets/account/Hi _@2x.png" alt="39" srcset="">
                <br/>
                <span>{{ userInfo.name || '用户名' }}，</span>这是您的学习数据
            </p>

            <div class="score">
                <img src="../../assets/account/img.png" alt="">
                <div class="score-content">
                    <p>{{ learnData.score }}</p>
                    <div> <img src="../../assets/account/score.png" width="22" alt=""> 学分</div>
                </div>
            </div>

            <div class="learn-time">
                <div class="top bottom-line">
                    <div class="item">
                        <p>
                            <b>{{ learnData.todayLearnTime }}</b>小时
                        </p>
                        <p>今天学习</p>
                    </div>
                    <div class="item">
                        <p>
                            <b>{{ learnData.lastWeekLearnTime }}</b>小时
                        </p>
                        <p>上周学习</p>
                    </div>
                </div>
                <div class="top">
                    <div class="item">
                        <p>
                            <b>{{ learnData.lastMonthLearnTime }}</b>小时
                        </p>
                        <p>上月学习</p>
                    </div>
                    <div class="item">
                        <p>
                            <b>{{ learnData.totalLearnTime }}</b>小时
                        </p>
                        <p>累计学习</p>
                    </div>
                </div>
            </div>

            <div class="progress">
                <div class="item">
                    <p>任务进度</p>
                    <div class="item-body">
                        <van-progress :percentage="learnData.taskProgress" stroke-width="8" :show-pivot="false" />
                        <span class="text">{{ learnData.taskProgress }}%</span>
                    </div>
                </div>
                <div class="item">
                    <p>选学进度</p>
                    <div class="item-body">
                        <van-progress :percentage="learnData.electiveProgress" stroke-width="8" :show-pivot="false" />
                        <span class="text">{{ learnData.electiveProgress }}%</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 分享 -->
        <van-share-sheet
            v-model="showShare"
            title="分享"
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
                { name: '分享至好友/群', icon: require('../../assets/account/hy.png') },
                { name: '分享至朋友圈', icon: require('../../assets/account/py.png') },
            ],
        }
    },

    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },

    created() {
        this.getStatisticsOfLearn();
    },

    methods: {
        async getStatisticsOfLearn() {
            this.$loading();
            try {
                const res = await api.getStatisticsOfLearn();
                this.learnData = res; 
            }finally {
                this.$toast.clear();   
            }
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
    .content {
        padding: 0 32px;
    }

    .tip {
        text-align: left;
        margin-bottom: 40px;
        font-size: 32px;
        color: #737386;
        img {
            width: 78px;
            margin-bottom: 10px;
        }
    }

    .title{
        font-size: 26px;
    }

    .score {
        position: relative;
        left: -32px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        width: 750px;
        height: 200px;
        margin-bottom: 40px;
        // background-size: contain;
        
        & > img {
            width: 750px;
        }
        
        .score-content {
            position: absolute;
            width: 100%;
            left: 0;
            height: 100%;

            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            p {
                margin-bottom: 4px;
                font-size: 80px;
                color: #E85A3A;
            }

            div {
                font-size: 32px;
                color: #E85A3A;
            }

            img {
                width: 44px;
                vertical-align: middle;
            }
        }
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

    .learn-time {
        width: 100%;
        height: 300px;
        background: linear-gradient(90deg, #F5936C 0%, #F74118 100%);
        border-radius: 16px;

        .top {
            position: relative;
            display: flex;
            flex-flow: row;
            height: 50%;

            .item {
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                flex: 1;
                color: white;
                font-size: 24px;
                
                b {
                    font-size: 40px;

                }

                p:first-child {
                    margin-bottom: 10px;
                }
            }
        }
    }

    .bottom-line ::after{
        position: absolute;
        bottom: 0;
        left: 32px;
        display: block;
        content: '';
        width: 620px;
        height: 1px;
        background: rgba(255, 255, 255, 0.25);
    }

    .progress {
        .item {
            text-align: left;
            margin-top: 48px;
        }
        
        .item p {
            margin-bottom: 16px;
            font-size: 32px;
            color: #272F55;
        }

        .item-body {
            position: relative;
            width: 100%;
            height: 104px;
            padding: 0 32px;
            background: #FFFFFF;
            box-shadow: 0px 8px 30px 0px rgba(39, 47, 85, 0.06);
            border-radius: 24px;
            box-sizing: border-box;

            .text {
                position: absolute;
                right: 32px;
                line-height: 104px;
                font-size: 28px;
                color: #E85A3A;
            }

            .van-progress {
                display: inline-block;
                width: 240px;
                margin-top: 22px;
            }

        }

        .van-progress__portion {
            background: linear-gradient(90deg, #F74118 0%, #F5936C 100%); 
        }
    }

    .van-nav-bar__right .van-nav-bar__text {
        color: #E85A3A;
    }
}
</style>>