<template>
    <div class="container setting">
        <van-nav-bar
            title="设置"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="content">
            <div class="list">
                <div class="item van-hairline--bottom" @click="$router.push('/setting/name')">
                    <p class="title">姓名</p>
                    <div class="value">
                        <span>
                           {{ userInfo.username || '完善信息' }}
                        </span>
                        <span></span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="item van-hairline--bottom" @click="$router.push('/setting/photo')">
                    <p class="title">修改头像</p>
                    <div class="value">
                        <div class="photo" v-if="userInfo.avatar">
                            <img :src="userInfo.avatar" alt="" width="56">
                        </div>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="item van-hairline--bottom" @click="$router.push('/setting/password')">
                    <p class="title">修改密码</p>
                    <div class="value">
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="item" @click="$router.push('/setting/phone')">
                    <p class="title">修改手机号</p>
                    <div class="value">
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>

            <!-- 区域单位 -->
            <div class="list">
                <div class="item" @click="$router.push('/company')">
                    <p class="title">区域单位</p>
                    <div class="value">
                        <span v-if="userInfo.selectedLabels">
                            {{ userInfo.selectedLabels[1] || '完善信息' }}
                        </span>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 退出登录 -->
        <van-button type="default" size="large" class="fixed-bottom" @click="handleSignOut"> 退出登录 </van-button>
    </div>
</template>
<script>
import mixins from './mixins';

export default {
    name: 'Setting',
    
    mixins: [mixins],

    methods: {
        onClickLeft() {
           this.$router.go(-1);
        },
       
        handleSignOut() {
            this.$dialog.confirm({
                message: '确定退出登录？',
                beforeClose: (action, done) => {
                    done()
                    if (action === 'confirm') {
                        // todo clear login status
                        this.$passport.signOut().then(() => {
                            this.$router.push('/')
                        }).catch(err => this.$toast.fail(err))
                    }
                }
            })
       }
    },
}   
</script>

<style lang="less">
@import '../../css/variables.less';

.setting {
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
                vertical-align: middle;
                overflow: hidden;
            }
        }
    }

    .van-button {
        border-color: white;
    }
}
</style>