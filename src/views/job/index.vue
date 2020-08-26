<template>
    <div class="job-index">
        <!-- <van-nav-bar title="就业机会" /> -->
        <van-tabs v-model="active" class="tabs1">
            <van-tab title="招聘岗位"></van-tab>
            <van-tab title="招聘企业"></van-tab>
        </van-tabs>

        <div v-show="active==0" class="jobList">
            <div class="intention">
                <div class="l">高级建筑师</div>
                <div class="r">
                    <span>岗位意向</span>
                    <van-icon name="arrow" />
                </div>
            </div>
            <van-tabs v-model="active1" line-width class="tabs2">
                <van-tab title="推荐"></van-tab>
                <van-tab title="最新"></van-tab>
                <van-tab title="最热"></van-tab>
            </van-tabs>
            <p class="line"></p>
            <div class="listBox">
                <ul class="list">
                    <li v-for="job in jobList" :key="job.id">
                        <div class="left">
                            <img :src="job.contactUserPortrait" />

                            <div class="text">
                                <p class="name">{{ job.name }}</p>
                                <p class="education">{{ job.education }} {{ job.experience }}</p>
                                <span class="companyName">{{ job.companyName }}</span>
                                <!-- <span>{{ job.contactUserName }}</span> -->
                            </div>
                        </div>
                        <div class="right">
                            <p class="salary">{{ job.salary }}</p>
                            <p class="add">{{ job.companyAddress }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-show="active==1" class="jobList">
            <van-tabs v-model="active1" class="tabs3">
                <van-tab title="北京">
                    <template #title>
                        北京
                        <van-icon name="arrow-down" />
                    </template>
                </van-tab>
                <van-tab title="全部职位">
                    <template #title>
                        全部职位
                        <van-icon name="arrow-down" />
                    </template>
                </van-tab>
                <van-tab title="全部职位">
                    <template #title>
                        全部职位
                        <van-icon name="arrow-down" />
                    </template>
                </van-tab>
            </van-tabs>
            <div class="listBox">
                <ul class="list">
                    <li v-for="company in companyList" :key="company.id">
                        <img :src="company.logo" />
                        <div class="text">
                            <h4 class="name">{{company.name}}</h4>
                            <p class="welfare">{{company.welfare}}</p>
                        </div>
                        <p class="companyAddress">{{company.companyAddress}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            active1: 0,
            jobList: [
                {
                    id: 1,
                    name: "高级建筑师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "20-25K",
                    companyName: "公路建设(集团)有限公司 ",
                    contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/portrait.png"),
                    companyAddress: "北京·西直门"
                },
                {
                    id: 2,
                    name: "高级建筑师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "20-25K",
                    companyName: "亿尚龙建筑公司 ",
                    contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/portrait.png"),
                    companyAddress: "北京·西直门"
                },
                {
                    id: 3,
                    name: "高级建筑师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "20-25K",
                    companyName: "三建工程有限公司 ",
                    contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/portrait.png"),
                    companyAddress: "北京·西直门"
                },
                {
                    id: 4,
                    name: "高级建筑师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "20-25K",
                    companyName: "中浩建筑有限责任公司",
                    contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/portrait.png"),
                    companyAddress: "北京·西直门"
                },
                {
                    id: 5,
                    name: "高级建筑师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "20-25K",
                    companyName: "缘振智建筑公司",
                    contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/portrait.png"),
                    companyAddress: "北京·西直门"
                },
                {
                    id: 6,
                    name: "高级建筑师",
                    education: "本科",
                    experience: "5-10年",
                    salary: "20-25K",
                    companyName: "华迅锐建筑公司",
                    contactUserName: "·张经理",
                    contactUserPortrait: require("../../assets/images/portrait.png"),
                    companyAddress: "北京·西直门"
                }
            ],
            companyList: [
                {
                    id: 1,
                    name: "公路建设(集团)有限公司",
                    logo: require("../../assets/images/logo1.png"),
                    companyAddress: "北京",
                    welfare: "已上市        世界500强"
                },
                {
                    id: 2,
                    name: "亿尚龙建筑公司",
                    logo: require("../../assets/images/logo2.png"),
                    companyAddress: "北京",
                    welfare: "五险一金   定期体检"
                },
                {
                    id: 3,
                    name: "华迅锐建筑公司",
                    logo: require("../../assets/images/logo3.png"),
                    companyAddress: "北京",
                    welfare: "已上市"
                },
                {
                    id: 4,
                    name: "梦都建筑（集团）有限公司",
                    logo: require("../../assets/images/logo4.png"),
                    companyAddress: "北京",
                    welfare: "五险一金"
                },
                {
                    id: 5,
                    name: "中浩建筑有限责任公司",
                    logo: require("../../assets/images/logo1.png"),
                    companyAddress: "北京",
                    welfare: "五险一金    带薪年假"
                },
                {
                    id: 6,
                    name: "建工程有限公司",
                    logo: require("../../assets/images/logo2.png"),
                    companyAddress: "北京",
                    welfare: "已上市        世界500强"
                },
                {
                    id: 7,
                    name: "缘振智建筑公司",
                    logo: require("../../assets/images/logo3.png"),
                    companyAddress: "北京",
                    welfare: "已上市        世界500强"
                }
            ]
        };
    }
};
</script>
<style lang="less">
@import "../../css/variables.less";
.job-index {
    .van-tabs__wrap {
        overflow: inherit;
    }
    .intention .van-icon {
        top: 3px;
    }
    .tabs1 {
        .van-tab {
            font-size: 17px;
            font-weight: 400;
            color: @grayfont;
            line-height: 48px;
            display: inline-block;
            text-align: left;
            flex: inherit;
            margin-right: 45px;
        }
        .van-tab--active {
            font-size: 21px;
            font-weight: 600;
            color: @textColor1!important;
        }
        .van-tabs__line {
            width: 19px !important;
            height: 3px;
            background: #30ba8b;
            border-radius: 2px;
            bottom: 16px;
        }
    }
    .tabs2 {
        padding-left: 30px;
        .van-tab {
            flex: inherit;
            font-size: 12px;
            font-weight: 400;
            color: @textColor1;
            line-height: 16px;
            margin-right: 20px;
        }
        .van-tabs__line {
            display: none;
        }
        .van-tab--active {
            color: #30ba8b;
        }
    }
}
</style>
<style lang="less" scoped>
@import "../../css/variables.less";
.job-index {
    margin: 89px auto 0;
}
p {
    margin: 0;
}
h4 {
    margin: 0;
}
.tabs1 {
    padding-left: 30px;
}
.tabs2,
.tabs3 {
    // padding-bottom: 26px;
    // border-bottom: 1px solid #e6e6eb;
    margin-bottom: 63px;
}
.tabs3 .van-tabs__line {
    display: none;
    .van-icon {
        top: 5px;
    }
}

