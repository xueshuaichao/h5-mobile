<template>
    <div class="container setting setting-company">
        <van-nav-bar
            title="区域单位"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="content">
            <div class="list">
                <div class="item van-hairline--bottom" v-for="(item, i) in columns" :key="i" @click="handleClickColumnItem(i)">
                    <p class="title">{{ item.title }}</p>
                    <div class="value">
                        <span class="default">{{ item.value }}</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <!-- <div class="item">
                    <p class="title">单位</p>
                    <div class="value">
                        <span>请选择养老机构</span>
                        <van-icon name="arrow" />
                    </div>
                </div> -->
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
                    <div v-for="(item, i) in activeList[this.currentColumn]"  :class="currentItem === i && 'active' " :key="i" @click="handleClickItem(item, i)">
                        {{ item.label }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
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
                // {
                //     title: '单位',
                //     value: '请选择养老机构',
                //     id: 2,
                // },
            ],
            activeList: [],
            currentColumn: 0,
            currentItem: 0,
        }
    },

    created() {
       this.items = this.userInfo.organizations;
       this.activeList.push(this.items);

       this.setDefaultCompanyNamee();
    },

    methods: {
        parseData(data) {
            data.text = data.label;
            data.id = data.value;

            if (data.children) {
                data.children.forEach(v => this.parseData(v))
            }
            return data;
        },

        setDefaultCompanyNamee() {
            this.columns = [];
            let data = this.items;
            const self = this;
            console.log(data) 
            this.userInfo.selectedList.forEach((v, i) => {
                setColumn(data, v, i)
            })

            function setColumn(child, v, i) {

                let item = child.find(item => item.value === v);  
                console.log(item)            
                if (item.children) {
                    self.activeList.push(item.children);
                    data = item.children;
                }
                self.columns.push({
                    id: i + 1,
                    title: '区域',
                    value: item.label,
                    data: item
                });
            }
        },

        onClickLeft() {
           this.$router.go(-1);
        },
       
        handleClickItem(item, i) {

            this.$set(this.columns, this.currentColumn, { ...this.columns[this.currentColumn], value: item.label, data: item })
            
            if (item.children) {
                this.$set(this.columns, this.currentColumn + 1, { id: i + 1,
                    title: '区域',
                    value: '请选择区域', })
                this.$set(this.activeList, this.currentColumn + 1, item.children);
            }

            this.currentItem = i;
        },

        handleClickColumnItem(i) {
            this.show = true;
            this.currentColumn = i;
        },

        handleChangeCompanyName() {
            const selectedList = this.columns.map(v => v.data.value);

            this.updateUserInfo({ selectedList });
        }
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
            padding: 16px;

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