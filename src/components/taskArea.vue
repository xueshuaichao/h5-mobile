<template>
    <van-popup v-model="shows" round position="bottom" class="task-area" @close="closing">
        <div class="header flex">
            <span class="txt">{{ type ? '请选择地区' : '请选择区域单位' }}</span>
            <span class="close" @click="closing">关闭</span>
        </div>
        <div class="body">
            <div
                v-for="(item, i) in activeList"
                :class="selectedList.includes(item.value) && 'active' "
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
import api from '@/api/account';

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        type: {
            type: Number,
            default: 0,
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo || { };
        }
    },
    data() {
        return {
            shows:  false,
            activeList: [],
            selectedLabels: [],
            selectedList: [],
            items: [],
            currentAreaIndex: 0,
        }
    },
    watch: {
        show(val) {
            this.shows = val;
        },
        type(val, oldVal) {
            this.currentColumnsIndex = val;
            if (val !== oldVal) {
                this.handleClickColumnItem(val);
            }
        }
    },
    created() {
        const { selectedLabels, selectedList } = this.userInfo;
        this.selectedLabels = selectedLabels || [];
        this.selectedList = selectedList || [];

        this.getAreaUnitList();
    },
    methods: {
         closing() {
            this.shows = false;
            this.$emit('close');
        },
        async getAreaUnitList() {
            const res = await api.getAreaUnitList();
            const items = JSON.parse(res.fieldText).areaUnit 
            
            this.items = items;
            this.activeList = items;

            if (this.selectedLabels[0]) {
                this.currentAreaIndex = items.findIndex(v => v.value === this.selectedList[0]);
            }
        },

        handleClickColumnItem(i) {
            this.currentColumnsIndex = i;
            if (i) {
                this.activeList = this.items[this.currentAreaIndex].children;
            } else {
                this.activeList = this.items;
            }
        },

        handleChangeCompanyName() {
            const [areaCode, unitCode] = this.selectedList;

            if (!areaCode || !unitCode) {
                this.$toast('请选择区域单位');
                return;
            }
            this.updateUserInfo({ areaCode, unitCode }, '', { selectedLabels: this.selectedLabels });

        },

        handleClickItem(item, i) {
            if (!this.currentColumnsIndex) { // 区域
                this.currentAreaIndex = i;

                this.selectedLabels = [item.label, ''];
                this.selectedList = [item.value, ''];
            } else {
                this.$set(this.selectedLabels, 1, item.label);
                this.$set(this.selectedList, 1, item.value);
            }
            this.$emit('data', this.selectedLabels);
        },
        async updateUserInfo(params, message = '', payload = {}) {
            this.$loading(message);
            try {
                const res = await api.updateUserInfo({ ...params });

                if (res) {
                    this.$store.commit('setUserInfo', { ...this.userInfo, ...params, ...payload });
                }
            } finally {
                this.$toast.clear();
            }

        }
    },
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