<template>
    <div class="account">
        <div class="top-wrap">
            <div class="title">
                我的
            </div>

            <div class="user-info">
                <img :src="userInfo? userInfo.portrait : ''"  width="48" alt="" class="photo">
                <p class="name"> {{ userInfo ? userInfo.username : '未登录'}} </p>
            </div>

            <div class="record">
                <div class="record-item">
                    <p class="num">
                        <span>{{ count.finishTaskCount }}</span> / {{ count.allTaskCount }}
                    </p>
                    <p class="label">任务</p>
                </div>
                <div class="record-item">
                    <p class="num">
                        <span>{{ count.finishCourseCount }}</span> / {{ count.allTaskCount }}
                    </p>
                    <p class="label">选学</p>
                </div>
            </div>
        </div>

        <div class="menu-list">
            <div class="menu-item" v-for="item in list" :key="item.title" @click="$router.push(item.path)">
                <img :src="item.icon" width="64" alt="">
                <p>{{ item.title }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/account';
import {
    mapGetters
} from 'vuex';
export default {
    data() {
        return {
            // userInfo: {
            //     name: '就哈哈',
            //     portrait: '',
            // },
            count: {
                finishTaskCount: 1,
                allTaskCount: 2,
                finishCourseCount: 1,
                allCourseCount: 2    
            },
            list: [
                {
                    title: "个人评估",
                    path: '/assessment',
                    icon: require("../../assets/account/menu-1.png"),
                },
                {
                    title: "我的测试",
                    path: '/test',
                    icon: require("../../assets/account/menu-2.png"),
                },
                {
                    title: "我的错题",
                    path: '/wrong',
                    icon: require("../../assets/account/menu-3.png"),
                },
                {
                    title: "我的消息",
                    path: '/message',
                    icon: require("../../assets/account/menu-4.png"),
                },
                {
                    title: "我的设置",
                    path: '/setting',
                    icon: require("../../assets/account/menu-5.png"),
                }
            ]
        };
    },
    computed: mapGetters({
        userInfo: 'getUserInfo'
    }),
    created() {
        // this.getUserInfo();
        this.getLearnCount();
        console.log(this.userInfo)
    },

    methods: {
        // async getUserInfo() {
        //     const res = await api.getUserInfo({ "userId":"1000118612570985" });
        //     this.userInfo = res;
        //     this.$store.commit('setUserInfo', res);
        // },

        async getLearnCount() {
            const res = await api.getLearnCount();
            this.count = res;
        }
    }
};
</script>
<style lang="less" >
@import "../../css/variables.less";
.account {

    .top-wrap {
        width: 100%;
        height: 380px;
        margin-bottom: 97px;
        background-image: url('../../assets/account/bg@2x.png');
        background-position: center;
        background-repeat: no-repeat;
    }

    .title {
        padding-top: 60px;
        text-align: center;
        font-size: 34px;
        color: white;
    }

    .user-info {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding: 52px 32px 48px 32px;
    }

    .name {
        margin-left: 32px;
        font-size: 32px;
        color: white;
    }

    .photo {
        width: 86px;
        height: 86px;
        border-radius: 50%;
    }

    .record {
        display: flex;
        flex-flow: row;
        align-items: center;
        width: 690px;
        height: 140px;
        margin: 0 auto;
        background: #FFFFFF;
        box-shadow: 0px 8px 30px 0px rgba(39, 47, 85, 0.06);
        border-radius: 24px;
    }

    .record-item {
        position: relative;
        flex: 1;

        .num {
            color: @font-color-1;
            font-size: @font-size-20;

            span {
                color: @font-color;
            }
        }

        .label {
            padding-top: 10px;
            color: @font-color-2;
            font-size: @font-size-12;
        }

        &:first-child ::after{
            position: absolute;
            right: 0;
            top: 50%;
            content: '';
            display: block;
            width: 2px;
            height: 32px;
            margin-top: -16px;
            background: #EEEEEE;
        }
    }

    .menu-list {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        align-content: baseline;
        width: 690px;
        height: 728px;
        margin: 0 auto;
        background: #FFFFFF;
        box-shadow: 0px 8px 30px 0px rgba(39, 47, 85, 0.06);
        border-radius: 24px;
        overflow: hidden;
        font-size: 0;
    }

    .menu-item {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 33.3333%;
        padding-top: 64px;
        p {
            color: @font-color;
            font-size: @font-size-14;
        }
    }

}

</style>
