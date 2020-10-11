<template>
    <div class="courseDetail">
        <div class="courseDetail-header">
            <h3>{{courseInfo.name}}</h3>
        </div>
        <div class="courseDetail-player">
            <img v-if="!hasresourceURl" :src="courseInfo.picUrl" alt="" />
            <div
                v-if="hasvideo"
                id="player-con"
                style="height: 233px"
            />
            <iframe v-if="ispdf" :src="pdfurl" style="width: 100%;height: 233px;position: absolute; left: 0px"/>
            <!-- <span class="detail-fenlei">
                {{courseInfo.categoryName}}
            </span> -->
            <div class="train-duration"><span>培训周期:{{courseInfo.trainStartTime | dataFormat}} - {{courseInfo.trainEndTime | dataFormat}}</span></div>
        </div>
        <div class="courseDetail-content">
            <div class="peixun-content">
                <p>培训内容</p>
                <div v-for="(item,index) in trainContent" :key="index" class="content-item" @click="handleRouterJump(item)">
                    <span>{{item.type === 'course' ? '课程' : '考试'}}</span>{{item.label}}
                </div>
            </div>
            <div class="baoming-content">
                <p>报名信息</p>
                <div class="content-item">
                    <span>报名时间</span>{{courseInfo.applyStartTime | dataFormat}} - {{courseInfo.applyEndTime | dataFormat}}
                </div>
                <div class="content-item">
                    <span>已报名</span>{{courseInfo.applyCount}}
                </div>
            </div>
        </div>
        <div class="courseDetail-btn">
            <div v-if="applyStatus === 0" class="button" @click="startStudy(courseInfo.id)">
                报名
            </div>
            <div v-else class="button-disable">
                已报名
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/course';
import moment from 'moment';

export default {
    filters: {
        dataFormat(val) {
            if(val){
                return moment(val).format('YYYY.MM.DD HH:mm')
            }
		}
    },
    data() {
        return {
            pdfurl: '',
            hasvideo: false,
            ispdf: false,
            hasresourceURl: false,
            courseInfo: {},
            player: null,
            catelogList: [],
            applyStatus: 0,
            trainContent: [],
        };
    },
    components: {},
    methods: {
        handleRouterJump(item) {
            console.log(item, '跳转触发');
            if (item.type === 'course') {
                this.$router.push({
                    path: '/course/detail',
                    query: {
                        id: item.id
                    }
                })
            } else {
                // answer?sceneId=1
                this.$router.push({
                    path: '/answer',
                    query: {
                        sceneId: item.id
                    }
                })
            }
        },
        // 清除定时器
        clearTimeing() {
            if (this.IntervalName) {
                clearInterval(this.IntervalName);
                this.IntervalName = null;
                console.log('清楚定时器');
            }
        },
        checkLogin() {
            this.$passport.checkCookie().then((res) => {
                console.log(res)
                
            },() => {
                // this.$passport.goH5Login();
            });
        },
        // 点击报名
        startStudy() {
            // 判断是否在报名时间内
            const currentTimeStamp = new Date().getTime();
            console.log(currentTimeStamp);
            if (currentTimeStamp > this.courseInfo.applyStartTime && currentTimeStamp < this.courseInfo.applyEndTime) {
                this.$passport.checkCookie().then((res) => {
                    console.log(res)
                },() => {
                    this.$passport.goH5Login();
                });
            } else {
                this.$toast('不在报名期限内');
            }
        },
        getCourseInfo(id) {
            return api
                .userTaskGetTaskInfoByUserId({taskId:id})
                .then((res) => {
                    this.courseInfo = res;
                    this.courseName = this.courseInfo.name;
                    this.applyStatus = res.applyStatus;
                    
                    res.stageDtos.forEach((item) => {
                        item.taskItems.forEach((item1) => {
                            this.trainContent.push({
                                type: item1.taskCourseId ? 'course' : 'test',
                                label: item1.label,
                                id: item1.taskCourseId ? item1.taskCourseId : item1.scene.id,
                            });
                        });
                    });
                    this.jumpToCourse(res.applyStatus);
                    console.log(res, 'res222');
                });
        },
        // 如果已报名，并且在培训周期内，直接跳到课程页面
        jumpToCourse(applyStatus) {
            if (applyStatus === 0) {
                return;
            }
            const courseId = this.trainContent.find((item)=>item.type==='course').id;
            console.log(courseId, 'courseId11');
            if (!courseId) {
                return;
            }
            const currentTimeStamp = new Date().getTime();
            if (currentTimeStamp > this.courseInfo.trainStartTime && currentTimeStamp < this.courseInfo.trainEndTime) {
                
                this.$router.push({
                    path: '/course/detail',
                    query: {
                        id: courseId
                    }
                })
            }

        },
    },
    mounted() {
        if (this.$route.query.id) {
            // 判断是否登录
            this.checkLogin();
            // 获取课程内容
            this.getCourseInfo(this.$route.query.id);
        }
    }
};
</script>

<style scoped lang="less">
@import "../course/index.less";
</style>
<style lang="less">
.courseDetail {
    .van-collapse-item--border::after {
        border-top: 0px !important;
    }
    .van-cell::after {
        border-bottom: 0px !important;
    }
    .van-hairline--top-bottom::after {
        border: 0px !important;
    }
    .van-cell {
        line-height: 40px;
    }
    .van-cell__right-icon {
        line-height: 40px;
    }
    .van-collapse-item__content {
        padding: 12px 0px !important;
    }
    .van-cell--clickable:active {
        background: #fff;
    }
}
// .courseDetail {
//     background: #F5F5FA;
// }
.train-duration {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 1000px;
}
.courseDetail-content {
    background: #F5F5FA;
}
.courseDetail-btn .button-disable {
  width: 100%;
  height: 88px;
  font-size: 28px;
  color: white;
  text-align: center;
  line-height: 88px;
//   background: linear-gradient(135deg, #FF956A 0%, #F74118 100%);
  
  background: linear-gradient(135deg, rgba(255, 149, 106, 0.5) 0%, rgba(247, 65, 24, 0.5) 100%);
  border-radius: 16px;
}
.peixun-content{
    padding: 16px;
    font-size: 28px;
    color: #272F55;
    background: #fff;
    margin-bottom: 28px;
    p{
        font-size: 36px;
        margin-bottom: 30px;
    }
    .content-item{
        display: flex;
        margin-bottom: 24px;
        align-items: center;
        span{
            display: block;
            width: 60px;
            height: 40px;
            border: 1px solid rgba(232, 90, 58, 0.5);
            border-radius: 4px;
            margin-right: 16px;
            color: #E85A3A;
            font-size: 22px;
            text-align: center;
            line-height: 40px;
        }
    }
}
.baoming-content{
    padding: 16px;
    font-size: 28px;
    color: #272F55;
    background: #fff;
    p{
        font-size: 36px;
        margin-bottom: 30px;
    }
    .content-item{
        display: flex;
        margin-bottom: 24px;
        span{
            display: block;
            width: 104px;
            height: 40px;
            // border: 1px solid rgba(232, 90, 58, 0.5);
            // border-radius: 4px;
            margin-right: 16px;
            color: #A7ADBB;
            font-size: 26px;
            // text-align: center;
            line-height: 40px;
            
        }
    }
}
</style>
