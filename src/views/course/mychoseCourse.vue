<template>
    <div class="course-list">
        <div class="course-list-header clearfix">
            <!-- <img class="header-left fl" src="../../assets/course/course@2x.png" alt="">
            <van-search
                class="header-middle fl"
                v-model="listparam.name"
                shape="round"
                placeholder="输入课程关键字"
                @search="getcourseList('seach')"
            /> 
            <img @click="gofilter" class="header-right fr" src="../../assets/course/filter@2x.png" alt="">            -->
        </div>
        <van-list
            v-if="!isNone" 
            v-model="loading"
            :finished="finished"
            @load="myChoseCourse"
            :error.sync="error"
            finished-text="没有更多了">
            <div class="item van-hairline--bottom" v-for="item in list" :key="item.id" @click="handleClickItem(item)">
                <div class="top">
                    <img class="img" :src="item.picUrl" alt="">
                    <div class="info">
                        <p class="title van-multi-ellipsis--l2"> 
                            {{ item.name }}
                        </p>
                        <p class="status">{{ item.categoryName }}</p>
                        <div class="tongji clearfix">
                            <van-progress :percentage="item.taskProgress" stroke-width="8" :show-pivot="false" />
                            <span class="text">{{ item.taskProgress }}%</span>
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
            list: [],
            listparam: {
                pageNum: 1,
                pageSize: 10,
                studyStatus: null, // 1：进行中；2：已完成；全部选学（不填值，默认加载全部）
            },
            loading: false,
            finished: false,
            error: false,
            isNone: false,
        }
    },
    mounted() {
    },
    methods: {
        onCancel() {},
        async myChoseCourse(type) {
            if(type){
                this.listparam.pageNum = 1;
                this.list = [];
            }
            const { list, total } = await api.myChoseCourse(this.listparam);
                
            this.loading = false;
            
            if (!total || (list && !list.length && !this.list.length)) { // no data
                this.isNone = true;
                return;
            }
            
            if (list && list.length) {
                this.list.push(...list);
            } else {
                this.finished = true;
            }

            if (this.list.length >= total || total < 10) { // finished
                this.finished = true;
            }

            this.listparam.pageNum++;
            this.error = false;
        },

        handleClickItem(item) {
            // todo router
            console.log(item)
            this.$router.push({
                path:'/course/detail',
                query: {
                    id: item.id
                }
            })
        }

    },
};
</script>

<style lang="less" scoped>
@import './index';
</style>
<style lang="less">
.van-list__finished-text{
    height: 80px;
    line-height: 50px;
}
</style>