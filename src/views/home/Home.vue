<template>
    <div class="home">
        <van-nav-bar title="首页" :border="false">
            <template #right>
                <img src="../../assets/images/Search@2x.png" class="Search icon" alt />
                <img src="../../assets/images/message.png" class="message icon" alt />
            </template>
        </van-nav-bar>
        <div class="banner">
            <img src="../../assets/images/banner.png" alt />
        </div>
        <div class="btn">
            <img src="../../assets/images/assessment.png" class="assessment" alt />
            <router-link :to="{name:'courseList'}">
                <img src="../../assets/images/resource.png" class="resource" alt />
            </router-link>
        </div>
        <div class="learning">
            <p class="title">
                <img src="../../assets/images/Fill 1@2x.png" class="study" alt />正在学习
            </p>
            <div class="list clearfix">
                <div class="left fl">
                    <img src="../../assets/images/icon-architecture.png" alt />
                    <h4>1.2建设工程项目管理</h4>
                    <p>当前培训：一级建造师</p>
                </div>
                <div class="right fr">
                    <router-link tag="a" class="continue-study" :to="{ name: 'home' }">
                        继续学习
                        <van-icon name="arrow" />
                    </router-link>
                    <p>已学15课时/共80课时</p>
                </div>
            </div>
        </div>
        <div class="sinatv-list">
            <div class="top">
                <p class="title">直播</p>
                <p class="more">
                    更多
                    <van-icon name="arrow" />
                </p>
            </div>
            <ul class="list">
                <li v-for="sinatv in sinatvList" :key="sinatv.id">
                    <img :src="sinatv.img" alt />
                    <div class="right">
                        <h4>{{ sinatv.title }}</h4>
                        <p v-if="sinatv.flag">
                            <span style="color:#737386">{{ sinatv.time }}</span>

                            <van-button round type="info" class="btn">点击预约</van-button>
                        </p>
                        <p v-else>
                            <span style="color:#F04142">正在直播</span>
                            <img src="../../assets/images/live.png" class="live" alt />
                            <van-button round type="info" class="btn">进入学习</van-button>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="professional">
            <p class="title">职业培训</p>
            <div class="list">
                <div class="li" v-for="item in professionalList" :key="item.id">
                    <img :src="item.img" alt />
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.num }}</p>
                </div>
            </div>
        </div>
        <div class="hot-courses">
            <div class="top">
                <p class="title">热门课程</p>
                <router-link tag="p" :to="{name:'courseList'}" class="more">
                    更多
                    <van-icon name="arrow" />
                </router-link>
            </div>
            <ul class="list clearfix">
                <li v-for="course in courseList" :key="course.id">
                    <img :src="course.img" alt />
                    <h4>{{ course.title }}</h4>
                    <p>{{ course.num }}</p>
                </li>
            </ul>
        </div>
        <div class="new-job">
            <div class="top">
                <p class="title">最新岗位</p>
                <p class="more">
                    更多
                    <van-icon name="arrow" />
                </p>
            </div>
            <ul class="list">
                <li v-for="job in jobList" :key="job.id" class="clearfix">
                    <div class="left fl">
                        <p class="name">{{ job.name }}</p>
                        <p class="education">
                            <span>{{ job.education }}</span>
                            <span>{{ job.experience }}</span>
                        </p>
                        <div class="companyName">
                            <img :src="job.contactUserPortrait" />
                            <span>{{ job.companyName }}</span>
                            <span>{{ job.contactUserName }}</span>
                        </div>
                    </div>
                    <div class="right fr">
                        <p class="salary">{{ job.salary }}</p>
                        <p class="companyAddress">{{ job.companyAddress }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    data() {
        return {
            sinatvList: [
                {
                    id: 1,
                    img: require("../../assets/images/course1.png"),
                    title: "2021年北京线下企业职场人际关系提升",
                    flag: 0,
                    time: ""
                },
                {
                    id: 2,
                    img: require("../../assets/images/course2.png"),
                    title: "计算机操作基础",
                    flag: 1,
                    time: "下次直播时间  10月29日 19:00"
                }
            ],
            professionalList: [
                {
                    id: 1,
                    img: require("../../assets/images/professional1.png"),
                    title: "2020年CPA战略风险管理",
                    num: "13.4万人已报名"
                },
                {
                    id: 2,
                    img: require("../../assets/images/professional2.png"),
                    title: "2020年退役军人职业技能培训班",
                    num: "13.4万人已报名"
                },
                {
                    id: 3,
                    img: require("../../assets/images/professional1.png"),
                    title: "2020电子商务师计算机操作员第六期",
                    num: "13.4万人已报名"
                }
            ],
            courseList: [
                {
                    id: 1,
                    img: require("../../assets/images/course3.png"),
                    title: "创新方法论",
                    num: "13.4万人已报名"
                },
                {
                    id: 2,
                    img: require("../../assets/images/course4.png"),
                    title: "增值税开票实操",
                    num: "13.4万人已报名"
                },
                {
                    id: 3,
                    img: require("../../assets/images/course5.png"),
                    title: "CPA 经济法",
                    num: "13.4万人已报名"
                },
                {
                    id: 4,
                    img: require("../../assets/images/course6.png"),
                    title: "互联网金融行业",
                    num: "13.4万人已报名"
                }
            ],
            jobList: [
                {
                    id: 1,
                    name: "高级建筑师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "18K-30K",
                    companyName: "北京市建筑研究院有限公司 ",
                    // contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/photo1.png"),
                    companyAddress: "北京·西直门"
                },
                {
                    id: 2,
                    name: "测绘高级工程师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "20K-25K",
                    companyName: "测绘建筑有限公司 ",
                    // contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/photo2.png"),
                    companyAddress: "北京·西直门"
                },
                {
                    id: 3,
                    name: "中级园艺师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "8K-12K",
                    companyName: "富力集团-天力建筑(北方) ",
                    // contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/photo3.png"),
                    companyAddress: "北京·西直门"
                }
            ]
        };
    }
};
</script>
<style lang="less">
@import "../../css/variables.less";
.home {
    .van-notice-bar {
        color: #2c3e50;
    }
    .van-notice-bar__left-icon {
        color: #1989fa;
    }
    .van-icon {
        position: relative;
        top: 2px;
    }
    .van-loading {
        display: inline-block;
        margin-right: 10px;
    }
    .van-swipe-item {
        margin-right: 24px;
    }
    .van-nav-bar__title {
        margin: 0;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: @textColor1;
        line-height: 34.5px;
    }
}
</style>
<style lang="less" scoped>
@import "../../css/variables.less";
.home {
    width: 690px;
    margin: 40px auto;
    .Search {
        width: 34px;
        margin-right: 36px;
    }
    .message {
        width: 36px;
    }
}
h4 {
    margin: 0;
}
p {
    margin: 0;
}
.title {
    font-size: 38px;
    font-weight: 600;
}
.banner {
    margin: 48px 0 54px;
    img {
        width: 100%;
    }
}
.assessment,
.resource {
    width: 334px;
}
.assessment {
    margin-right: 22px;
}

