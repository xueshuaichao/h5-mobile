<template>
    <div class="job-index">
        <van-nav-bar title="就业机会" />
        <van-tabs v-model="active" class="tabs">
            <van-tab title="招聘岗位"></van-tab>
            <van-tab title="招聘企业"></van-tab>
        </van-tabs>

        <div v-show="active==0" class="jobList">
            <div class="intention">
                <div class="l">建筑师</div>
                <div class="r">
                    岗位意向
                    <van-icon name="arrow" />
                </div>
            </div>
            <van-tabs v-model="active1" class="tabs">
                <van-tab title="推荐"></van-tab>
                <van-tab title="最新"></van-tab>
                <van-tab title="最热"></van-tab>
            </van-tabs>
            <div class="listBox">
                <ul class="list">
                    <li v-for="job in jobList" :key="job.id">
                        <div class="left">
                            <p class="name">{{ job.name }}</p>
                            <p>{{ job.education }} {{ job.experience }}</p>
                            <div>
                                <img :src="job.contactUserPortrait" />
                                <span>{{ job.companyName }}</span>
                                <!-- <span>{{ job.contactUserName }}</span> -->
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
        <div v-show="active==1" class="company">
            <ul class="list">
                <li v-for="company in companyList" :key="company.id">
                    <img :src="company.logo" />
                    <div class="content">
                        <h4>{{company.name}}</h4>
                        <p>{{company.welfare}}</p>
                    </div>
                    <p class="add">{{company.companyAddress}}</p>
                </li>
            </ul>
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
                    logo: require("../../assets/images/portrait.png"),
                    companyAddress: "北京",
                    welfare: "已上市        世界500强"
                },
                {
                    id: 2,
                    name: "亿尚龙建筑公司",
                    logo: require("../../assets/images/portrait.png"),
                    companyAddress: "北京",
                    welfare: "五险一金   定期体检"
                },
                {
                    id: 3,
                    name: "华迅锐建筑公司",
                    logo: require("../../assets/images/portrait.png"),
                    companyAddress: "北京",
                    welfare: "已上市"
                },
                {
                    id: 4,
                    name: "梦都建筑（集团）有限公司",
                    logo: require("../../assets/images/portrait.png"),
                    companyAddress: "北京",
                    welfare: "五险一金"
                },
                {
                    id: 5,
                    name: "中浩建筑有限责任公司",
                    logo: require("../../assets/images/portrait.png"),
                    companyAddress: "北京",
                    welfare: "五险一金    带薪年假"
                },
                {
                    id: 6,
                    name: "建工程有限公司",
                    logo: require("../../assets/images/portrait.png"),
                    companyAddress: "北京",
                    welfare: "已上市        世界500强"
                },
                {
                    id: 7,
                    name: "缘振智建筑公司",
                    logo: require("../../assets/images/portrait.png"),
                    companyAddress: "北京",
                    welfare: "已上市        世界500强"
                }
            ]
        };
    }
};
</script>
<style lang="less">
.job-index {
    .van-nav-bar__title {
        margin: 0 0 0 10px;
    }
    .van-tabs__line {
        background-color: #1989fa;
    }
    .van-tabs--line .van-tabs__wrap {
        margin-bottom: 15px;
    }
}
</style>
<style lang="less" scoped>
.job-index {
    width: 95%;
    margin: 0 auto;
    .tabs {
        margin-bottom: 10px;
    }
}
.intention {
    overflow: hidden;
    .l {
        float: left;
    }
    .r {
        float: right;
    }
}
.company {
    .list {
        li {
            margin-bottom: 10px;
            padding: 10px 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-align: left;
            position: relative;
            img {
                width: 50px;
                vertical-align: middle;
            }
            .content {
                display: inline-block;
                vertical-align: middle;
                margin-left: 15px;
            }
            .add {
                display: inline-block;
                vertical-align: bottom;
                position: absolute;
                right: 15px;
                bottom: 10px;
            }
        }
    }
}
.jobList {
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
        img {
            width: 16px;
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
</style>