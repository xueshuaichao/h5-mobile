<template>
  <div class="week-base-calendar">
    <div class="hd">
      <span>{{ currentWeek.title }}</span>
      <span class="fr" @click="showPicker=true">
        {{ currentWeek.stringRange }}
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="bd">
      <ul class="date-list">
        <li
          v-for="item in currentWeek.dates"
          :key="item.date"
          class="date-item"
          :class="item.classNames"
        >
          <i v-if="item.isToday" class="today">
            <van-icon name="success" />
          </i>
          <div class="date">{{ item.short }}</div>
          <div class="event-name">
            {{ item.event ? item.event.text : item.dateZh }}
          </div>
        </li>
      </ul>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="pickerData"
        :default-index="pickerIndex"
        @cancel="showPicker = false"
        @confirm="handleChangeWeek"
      />
    </van-popup>
  </div>
</template>

<script>
import { formatDate } from '../../../libs/utils';
export default {
  props: {
    events: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      weeks: [],
      currentWeek: {},
      today: formatDate(new Date(), 'yyyy-MM-dd'),
      showPicker: false
    };
  },
  computed: {
    pickerData() {
      return this.weeks.map(week => week.stringRange);
    },
    pickerIndex() {
      const index =  this.weeks.indexOf(this.currentWeek);
      return index > -1 ? index : 0;
    }
  },
  created() {
    var now = new Date();
    var day = now.getDay(); // 周几，0 ~ 6
    var msDate = 24 * 3600 * 1e3;
    var start = +now - (day - 1) * msDate;
    var end = start + 6 * msDate;
    this.weeks = [
      { title: '上周', ...this.generateWeek(start, end, -7) },
      { title: '本周', ...this.generateWeek(start, end, 0) },
      { title: '下周', ...this.generateWeek(start, end, 7) }
    ];
    this.currentWeek = this.weeks[1];
  },
  methods: {
    generateWeek(start, end, diffDay = 0) {
      const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
      const msDate = 24 * 3600 * 1e3;
      start = new Date(+start + diffDay * msDate);
      end = new Date(+end + diffDay * msDate);
      const dates = [];
      for (let i = +start, j = +end; i <= j; i += msDate) {
        let d = new Date(i);
        var s = formatDate(d, 'yyyy-MM-dd');
        var event = this.events.find(event => event.date == s);
        var classNames = [];
        if (event) {
          classNames.push('has-event');
          classNames.push(`event-${event.type}`);
        }
        dates.push({
          short: d.getDate(),
          date: s,
          event,
          dateZh: weekDays[d.getDay()],
          isToday: s === this.today,
          classNames: classNames
        });
      }
      return {
        stringRange: `${formatDate(start, 'MM.dd')}-${formatDate(
          end,
          'MM.dd'
        )}`,
        dates
      };
    },

    handleChangeWeek(value) {
      this.currentWeek = this.weeks.find(w => w.stringRange === value) || this.weeks[1];
      this.showPicker = false;
    }
  }
};
</script>

<style lang="less">
@import '../../../variables.less';

.week-base-calendar {
  padding-top: 8px; 
  border-radius: 4px;
  font-size: 13px;
  text-align: left;
  background: #fff;
  .hd {
    font-size: 15px;
    padding: 8px;
    color: #737386;
    .van-icon {
      vertical-align: -2px;
    }
  }
  .date-list {
    padding: 20px 0px 29px;
    display: flex;
    text-align: center;
  }
  .date-item {
    position: relative;
    flex: 1;
    margin-right: 9px;
    border-radius: 6;
    overflow: hidden;
  }
  .today {
    position: absolute;
    top: -12px;
    right: -12px;
    color: #fff;
    width: 24px;
    height: 24px;
    border-radius: 999em 6px 0 999em;
    background: @green;
    .van-icon {
      position: absolute;
      bottom: 0;
      left: 2px;
      font-size: 12px;
      transform: scale(0.7);
    }
  }
  .date-item:last-child {
    margin-right: 0;
  }
  .date {
    margin-top: 8px;
    font-size: 18px;
    font-weight: 400;
  }
  .event-name {
    padding: 6px 0 7px;
    font-size: 12px;
  }
  .has-event {
    background: #D2EADE;
  }
  .event-live {
    background: #E6E6EB;
  }
  .event-exam {
    background: rgba(246,114,84,0.3);
  }
}
</style>
