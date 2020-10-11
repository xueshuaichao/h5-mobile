<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div
        class="itemcontent"
        v-for="item in taskList"
        :key="item.id"
        @click="goDetail(item)"
      >
        <van-card
          :thumb="
            item.iconUrl
              ? item.iconUrl
              : 'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/fe174bd9e0b12d7b9115cabd44e1c656.jpg'
          "
        >
          <template #tags>
            <div class="title">
              <span id="title">{{ item.name }}</span>
              <van-tag round type="danger" class="tag" v-if="item.finishedPercent">NEW</van-tag>
            </div>
            <div class="progressflex">
              <van-progress
              id="progress"
              :percentage="item.finishedPercent * 100"
              :show-pivot="false"
              color="linear-gradient(90deg, #F74118 0%, #F5936C 100%)"
              />
              <span class="percent">{{item.finishedPercent * 100}}%</span>
            </div>
          </template>
          <template #footer>
            <div class="time">
              {{ item.applyStartTime | dataFormat }}-{{
                item.applyEndTime | dataFormat
              }}
            </div>
          </template>
        </van-card>
        <div class="line"></div>
      </div>
      
    </van-list>
  </van-pull-refresh>
</template>
<script>
import moment from "moment";
import api from "../../api/task.js";
export default {
  data() {
    return {
      taskList: [],
      loading: false,
      finished: false,
      error: false,
      pageNum: 1,
      pageSize: 5,
      refreshing: false
    };
  },
  props: {
    userTaskStatus: Number
  },
  methods: {
    getIndex(obj) {
      api
        .getMyTasks(obj)
        .then(res => {
          console.log(res);
          this.taskList = res.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goDetail(item) {
      if(!item.userApplyTaskDto){
        return
      }
      this.$router.push({
        path: "/taskdetail",
        query: {
          id:item.userApplyTaskDto.taskId
        }
      });
    },
    onLoad() {
        // var queryString = {
        //     userTaskStatus: this.userTaskStatus,
        //     newTask: 1,
        //     pageNum: this.pageNum,
        //     pageSize: this.pageSize
        // };
        var obj = {
            userTaskStatus: this.userTaskStatus,
            newTask: 1
        };
        // if (this.userTaskStatus == 0) {
        //     delete queryString.userTaskStatus;
        //     delete queryString.newTask;
        // }
        if (this.userTaskStatus == 0) {
            delete obj.userTaskStatus;
            delete obj.newTask;
        }
        console.log("onLoad");
        api.getMyTasks(obj)
        .then(res => {
            this.loading = false;
            this.refreshing=false 
            console.log("我的任务",res);
            console.log(res.total)
            /// 请求成功了，应该把接口的数据添加到this.tasklist
            // if(this.pageNum == 1){
            //     this.taskList=[]
            //     this.refreshing=false 
            // }
            this.taskList.push(...res);
            if (this.taskList.length == res.total || res.list.length == 0) {
                this.finished = true;
            }
            // this.pageNum++;
        })
        .catch(err => {
          //请求失败了，把loading改为false，进行错误提示。
          this.loading = false;
          this.refreshing=false 
          console.log(err);
          this.error = true;
        });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 refreshing 设置为 true，表示处于加载状态
      this.refreshing = true;
      this.error = false;
      // this.pageNum=1
      this.onLoad();
    }
  },
  filters: {
    dataFormat(val) {
      if (val) {
        return moment(val).format("YYYY.MM.DD HH:mm");
      }
    }
  }
};
</script> 
<style lang="less" scoped>
.itemcontent{
  height: 200px;  
  padding: 32px;
  background: #FFFFFF;
  .van-card{
    padding: 0px;
    background: #FFFFFF;
    .van-card__header{
     height: 68px       
    }
  }
}
.van-card__thumb{
  margin-right: 16px;
  width: 121px !important;
  height: 68px !important;
}
.title{
  height: 80px;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #272F55;
  line-height: 40px;
  text-align: left;
  .tag{
    margin-left: 20px;
    width: 64px;
    height: 24px;
    background: #E85A3A;
    border-radius: 12px;
  }
}
.progressflex{
  display: flex;
}
.van-card__content #progress{
  flex:1;
  margin-top: 18px;
  background: #E6E6EB;
  border-radius: 4px;
}
.progressflex .percent{
  margin-top: 22px;
  margin-left: 32px;
  width: 48px;
  height: 32px;
  font-size: 22px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #E85A3A;
  line-height: 32px;  
}
.van-card__footer{
  text-align: left;
}
.time{
    margin-top: 32px;
    width: 408px;
    height: 34px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737386;
    line-height: 34px;
  }
.line{
  width: 100%;
  height: 1px;
  margin-top: 26px;
  background-color: #E6E6EB;
}
</style>