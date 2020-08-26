<template>
    <div style="background: #fcfdfd">
        <van-nav-bar
            :title="type=='exam'? '期末考试' : '章节作业'"
            left-arrow
            @click-left="goback"
            @click-right="showAnswerCard"
        >
            <span slot="right">答题卡</span>
        </van-nav-bar>
        <div class="header">
            <div class="title"></div>
            <div class="time-count" v-if="type == 'exam'">
                <span style="color: #038ee3;font-size:14px">倒计时：</span><van-count-down  class="time" :time="time" format="mm:ss"/>
            </div>
            <div class="right">
                <div class="index">
                    <span class="active-index">{{index+1}}</span> / <span>{{list.length}}</span>
                </div>
            </div>
        </div>
        <div class="container">
            <van-swipe ref="subjectList" :duration="200" class="my-swipe" indicator-color="white" :show-indicators="false" :loop="false" @change="switchSubject">
                <van-swipe-item  v-for="(subject) in list" :key="subject.id">
                    <div class="subject">
                        <div class="content">
                            {{subject.content}}
                        </div>
                        <div class="select">
                            <div class="item" @click="switchSelect(index)" :class="{active: subject.selectedIndex === index}" v-for="(item,index) in subject.selectList" :key="index">
                                <div class="item-index">{{indexToString(index)}}.</div>
                                <div class="item-content">{{item}}</div>
                            </div>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>

        </div>

