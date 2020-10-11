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
            <span class="detail-fenlei">
                {{courseInfo.categoryName}}
            </span>
        </div>
        <div class="courseDetail-content">
            <div class="peixun-content">
                <p>培训内容</p>
                <div v-for="(item,index) in trainContent" :key="index" class="content-item">
                    <span>{{item.type === 'course' ? '课程' : '考试'}}</span>{{item.label}}
                </div>
            </div>
            <div class="baoming-content">
                <p>报名信息</p>
                <div class="content-item">
                    <span>报名时间</span>2020.9.10  12:00 - 2020.9.21  12:00
                </div>
                <div class="content-item">
                    <span>报名人数</span>12
                </div>
                <div class="content-item">
                    <span>已报名</span>12
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
export default {
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
                this.$passport.goH5Login();
            });
        },
        // 加入选学
        startStudy() {
            this.$passport.checkCookie().then((res) => {
                console.log(res)
            },() => {
                this.$passport.goH5Login();
            });
        },
        // courseDetail(id) {
        //     api.findById(id).then((res) => {
        //         // console.log(res);
        //         const data = res;
        //         this.courseInfo = data;
        //         this.courseName = this.courseInfo.name;
        //         this.isjoin = this.courseInfo.recordId
        //             ? true
        //             : false;
        //     }) 
        // },
        getCourseInfo(id) {
            return api
                .userTaskGetTaskInfoByUserId({taskId:id})
                .then((res) => {
                    const data = res;
                    this.courseInfo = data;
                    this.courseName = this.courseInfo.name;
                    this.applyStatus = res.applyStatus;
                    res.stageDtos.forEach((item) => {
                        item.taskItems.forEach((item1) => {
                            this.trainContent.push({
                                type: item1.taskCourseId ? 'course' : 'test',
                                label: item1.label
                            });
                        });
                    });
                    console.log(res, 'res222');
                });
        },
        findCourseItemByCourseId() {
            const param = {
                courseId: this.courseInfo.id,
                recordId: this.courseInfo.recordId,
            };
            api.findCourseItemByCourseId(param).then((res) => {
                this.catelogList = res;
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
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
