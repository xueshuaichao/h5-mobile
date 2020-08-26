<template>
    <div class="learning-home">
        <div class="page-title">学习中心</div>
        <week-base-calendar :events="events" />
        <van-tabs v-model="tab" color="#30BA8B" class="tabs" animated line-width="18">
            <van-tab title="学习中">
                <div class="train-list">
                    <train-item
                        v-for="(item, index) in undergoingTrains" 
                        :key="item.id"
                        :data="item"
                        :s="index % 2 == 0 ? 'style1': 'style2'" 
                    />
                </div>
            </van-tab>
            <van-tab title="全部">
                <div class="train-list">
                    <train-item v-for="(item, index) in trainData"
                        :key="item.id"
                        :data="item"
                        :s="index % 2 == 0 ? 'style1': 'style2'"
                    />
                </div>
            </van-tab>
            <van-tab title="已结束">
                <div class="train-list">
                    <train-item v-for="(item, index) in endedTrains"
                        :key="item.id"
                        :data="item"
                        :s="index % 2 == 0 ? 'style1': 'style2'"
                    />
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import TrainItem from "./components/train-item-image.vue";
import WeekBaseCalendar from "./components/week-base-calendar.vue";
import { createEvents } from "../../data/events";

const trainData = [
    {
        id: "0",
        title: "钢筋工培训班培训-第8期",
        date: "2020.08.01~2020.08.30",
        progress: 18,
        hours: 15,
        total_hours: 80,
        current: "课程： 1.2建设工程项目管理",
        state: "undergoing"
    },
    {
        id: "1",
        title: "钢筋工培训班培训-第9期",
        date: "2020.08.01~2020.08.30",
        progress: 18,
        hours: 15,
        total_hours: 80,
        current: "课程： 1.1建设工程项目管理",
        state: "undergoing"
    },
    {
        id: "2",
        title: "2021年北京线下企业管理培训-第9期",
        date: "2020.08.01~2020.08.30",
        progress: 18,
        hours: 15,
        total_hours: 80,
        current: "课程： 1.2建设工程项目管理",
        state: "ended"
    }
];

export default {
    components: {
        TrainItem,
        WeekBaseCalendar
    },
    data() {
        return {
            tab: 0,
            events: createEvents(),
            trainData
        };
    },
    computed: {
        endedTrains() {
            return this.trainData.filter(t => t.state === "ended");
        },
        undergoingTrains() {
            return this.trainData.filter(t => t.state === "undergoing");
        }
    }
};
</script>

<style lang="less">
.learning-home {
    background: #f9fafd;
    .page-title {
        background: #fff;
        font-weight:500;
        line-height: 33px;
        padding: 25px 16px 16px;
        font-size: 24px;
        text-align: left;
    }
    .tabs {
        margin-top: 14px;
        background: #fff;
    }
}
.train-list {
    margin: 24px 9px 8px;
    .train-item {
        margin-bottom: 15px;
    }
}
</style>
