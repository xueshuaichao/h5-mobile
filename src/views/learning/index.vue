<template>
  <div class="learing-index">
    <van-nav-bar title="学习中心" />
    <!-- <van-calendar
      title="日历"
      :poppable="false"
      :show-confirm="false"
      :formatter="dayFormatter"
      style="height: 410px"
    /> -->
    <week-base-calendar :events="events" />
    <van-tabs v-model="tab">
      <van-tab title="正在进行">
        <div class="train-list">
          <train-item
            v-for="item in undergoingTrains"
            :key="item.id"
            :data="item"
          />
        </div>
      </van-tab>
      <van-tab title="全部">
        <div class="train-list">
          <train-item v-for="item in trainData" :key="item.id" :data="item" />
        </div>
      </van-tab>
      <van-tab title="已结束">
        <div class="train-list">
          <train-item v-for="item in endedTrains" :key="item.id" :data="item" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TrainItem from './components/train-item.vue';
import WeekBaseCalendar from './components/week-base-calendar.vue';

const events = [
  { date: '2020-08-24', type: '', text: '实训' },
  { date: '2020-08-26', type: '', text: '直播' },
  { date: '2020-08-27', type: '', text: '考试' }
];
const trainData = [
  {
    id: '1',
    title: '钢筋工培训班培训 - 第8期',
    date: '2020.08.01~2020.08.30',
    progress: 18,
    hours: 15,
    total_hours: 80,
    current: '课程： 1.2建设工程项目管理',
    state: 'end'
  },
  {
    id: '2',
    title: '钢筋工培训班培训 - 第8期',
    date: '2020.08.01~2020.08.30',
    progress: 18,
    hours: 15,
    total_hours: 80,
    current: '课程： 1.2建设工程项目管理',
    state: 'undergoing'
  }
];
function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return String(number);
}
export default {
  components: {
    TrainItem,
    WeekBaseCalendar
  },
  data() {
    return {
      tab: 0,
      events,
      trainData
    };
  },
  computed: {
    endedTrains() {
      return this.trainData.filter(t => t.state === 'end');
    },
    undergoingTrains() {
      return this.trainData.filter(t => t.state === 'undergoing');
    }
  },
  methods: {
    dayFormatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      const dateStr = pad(month) + '-' + pad(date);

      const event = events.find(e => e.date === dateStr);
      if (event) {
        day.bottomInfo = event.text;
        day.className = 'day-' + event.type;
      }
      return day;
    }
  }
};
</script>

<style lang="less">
.train-list {
  margin: 8px 16px;

  .train-item {
    margin-bottom: 10px;
  }
}
</style>