.learning {
    margin-top: 68px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 16px 0px rgba(57, 97, 104, 0.11);
    border-radius: 6px;
    border: 0px solid rgba(234, 234, 234, 1);
    padding: 32px 28px 39px;
    .title {
        text-align: left;
        font-size: 32px;
        font-weight: 600;
        color: #272f55;
        line-height: 45px;
        margin-bottom: 44px;
        img {
            width: 26px;
            margin-right: 24px;
        }
    }
    .list {
        margin-top: 5px;
        p {
            font-weight: 400;
            color: @textColor1;
            line-height: 33px;
        }
        .left {
            text-align: left;
            img {
                width: 54px;
                margin-right: 15px;
                vertical-align: middle;
            }
            h4 {
                font-size: 28px;
                font-weight: 600;
                color: @textColor1;
                line-height: 40px;
                vertical-align: middle;
                display: inline-block;
            }
            p {
                margin-top: 25px;
                font-size: 24px;
            }
        }
        .right {
            text-align: right;
            p {
                margin-top: 31px;
                font-size: 22px;
            }
            .continue-study {
                color: @tifiniyGreen2;
                text-align: right;
            }
        }
    }
}
.top {
    overflow: hidden;
    margin-bottom: 28px;
    .title {
        float: left;
        font-size: 38px;
        font-weight: 600;
        color: @textColor1;
        line-height: 53px;
    }
    .more {
        float: right;
        color: @textColor3;
        font-size: 26px;
        font-weight: 400;
        line-height: 37px;
    }
}
.sinatv-list {
    margin: 80px 0;
    .list {
        li {
            text-align: left;
            margin-bottom: 34px;
            height: 240px;
            img {
                width: 192px;
                margin-right: 28px;
            }
            .right {
                margin-top: 6px;
                display: inline-block;
                width: 454px;
                vertical-align: top;
                position: relative;
                height: 100%;
                h4 {
                    font-size: 34px;
                    font-weight: 400;
                    color: @textColor1;
                    line-height: 50px;
                    margin-bottom: 14px;
                }
                .live {
                    width: 27px;
                    margin-left: 8px;
                }
                .btn {
                    width: 148px;
                    height: 52px;
                    background-color: @tifiniyGreen2;
                    display: block;
                    margin-top: 28px;
                    border-radius: 4px;
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                    padding: 0;
                }
            }
        }
    }
}
.professional {
    //   width: 100%;
    margin: 0 auto 80px;
    text-align: left;
    .title {
        text-align: left;
        margin-bottom: 28px;
    }
    .list {
        width: 690px;
        white-space: nowrap;
        overflow-x: scroll;

        .li {
            display: inline-block;
            width: 368px;
            margin-right: 24px;
            vertical-align: top;
            img {
                width: 100%;
                height: 185px;
            }
            h4 {
                font-size: 30px;
                font-weight: 400;
                color: @textColor1;
                line-height: 44px;
                width: 100%;
                white-space: initial;
            }
            p {
                font-size: 22px;
                font-weight: 400;
                color: @textColor3;
                line-height: 30px;
                margin-top: 12px;
            }
        }
    }
}
.hot-courses {
    margin-top: 15px;
    margin-bottom: 48px;
    .list {
        li {
            width: 330px;
            float: left;
            margin-bottom: 34px;
            margin-right: 22px;
            text-align: left;
            &:nth-child(2n) {
                margin-right: 0;
            }
            img {
                width: 100%;
            }
            h4 {
                font-size: 30px;
                font-weight: 400;
                color: @textColor1;
                line-height: 44px;
                margin-top: 25px;
            }
            p {
                margin-top: 12px;
                font-size: 22px;
                font-weight: 400;
                color: @textColor3;
                line-height: 30px;
            }
        }
    }
}
.new-job {
    .top {
        margin-bottom: 40px;
    }
    img {
        width: 50px;
        vertical-align: middle;
        margin-right: 18px;
    }
    .list {
        li {
            padding: 0 20px 34px;
            border-bottom: 1px solid #e6e6eb;
            margin-top: 34px;
            position: relative;
            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }
    .left {
        text-align: left;
        vertical-align: middle;
        .name {
            font-size: 30px;
            font-weight: 400;
            color: @textColor2;
            line-height: 44px;
            margin-bottom: 14px;
        }
        .education {
            height: 40px;
            span {
                display: inline-block;
                height: 40px;
                padding: 0 17px;
                background: #f3f6f8;
                margin-right: 8px;
                font-size: 18px;
                font-weight: 400;
                color: @textColor2;
                line-height: 44px;
            }
        }
        .companyName {
            margin-top: 25px;
            span {
                vertical-align: middle;
                font-size: 20px;
                font-weight: 400;
                color: @textColor2;
                line-height: 44px;
            }
        }
    }
    .right {
        text-align: right;
        vertical-align: middle;

        .companyAddress {
            font-size: 20px;
            font-weight: 400;
            color: @textColor2;
            line-height: 44px;
            position: absolute;
            bottom: 37px;
            right: 20px;
        }
        .salary {
            font-size: 28px;
            font-weight: 600;
            color: @tifiniyGreen2;
            line-height: 44px;
        }
    }
}
</style>
