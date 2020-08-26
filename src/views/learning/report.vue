<template>
    <div>
        <van-nav-bar
            :title="type=='exam'? '期末考试' : '章节作业'"
            left-arrow
            @click-left="goback"
        />
        <div class="overview-container">
            <div class="img">
                <div style="position: relative;top:60px;color: #1ea99f">
                    <div>正确率</div>
                    <div style="font-size: 24px;font-weight: 500">{{Math.floor(rightNum/list.length*100)}}%</div>
                </div>
            </div>
            <div class="overview">
                <div>答对：{{rightNum}}</div>
                <div class="divide"></div>
                <div>总题数：{{list.length}}</div>
                <div class="divide"></div>
                <div>用时：{{time}}</div>
            </div>
            <div class="seal"></div>
        </div>
        <div class="report-container">
            <div class="subject-container">
                <div class="header">
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
                </div>
                <div class="list">
                    <div
                        class="item" :class="{right: subject.state==1,wrong:subject.state==2,empty:subject.state==0}"
                        v-for="(subject,index) in list" :key="index">
                        {{index+1}}
                    </div>
                </div>
            </div>
            <van-button v-if="type=='exam'" style="width: 95%;" plain color="#02B38A" type="primary">查看答案解析</van-button>
            <van-button v-else style="width: 95%;" plain color="#02B38A" type="primary">查看作业</van-button>
            <div class="remark">
                您的考试数据已写入伟东区块链，作业信息将永久保存，防篡改，可追溯
                区块链存证HASH：9cfb5a351035180a16d50ad605a939f089a2e894<br/>
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
                this.$router.push({
                    name: 'trainDetail',
                    params: {
                        id: 0
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../css/variables';

.right{
    background: rgba(0,193,86,0.1);
    color: rgba(2,179,138,1);
    border:1px solid rgba(2,179,138,0.6);
}

.wrong{
    background: rgba(225,44,44,0.1);
    color: rgba(240,65,66,1);
    border: 1px solid rgba(240,65,66,0.6);
}

.empty{
    border: 1px solid rgba(167,173,187,1);
    color: rgba(39,47,85,1);
}

.divide{
    width: 1px;
    height: 16px;
    background: #E6E6EB;
}

.overview-container{
    padding: 24px 15px 25px;
    box-shadow:0px 12px 32px 0px rgba(57,97,104,0.06);

    .img{
        width: 100%;
        height: 144px;
        background: url("../../assets/report@2x.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 26px;
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
        align-items: center;
    }
}

.report-container{
    padding: 0px 15px 10px;

    .subject-container{
        padding-top: 24px;
        margin-bottom: 13px;

        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            .title{
                margin: 0;
                text-align: left;
                font-size: 16px;
                font-weight: 500;
            }

            .example{
                display: flex;
                align-items: center;

                .example-item{
                    margin-right: 15px;
                    font-size: 12px;

                    .icon{
                        width: 8px;
                        height: 8px;
                        border-radius: 999px;
                        margin-right: 8px;
                        display: inline-block;
                        position: relative;
                        top: 3px;
                    }
                }
            }
        }


        .list{
            margin-top: 24px;
            display: flex;
            flex-wrap: wrap;

            .item{
                width: 40px;
                height: 40px;
                border-radius: 999px;
                margin-bottom: 16px;
                margin-right: 18px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            @media screen and (min-width: 375px) {
                .item:nth-child(6n+0){
                    margin-right: 0;
                }
            }

            @media screen and (max-width: 374px) {
                .item{
                    margin-right: 16px;
                }
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
        background: rgba(249,250,253,1);
        color:rgba(115,115,134,1);;
    }
}

</style>
