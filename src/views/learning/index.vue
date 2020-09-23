<template>
    <div class="container learning-plan">
        <div class="header">
            <div class="nav">
                <img src="../../assets/learning/xx.png" alt="" width="81">
                <img src="../../assets/learning/sx.png" alt="" srcset="" width="20" @click="$router.push({ name: 'screenList', params: { type: currentTab }})">
            </div>
            <p class="tip">
                <img src="../../assets/learning/hi.png" width="146" alt="">
            </p>
            <van-row class="learn-count">
                <van-col span="8">
                    <p> <b>{{ learnData.todayLearnTime }}</b> 小时</p>
                    <p>今天学习</p>
                </van-col>
                <van-col span="8">
                    <p><b>{{ learnData.totalLearnTime }} </b>小时</p>
                    <p>学习总时长</p>
                </van-col>
                <van-col span="8">
                    <p><b>{{ learnData.score }}</b></p>
                    <p>获得学分</p>
                </van-col>
            </van-row>
        </div>
        
        <div class="tabs">
            <div class="item" :class="currentTab === 0 && 'active'" @click="handleClickTab(0)">
                <span>任务</span>
            </div>
            <div class="item" :class="currentTab === 1 && 'active'" @click="handleClickTab(1)">
                <span>选学</span>
            </div>
        </div>

        <div class="tab-content">
            <task-list v-if="currentTab === 0 " :params="{ status: params.status }"></task-list>
            <learning-list :params="params" v-else/>
        </div>
    </div>
</template>

<script>
import api from '@/api/learning';
import TaskList from '@/blocks/task/list.vue';
import LearningList from '@/blocks/task/learning.vue';

export default {
    name: 'LearningPlan',

    components: {
        TaskList,
        LearningList,
    },

    data() {
        return {
            active: 0,
            loading: false,
            show: false,
            list: [
                {
                    id: 1,
                    img: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    name: '任务一',
                    progress: 96,
                    trainStartTime: 2020,
                    trainEndTime: 2021,
                }
            ],
            finished: true,
            radio: '1',
            learnData: '',
            params: {
                status: 0,
                contentType: 0,
            },
            currentTab: this.$route.params.currentTab || 0,
        }
    },
    
    created() {
        const { status = 0, contentType = 0 } = this.$route.params;
        
        this.params = { status, contentType };    
        this.getStatisticsOfLearn();
    },

    methods: {
        async getStatisticsOfLearn() {
            this.learnData = await api.getStatisticsOfLearn();
        },

        handleClickTab(index) {
            this.currentTab = index;
            
            this.params = {
                status: 0,
                contentType: 0,
            };
        }
    }
}
</script>

<style lang="less">
.learning-plan {
    padding: 0 32px;
    background: white!important;
    box-sizing: border-box;
    
    .header {
        padding-top: 54px;
    }

    .nav {
        display: flex;
        flex-flow: row;
        height: 80px;
        margin-bottom: 10px;
        align-items: center;
        font-size: 28px;
        color: black;
        justify-content: space-between;
    }

    .tip {
        font-size: 32px;
        color: #737386;
        text-align: left;
    }

    .learn-count {
        margin-top: 24px;
        height: 160px;
        color: white;                
        background: linear-gradient(135deg, #FF8555 0%, #FA5A30 39%, #F74118 100%);
        box-shadow: 8px 8px 20px 0px rgba(232, 90, 58, 0.15);
        border-radius: 24px;

        .van-col {
            display: flex;
            flex-flow: column;
            justify-content: center;
            height: 100%;

            b {
                font-size: 20px;
            }

            p {
                font-size: 12px;
            }
            
            p:first-child {
                margin-bottom: 8px;
            }
            
        }
    }

    .tabs {
        display: flex;
        flex-flow: row;
        margin-top: 64px;
        height: 60px;

        .item {
            flex: 1;
            height: 100%;
            font-size: 32px;
            color: #A7ADBB;
        } 

        .active {
            position: relative;
            color: #272F55;
        }

        .active::after {
            position: absolute;
            bottom: 0px;
            left: 50%;
            margin-left: -24px;
            content: '';
            width: 48px;
            height: 4px;
            background: #272F55;
            border-radius: 2px;

        }
    }

    .screen-wrap {
        padding: 30px;
    }

    .screen-body {
        text-align: left;;
    }

    .screen-footer {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
    }

}
</style>>