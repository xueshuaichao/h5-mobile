<template>
  <div class="face-detect">
    <van-nav-bar
      title="人脸识别"
      left-arrow
    />
    <div class="main">
      <div class="face-wrap">
        <div class="scan" :class="{ animate: this.cameraOpened }"/>
        <div class="detect-area">
          <video ref="video" muted playsinline x5-playsinline />
        </div>
      </div>
      <div class="tips">
        <h4>注意事项</h4>
        <p>1. 为了您的账户资金安全，请先进行验证；</p>
        <p class="last">2. 请本人亲自完成，将脸部至于提示框内，并按提示做动作。</p>
      </div>
      <div class="bottom">
        <van-button
          type="primary"
          block
          round
          @click="openCamera"
          :disabled="loading"
        >
          开始人脸识别
        </van-button>
        <p>查看用户授权协议 <a>《认证服务协议》</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index';
export default {
  data() {
    return {
      cameraOpened: false,
      loading: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.callback) {
        this.$router.replace(this.$route.query.callback);
      } else {
        this.$router.back();
      }
    },
    async openCamera() {
      this.loading = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1920,
            height: 1080,
            // 前置摄像头
            facingMode: 'user'
          }
        });
        this.$refs.video.srcObject = stream;
        await this.$refs.video.play();
        this.cameraOpened = true;
        // 3s后返回成功
        let timer = setTimeout(() => {
          this.cameraOpened = false;
          this.loading = false;
          store.commit('authed');
          this.back();
        }, 3000);
        this.$once('hook:beforeDestroy', () => {
          // 关闭摄像头
          stream.getTracks().forEach(track => track.stop());
          clearTimeout(timer);
        });
      } catch(e) {
        console.error(e);
        this.loading = false;
      }
    },
  }
};
</script>

<style lang="less">
@import '../../variables.less';
@keyframes slideDown {
  from {
    height: 100%;
  }
  to {
    height: 0%;
  }
}
.face-detect {
  text-align: left;
  .tips {
    margin: 0 15px 0;
    padding: 24px;
    background:rgba(249,250,253,1);
    border-radius:8px;
    font-size: 14px;
    color: #737386;
    h4 {
      font-size: 16px;
      font-weight: 500;
      color: #272F55;
      margin-top: 0
    }
    .last {
      margin-bottom: 0
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 16px;
    box-sizing: border-box;
    text-align: center;
    a {
      color: @blue;
    }
  }
}
.face-wrap {
  position: relative;
  width: 64%;
  height: 0;
  padding: 56.25% 0 0;
  margin: 48px auto;
  border: 1px dashed @gray-6;

  @border: 2px solid @green;
  &::after,
  &::before,
  .scan::before,
  .scan::after {
    content: ' ';
    position: absolute;
    width: 12px;
    height: 12px;
    box-sizing: border-box;
  }
  &::before {
    top: -2px;
    left: -2px;
    border-top: @border;
    border-left: @border;
  }
  &::after {
    top: -2px;
    right: -2px;
    border-top: @border;
    border-right: @border;
  }
  .scan::before {
    bottom: -2px;
    left: -2px;
    border-bottom: @border;
    border-left: @border;
  }
  .scan::after {
    bottom: -2px;
    right: -2px;
    border-bottom: @border;
    border-right: @border;
  }
  .scan {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56.25vw;
    border-top: 1px solid @green;
    background: rgba(0, 30, 0, 0.05);
    z-index: 1;
    &.animate {
      animation: slideDown 4s linear .5s infinite;
    }
  }  
  .detect-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>