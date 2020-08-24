<template>
  <div class="train-item van-hairline--surround">
    <div class="main">
      <div class="bg"></div>
      <div class="info">
        <div class="title">{{ data.title }}</div>
        <div class="date">{{ data.date }}</div>
        <div class="progress">
          <p>学习进度： {{ data.progress }}%</p>
          <van-progress :percentage="data.progress" />
          <p>
            已学<span class="em">{{ data.hours }}</span
            >/共{{ data.total_hours }}学时
          </p>
        </div>
      </div>
    </div>
    <div class="bottom van-hairline--top" v-if="data.current && showBotoom">
      <div class="flex-row">
        <div class="left">
          <div>正在学习</div>
          <div class="chapter">{{ data.current }}</div>
        </div>
        <div class="right">
          <router-link
            class="link"
            :to="{ name: 'trainDetail', params: { id: data.id } }"
          >
            <van-icon name="arrow" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true
    },
    showBotoom: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less">
@import '../../../variables.less';

.train-item {
  background: #fff;
  text-align: left;
  .info {
    padding: 16px;
    font-size: 12px;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
  }
  .em {
    font-size: 14px;
    color: @red;
  }
}

.train-item .flex-row {
  display: flex;
  font-size: 14px;
  .left {
    flex: 1;
    padding: 8px 16px;
  }
  .chapter {
    font-size: 16px;
    font-weight: 500;
  }
  .right {
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .link {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;
      border: 1px solid @gray-6;
      color: @gray-6;
    }
    .van-icon {
      vertical-align: middle;
    }
  }
}
</style>
