<template>
  <div class="geo-location">
    <van-nav-bar title="定位打卡" left-arrow @click-left="back"/>
    <div class="main">
      <div class="action" @click="clockIn" :class="{ disabled: !this.locationName }">
        <span class="action-name">{{ action }}</span>
        <div class="timer">{{ timer}}</div>
      </div>
      <p class="location">
        <van-icon name="location-o" />
        <template v-if="locationName">当前位置：{{ locationName }}</template>
        <template v-if="geoLocationError">获取位置失败</template>
        <a class="refresh" @click="getLocation">重新定位</a>
      </p>
    </div>
  </div>
</template>

<script>
import store from '../../store/index';
import { formatDate } from '../../libs/utils';

export default {
  data() {
    return {
      action: '上课打卡',
      locationName: '',
      timer: '',
      geoLocationError: false
    };
  },
  mounted() {
    this.startTimer();
    this.getLocation().then(() => console.log(this.locationName));
  },
  methods: {
    back() {
      if (this.$route.query.callback) {
        this.$router.replace(this.$route.query.callback);
      } else {
        this.$router.back();
      }
    },
    startTimer() {
      let timer = setInterval(() => {
        var now = new Date();
        this.timer = formatDate(now, 'hh:mm:ss');
      }, 1000);
      this.$on('hook:destroy', () => {
        clearInterval(timer);
      });
    },
    async getLocation() {
      // 非https或者定位失败一次后，给固定地址
      if (this.geoLocationError || location.protocol === 'http:') {
        this.geoLocationError = false;
        this.locationName = '北京市海淀区大钟寺';
        return ;
      }
      return new Promise((resolve, reject) => {
        console.time('geolocation')
        navigator.geolocation.getCurrentPosition((position) => {
          console.timeEnd('geolocation')
          var script = document.createElement('script');
          script.src = `https://api.map.baidu.com/geocoder/v2/?ak=8rEr39Tnu9ZsOnom2IRmivxktEzfWCxG&callback=jsonpCallback&location=${position.coords.latitude},${position.coords.longitude}&output=json`;
          window.jsonpCallback = function(json) {
            if (json.status == 0) {
              resolve(json.result.formatted_address);
            } else {
              reject();
            }
            window.jsonpCallback = null;
            document.head.removeChild(script);
          };
          document.head.appendChild(script);
        }, reject, {
          timeout: 5000,
          maximumAge: 20000
        });
      })
      .then(location => {
        this.locationName = location;
      })
      .catch(e => {
        console.warn(e);
        this.geoLocationError = true;
      });
    },
    clockIn() {
      if (!this.locationName) {
        return ;
      }
      if (this.$route.query?.from == 'practise') {
        // 实训打卡
        const type = this.$route.query?.type ?? 'start';
        store.commit('practiseSignIn', {
          [type]: formatDate(new Date(), 'yyyy-MM-dd hh:mm')
        });
        this.back();
      } else {
        // 培训
        //store.commit('clockIn');
        this.$router.push({
          name: 'faceDetect',
          query: {
            action: 'clockIn',
            ...this.$route.query
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
@import '../../variables.less';
.geo-location .main {
  position: absolute;
  top: 46px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  .action {
    width: 136px;
    height: 136px;
    padding-top: 50px;
    border-radius: 50%;
    background: @blue;
    color: #fff;
    box-sizing: border-box;
    &.disabled {
      opacity: .6;
    }
  }
  .action-name {
    font-size: 18px;
    font-weight: 400;
  }
  .timer {
    color: 14px;
  }
  .location {
    max-width: 80%;
  }
  .van-icon {
    vertical-align: -2px;
  }
  .refresh {
    color: @blue;
    margin-left: 8px;
  }
}
</style>
