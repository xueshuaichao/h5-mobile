<template>
    <div class="task-list">
        <van-list
            v-if="!isNone" 
            v-model="loading"
            :finished="finished"
            @load="getTaskList"
            :error.sync="error"
            finished-text="没有更多了">
            <div class="item" v-for="item in list" :key="item.id" @click="handleClickItem(item)">
                <div class="top">
                    <img class="img" :src="item.coverUrl" alt="">
                    <div class="info">
                        <p class="title van-multi-ellipsis--l2"> 
                            {{ item.name }}
                            <img src="../../assets/learning/new@2x.png" v-if="item.isNew" width="32" alt="">
                        </p>
                        <p class="status">{{ item.statusName }}</p>
                        <div class="progress">
                            <div class="slider">
                                <div class="slider--progress" :style="{ width: item.progress + '%' }">
                                </div>         
                            </div>
                            <span class="text">{{ item.progress }}%</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    {{ item.trainStartTime }} - {{ item.trainEndTime }}
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
    name: 'TaskList',

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
        async getTaskList() {
            try {
                const { status, currentTab } = this.$route.params;
                const params = currentTab === 0 ? { status }: '';
                const { list, total } = await api.getTaskList(this.pageSize, this.pageNum, params);
                
                this.loading = false;

                if (!total || (list && !list.length && !this.list.length)) {
                    this.isNone = true;
                    return;
                }

                if (list && list.length) {
                    this.list.push(...list);
                } else {
                    this.finished = true;
                }

                if (this.list.length >= total || total < 10) {
                    this.finished = true; 
                }

                this.pageNum++;
                this.error = false;
            } catch(e) {
                console.log(e)
                this.loading = false;
                this.error = true;
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
.task-list {
    padding-bottom: 100px;

    .item {
        padding: 32px;
        height: 268px;
        margin-top: 32px;
        background: #FFFFFF;
        box-shadow: 0px 8px 30px 0px rgba(39, 47, 85, 0.05);
        border-radius: 24px;
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

            .status {
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
            width: 280px;
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
