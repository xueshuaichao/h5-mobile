<template>
    <div class="container setting">
        <van-nav-bar
            title="区域单位"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="content">
            <div class="list">
                <div class="item van-hairline--bottom">
                    <p class="title">区域</p>
                    <div class="value">
                        <span>崂山区</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="item">
                    <p class="title">单位</p>
                    <div class="value">
                        <span>请选择养老机构</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
// import api from '../../api/account';

export default {
    name: 'Setting',
    
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
    },
    
    created() {
        console.log(JSON.parse(this.userInfo.extensionInfo))
    },

    methods: {
        onClickLeft() {
           this.$router.go(-1);
        },
       
        handleSignOut() {}
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
                background: pink;
                overflow: hidden;
            }
        }
    }

    .van-button {
        border-color: white;
    }
}
</style>