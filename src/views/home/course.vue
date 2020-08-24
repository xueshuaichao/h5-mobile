<template>
    <div class="course-list">
        <van-nav-bar title="课程">
            <template #left>
                <router-link :to="{name:'home'}">
                    <van-icon name="arrow-left" />返回
                </router-link>
            </template>
        </van-nav-bar>
        <van-tabs v-model="active" class="tabs" @click="tabClick">
            <van-tab v-for="(tab,index) in tabs" :key="index" :title="tab"></van-tab>
        </van-tabs>
        <ul class="list">
            <li v-for="course in courseList" :key="course.id">
                <img :src="course.courseCoverUrl" class="courseCoverUrl" />
                <div class="text">
                    <h4>{{course.title}}</h4>
                    <p class="courseType">{{course.courseType}}</p>
                    <div class="bottom">
                        <!-- <p class="teacherName">{{course.teacherName}}</p> -->
                        <p class="num">
                            <van-icon name="user-o" />
                            {{course.num}}
                        </p>
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
                    courseCoverUrl: require("../../assets/images/8@2x.png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                },
                {
                    id: 2,
                    title: "教师资格培训",
                    courseCoverUrl: require("../../assets/images/8@2x.png"),
                    teacherName: "讲师姓名",
                    courseType: "￥299",
                    num: 1324
                },
                {
                    id: 3,
                    title: "汽车自动变速器结构",
                    courseCoverUrl: require("../../assets/images/8@2x.png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                },
                {
                    id: 4,
                    title: "新能源汽车",
                    courseCoverUrl: require("../../assets/images/8@2x.png"),
                    teacherName: "讲师姓名",
                    courseType: "￥99",
                    num: 1324
                },
                {
                    id: 5,
                    title: "工业互联网助力疫情防控与复工复产",
                    courseCoverUrl: require("../../assets/images/8@2x.png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                },
                {
                    id: 6,
                    title: "收益管理工具PMS系列",
                    courseCoverUrl: require("../../assets/images/8@2x.png"),
                    teacherName: "讲师姓名",
                    courseType: "免费",
                    num: 1324
                }
            ]
        };
    },
    methods: {
        tabClick() {}
    }
};
</script>
<style lang="less">
.course-list .van-tabs__line {
    background-color: #1989fa;
}
</style>
<style lang="less" scoped>
.course-list {
    p,
    h4 {
        margin: 0;
    }
    .list {
        width: 95%;
        margin: 15px auto;
        text-align: left;
        li {
            margin-bottom: 15px;
        }
        .courseType {
            text-align: right;
            margin-top: 15px;
        }
        .courseCoverUrl {
            width: 49%;
            vertical-align: middle;
            margin-right: 2%;
        }
        .text {
            width: 48%;
            display: inline-block;
            vertical-align: middle;
        }
        .bottom {
            margin-top: 10px;
            .teacherName {
                float: left;
            }
            .num {
                float: right;
            }
        }
    }
}
</style>