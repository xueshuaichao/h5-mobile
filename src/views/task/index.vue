<template>
    <van-panel class="my-panel"> 
        <h2>我的任务</h2>
        <van-tabs v-model="active" @click="changeTab">
            <van-tab title="全部任务"> 
                <div v-for="item in allTaskList" :key="item.id" @click="goDetail(item.userApplyTaskDto.taskId)">
                    <van-card
                    :thumb="item.iconUrl?item.iconUrl:'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/fe174bd9e0b12d7b9115cabd44e1c656.jpg'"
                    >
                        <template #tags>
                            <div>
                                <span id="title">{{item.name}}</span>
                                <van-tag round type="danger">new</van-tag>
                            </div>
                            <van-progress id="progress" :percentage="33" :show-pivot="false" color="linear-gradient(90deg, #F74118 0%, #F5936C 100%)" /><span class="percent">33%</span>
                        </template>
                        <template #footer>
                            <p>{{item.applyStartTime | dataFormat}}-{{item.applyEndTime | dataFormat}}</p>
                        </template>
                    </van-card>
                </div>
                <!-- <van-card
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                >
                    <template #tags>
                        <div>
                            <span id="title">最强时间管理训练营时间管理训练营</span>
                        </div>
                        <van-progress id="progress" :percentage="33" :show-pivot="false" color="linear-gradient(90deg, #F74118 0%, #F5936C 100%)" /><span class="percent">33%</span>
                    </template>
                    <template #footer>
                        <p></p>
                    </template>
                </van-card>
                <van-card
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                >
                    <template #tags>
                        <div>
                            <span id="title">最强时间管理训练营时间管理训练营</span>
                        </div>
                        <van-progress id="progress" :percentage="0" :show-pivot="false" color="linear-gradient(90deg, #F74118 0%, #F5936C 100%)" /><span class="percent">0%</span>
                    </template>
                    <template #footer>
                        <p>2019.12.12 03:20 - 2020.12.14 03:20</p>
                    </template>
                </van-card> -->
            </van-tab>
            <van-tab title="进行中">
                <div v-for="item in loadTaskList" :key="item.id" @click="goDetail(item.userApplyTaskDto.taskId)">
                    <van-card
                    :thumb="item.iconUrl?item.iconUrl:'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/fe174bd9e0b12d7b9115cabd44e1c656.jpg'"
                    >
                        <template #tags>
                            <div>
                                <span id="title">{{item.name}}</span>
                                <van-tag round type="danger">new</van-tag>
                            </div>
                            <van-progress id="progress" :percentage="33" :show-pivot="false" color="linear-gradient(90deg, #F74118 0%, #F5936C 100%)" /><span class="percent">33%</span>
                        </template>
                        <template #footer>
                            <p>{{item.applyStartTime | dataFormat}}-{{item.applyEndTime | dataFormat}}</p>
                        </template>
                    </van-card>
                </div>
            </van-tab>
            <van-tab title="已通过">
                <div v-for="item in achTaskList" :key="item.id" @click="goDetail(item.userApplyTaskDto.taskId)">
                    <van-card
                    :thumb="item.iconUrl?item.iconUrl:'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/fe174bd9e0b12d7b9115cabd44e1c656.jpg'"
                    >
                        <template #tags>
                            <div>
                                <span id="title">{{item.name}}</span>
                                <van-tag round type="danger">new</van-tag>
                            </div>
                            <van-progress id="progress" :percentage="33" :show-pivot="false" color="linear-gradient(90deg, #F74118 0%, #F5936C 100%)" /><span class="percent">33%</span>
                        </template>
                        <template #footer>
                            <p>{{item.applyStartTime | dataFormat}}-{{item.applyEndTime | dataFormat}}</p>
                        </template>
                    </van-card>
                </div>
            </van-tab>
            <van-tab title="未通过">
                <div v-for="item in notTaskList" :key="item.id" @click="goDetail(item.userApplyTaskDto.taskId)">
                    <van-card
                    :thumb="item.iconUrl?item.iconUrl:'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/fe174bd9e0b12d7b9115cabd44e1c656.jpg'"
                    >
                        <template #tags>
                            <div>
                                <span id="title">{{item.name}}</span>
                                <van-tag round type="danger">new</van-tag>
                            </div>
                            <van-progress id="progress" :percentage="33" :show-pivot="false" color="linear-gradient(90deg, #F74118 0%, #F5936C 100%)" /><span class="percent">33%</span>
                        </template>
                        <template #footer>
                            <p>{{item.applyStartTime | dataFormat}}-{{item.applyEndTime | dataFormat}}</p>
                        </template>
                    </van-card>
                </div> 
            </van-tab>
        </van-tabs>
    </van-panel>
</template>
<script>
import moment from 'moment';
import api from '../../api/myitem.js';
export default {
    data() {
        return {
            active: 0,
            allTaskList:[],
            loadTaskList:[],
            achTaskList:[],
            notTaskList:[]
        }
    },
    created(){
        this.allGetIndex({
                    queryString:{pageNum:1,pageSize:5}
                })
    },
    methods:{
        allGetIndex(obj){
          api.getTasks(obj).then(res=>{
            console.log(res)
            this.allTaskList=res.list
        }).catch(err=>{
            console.log(err)
        })  
        },
        loadGetIndex(obj){
          api.getTasks(obj).then(res=>{
            console.log(res)
            console.log(111)
            this.loadTaskList=res.list
        }).catch(err=>{
            console.log(err)
        })  
        },
        achGetIndex(obj){
          api.getTasks(obj).then(res=>{
            console.log(res)
            console.log(222)
            this.achTaskList=res.list
        }).catch(err=>{
            console.log(err)
        })  
        },
        notGetIndex(obj){
          api.getTasks(obj).then(res=>{
            console.log(res)
            this.notTaskList=res.list
        }).catch(err=>{
            console.log(err)
        })  
        },
        goDetail(id){
            this.$router.push({
                path:"/mydetail",
                query:{
                    id
                }
            })
        },
        changeTab(name,title){
            console.log(this.active)
            console.log("name",name)
            console.log("title",title)
            if(this.active == 0){
                this.allGetIndex({
                    queryString:{pageNum:1,pageSize:5}
                })
            }else if(this.active == 1){
                this.loadGetIndex({
                    queryString:{userTaskStatus:1,newTask:1,pageNum:1,pageSize:5}
                })
            }else if(this.active == 2){
                this.achGetIndex({
                    queryString:{userTaskStatus:2,newTask:1,pageNum:1,pageSize:5}
                })
            }else if(this.active == 3){
                this.notGetIndex({
                    queryString:{userTaskStatus:3,newTask:1,pageNum:1,pageSize:5}
                })
            }
        }
    },
    filters:{
        dataFormat(val) {
            if(val){
                return moment(val).format('YYYY.MM.DD HH:mm')
            }
		}
    } 
}   
</script>
<style scoped lang="less">
.my-panel .van-cell {
    padding: 0;
    &::after {
        border: none;
    }
}
.van-card__content {
    text-align: left;
}
.van-card__content #title{
    width: 206px;
    height: 40px;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #272F55;
    line-height: 20px
}
.van-card__content #progress{
    display: inline-block;
    margin-top: 8px;
    width: 168px;
    height: 4px;
    background: #E6E6EB;
    border-radius: 2px;
}
.van-card__content .percent{
    width: 24px;
    height: 16px;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #E85A3A;
    line-height: 16px;
}
.van-card__footer p{
    width: 225px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737386;
    line-height: 17px;  
}
</style>