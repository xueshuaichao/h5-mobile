<template>
    <div class="account">
        <div class="top">
            <div class="t">
                <img :src="require('../../assets/images/19@2x.png') || userInfo.src" class="photo" alt />
                <div class="name">
                    <p class="userName">{{ userInfo.name }}</p>
                </div>
            </div>
            <van-row gutter="25" class="row">
                <van-col span="12">
                    <p>{{ count.finishTaskCount }}/ {{ count.allTaskCount }}</p>
                    <p>任务</p>
                </van-col>
                <van-col span="12">
                    <p>{{ count.finishCourseCount }}/ {{ count.allCourseCount }}</p>
                    <p>选学</p>
                </van-col>
            </van-row>
        </div>
        <ul class="list">
            <li v-for="(item,index) in list" :key="index" @click="$router.push(item.path)">
                <img :src="item.icon" class="icon" alt />
                <p>{{item.title}}</p>
                <img :src="item.arrows" class="arrows" alt />
            </li>
        </ul>
    </div>
</template>
<script>
import api from '@/api/account';

export default {
    data() {
        return {
            userInfo: {
                name: '就哈哈',
                portrait: '',
            },
            count: {
                finishTaskCount: 1,
                allTaskCount: 2,
                finishCourseCount: 1,
                allCourseCount: 2    
            },
            list: [
                {
                    title: "个人评估",
                    icon: require("../../assets/images/ic_gr_wdbj@2x.png"),
                    arrows: require("../../assets/images/ic_gengduo@2x(1).png")
                },
                {
                    title: "我的测试",
                    icon: require("../../assets/images/7@2x.png"),
                    arrows: require("../../assets/images/ic_gengduo@2x(1).png")
                },
                {
                    title: "我的消息",
                    icon: require("../../assets/images/5@2x.png"),
                    arrows: require("../../assets/images/ic_gengduo@2x(1).png")
                },
                {
                    title: "我的设置",
                    path: '/setting',
                    icon: require("../../assets/images/9@2x.png"),
                    arrows: require("../../assets/images/ic_gengduo@2x(1).png")
                }
            ]
        };
    },

    methods: {
        async getUserInfo() {
            const res = await api.getUserInfo();
            this.userInfo = res;
        },

        async getLearnCount() {
            const res = await api.getLearnCount();
            this.count = res;
        }
    }
};
</script>
<style lang="less">
.account {
    .van-index-bar__sidebar {
        display: none;
    }
    .van-cell__title {
        text-align: left;
    }
    .van-col {
        padding: 0 !important;
    }
}
</style>
<style lang="less" scoped>
@import "../../css/variables.less";
p {
    margin: 0;
}
.account {
    margin-top: 48px;
}
.top {
    width: 690px;
    margin: 0 auto 74px;
    padding: 56px 29px 40px 42px;
    background: #fff;
    box-shadow: 0px 6px 16px 0px rgba(57, 97, 104, 0.06);
    border-radius: 8px;
    border: 0px solid rgba(234, 234, 234, 1);
    box-sizing: border-box;
    .icon {
        width: 67px;
    }

    .photo {
        width: 124px;
        margin-right: 27px;
        vertical-align: middle;
    }
    .row {
        font-size: 26px;
        font-weight: 400;
        color: @textColor1;
        line-height: 37px;
    }
    .t {
        text-align: left;
        position: relative;
        margin-bottom: 72px;
        .arrows {
            width: 10px;
            position: absolute;
            top: 50px;
            right: 0;
        }
    }
    .name {
        // margin-bottom: 74px;
        display: inline-block;
        vertical-align: middle;
        .userName {
            font-size: 40px;
            font-weight: 400;
            color: @textColor1;
            line-height: 56px;
            margin-bottom: 6px;
            vertical-align: middle;
        }
        .tip {
            font-size: 28px;
            font-weight: 400;
            color: @grayfont;
            line-height: 40px;
        }
    }
}
.list {
    // width: 690px;
    margin: 0 auto;
    padding: 0 48px;
    font-size: 26px;
    li {
        margin-bottom: 72px;
        position: relative;
        text-align: left;
        .icon {
            width: 38px;
            vertical-align: middle;
            margin-right: 23px;
            &:nth-child(2) {
                width: 40px;
            }
        }
        p {
            display: inline-block;
            vertical-align: middle;
            font-size: 28px;
        }
        .arrows {
            position: absolute;
            width: 10px;
            top: 11px;
            right: 0;
        }
    }
}
</style>
