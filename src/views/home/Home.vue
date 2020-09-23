<template>
    <div class="home">
        首页
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    data() {
        return {};
    }
};
</script>
<style lang="less">
@import "../../css/variables.less";
.home {
    .van-notice-bar {
        color: #2c3e50;
    }
    .van-notice-bar__left-icon {
        color: #1989fa;
    }
    .van-icon {
        position: relative;
        top: 2px;
    }
    .van-loading {
        display: inline-block;
        margin-right: 10px;
    }
    .van-button__text {
        position: relative;
        top: 1px;
        left: 1px;
    }
    .van-swipe-item {
        margin-right: 24px;
    }
    .van-nav-bar__title {
        margin: 0;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: @textColor1;
        line-height: 34.5px;
    }
    .van-button--info {
        border: 0;
    }
}
</style>
<style lang="less" scoped>
@import "../../css/variables.less";
.home {
    width: 690px;
    margin: 40px auto;
    .Search {
        width: 34px;
        margin-right: 36px; 
    }
    .message {
        width: 36px;
    }
}
h4 {
    margin: 0;
}
p {
    margin: 0;
}
.title {
    font-size: 38px;
    font-weight: 600;
}
.banner {
    margin: 48px 0 34px;
    img {
        width: 100%;
    }
}
.assessment,
.resource {
    width: 334px;
}
.assessment {
    margin-right: 22px;
}

.learning {
    margin-top: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 16px 0px rgba(57, 97, 104, 0.11);
    border-radius: 6px;
    border: 0px solid rgba(234, 234, 234, 1);
    padding: 32px 28px 39px;
    .title {
        text-align: left;
        font-size: 32px;
        font-weight: 600;
        color: #272f55;
        line-height: 45px;
        margin-bottom: 44px;
        img {
            width: 26px;
            margin-right: 24px;
        }
    }
    .list {
        margin-top: 5px;
        p {
            font-weight: 400;
            color: @textColor1;
            line-height: 33px;
        }
        .left {
            text-align: left;
            img {
                width: 54px;
                margin-right: 15px;
                vertical-align: middle;
            }
            h4 {
                font-size: 28px;
                font-weight: 600;
                color: @textColor1;
                line-height: 40px;
                vertical-align: middle;
                display: inline-block;
            }
            p {
                margin-top: 25px;
                font-size: 24px;
            }
        }
        .right {
            text-align: right;
            p {
                margin-top: 31px;
                font-size: 22px;
            }
            .continue-study {
                color: @tifiniyGreen2;
                text-align: right;
                font-size: 26px;
            }
        }
    }
}
.top {
    overflow: hidden;
    margin-bottom: 28px;
    .title {
        float: left;
        font-size: 38px;
        font-weight: 600;
        color: @textColor1;
        line-height: 53px;
    }
    .more {
        float: right;
        color: @textColor3;
        font-size: 26px;
        font-weight: 400;
        line-height: 37px;
    }
}
.sinatv-list {
    margin: 80px 0;
    .list {
        li {
            text-align: left;
            margin-bottom: 34px;
            height: 240px;
            img {
                width: 192px;
                margin-right: 28px;
            }
            .right {
                margin-top: 6px;
                display: inline-block;
                width: 454px;
                vertical-align: top;
                position: relative;
                height: 100%;
                h4 {
                    font-size: 34px;
                    font-weight: 400;
                    color: @textColor1;
                    line-height: 50px;
                    margin-bottom: 14px;
                }
                p {
                    font-size: 24px;
                }
                .live {
                    width: 27px;
                    margin-left: 8px;
                }
                .btn {
                    width: 148px;
                    height: 52px;
                    background-color: @tifiniyGreen2;
                    display: block;
                    margin-top: 28px;
                    border-radius: 4px;
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                    padding: 0;
                }
            }
        }
    }
}
.professional {
    //   width: 100%;
    margin: 0 auto 80px;
    text-align: left;
    .title {
        text-align: left;
        margin-bottom: 28px;
    }
    .list {
        width: 690px;
        white-space: nowrap;
        overflow-x: scroll;

        .li {
            display: inline-block;
            width: 368px;
            margin-right: 24px;
            vertical-align: top;
            padding-bottom: 5px;
            img {
                width: 100%;
                height: 185px;
            }
            h4 {
                font-size: 30px;
                font-weight: 400;
                color: @textColor1;
                line-height: 44px;
                width: 100%;
                white-space: initial;
            }
            p {
                font-size: 22px;
                font-weight: 400;
                color: @textColor3;
                line-height: 30px;
                margin-top: 12px;
            }
        }
    }
}
.hot-courses {
    margin-top: 15px;
    margin-bottom: 48px;
    .list {
        li {
            width: 330px;
            float: left;
            margin-bottom: 34px;
            margin-right: 22px;
            text-align: left;
            &:nth-child(2n) {
                margin-right: 0;
            }
            img {
                width: 100%;
            }
            h4 {
                font-size: 30px;
                font-weight: 400;
                color: @textColor1;
                line-height: 44px;
                margin-top: 25px;
            }
            p {
                margin-top: 12px;
                font-size: 22px;
                font-weight: 400;
                color: @textColor3;
                line-height: 30px;
            }
        }
    }
}
.new-job {
    .top {
        margin-bottom: 40px;
    }
    img {
        width: 50px;
        vertical-align: middle;
        margin-right: 18px;
    }
    .list {
        li {
            padding: 0 20px 34px;
            border-bottom: 1px solid #e6e6eb;
            margin-top: 34px;
            position: relative;
            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }
    .left {
        text-align: left;
        vertical-align: middle;
        .name {
            font-size: 30px;
            font-weight: 400;
            color: @textColor2;
            line-height: 44px;
            margin-bottom: 14px;
        }
        .education {
            height: 40px;
            span {
                display: inline-block;
                height: 40px;
                padding: 0 17px;
                background: #f3f6f8;
                margin-right: 8px;
                font-size: 18px;
                font-weight: 400;
                color: @textColor2;
                line-height: 44px;
            }
        }
        .companyName {
            margin-top: 25px;
            span {
                vertical-align: middle;
                font-size: 20px;
                font-weight: 400;
                color: @textColor2;
                line-height: 44px;
            }
        }
    }
    .right {
        text-align: right;
        vertical-align: middle;

        .companyAddress {
            font-size: 20px;
            font-weight: 400;
            color: @textColor2;
            line-height: 44px;
            position: absolute;
            bottom: 37px;
            right: 20px;
        }
        .salary {
            font-size: 30px;
            font-weight: 500;
            color: @tifiniyGreen2;
            line-height: 44px;
        }
    }
}
</style>
