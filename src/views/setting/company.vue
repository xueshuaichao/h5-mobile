<template>
    <div class="container setting setting-company">
        <van-nav-bar
            title="区域单位"
            left-arrow
            @click-left="$router.go(-1)"
        />
        <div class="content">
            <div class="list">
                <div class="item van-hairline--bottom" v-for="(item, i) in columns" :key="i" @click="handleClickColumnItem(i)">
                    <p class="title">{{ item.title }}</p>
                    <div class="value">
                        <span class="default">{{  selectedLabels[i] || item.value }}</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
        </div>

        
        <div :class="['button--default', 'button--active']" @click="handleChangeCompanyName">
            确认
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '50%' }" >
            <div class="popup">
                <div class="popup-header van-hairline--bottom">
                   <p>请选择区域单位</p>
                   <span @click="show = false">关闭</span>
                </div>
                <div class="popup-body">
                    <div v-for="(item, i) in activeList"  :class="selectedList.includes(item.value) && 'active' " :key="i" @click="handleClickItem(item, i)">
                        {{ item.label }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import api from '@/api/account';
import mixins from './mixins';
import './index.less'

export default {
    name: 'Setting',

    mixins: [mixins],

    data() {
        return {
            show: false,
            items: [],
            columns: [
                {
                    title: '区域',
                    value: '请选择区域',
                    id: 0,
                },
                {
                    title: '单位',
                    value: '请选择养老机构',
                    id: 1,
                },
            ],
            activeList: [],
            selectedLabels: [],
            selectedList: [],
            currentItem: 0,

        }
    },

    created() {
        const { selectedLabels, selectedList } = this.userInfo;

        this.selectedLabels = selectedLabels || [];
        this.selectedList = selectedList || [];

        this.getAreaUnitList();
    },

    methods: {
        async getAreaUnitList() {
            const res = await api.getAreaUnitList();
            const items = JSON.parse(res.fieldText).areaUnit 
            
            this.items = items;
            this.activeList = items;

            if (this.selectedLabels[0]) {
                this.currentAreaIndex = items.findIndex(v => v.value === this.selectedList[0]);
                console.log(this.currentAreaIndex);
            }
        },

        handleClickColumnItem(i) {
            this.currentColumnsIndex = i;
            this.show = true;

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
        },
    },
}   
</script>

<style lang="less">
@import '../../css/variables.less';

.setting-company {
    .list {
        padding: 0 32px;
        background: white;
        margin-bottom: 16px;
    }
    .item { 
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        min-height: 108px;
        color: @font-color;
        font-size: @font-size-16;

        .value span {
            color: @active;
        }
     
        .value {
            display: flex;
            flex-flow: row;
            align-items: center;

            .van-icon-arrow {
                padding-left: 8px;
                color: #A7ADBB;
            }

            .photo {
                width: 112px;
                height: 112px;
                margin: 24px 0;
                border-radius: 16px;
                background: pink;
                overflow: hidden;
            }

            .default {
                color: #A7ADBB;
            }
        }
    }

    .van-button {
        border-color: white;
    }

    .popup {
        overflow: hidden;
        height: 100%;
        &-header {
           display: flex;
           flex-flow: row;
           align-items: center;
           justify-content: space-between;
           padding: 0 32px;
           height: 120px;

           p {
               font-size: 40px;
               color: #272F55;
           }

           span {
                font-size: 32px;
                color: #E85A3A;
           }
        } 

        &-body {
            padding: 32px;
            height: 80%;
            overflow: scroll;

            div {
                margin-bottom: 24px;
                text-align: left;
                font-size: 32px;
                color: #272F55;
            }

            .active {
                color: #E85A3A;
            }

        }
    }

    .van-popup  {       
        border-radius: 12px 12px 0px 0px;
    }
}
</style>