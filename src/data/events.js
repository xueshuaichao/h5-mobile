import { formatDate } from '../libs/utils';

export const events = [
  { date: '2020-08-24', type: 'practise', text: '实训' },
  { date: '2020-08-26', type: 'live', text: '直播' },
  { date: '2020-08-27', type: 'exam', text: '考试' }
];

const TYPES = {
  practise: '实训',
  live: '直播',
  exam: '考试',
  homework: '作业'
};
// 生成最近三周数据
export function createEvents() {
  var now = new Date();
  var day = now.getDay(); // 周几，0 ~ 6
  var msDate = 24 * 3600 * 1e3;
  var start = +now - (day - 1) * msDate;
  var end = start + 6 * msDate;

  // 生成最近三周数据
  var dates = [
    ...generateWeek(start, end, -7),
    ...generateWeek(start, end),
    ...generateWeek(start, end, 7)
  ].filter((_, index) => {
    let i = index % 6;
    return i == 0 || i == 2 || i == 3;
  });
  var types = Object.keys(TYPES);
  var index = 0;
  return dates.map(item => {
      let type = types[index];
      index = (index + 1) % types.length;
      return {
        date: item,
        type,
        text: TYPES[type]
      }
    });
}

function generateWeek(start, end, diffDay = 0) {
  const msDate = 24 * 3600 * 1e3;
  start = new Date(+start + diffDay * msDate);
  end = new Date(+end + diffDay * msDate);
  const dates = [];
  for (let i = +start, j = +end; i <= j; i += msDate) {
    let d = new Date(i);
    var s = formatDate(d, 'yyyy-MM-dd');
    dates.push(s);
  }
  return dates;
}