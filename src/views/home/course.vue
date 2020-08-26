<template>
    <div class="course-list">
        <div class="top">
            <van-nav-bar title="课程" left-arrow @click-left="back" />
            <van-tabs v-model="active" class="tabs" @click="tabClick">
                <van-tab v-for="(tab,index) in tabs" :key="index" :title="tab"></van-tab>
            </van-tabs>
        </div>
        <ul class="list">
            <li v-for="course in courseList" :key="course.id">
                <img :src="course.courseCoverUrl" class="courseCoverUrl" />
                <div class="text">
                    <h4>{{course.title}}</h4>

                    <div class="bottom">
                        <!-- <p class="teacherName">{{course.teacherName}}</p> -->
                        <p class="num">
                            <img src="../../assets/images/person-num.png" alt />
                            {{course.num}}
                        </p>
                        <p class="courseType">{{course.courseType}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            tabs: ["全部", "建筑师", "数控", "数控", "汽修", "教师"],
            courseList: [
                {
                    id: 1,
                    title: "家政(护理)基础集中培训",
                    courseCoverUrl: require("../../assets/images/pic@2x(1).png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                },
                {
                    id: 2,
                    title: "教师资格培训",
                    courseCoverUrl: require("../../assets/images/pic@2x(2).png"),
                    teacherName: "讲师姓名",
                    courseType: "￥299",
                    num: 1324
                },
                {
                    id: 3,
                    title: "汽车自动变速器结构",
                    courseCoverUrl: require("../../assets/images/pic@2x(3).png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                },
                {
                    id: 4,
                    title: "新能源汽车",
                    courseCoverUrl: require("../../assets/images/pic@2x.png"),
                    teacherName: "讲师姓名",
                    courseType: "￥99",
                    num: 1324
                },
                {
                    id: 5,
                    title: "工业互联网助力疫情防控与复工复产",
                    courseCoverUrl: require("../../assets/images/pic@2x(2).png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                },
                {
                    id: 6,
                    title: "收益管理工具PMS系列",
                    courseCoverUrl: require("../../assets/images/pic@2x(1).png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                }
            ]
        };
    },
    methods: {
        tabClick() {},
        back() {
            this.$router.back();
        }
    }
};
</script>
<style lang="less">
@import "../../css/variables.less";
.course-list {
    .van-nav-bar__title {
        font-size: 18px;
        font-weight: 600;
        color: @textColor1;
        line-height: 25px;
    }
    .van-nav-bar {
        margin-bottom: 20px;
    }
    .van-tabs__line {
        width: 17px;
        height: 3px;
        background: rgba(48, 186, 139, 1);
        border-radius: 5px;
        left: -12.5px;
        bottom: 0px;
    }
    .van-tab {
        font-size: 15px;
        font-weight: 400;
        color: @grayfont;
        flex: inherit;
        padding: 13px 24px 12px 0;
        display: inline-block;
    }
    .van-tabs__wrap--scrollable .van-tabs__nav--complete {
        padding: 0 15px;
    }
    .van-tab--active {
        font-size: 15px;
        font-weight: 400;
        color: rgba(48, 186, 139, 1);
    }
    .van-tabs--line .van-tabs__wrap {
        height: auto;
        overflow: inherit;
    }
}
</style>
<style lang="less" scoped>
@import "../../css/variables.less";
.course-list {
    background: #f9fafd;
    p,
    h4 {
        margin: 0;
    }
    .top {
        margin-top: 20px;
        background: #fff;
    }
    .icon_return {
        width: 48px;
    }
    .list {
        // padding: 0 30px;
        margin: 24px auto;
        text-align: left;
        li {
            padding: 30px;
            margin-bottom: 15px;
            background: #fff;
            position: relative;
        }
        .courseType {
            position: absolute;
            right: 30px;
            bottom: 30px;
            font-size: 36px;
            font-weight: 600;
            color: #e85a3a;
        }
        .courseCoverUrl {
            width: 224px;
            vertical-align: top;
            margin-right: 32px;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            margin-top: 16px;
            width: 400px;
            h4 {
                font-size: 34px;
                font-weight: 600;
                color: @textColor1;
                line-height: 45px;
                margin-bottom: 62px;
            }
        }
        .bottom {
            .num {
                font-size: 28px;
                font-weight: 400;
                color: @grayfont;
                line-height: 28px;
                img {
                    width: 28px;
                    margin-right: 12px;
                }
            }
        }
    }
}
</style>