<template>
    <div class="learning-list">
        <van-list
            v-if="!isNone" 
            v-model="loading"
            :finished="finished"
            @load="getLearnList"
            :error.sync="error"
            finished-text="没有更多了">
            <div class="item van-hairline--bottom" v-for="item in list" :key="item.id" @click="handleClickItem(item)">
                <div class="top">
                    <img class="img" :src="item.coverUrl" alt="">
                    <div class="info">
                        <p class="title van-multi-ellipsis--l2"> 
                            {{ item.name }}
                        </p>

                        <p class="course-category">{{ item.categoryName }}</p>
                        <div class="progress">
                            <div class="slider">
                                <div class="slider--progress" :style="{ width: item.progress + '%' }">
                                </div>         
                            </div>
                            <span class="text">{{ item.progress }}%</span>
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
import api from '@/api/learning';

export default {
    name: 'LearningList',
        
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            pageSize: 10,
            pageNum: 1,
            error: false,
            isNone: false,
        }
    },

    methods: {
        async getLearnList() {
            try {
                const { status, contentType, currentTab } = this.$route.params;
                const params = currentTab === 1 ? { status, contentType } : '';
                const { list, total } = await api.getLearnList(this.pageSize, this.pageNum, params);
                
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

                if (this.list.length >= total) { // finished
                    this.finished = true;
                }

                this.pageNum++;
                this.error = false;
            } catch(e) {
                console.log(e)
                this.error = true;
                this.loading = false;
            }
    
        },

        handleClickItem(item) {
            // todo router
            console.log(item)
        }

    },
};
</script>

<style lang="less" scoped>
.learning-list {
    padding-bottom: 100px;

    .item {
        padding: 32px 0;
        height: 200px;
        box-sizing: border-box;
        text-align: left;
    }

    .top {
        display: flex;
        flex-flow: row;

        .img {
            width: 240px;
            height: 140px;
            margin-right: 32px;
            border-radius: 16px;
        }

        .info {
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            flex: 1;

            p {
               font-size: 28px;
               color: #272F55; 
               word-break: break-all;
            }

            img {
                vertical-align: middle;
                margin-left: 10px;
            }

            .course-category {
                color: #A7ADBB;
                font-size: 24px;
            }
        }
    }

    .bottom {
        margin-top: 32px;
        font-size: 24px;
        color: #737386;
    }

    .progress {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        .text {
            font-size: 24px;
            color: #E85A3A;
        }
        
        .slider {
            width: 332px;
            height: 8px;
            background: #E6E6EB;
            border-radius: 4px;
        }
        
        .slider--progress {
            width: 160px;
            height: 8px;
            background: linear-gradient(90deg, #F74118 0%, #FF956A 100%);
            border-radius: 4px;

        } 
    }

    .none {
        padding-top: 100px;
        text-align: center;
        font-size: 24px;
        color: #A7ADBB;

        img {
            width: 160px;
        }
    }
}
</style>
