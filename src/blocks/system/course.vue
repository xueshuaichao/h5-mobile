<template>
    <div class="jingpin">
        <div class="jingpin-header">
            <h3>精品课程</h3>
            <span @click="gomore">更多<img src="../../assets/course/more@2x.png" alt=""></span>
        </div>
        <div class="jingpin-list">
            <ul class="clearfix">
                <li class="fl" v-for="(item, index) in list" :key="index" @click="goDetail(item)">
                    <img :src="item.picUrl" alt="">
                    <p>{{item.name}}</p>
                    <div class="list-content">
                        <span class="content-left">
                            <img class="start" src="../../assets/course/Starscore@2x.png" alt="">
                            {{item.starAvg ? item.starAvg : '0'}}分
                        </span>
                        <span class="content-right">
                            已选{{item.signUpCount ? item.signUpCount : '0'}}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '../../api/course';
export default {
    data() {
        return {
            list: [],
        };
    },
    components: {},
    methods: {
        gomore(){
            this.$router.push({
                path: '/course',
            })
        },
        getList() {
            api.findBoutiqueCourseList({pageSize: 8}).then((res) => {
                const data = res;
                console.log(res);
                this.list = data;
            })
        },
        goDetail(item) {
            this.$router.push({
                path:'/course/detail',
                query: {
                    id: item.id
                }
            })
        },
    },
    mounted() {
        this.getList();
    }
};
</script>

<style scoped lang="less">
@import './course.less';
</style>

