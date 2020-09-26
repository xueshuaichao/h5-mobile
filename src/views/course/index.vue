<template>
    <div class="course-list">
        <div class="course-list-header clearfix">
            <img class="header-left fl" src="../../assets/course/course@2x.png" alt="">
            <van-search
                class="header-middle fl"
                v-model="seachtext"
                shape="round"
                placeholder="输入课程关键字"
                @search="onSearch"
            />
            <router-link to="/course/filter">
                <img class="header-right fr" src="../../assets/course/filter@2x.png" alt="">
            </router-link>
            
        </div>
        <van-list
            v-if="isNone" 
            v-model="loading"
            :finished="finished"
            @load="getcourseList"
            :error.sync="error"
            finished-text="没有更多了">
            <div class="item" v-for="item in list" :key="item.id" @click="handleClickItem(item)">
                <div class="top">
                    <img class="img" :src="item.picUrl" alt="">
                    <div class="info">
                        <p class="title van-multi-ellipsis--l2"> 
                            {{ item.name }}
                        </p>
                        <p class="status">{{ item.categoryName }}</p>
                        <div class="tongji clearfix">
                            <span class="start fl">
                                <img src="../../assets/course/seach.png" alt="">
                                4.5分
                            </span>
                            <span class="selected fr">
                                已选1.2W+
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </van-list>

        <!-- 暂无数据 -->
        <div class="none" v-if="isNone">
            <img src="../../assets/learning/none.png" alt="" srcset="" width="80">
            <p>暂无内容</p>
        </div>
    </div>
</template>
<script>
import api from '@/api/course';

export default {
    name: 'courseList',

    data() {
        return {
            seachtext: '',
            list: [{name: '暂无内容暂无内容暂无内容暂无内容暂无内容',
                picUrl: "https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/874e58ad9dc09f939c43ce06bd877d7b.jpg",
                categoryName:'1111',
                stars: 3,
                signUpCount: 16,
            }],
            listparam: {
                pageNum: 1,
                pageSize: 16,
                categoryId: null,
                type: 0,
            },
            loading: false,
            finished: false,
            pageSize: 10,
            pageNum: 1,
            error: false,
            isNone: true,
        }
    },

    methods: {
        onCancel() {},
        onSearch() {},
        getcourseList() {
            api.getCourselist(this.listparam).then((res) => {
                console.log(res);
            })
        },

        handleClickItem(item) {
            // todo router
            console.log(item)
        }

    },
};
</script>

<style lang="less" scoped>
@import './index';
</style>
