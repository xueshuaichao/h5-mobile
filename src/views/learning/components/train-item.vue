<template>
  <div class="train-item">
    <div class="main" :class="{ light: +data.id % 2 == 1}">
      <div class="info" @click="toDetail">
        <div class="title">{{ data.title }}</div>
        <div class="date">{{ data.date }}</div>
        <div class="progress">
          学习进度：{{ data.progress }}%
          <van-progress
            :percentage="data.progress"
            :show-pivot="false"
            color="#8CFEF3"
            track-color="#049E91"
          />
          <div class="clearfix" style="margin-top: 3px;text-align: right;">
            已学{{ data.hours }}/共{{ data.total_hours }}学时
          </div>
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
          <!-- <router-link
            class="link"
            :to="{ name: 'trainDetail', params: { id: data.id } }"
          >
            <van-icon name="arrow" />
          </router-link> -->
          <van-button
            type="primary"
            plain
            size="small"
            @click="toDetail"
          >
            查看详情
          </van-button>
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
  },
  methods: {
    toDetail() {
      this.$router.push({ 
        name: 'trainDetail', 
        params: { 
          id: this.data.id 
        }
      });
    }
  }
};
</script>

<style lang="less">
@import '../../../variables.less';

.train-item {
  background: #fff;
  text-align: left;
  box-shadow:0px 6px 16px 0px rgba(57,97,104,0.06);
  border-radius: 7px;
  overflow: hidden;
  .main {
    background: linear-gradient(116deg,rgba(44,193,171,1) 0%,rgba(2,169,159,1) 100%);
    &.light {
      background:linear-gradient(116deg,rgba(100,175,189,1) 0%,rgba(149,208,216,1) 100%);
    }
  }
  .info {
    padding: 16px;
    font-size: 11px;
    color: #fff;
    .van-progress {
      display: inline-block;
      width: 100px;
      height: 7px;
    }
    .date,
    .progress {
      margin-top: 10px;
    }
  }
  .title {
    font-size: 16px;
    font-weight: 600;
  }
  .em {
    font-size: 14px;
    color: @red;
  }
}

.train-item .flex-row {
  display: flex;
  .left {
    flex: 1;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
  }
  .chapter {
    margin-top: 4px;
    font-size: 13px;
    color: #575765;
    line-height: 22px;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
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
