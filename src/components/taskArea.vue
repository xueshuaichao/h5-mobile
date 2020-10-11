<template>
    <van-popup v-model="show" round position="bottom" class="task-area" >
        <div class="header flex">
            <span class="txt">{{ type ? '请选择地区' : '请选择区域单位' }}</span>
            <span class="close" @click="show = false">关闭</span>
        </div>
        <div class="body">
            <div v-for="(item, i) in activeList"  
                :class="currentItem === i && 'active' " 
                :key="i" 
                @click="handleClickItem(item, i)"
                class="item"
            >
                {{ item.label }}
            </div>
        </div>
    </van-popup>
</template>
<script>
import api from '../api/task'

export default {
    data() {
        return {
            show:  true,
            activeList: [],
            currentColumn: 0,
            currentItem: 0,
            areaUnit: null,
            type: 0,
            
        }
    },
    created() {
        api.getAreaList().then((res) => {
            if (res.fieldText) {
                this.areaUnit = JSON.parse(res.fieldText).areaUnit;
                this.activeList = this.areaUnit;
            }
        })
    },
    methods: {
        handleClickItem(item, index) {
            this.currentItem = index;
        }
    }
}
</script>
<style scoped lang="less">
.task-area {
    height: 25rem;
    .flex {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }
    .header {
        font-weight: 500;
        padding: 0 32px;
        line-height: 120px;
        border-bottom: 1px solid #E6E6EB;
        width: 100%;
        .txt {
            color: #272F55;
            font-size: 40px;
        }
        .close {
            color: #E85A3A;
            font-size: 32px;
        }
    }
    .body {
        padding: 0 32px;
        box-sizing: border-box;
        .item {
            font-size: 32px;
            color: #272F55;
            font-weight: 400;
            line-height: 44px;
            margin-top: 48px;
            text-align: left;
            &.active {
                color: #E85A3A;
            }
        }
    }
}
</style>