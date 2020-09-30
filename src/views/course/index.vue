<template>
    <div class="course-list">
        <div class="course-list-header clearfix">
            <img class="header-left fl" src="../../assets/course/course@2x.png" alt="">
            <van-search
                class="header-middle fl"
                v-model="listparam.name"
                shape="round"
                placeholder="输入课程关键字"
                @search="getcourseList('seach')"
            /> 
            <img @click="gofilter" class="header-right fr" src="../../assets/course/filter@2x.png" alt="">           
        </div>
        <van-list
            v-if="!isNone" 
            v-model="loading"
            :finished="finished"
            @load="getcourseList"
            :error.sync="error"
            finished-text="没有更多了">
            <div class="item van-hairline--bottom" v-for="item in list" :key="item.id" @click="handleClickItem(item)">
                <div class="top">
                    <img class="img" :src="item.picUrl" alt="">
                    <div class="info">
                        <p class="title van-multi-ellipsis--l2"> 
                            {{ item.name }}
                        </p>
                        <p class="status">{{ item.lastCategoryName }}</p>
                        <div class="tongji clearfix">
                            <span class="start fl">
                                <img src="../../assets/course/seach.png" alt="">
                                {{item.starAvg}}分
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
            list: [],
            listparam: {
                pageNum: 1,
                pageSize: 10,
                name: '',
                courseItemDetailType: null, // 内容类型0：视频；1：音频；2：文档；全部选学（不填值，默认加载全部）
                categoryId: null, // 分类id
                type: 0, // 0:综合排序（默认）；1：热门；2：最新
                recordType: null, // 是否加入选学 1：加入选学；0：未加入选学 全部选学（不填值，默认加载全部）
            },
            loading: false,
            finished: false,
            // pageSize: 10,
            // pageNum: 1,
            error: false,
            isNone: false,
        }
    },
    mounted() {
        if(this.$route.query.seachlist){
            let param = JSON.parse(this.$route.query.seachlist);
            console.log(this.$route.query.seachlist)
            this.listparam.courseItemDetailType = param.courseItemDetailType;
            this.listparam.recordType = param.recordType;
            this.listparam.type = param.type;
            this.listparam.categoryId = param.categoryId;
        }
    },
    methods: {
        gofilter() {
            if(this.$route.query.seachlist){
                this.$router.push({
                    path: "/course/filter",
                    query: {
                        paramslist: this.$route.query.seachlist,
                    }
                })
            } else {
                this.$router.push({
                    path: "/course/filter"
                })
            }
            
        },
        onCancel() {},
        // onSearch() {
        //     this.listparam.pageNum = 1;
        //     this.getcourseList('seach')
        // },
        async getcourseList(type) {
            if(type){
                this.listparam.pageNum = 1;
                this.list = [];
            }
            const { list, total } = await api.getCourselist(this.listparam);
                
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