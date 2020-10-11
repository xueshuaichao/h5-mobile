<template>
    <div class="mychose-list">
        <div class="mychose-list-header clearfix">
            <h3>我的选学</h3>
            <span 
                :class="tabnum === item.id ? 'activeTab' : ''"
                class="tabname"
                @click="changeTab(item.id)" 
                v-for="(item, index) in coursetype" :key="index">
                {{item.name}}
                <span :class="tabnum === item.id ? 'line' : ''"></span>
            </span>
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
                        <p class="title"> 
                            {{ item.name }}
                        </p>
                        <p class="status">{{ item.lastCategoryName }}</p>
                        <div class="tongji clearfix">
                            <van-progress :percentage="item.learningRate" stroke-width="4" :show-pivot="false" />
                            <span class="text">{{ item.learningRate }}%</span>
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
    name: 'mychoseList',

    data() {
        return {
            tabnum: '',
            coursetype: [
                {id: '', name: '全部选学'},
                {id: 1, name: '进行中'},
                {id: 2, name: '已完成'},
                
            ],
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
        changeTab(num) {
            console.log(num);
            this.tabnum = num;
            this.listparam.studyStatus = num;
            this.listparam.pageNum = 1;
            this.myChoseCourse();
        },
        onCancel() {},
        async myChoseCourse() {
            // if(type){
            //     this.listparam.pageNum = 1;
            this.list = [];
            // }
            const { list, total } = await api.myChoseCourse(this.listparam);
                
            this.loading = false;
            
            if (!total || (list && !list.length && !this.list.length)) { // no data
                this.isNone = true;
                return;
            }
            
            if (list && list.length) {
                this.$nextTick(() => {
                    this.list.push(...list);
                })
                this.isNone = false;
                console.log(this.list)
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