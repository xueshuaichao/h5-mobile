<template>
    <div class="content">
        <h2 class="head">任务列表</h2>
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
                  v-for="(item ,index) in trainList"
                  :key="index"
                  @click="goDetail(item.id)"
                >
                    <van-card
                      :thumb="item.iconUrl?item.iconUrl:'https://mz-tet.oss-cn-beijing.aliyuncs.com/minzheng/image/114 (2).jpg'
                      "
                    >
                        <template #title>
                            <div class="title">
                            {{item.name}}
                            </div>
                        </template>
                        <template #desc>
                            <div class="time">
                                <div class="traintime">
                                    培训时间:{{item.applyStartTime | dataFormat}}
                                </div>
                                <div class="enlisttime">
                                    报名时间:{{item.trainStartTime | dataFormat}}
                                </div>
                            </div>
                        </template>
                        <template #tags>
                          <div class="title">
                            <van-tag round  plain type="danger" class="tag">限制人</van-tag>
                            <span class="subscribe">已预约人</span>
                          </div>
                        </template>
                    </van-card>
                    <div class="line"></div>
                </div>
            </van-list>
    </van-pull-refresh>
    </div>
</template>
<script>
import moment from "moment";
import api from '../../api/task.js'
export default {
    data(){
        return {
            trainList:[],
            loading: false,
            finished: false,
            error: false,
            refreshing: false,
            pageNum: 1,
            pageSize: 10,
        }
    },
    methods:{
        onLoad(){
            var queryString={
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
            this.loading = false;
            this.refreshing=false 
            api.getTasks({
                queryString:queryString
            }).then(res => {
                console.log(res)
                if(this.pageNum == 1){
                    this.taskList=[]
                    this.refreshing=false 
                }
                if (this.taskList.length == res.total){
                    this.error = false;
                    this.finished = true;
                }
                if (res.list){
                    this.trainList.push(...res.list)
                }
                this.pageNum++
            }).catch(error=>{
                console.log("加载很多内容",error)
                this.loading = false;
                this.refreshing=false
                this.error = true;
            })
        },
        onRefresh(){
            this.finished = false;
            // 重新加载数据
            // 将 refreshing 设置为 true，表示处于加载状态
            this.refreshing = true;
            this.error = false;
            this.pageNum=1
            this.onLoad();
        },  
        goDetail(id){
            this.$router.push({
                name:'trainDetail',
                query: {
                    id,
                }
            })
        }     
    },
    filters: {
    dataFormat(val) {
      if (val) {
        return moment(val).format("YYYY.MM.DD HH:mm");
      }
    }
  }
}
</script>
<style lang="less" scoped>
.content{
    padding: 0px 32px;
}
.head{
    height: 48px;
    font-size: 34px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #272F55;
    line-height: 48px;
}
.time{
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737386;
    line-height: 34px;
    text-align: left;
}
.title{
  text-align: left;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737386;
    line-height: 34px;
}
.tag{
    margin-top: 24px;
    width: 80px;
    height: 32px;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #E85A3A;
    line-height: 32px;
  }
.subscribe{
    float: right;
}
</style>