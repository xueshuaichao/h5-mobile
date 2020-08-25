<template>
  <div class="training-detail">
    <van-nav-bar
      title="培训详情"
      left-arrow
      right-text="学情报告"
      @click-left="handleClickNavLeft"
      @click-right="handleClickNavRight"
    />
    <train-item :show-bottom="false" :data="trainItem" class="card" />
    <van-tabs v-model="tabIndex" class="tabs">
      <van-tab title="培训内容">
        <div class="course-list">
          <div
            v-for="course in courseList"
            :key="course.id"
            class="course-item"
            @click="toDetail(course)"
          >
            <van-tag class="tag" type="primary">{{ course.tag }}</van-tag>
            <div class="title">{{ course.title }}</div>
            <div class="bottom clearfix">
              <div class="fl">
                <template
                  v-if="course.type === 'course' || course.type === 'homework'"
                >
                  已学<span class="em">{{ course.hours }}</span
                  >课/共{{ course.total_hours }}课
                </template>
                <template v-else>
                  {{ course.date }}
                </template>
              </div>
              <div class="fr">学时: {{ course.time }}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="互动专区">
        <div class="forum"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TrainItem from './components/train-item.vue';

const courseList = [
  {
    id: 1,
    type: 'course',
    tag: '课程',
    title: '钢筋现场验收重点',
    hours: 15,
    total_hours: 80,
    time: 0.5
  },
  {
    id: 2,
    type: 'live',
    tag: '直播',
    title: '钢筋原材验收4个要点',
    date: '2020.08.01',
    time: 0.5
  },
  {
    id: 3,
    type: 'homework',
    tag: '作业',
    title: '钢筋连接控制的4个要点',
    hours: 15,
    total_hours: 80,
    time: 0.5
  },
  {
    id: 4,
    type: 'exam',
    tag: '考试',
    title: '钢筋连接控制的4个要点',
    date: '2020.08.01',
    time: 0.5
  }
];

export default {
  components: {
    TrainItem
  },
  data() {
    return {
      tabIndex: 0,
      courseList,
      trainItem: {
        id: '1',
        title: '钢筋工培训班培训 - 第8期',
        date: '2020.08.01~2020.08.30',
        progress: 18,
        hours: 15,
        total_hours: 80,
        current: '课程： 1.2建设工程项目管理',
        state: 'end'
      }
    };
  },
  methods: {
    handleClickNavLeft() {
      this.$router.go(-1);
    },
    handleClickNavRight() {
      console.log('nav-right-click');
    },
    toDetail(course) {
      const map = {
        course: 'courseDetail',
        live: 'liveDetail',
        homework: 'homeworkDetail',
        exam: 'examDetail'
      };
      if (map[course.type]) {
        const location = {
          name: map[course.type],
          params: { id: course.id }
        };
        this.$router.push(location);
        console.log(location);
      } else {
        console.warn(`unreconginze course type "${course.type}"`);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.training-detail {
  font-size: 12px;
  background: #f4f4f4;
}
.card {
  margin: 8px 16px;
}
.tabs {
  background: #f7f7f7;
}
.course-list {
  padding: 16px;
}
.course-item {
  position: relative;
  margin-bottom: 16px;
  background: #fff;
  text-align: left;
  padding: 8px 16px;
  .title {
    font-weight: 500;
    font-size: 16px;
  }
  .tag {
    position: absolute;
    right: 0;
    top: 0;
    font-style: normal;
    padding: 3px 6px;
    border-radius: 999em 0 0 999em;
  }
  .bottom {
    margin-top: 32px;
  }
}
</style>
