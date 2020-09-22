<template>
    <div class="container learning-plan">
        <div class="header">
            <div class="nav">
                <p>学习计划</p>
                <van-icon name="setting-o" @click="show = !show"/>
            </div>
            <p class="tip">
                Hi又是美好的一天
            </p>
            <van-row class="learn-count">
                <van-col span="8">
                    <p>{{ learnData.todayLearnTime }} 小时</p>
                    <p>今天学习</p>
                </van-col>
                <van-col span="8">
                    <p>{{ learnData.totalLearnTime }} 小时</p>
                    <p>学习总时长</p>
                </van-col>
                <van-col span="8">
                    <p>{{ learnData.score }}</p>
                    <p>获得学分</p>
                </van-col>
            </van-row>
        </div>

        <van-tabs v-model="active">
            <van-tab title="任务">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div v-for="item in list" :key="item.id" class="item van-hairline--bottom">
                        <div class="task-info">
                            <div class="img">
                                <img :src="item.img" alt="" srcset="">
                            </div>
                            <div class="info">
                                <p class="title van-ellipsis">
                                    {{ item.name }}
                                </p>
                                <div class="progress">
                                    <van-progress :percentage="50" :show-pivot="false" />
                                    <span>2%</span>
                                </div>
                            </div>    
                        </div>
                        <div class="task-time">
                            {{ item.trainStartTime }} - {{ item.trainEndTime }}
                        </div>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="选学">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div v-for="item in list" :key="item.id" class="item van-hairline--bottom">
                        <div class="task-info">
                            <div class="img">
                                <img :src="item.img" alt="" srcset="">
                            </div>
                            <div class="info">
                                <p class="title van-ellipsis">
                                    {{ item.name }}
                                </p>
                                <div class="progress">
                                    <van-progress :percentage="50" :show-pivot="false" /> <span>2%</span>
                                </div>
                            </div>    
                        </div>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>

        <!-- 任务筛选 -->
        <van-popup v-model="show" position="right" :style="{ width: '80%', height: '100%' }">
            
            <div class="screen-wrap" v-if="active === 0">
                <div class="title">任务筛选</div>
                <div class="screen-body">

                    <div class="screen-item">
                        <p>培训状态</p>

                        <van-radio-group v-model="radio">
                            <van-radio name="1">全部</van-radio>
                            <van-radio name="2">进行中</van-radio>
                            <van-radio name="3">已通过</van-radio>
                            <van-radio name="4">未通过</van-radio>
                        </van-radio-group>
                    </div>
                </div>

                <div class="screen-footer">
                    <p>清空筛选</p>
                    <van-button type="info">确定</van-button>
                </div>
            </div>

                  
            <div class="screen-wrap" v-if="active === 1">
                <div class="title">课程筛选</div>
                <div class="screen-body">

                    <div class="screen-item">
                        <p>选择状态</p>

                        <van-radio-group v-model="radio">
                            <van-radio name="1">全部</van-radio>
                            <van-radio name="2">进行中</van-radio>
                            <van-radio name="3">已完成</van-radio>
                        </van-radio-group>
                    </div>
                    <div class="screen-item">
                        <p>内容类型</p>

                        <van-radio-group v-model="radio">
                            <van-radio name="1">全部</van-radio>
                            <van-radio name="2">视频</van-radio>
                            <van-radio name="3">音频</van-radio>
                            <van-radio name="4">文档</van-radio>
                        </van-radio-group>
                    </div>
                </div>

                <div class="screen-footer">
                    <p>清空筛选</p>
                    <van-button type="info">确定</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import api from '@/api/learning';

export default {
    name: 'LearningPlan',

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
                pageNum: 1,
                pageSize: 10,
                status: 1,
            }
        }
    },
    
    created() {
        this.getStatisticsOfLearn();
        this.getTaskList();
    },

    methods: {
        onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            // setTimeout(() => {
            //     for (let i = 0; i < 10; i++) {
            //     this.list.push(this.list.length + 1);
            //     }

            //     // 加载状态结束
            //     this.loading = false;

            //     // 数据全部加载完成
            //     if (this.list.length >= 40) {
            //     this.finished = true;
            //     }
            // }, 1000);
        },

        async getTaskList() {
            const res = await api.getTaskList(this.params);
            console.log(res);
        },

        async getStatisticsOfLearn() {
            this.learnData = await api.getStatisticsOfLearn();
        }
    }
}
</script>

<style lang="less">
.learning-plan {
    .header {
        height: 300px;
        padding: 0 30px;
        background: #1989fa;
    }

    .nav {
        display: flex;
        flex-flow: row;
        height: 80px;
        align-items: center;
        font-size: 28px;
        color: white;
        justify-content: space-between;
    }

    .tip {
        text-align: left;
        color: white;
        margin: 0;
    }

    .learn-count {
        margin-top: 20px;
        color: white;
        p {
            margin: 10px 0;
        }
    }

    .task-info {
        display: flex;
        flex-flow: row;
        align-items: center;
        .img {
            margin-right: 20px;

            img {
                width: 200px;
                height: 100px;
            }
        }

        .info {
            flex: 1;
            display: flex;
            flex-flow: column;
            height: 100px;
            justify-content: space-between;
            p {
                align-self: flex-start;
                margin: 0;
            }
        }
    }

    .task-time {
        margin-top: 10px;
        text-align: left;
    }

    .van-list {
        padding: 0 30px;
        background: white;
        .item {
            padding: 20px 0;
        }
    }

    .progress {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;

        .van-progress {
            flex-grow: 1;
            margin-right: 10px;
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