<!--        <div class="switch-subject">-->
<!--            <span class="icon iconfont icon-shangyige" @click="switchSubject(-1)"></span>-->
<!--            <span class="icon iconfont icon-xiayige" @click="switchSubject(1)"></span>-->
<!--        </div>-->
        <van-action-sheet v-model="isAnswerCardShow" title="答题卡" close-icon="">
            <div class="answer-card">
                <div class="answer-preview">
                    <div class="item" :class="{hasAnswered: subject.selectedIndex !== ''}" v-for="(subject,index) in list" :key="subject.id">
                        {{index}}
                    </div>
                </div>
                <van-button type="primary" @click="submit()" class="submit">提交</van-button>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
    import {indexToString} from "../../libs/utils";

    export default {
        name: "exam",
        data: ()=>{
            return {
                type: 'exam',
                isAnswerCardShow: false,
                time: 40 * 60 * 1000,
                index: 0,
                list: [
                    {
                        id: 1,
                        content: ' 一类环境中,钢筋混凝土梁的保护层厚度最小取多少?',
                        selectedIndex: '',
                        selectList: ['15mm','20mm','25mm','30mm']
                    },
                    {
                        id: 2,
                        content: '钢筋的验收要注意什么？',
                        selectedIndex: '',
                        selectList: ['验收内容包含钢筋出厂质量证明，外观检查，并按有关规定取样进行机械性能试验','筋进场应有出厂质量证明书或试验报告单','每次取样应至少留置一组试件','钢筋进场后在运输和储藏时，不得损坏标志']
                    },
                    {
                        id: 3,
                        content: '钢筋工安全注意事项错误的是？',
                        selectedIndex: '',
                        selectList: ['钢筋工进入现场必须遵守安全生产六大纪律，遵守安全操作规程。要戴好安全帽，系好帽带；高处作业系好保险带，扣好保险扣，做到高挂低用',
                            '可以穿高跟鞋、拖鞋、赤脚或汹酒后进入工地。',
                            '不懂电气、机械人员，严禁使用和摆弄。',
                            '禁止在高处往下或向上抛掷材料和工具等物件']
                    },
                    {
                        id: 4,
                        content: '钢筋工操作规程正确的是？',
                        selectedIndex: '',
                        selectList: ['钢材、半成品等应按规格、品种分别堆放整齐，制作场地婴平整，工作台要稳固，照明灯具必须加网罩。',
                            '在距离外电线路较近处进行钢筋作业时，必须注意安全，严禁钢筋碰及外电线路。',
                            '现场绑扎钢筋或安装钢筋骨架，必须有平稳、牢固、安全的操作台，在高空、深坑钢筋作业时，要搭设脚手架做操作台。绑扎高层建筑圈梁、挑梁、外墙、边柱钢筋，应搭设外架并张挂安全网防护。绑扎时系好安全带。',
                            '绑扎立柱、墙体钢筋，不得站在钢筋骨架上攀登骨架上下；柱筋高度在5米以上的，应搭设工作台。柱梁骨架，应采取临时支撑拉牢，以防倾倒。']
                    },
                    {
                        id: 5,
                        content: '钢筋弯起60度时，斜长计算系数是？',
                        selectedIndex: '',
                        selectList: ['2h',
                            '1.41h',
                            '1.15h',
                            '1h']
                    },
                ]
            }
        },
        created() {
            this.type = this.$route.query.type || this.$route.name || 'exam';
        },
        methods: {
            indexToString:indexToString,
            goback: function(){
                history.back();
            },
            showAnswerCard: function(){
                this.isAnswerCardShow = true;
            },
            switchSelect: function (index) {
                //第一次没选过
                if(!this.list[this.index].selectedIndex){
                    if(this.index != this.list.length - 1){
                        setTimeout(()=>{
                            this.$refs.subjectList.next()
                        },500)
                    }else{
                        setTimeout(()=>{
                            this.isAnswerCardShow = true;
                        },500)
                    }
                }

                this.list[this.index].selectedIndex = index;
            },
            switchSubject: function(index){
                this.index = index;
            },
            submit: function(forceSubmit){
                let noAnswerSubject = this.list.find((subject)=> subject.selectedIndex === '');
                if(noAnswerSubject && !forceSubmit){
                    this.$dialog.confirm({
                        title: '提示',
                        message: '您还有题目未作答，确认提交？',
                        confirmButtonColor: ' #038ee3'
                    })
                    .then(() => {
                        this.submit(true)
                    })
                    return;
                }

                this.$toast.loading({
                    message: '提交中',
                    forbidClick: true,
                    onClose: ()=>{
                        this.$router.push({
                            name: 'report',
                            query: {
                                type: this.type
                            }
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../css/variables";

    .header{
        margin-top: 16px;
        margin-right: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title{
            position: relative;
            display: flex;
            width: 80px;
            height: 38px;
            background-image: url("../../assets/radio-subject@2x.png");
            background-size: contain;
        }

        .time-count{
            display: flex;
            position: relative;
            left: -14px;

            .time{
                color: @blue !important;
                margin-right: 10px;
            }
        }



        .index{
            font-size: 14px;
            color: #F04142;

            .active-index{
                font-size: 16px;
                font-weight: 500;
            }
        }
    }

    .container{
        margin: 16px 15px;
        padding: 24px 25px;
        background: #FFF;

        .subject{
            .content{
                text-align: left;
                font-weight: 500;
            }

            .select{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 20px;

                .item{
                    border-radius: 4px;
                    width: 100%;
                    min-height: 48px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    padding: 10px 10px 10px 20px;
                    background: rgba(249,250,253,1);
                    text-align: left;
                    font-weight: 500;
                    color: rgba(39,47,85,1);
                    display: flex;
                    box-sizing: border-box;

                    &.active{
                        background-color: rgba(2,179,138,.1);
                        color:rgba(2,179,138,1);
                    }

                    .item-index{
                        display: flex;
                        justify-content: center;
                        margin-right: 5px;
                    }
                }
            }

        }
    }


    .switch-subject{
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        position: absolute;
        bottom: 10%;
        width: 100%;
        box-sizing: border-box;

        span{
            font-size: 30px;
            font-weight: 600;
            color: @blue;
            opacity: 0.9;
        }
    }

    .answer-card{
        overflow: auto;
        height: 240px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 15px 15px;

        .answer-preview{
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
                font-weight: 500;
                border:1px solid rgba(167,173,187,1);

                &.hasAnswered{
                    color: rgba(2,179,138,1);
                    background:rgba(0,193,86,0.1);
                    border:1px solid rgba(2,179,138,0.6);
                }
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

    .submit{
        font-weight: 500;
        background: rgba(2,179,138,1);
    }
</style>
