<template>
    <div class="container learning-plan">
        <div class="learning-header">
            <div class="learning-nav">
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
        
        <div class="learning-tabs">
            <div 
                :class="['item', currentTab === i ? 'active' : '' ]" 
                v-for="(item, i) in tabs" 
                @click="handleClickTab(i)"
                :key="item"
            >
                <span>{{ item }}</span>
            </div>
        </div>

        <div class="tab-content">
            <task-list v-if="currentTab === 0 " ></task-list>
            <learning-list v-else/>
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
            list: [],
            tabs: ['任务', '选学'],
            learnData: '',
            currentTab: this.$route.params.currentTab || 0,
        }
    },
    
    created() { 
        this.getStatisticsOfLearn();
    },

    methods: {
        async getStatisticsOfLearn() {
            this.learnData = await api.getStatisticsOfLearn();
        },

        handleClickTab(index) {
            this.currentTab = index;
        }
    }
}
</script>

<style lang="less">
.learning-plan {
    padding: 0 32px;
    background: white!important;
    box-sizing: border-box;
    
    .learning-header {
        padding-top: 54px;
    }

    .learning-nav {
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

    .learning-tabs {
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
            color: #E85A3A;
        }

        .active::after {
            position: absolute;
            bottom: 0px;
            left: 50%;
            margin-left: -24px;
            content: '';
            width: 48px;
            height: 4px;
            background: #E85A3A;
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