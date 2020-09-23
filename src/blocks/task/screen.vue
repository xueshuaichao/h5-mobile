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
                            :class="[el.length <= 2 && 'mini', type === 0 && i === 0 && 'block', activeList[index] === i ? 'active' : '']" 
                            v-for="(el, i) in item.btn" 
                            :key="i"
                            @click="handleClickItem(index, i)"    
                            >
                           {{ el }}
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="footer">
            <div @click="handleClearActiveList">
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
                   id: 1,
                   btn: ['全部', '进行中', '已通过', '未通过'], 
                }
            ],

            courseList: [
                {
                   id: 1,
                   name: '课程状态',
                   btn: ['全部', '进行中', '已完成'], 
                },
                {
                    id: 2,
                    name: '内容类型',
                    btn: ['全部', '视频', '音频', '文档'],
                }
            ],

            type: 0,

            activeList: [0, 0],
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
        onClickLeft() {},

        handleClickItem(index, i) {
            this.$set(this.activeList, index, i)
        },

        handleClearActiveList() {
            this.activeList = [0, 0]
        },

        handleClickSave() {
            this.$router.push({
                name: 'learning',
                params: {
                    currentTab: this.type,
                    status: this.activeList[0],
                    contentType: this.activeList[1],
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