<template>
  <div class="week-base-calendar van-hairline--surround">
    <div class="hd van-hairline--bottom">
      <span>{{ currentWeek.title }}</span>
      <span class="fr">{{ currentWeek.stringRange }}</span>
    </div>
    <div class="bd">
      <ul class="date-list">
        <li
          v-for="item in currentWeek.dates"
          :key="item.date"
          class="date-item"
          :class="item.classNames"
        >
          <span class="date">{{ item.short }}</span>
          <div class="event-name">
            {{ item.event ? item.event.text : item.dateZh }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
function formatDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
}
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
      currentWeek: {}
    };
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
        dates.push({
          short: d.getDate(),
          date: s,
          event,
          dateZh: weekDays[d.getDay()],
          classNames: event ? ['has-event', 'event-' + event.type] : undefined
        });
      }
      return {
        stringRange: `${formatDate(start, 'MM.dd')} ~ ${formatDate(
          end,
          'MM.dd'
        )}`,
        dates
      };
    }
  }
};
</script>

<style lang="less">
@import '../../../variables.less';

.week-base-calendar {
  margin: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  text-align: left;
  .hd {
    padding: 8px;
  }
  .date-list {
    padding: 8px 16px;
    display: flex;
    text-align: center;
  }
  .date-item {
    flex: 1;
  }
  .event-name {
    padding: 6px 0 2px;
    font-size: 12px;
  }
  .has-event {
    background: @blue;
    color: #fff;
  }
}
</style>
