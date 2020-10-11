<template>
<van-popup
  van-popup v-model="show" round position="bottom" 
  class="user-info-sheet"
>
    <div class="header">
        <span class="txt">请填写以下信息</span>
        <span class="close" @click="onCancel">关闭</span>
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
            <div class="city flex">
                <span>{{filter.districtName || ''}}</span>
                <van-icon name="arrow" />
            </div>
            <div class="bar">
            </div>
            <div class="company flex">
                <span>{{filter.elderlyOrgName || ''}}</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="btn" @click="changeApply">
            {{ status ? '取消报名' : '立即报名' }}
        </div>
    </div>
</van-popup>
</template>
<script>
import api from '../api/task'
import { Toast } from 'vant'

export default {
    data() {
        return {
            show: true,
            filter: {
                username: '',
                elderlyOrgName: '',
                districtName: '',
            },
            taskId: 44,
            status: 0,
        }
    },
    created() {
        if (this.$route.query.id !== undefined) {
            this.taskId = this.$route.query.id;
        }
        api.getUserInfo().then((res) => {
            if (res.success) {
                this.filter = {...this.filter, ...res.data};
            }
        });
    },
    methods: {
        onCancel() {
        },
        changeApply() {
            const status = this.applyStatus ? 0 : 1;
            api.changeTaskApply({
                taskId: this.taskId,
                isApply: status
            }).then((res) => {
                if (res.success) {
                    this.status = status;
                    Toast.loading({
                        duration: 1200,
                        forbidClick: true,
                        message: '操作成功',
                    });
                }
            })
        }
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