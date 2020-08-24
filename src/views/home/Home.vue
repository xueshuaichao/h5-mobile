<template>
    <div class="home">
        <van-nav-bar title="首页">
            <template #right>
                <van-icon name="search" size="18" />
                <van-icon name="volume-o" size="18" />
                <!-- <span class="icon iconfont"></span> -->
            </template>
        </van-nav-bar>
        <div class="banner">
            <img src="../../assets/images/8@2x.png" alt />
        </div>
        <div class="btn">
            <van-button round type="info" class="assessment">
                <van-icon name="chart-trending-o" />职业测评
            </van-button>
            <van-button round type="info" class="resource" :to="{name:'courseList'}">
                <van-icon name="peer-pay" />课程资源
            </van-button>
        </div>
        <!-- remind -->
        <van-notice-bar class="remind" left-icon="volume-o" text="提醒：8.20  17:00课程直播/考试" />
        <div class="learning">
            <p class="title">正在学习</p>
            <div class="list">
                <div class="left">
                    <van-tag mark type="primary">课程</van-tag>
                    <h4>1.2建设工程项目管理</h4>
                    <p>当前培训：一级建造师</p>
                </div>
                <div class="right">
                    <router-link tag="a" :to="{ name: 'home' }">
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
                            {{ sinatv.time }}
                            <van-button round type="info" class="btn">点击预约</van-button>
                        </p>
                        <p v-else>
                            <van-loading type="spinner" size="20px" />正在直播
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="professional">
            <p class="title">职业培训</p>
            <van-swipe :loop="false" :width="250" :height="230" style="padding:0 0 10px 0">
                <van-swipe-item v-for="item in professionalList" :key="item.id">
                    <img :src="item.img" alt />
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.num }}</p>
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator"></div>
                </template>
            </van-swipe>
        </div>
        <div class="hot-courses">
            <div class="top">
                <p class="title">热门课程</p>
                <router-link tag="p" :to="{name:'courseList'}" class="more">
                    更多
                    <van-icon name="arrow" />
                </router-link>
            </div>
            <ul class="list">
                <li v-for="course in courseList" :key="course.id">
                    <img :src="course.img" alt />
                    <p>{{ course.title }}</p>
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
                <li v-for="job in jobList" :key="job.id">
                    <div class="left">
                        <p class="name">{{ job.name }}</p>
                        <p>{{ job.education }} {{ job.experience }}</p>
                        <div>
                            <img :src="job.contactUserPortrait" />
                            <span>{{ job.companyName }}</span>
                            <span>{{ job.contactUserName }}</span>
                        </div>
                    </div>
                    <div class="right">
                        <p>{{ job.salary }}</p>
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
                    img: require("../../assets/images/8@2x.png"),
                    title: "2021年北京线下企业职场人际关系提升",
                    flag: 0,
                    time: ""
                },
                {
                    id: 2,
                    img: require("../../assets/images/8@2x.png"),
                    title: "计算机操作基础",
                    flag: 1,
                    time: "10.29  19:01"
                }
            ],
            professionalList: [
                {
                    id: 1,
                    img: require("../../assets/images/8@2x.png"),
                    title: "2020年CPA战略风险管理",
                    num: "已有68人报名"
                },
                {
                    id: 2,
                    img: require("../../assets/images/8@2x.png"),
                    title: "2020年退役军人职业技能培训班",
                    num: "已有68人报名"
                },
                {
                    id: 3,
                    img: require("../../assets/images/8@2x.png"),
                    title: "2020电子商务师计算机操作员第六期",
                    num: "已有68人报名"
                }
            ],
            courseList: [
                {
                    id: 1,
                    img: require("../../assets/images/8@2x.png"),
                    title: "创新方法论"
                },
                {
                    id: 2,
                    img: require("../../assets/images/8@2x.png"),
                    title: "增值税开票实操"
                },
                {
                    id: 3,
                    img: require("../../assets/images/8@2x.png"),
                    title: "CPA 经济法"
                },
                {
                    id: 4,
                    img: require("../../assets/images/8@2x.png"),
                    title: "互联网金融行业"
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
                    contactUserPortrait: require("../../assets/images/portrait.png"),
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
                    contactUserPortrait: require("../../assets/images/portrait.png"),
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
                    contactUserPortrait: require("../../assets/images/portrait.png"),
                    companyAddress: "北京·西直门"
                }
            ]
        };
    }
};
</script>
<style lang="less">
.home {
    .van-notice-bar {
        color: #2c3e50;
    }
    .van-notice-bar__left-icon {
        color: #1989fa;
    }
    .van-icon {
        vertical-align: middle;
        margin-right: 10px;
    }
    .van-loading {
        display: inline-block;
        margin-right: 10px;
    }
    .van-swipe-item {
        margin-right: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .van-nav-bar__title {
        margin: 0;
    }
}
</style>
<style lang="less" scoped>
.home {
    width: 95%;
    margin: 0 auto;
}
h4 {
    display: inline-block;
    margin: 0;
}
p {
    margin: 0;
}
.banner img {
    width: 100%;
}
.assessment,
.resource {
    width: 43%;
}
.assessment {
    margin-right: 15px;
}
.remind {
    margin-top: 10px;
}
.learning {
    .title {
        text-align: left;
    }
    .list {
        margin-top: 5px;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        padding: 20px 10px;
        p {
            margin: 0;
            margin-top: 10px;
        }
        .left {
            float: left;
            text-align: left;
        }
        .right {
            float: right;
            text-align: right;
        }
    }
}
.top {
    overflow: hidden;
    margin-bottom: 10px;
    .title {
        float: left;
    }
    .more {
        float: right;
    }
}
.sinatv-list {
    margin-top: 15px;

    .list {
        li {
            text-align: left;
            margin-bottom: 10px;
            img {
                width: 50%;
                vertical-align: middle;
                margin-right: 2%;
            }
            .right {
                margin-top: 20px;
                display: inline-block;
                vertical-align: middle;
                width: 48%;
                h4 {
                    margin-bottom: 10px;
                }
                .btn {
                    width: 90px;
                    height: 35px;
                }
            }
        }
    }
}
.professional {
    //   width: 100%;
    margin: 0 auto;
    text-align: left;
    .title {
        text-align: left;
        margin-bottom: 10px;
    }
    img {
        width: 100%;
        margin-bottom: 10px;
    }
    h4,
    p {
        padding-left: 10px;
        padding-bottom: 10px;
    }
}
.hot-courses {
    margin-top: 15px;
    overflow: hidden;
    .list {
        li {
            width: 48%;
            float: left;
            margin-right: 2%;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 10px;
            &:nth-child(2n) {
                margin-right: 0;
            }
            img {
                width: 100%;
            }
            p {
                padding: 10px;
            }
        }
    }
}
.new-job {
    margin-top: 15px;
    img {
        width: 14px;
    }
    .list {
        li {
            overflow: hidden;
            margin-bottom: 10px;
            padding: 10px 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            p {
                margin-bottom: 5px;
            }
        }
    }
    .left {
        float: left;
        text-align: left;
        vertical-align: middle;
    }
    .right {
        float: right;
        text-align: right;
        vertical-align: middle;
        .companyAddress {
            margin-top: 10px;
        }
    }
}
</style>
