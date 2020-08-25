<template>
  <div class="course-detail">
    <van-nav-bar :title="course.title" left-arrow @click-left="back" />
    <div class="player">
      <img class="cover" :src="course.cover" />
    </div>
    <van-tabs v-model="tabIndex" class="tabs">
      <van-tab title="目录">
        <div class="progress">
          <div class="progress-inner" :style="{ width: progress + '%' }">
            <div v-if="progress > 20">已学{{ progress }}%</div>
          </div>
        </div>
        <div class="chapters">
          <div v-for="item in course.chapters" :key="item.id" class="level1">
            <p>{{ item.title }}</p>
            <ul class="level2">
              <li v-for="chapter in item.children" :key="chapter.id">
                <div>
                  {{ chapter.title }}
                  <span class="green fr">{{ chapter.progress }}%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="简介">
        {{ course.description }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
const chapters = [
  {
    id: '1',
    title: '第一章 钢筋现场验收重点',
    children: [
      {
        id: 'chapter_1_1',
        type: 'video',
        title: '01 什么是钢筋',
        progress: 100
      },
      {
        id: 'chapter_1_2',
        type: 'video',
        title: '02 钢筋的用途',
        progress: 100
      },
      {
        id: 'chapter_1_3',
        type: 'video',
        title: '03 钢筋的用途',
        progress: 100
      },
      {
        id: 'chapter_1_4',
        type: 'homework',
        title: '04 章节作业',
        progress: 100
      }
    ]
  },
  {
    id: '2',
    title: '第二章 钢筋现场验收',
    children: [
      {
        id: 'chapter_2_1',
        type: 'video',
        title: '01 什么是钢筋',
        progress: 20
      },
      {
        id: 'chapter_2_2',
        type: 'video',
        title: '02 钢筋的用途'
      },
      {
        id: 'chapter_2_3',
        type: 'video',
        title: '03 钢筋的用途'
      },
      {
        id: 'chapter_3_4',
        type: 'homework',
        title: '04 章节作业'
      }
    ]
  }
];
export default {
  data() {
    return {
      tabIndex: 0,
      course: {
        title: '钢筋现场验收重点',
        cover: '',
        chapters,
        description: ''
      },
      progress: 38
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
@import '../../variables.less';
.course-detail {
  text-align: left;
  background: #f4f4f4;
}
.player {
  padding: 8px 16px 16px;
}
.cover {
  width: 100%;
  height: 70vw;
}
.tabs {
  background: #fff;
}
.chapters {
  padding: 0 16px;
  font-size: 12px;
}
.green {
  color: @green;
}
.progress {
  width: 80%;
  margin: 16px auto;
  background: #f1f1f1;
  height: 12px;
  font-size: 12px;
  line-height: 1;
  border-radius: 6px;
  text-align: center;
  .progress-inner {
    background: @green;
    border-radius: 6px;
    color: @white;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
