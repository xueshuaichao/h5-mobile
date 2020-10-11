<template>
<van-popup
  van-popup v-model="shows" round position="bottom"
  @close="closing"
  class="user-info-sheet"
>
    <div class="header">
        <span class="txt">请填写以下信息</span>
        <span class="close" @click="closing">关闭</span>
    </div>
    <div class="body">
        <p class="label">
            请输入姓名
        </p>
        <div class="input-wrap input">
            <van-cell-group>
                <van-field v-model="filter.username"  placeholder="请输入姓名" />
            </van-cell-group>
        </div>
        <p class="label">
            请选择养老机构
        </p>
        <div class="area input-wrap flex">
            <div class="city flex" @click="openArea(0)">
                <span>{{filter.selectedLabels[0] || '请选择区域'}}</span>
                <van-icon name="arrow" />
            </div>
            <div class="bar">
            </div>
            <div class="company flex" @click="openArea(1)">
                <span class="area-block">{{filter.selectedLabels[1] || '请选择养老机构'}}</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="btn" @click="changeApply">
            立即报名
        </div>
    </div>
    <taskArea
        ref="area"
        :show="showArea"
        :type="type"
        @close="onclose"
        @data="getArea"
    />
</van-popup>
</template>
<script>
import api from '../api/task'
import { Toast } from 'vant'
import taskArea from './taskArea'

export default {
    components: {
        taskArea,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            shows: false,
            filter: {
                username: '',
                selectedLabels: ['', '']
            },
            taskId: 44,
            showArea: false,
            type: 0,
        }
    },
    watch: {
        show(val) {
            this.shows = val;
        }
    },
    created() {
        if (this.$route.query.id !== undefined) {
            this.taskId = this.$route.query.id;
        }
        this.getUserInfo(); 
       
    },
    methods: {
        getArea(labels) {
            this.showArea = false;
            this.filter.selectedLabels = labels;
        },
        openArea(arg) {
            if (arg && !this.filter.selectedLabels[0]) {
                Toast.loading({
                    duration: 1200,
                    forbidClick: true,
                    message: '先选择地区',
                });
            } else {
                this.type = arg;
                this.showArea = true;
            }
        },
        onclose() {
            this.showArea = false;
        },
        closing() {
            this.shows = false;
            this.$emit('close')
        },
        async getUserInfo() {
            const res = await api.getUserInfo();
            this.filter = { ...this.filter, ...res, selectedLabels: res.selectedLabels || [] };
            this.$store.commit('setUserInfo', { ...res, organizations: JSON.parse(res.extensionInfo) });
        },
        changeApply() {
            if (this.filter.selectedLabels[0] && this.filter.selectedLabels[1] && this.filter.username) {
                // 补全信息，并报名。
                this.$refs.area.handleChangeCompanyName();
                api.changeTaskApply({
                    taskId: this.taskId,
                    isApply: 1
                }).then(() => {
                    this.$emit('changeApplyStatus');
                })
            } else {
                this.$toast('请补全信息');
            }
        },
    }
}
</script>
<style scoped lang="less">
.user-info-sheet {
    .flex {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }
    .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E6E6EB;
        font-weight: 500;
        padding: 0 32px;
        line-height: 120px;
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
        padding: 48px 32px 0;
        text-align: left;
        .label {
            color: #575765;
            font-size: 32px;
            line-height: 44px;
            margin-bottom: 28px;
        }
        .input-wrap {
            height: 88px;
        }
        .input {
            margin-bottom: 48px;
            .van-cell {
                background: #F3F3F3;
                border-radius: 0.32rem;
            }
        }
        .area {
            margin-bottom: 266px;
            display: flex;
            justify-content: space-between;
            line-height: 88px;
            .van-icon {
                line-height: 2.346rem;
                color: #A7ADBB;
            }
        }
        .area-block {
            width: 260px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .city {
            width: 280px;
            background: #F3F3F3;
            padding: 0 16px 0 24px;
            border-radius: 12px;
            color: #272F55;
            font-size: 32px;
        }
        .bar {
            width: 24px;
            height: 8px;
            background: #F3F3F3;
            margin-top: 40px;
            border-radius: 4px;
        }
        .company {
            width: 350px;
            background: #F3F3F3;
            padding: 0 16px 0 24px;
            border-radius: 12px;
            color: #272F55;
            font-size: 32px;
        }
    }
    .footer {
        height: 136px;
        border-top: 1px solid #E6E6EB;
        .btn {
            width: 686px;
            height: 88px;
            line-height: 88px;
            text-align: center;
            font-size: 28px;
            color: #fff;
            background: linear-gradient(135deg, #FF956A 0%, #F74118 100%);
            border-radius: 12px;
            margin: 24px auto 0;
        }
    }
}
</style>