.intention {
    overflow: hidden;
    margin-bottom: 35px;
    padding: 0 30px;
    .l {
        float: left;
        font-size: 32px;
        font-weight: 400;
        color: @textColor1;
        line-height: 45px;
    }
    .r {
        float: right;
        font-size: 28px;
        font-weight: 600;
        color: @tifiniyGreen;
    }
}
.listBox {
    width: 690px;
    margin: 0 auto;
}
.jobList {
    margin-top: 43px;
    text-align: left;
    .list {
        li {
            overflow: hidden;
            margin-bottom: 33px;
            padding-bottom: 31px;
            border-bottom: 1px solid #e6e6eb;
            position: relative;
            p {
                margin-bottom: 5px;
            }
        }
        .companyAddress {
            position: absolute;
            right: 0;
            bottom: 30px;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            .name {
                font-size: 30px;
                font-weight: 600;
                color: @textColor1;
                line-height: 42px;
                margin-bottom: 12px;
            }
            .education {
                font-size: 24px;
                font-weight: 400;
                color: @grayfont;
                line-height: 33px;
            }
            .companyName {
                font-size: 28px;
                font-weight: 400;
                color: rgba(87, 87, 101, 1);
                line-height: 40px;
            }
        }
        .welfare {
            font-size: 24px;
            font-weight: 400;
            color: @grayfont;
            line-height: 33px;
        }
        .salary {
            font-size: 40px;
            font-family: Avenir Next, Avneir;
            font-weight: 600;
            color: rgba(232, 90, 58, 1);
            line-height: 55px;
        }
        .add {
            font-size: 24px;
            font-weight: 400;
            color: rgba(167, 173, 187, 1);
            line-height: 33px;
        }
        img {
            width: 84px;
            margin-right: 35px;
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
}
</style>