<template>
    <div class="screen">
        <van-nav-bar
            :title="type === 0 ? '任务筛选' : '课程筛选'"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="content">
            <div class="task van-hairline--bottom" :class="type === 1 && 'course'">
                <template v-for="(item, index) in list">
                    <p :key="item.id">{{ item.name }}</p>
                    <div class="list" :key="index">
                        <div class="item" 
                            :class="[el.name.length <= 2 && 'mini', activeList[index] === i ? 'active' : '']" 
                            v-for="(el, i) in item.btn" 
                            :key="el.id"
                            @click="handleClickItem(index, i)"    
                            >
                           {{ el.name }}
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="footer">
            <div @click="handleClearActiveList">
                <img src="../../assets/learning/clear.png" alt="" width="18" srcset="">
                <p>清空筛选</p>
            </div>
            <div class="button" @click="handleClickSave">
                确定
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ScreenList',
    
    data() {
        return {
            taskList: [
                {
                    name: '培训状态',
                    id: 11,
                    btn: [ 
                        {
                            id: 111,
                            name: '全部',
                            value: '',
                        },
                        {
                            id: 117,
                            name: '未开始',
                            value: 0,
                        },
                        {
                            id: 112,
                            name: '进行中',
                            value: 1,
                        },
                        { 
                            id: 114, 
                            name: '未通过', 
                            value: 2
                        }, 
                        { 
                            id: 113, 
                            name: '已通过', 
                            value: 3 
                        }
                    ], 
                }
            ],
            courseList: [
                {
                    id: 12,
                    name: '课程状态',
                    btn: [
                        {
                            id: 121,
                            name: '全部',
                            value: '',
                        }, 
                        {
                            id: 122,
                            name: '进行中',
                            value: 1,
                        }, 
                        { 
                            id: 123, 
                            name: '已完成', 
                            value: 2 
                        },
                    ]
                },
                {
                    id: 22,
                    name: '内容类型',
                    btn: [
                        {
                            id: 221,
                            name: '全部',
                            value: '',
                        }, 
                        {
                            id: 222,
                            name: '视频',
                            value: 0,
                        }, 
                        { 
                            id: 223, 
                            name: '音频', 
                            value: 1 
                        },
                        { 
                            id: 224, 
                            name: '文档', 
                            value: 2 
                        },
                    ],
                }
            ],
            type: 0,
            activeList: [0, 0],
            params: [],
        }
    },
    
    computed: {
        list() {
            return this.type === 0 ? this.taskList : this.courseList;
        }
    },

    created() {
        const { type } = this.$route.params;
        this.type = type;
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },

        handleClickItem(index, i) {
            this.$set(this.activeList, index, i);
            this.params[index] = this.list[index].btn[i].value;
        },

        handleClearActiveList() {
            this.activeList = [0, 0]
            this.params = ['', ''];
        },

        handleClickSave() {
            const [status = '', contentType = ''] = this.params;
 
            this.$router.push({
                name: 'learning',
                params: {
                    currentTab: this.type,
                    status,
                    contentType,
                },
            });
        }
    },
}
</script>
<style lang="less" scoped>
.content {
    padding: 32px;
    height: 100%;

    .task {
        padding-bottom: 48px;
    }

    .task p {
        margin-bottom: 24px;
        text-align: left;
        font-size: 24px;
        color: #A7ADBB;  
    }
    
    .list {
        text-align: left;
    }

    .course .list:last-child .item {
        margin-bottom: 0;
    }

    .item {
        display: inline-block;
        width: 170px;
        height: 64px;
        margin-right: 32px;
        font-size: 26px;
        line-height: 64px;
        text-align: center;
        color: #272F55;
        background: #F5F5FA;
        border-radius: 16px;

        &:last-child {
            margin-right: 0;
        }
    }
    
    .mini {
        width: 144px;
        margin-bottom: 32px;
    }

    .block {
        display: block;
    }

    .active {
        color: #E85A3A;
        background: rgba(232, 90, 58, 0.04);
        border: 1px solid #E85A3A;
    }
}
.screen {
    .footer {

        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px;
        margin-top: 32px;

        p {
            font-size: 24px;
            color: #272F55;
        }

        .button {
            width: 560px;
            height: 88px;
            font-size: 28px;
            color: white;
            text-align: center;
            line-height: 88px;
            background: linear-gradient(135deg, #FF956A 0%, #F74118 100%);
            border-radius: 16px;
        }
    }
}
</style>