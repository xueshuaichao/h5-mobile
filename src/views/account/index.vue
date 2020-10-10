<template>
    <div class="account">
        <div class="top-wrap">
            <!-- <div class="user-info">
                <img :src="userInfo.portrait"  width="48" alt="" class="photo">
                <p class="name"> {{ userInfo.name }} </p>
            </div> -->
            <div class="user-info-wrap">
                <div class="user-info">
                    <img :src="require('../../assets/account/default-photo.png') || userInfo.portrait" alt="" width="62">
                    <p class="name" v-if="userInfo">{{ userInfo.name }}</p>
                </div>
            </div>
            <div class="record">
                <div class="record-item">
                    <p class="num">
                        <span>{{ count.finishTaskCount }}</span> / {{ count.allTaskCount }}
                    </p>
                    <p class="label">我的任务</p>
                </div>
                <div class="record-item">
                    <p class="num">
                        <span>{{ count.finishCourseCount }}</span> / {{ count.allCourseCount }}
                    </p>
                    <p class="label">选学</p>
                </div>
            </div>
        </div>

        <div class="menu-list">
            <div class="menu-item" v-for="item in list" :key="item.title" @click="$router.push(item.path)">
                <img :src="item.icon" width="18" alt="">
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
            //     name: '',
            //     portrait: '',
            // },
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
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    created() {
        // this.getUserInfo();
        this.getLearnCount();
        console.log(this.$store)
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
    padding: 0 32px;

    .user-info {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding: 52px 32px 48px 32px;
    }

    .name {
        margin-left: 32px;
        font-size: 40px;
        color: #272F55;
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
        justify-content: space-between;
    }

    .record-item {
        width: 334px;
        height: 148px;
        padding: 30px 0 18px 26px;
        text-align: left;
        background-image: url('../../assets/account/task-bg.png');
        background-repeat: no-repeat;
        background-size: 334px 148px;
        box-sizing: border-box;
        .num {
            text-align: left;
            color: white;
            font-size: @font-size-20;

            span {
                color: white;
            }
        }

        .label {
            padding-top: 10px;
            color: white;
            font-size: 30px;
        }

        &:last-child{
            background-image: url('../../assets/account/learning-bg.png');
        }
    }

    .menu-item {
        display: flex;
        flex-flow: row;
        align-items: center;
        margin-top: 74px;
        background-image: url('../../assets/account/arrow.png');
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 12px auto;

        p {
            padding-left: 24px;
            color: @font-color;
            font-size: @font-size-14;
        }
    }

}

</style>
