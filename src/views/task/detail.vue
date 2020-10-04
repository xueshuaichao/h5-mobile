<template>
    <div class="content" v-if="detObj">
        <span class="header">{{detObj.name}}</span>
        <van-notice-bar mode="link">
            共{{courseList.length}}个阶段，(已完成12%)
        </van-notice-bar>
        <div v-if="courseList">
            <div v-for="item in courseList" :key="item.id">
                <span id="step_one">{{detObj.stageDtos[0] ? detObj.stageDtos[0].stageName : "学习阶段"}}</span>&nbsp;<span class="class_hour">{{item.classHour?item.classHour:"3"}}课时</span>
                <van-cell-group>
                    <van-cell @click="goCourse(item.id)" class="study" :title="item.label" value="">
                        <template #icon>
                            <img class="courseImg" src="../../assets/task/course_one.png">
                        </template>
                        <template #right-icon>
                            <img class="courseStudy" src="../../assets/task/study.png">
                        </template>
                    </van-cell>
                    <van-cell :title="detObj.description">
                        <template #icon>
                            <img class="courseImg" src="../../assets/task/course_one.png">
                        </template>
                    </van-cell>
                    <van-cell @click="goTest(item.examType,item.scene)" :title="item.scene?item.scene.name:'考试名称'">
                        <template #icon>
                            <img class="courseImg" src="../../assets/task/test.png">
                        </template>
                        <template #label>
                            <div>
                                <span>考试时间：{{item.scene?item.scene.duration:"60"}}分钟</span>
                                <span>题数：{{item.scene?item.scene.totalCount:"100"}}题</span>
                                <span>满分：{{item.scene?item.scene.totalScore:"100"}}分</span>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
        <span id="step_two">阶段2</span>&nbsp;<span class="class_hour">3课时</span>
        <!-- <div class="content_two">
            <van-cell title="单元格" value="课程名称">
                <template #icon>
                    <img class="courseImg" src="../../assets/images/course_one.png">
                </template>
            </van-cell>
        </div>   -->
    </div> 
</template>
<script>
import api from '../../api/myitem.js'
export default {
    data(){
        return {
            detObj:null,
            courseList:null,
            sceneId:null
        }
    }, 
    created(){
        const id = this.$route.query.id
        this.getDetPage(id)
    },
    methods:{
        getDetPage(id){
            api.getDetail(id).then(res=>{
                console.log(res)
                this.detObj=res
                console.log("detObj",this.detObj)
                this.courseList=res.stageDtos[0].taskItems
                console.log("courseList",this.courseList)
            }).catch(err=>{
                console.log(err)
            })  
        },
        goCourse(id){
            this.$router.push({
                path: '/course/detail',
                query: {
                    id,
                },
            });
        },
        goTest(examType,scene){
            if(scene){
                this.sceneId=scene.id
            }
            if(examType === 0){
                this.$router.push({
                    path: '/answer',
                    query: {
                        sceneId:this.sceneId,
                    },
                });
            }else if(examType === 1){
                this.$router.push({
                    path: '/instructions',
                    query: {
                        id:this.sceneId,
                    },
                });
            }
            }
        }
    }
</script>
<style>
body{
    background: #F5F5FA;
}
.header {
    text-align: center;
    background-color: #FFFFFF;
    display: block;
    font-weight: 700;
    height: 88px;
    line-height: 88px;
    font-size: 34px;
}
.van-notice-bar{
    margin-bottom: 15px;
    width: 375px;
    height: 34px;
    background: rgba(232, 90, 58, 0.1);     
}
.van-cell-group{
    margin-left: 13px;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 343px;
    height: 211px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid white;
    border-radius:5px;
}

.content {
    text-align: left;
    margin-top: 0px;
}
.content_two .van-cell{
    margin-left: 13px; 
    margin-top: 15px;
    width: 343px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid white;
    border-radius:5px;
}
.content #step_one{
    margin-left: 32px;
    width: 120px;
    height: 25px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #272F55;
    line-height: 25px;
}
.content #step_two{
    margin-left: 32px;
    width: 47px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #272F55;
    line-height: 25px;
}
.courseImg{
    margin-top: 8px;
    margin-right: 32px;
    width: 28px;
    height: 28px;
    line-height: 24px;
}
.content .class_hour{
    width: 34px;
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737386;
    line-height: 18px; 
}
.study{
    position: relative;
}
.study .courseStudy{
    position: absolute;
    top:0px;
    right:0px
}
</style>