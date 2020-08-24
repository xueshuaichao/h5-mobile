<template>
    <div>
        <van-nav-bar
            :title="type=='exam'? '期末考试' : '章节作业'"
            left-arrow
            @click-left="goback"
        />
        <div class="report-container">
            <div class="overview-container">
                <div class="img">
                    <div style="position: relative;top:60px;color: #1ea99f">
                        <div>正确率</div>
                        <div>{{Math.floor(rightNum/list.length*100)}}%</div>
                    </div>
                </div>
                <div class="overview">
                    <div>答对：{{rightNum}}</div>
                    <div>总题数：{{list.length}}</div>
                    <div>用时：{{time}}</div>
                </div>
                <div class="seal"></div>
            </div>
            <van-divider />
            <div class="subject-container">
                <p class="title">答题卡</p>
                <div class="example">
                    <div class="example-item">
                        <div class="icon right"></div>
                        <span>正确</span>
                    </div>
                    <div class="example-item">
                        <div class="icon wrong"></div>
                        <span>错误</span>
                    </div>
                    <div class="example-item">
                        <div class="icon empty"></div>
                        <span>未做</span>
                    </div>
                </div>
                <div class="list">
                    <div
                        class="item" :class="{right: subject.state==1,wrong:subject.state==2,empty:subject.state==0}"
                        v-for="(subject,index) in list" :key="index">
                        {{index}}
                    </div>
                </div>
            </div>
            <van-button v-if="type=='exam'" style="width: 95%" plain round color="#038ee3" type="primary">查看答案解析</van-button>
            <van-button v-else style="width: 95%" plain round color="#038ee3" type="primary">查看作业</van-button>
            <div class="remark">
                您的考试数据已写入伟东区块链，作业信息将永久保存，防篡改，可追溯
                区块链存证HASH：9cfb5a351035180a16d50ad605a939f089a2e89440ddd57dbfa90c35fde3fc0b
                区块链浏览器：www.explore.wdblockchain.com
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "report",
        data: ()=>{
            return {
                type: 'exam',
                time: "1'20'14",
                list: [
                    {
                        state: 1 //1 正确 2错误 0未答
                    },
                    {
                        state: 1
                    },
                    {
                        state: 1
                    },
                    {
                        state: 1
                    },
                    {
                        state: 0
                    },
                    {
                        state: 1
                    },
                    {
                        state: 2
                    },
                    {
                        state: 1
                    },
                    {
                        state: 2
                    },
                    {
                        state: 1
                    },
                ]
            }
        },
        computed: {
            rightNum: function(){
                return this.list.reduce((rightNum,item)=>{
                   if(item.state == 1) rightNum++;
                   return rightNum;
                },0)
            }
        },
        created() {
            this.type = this.$route.query.type || 'exam';
        },
        methods: {
            goback: function () {
                history.back();
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../css/variables';

.right{
    background: @tifiniyGreen;
    color: #FFF;
}

.wrong{
    background: red;
    color: #FFF;
}

.empty{
    border: 1px solid #a7a7a7;
    color: #a7a7a7;
}

.report-container{
    padding: 10px 15px;

    .overview-container{
        .img{
            width: 100%;
            height: 140px;
            background: url("../../assets/report@2x.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            margin-bottom: 10px;
            position: relative;
        }

        .seal{
            width: 70px;
            height: 70px;
            z-index: 100;
            background: url("../../assets/seal@2x.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            right: 30px;
            top:35px
        }

        .overview{
            font-size: 14px;
            display: flex;
            justify-content: space-around;
        }
    }

    .subject-container{
        margin-bottom: 10px;

        .title{
            text-align: left;
            font-size: 16px;
            font-weight: 500;
        }

        .example{
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .example-item{
                margin-right: 15px;

                .icon{
                    width: 12px;
                    height: 12px;
                    border-radius: 999px;
                    margin-right: 10px;
                    display: inline-block;
                }
            }
        }

        .list{
            display: flex;
            flex-wrap: wrap;

            .item{
                width: 40px;
                height: 40px;
                border-radius: 999px;
                margin: 10px 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid;
                font-weight: 500;
            }
        }
    }

    .remark{
        margin-top: 15px;
        padding: 8px;
        text-align: left;
        font-size: 12px;
        overflow: auto;
        height: 80px;
        border-radius: 4px;
        background: #cffdcf;
    }
}

</style>
