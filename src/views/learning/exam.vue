<template>
    <div>
        <van-nav-bar
            :title="type=='exam'? '期末考试' : '章节作业'"
            right-text="答题卡"
            left-arrow
            @click-left="goback"
            @click-right="showAnswerCard"
        />
        <div class="subject" v-for="(subject,i) in list" :key="subject.id" v-show="index == i">
            <div class="header">
                <div class="title">
                    <span>单选题</span>
                </div>
                <div class="right">
                    <van-count-down class="time" :time="time" format="mm:ss"/>
                    <div class="index">
                        <span class="active-index">{{index+1}}</span>/<span>{{list.length}}</span>
                    </div>
                </div>
            </div>
            <van-divider />
            <div class="content">
                {{subject.content}}
            </div>
            <div class="select">
                <div class="item" @click="switchSelect(index)" :class="{active: subject.selectedIndex === index}" v-for="(item,index) in subject.selectList" :key="index">
                    {{indexToString(index)}}.{{item}}
                </div>
            </div>
        </div>
        <div class="switch-subject">
            <span class="icon iconfont icon-shangyige" @click="switchSubject(-1)"></span>
            <span class="icon iconfont icon-xiayige" @click="switchSubject(1)"></span>
        </div>
        <van-action-sheet v-model="isAnswerCardShow" title="标题">
            <div class="answer-card">
                <div class="answer-preview">
                    <div class="item" :class="{hasAnswered: subject.selectedIndex !== ''}" v-for="(subject,index) in list" :key="subject.id">
                        {{index}}
                    </div>
                </div>
                <van-button color="#038ee3" round type="primary" @click="submit()">提交</van-button>
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
                        content: ' 一类环境中，钢筋混凝土梁的保护层厚度最小取,保护层厚度最小取保护层厚度最小取',
                        selectedIndex: '',
                        selectList: ['15mm','20mm','25mm','30mm']
                    },
                    {
                        id: 2,
                        content: '我是第二题，保护层厚度最小取保护层厚度最小取',
                        selectedIndex: '',
                        selectList: ['取整','取小数','取负数','取正数']
                    }
                ]
            }
        },
        created() {
            this.type = this.$route.query.type || 'exam';
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
                this.list[this.index].selectedIndex = index;
            },
            switchSubject: function(change){
                let targetIndex = this.index + change;
                if(targetIndex < 0 || targetIndex > this.list.length - 1) return;
                this.index = targetIndex;
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
                        this.$router.push('/learning/home')
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../css/variables";

    .subject{
        padding: 15px 20px;

        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title{
                position: relative;
                display: flex;

                &::before{
                    position: absolute;
                    left: 0;
                    top:50%;
                    width:6px;
                    height: 20px;
                    background-color: @tifiniyGreen;
                    content: '';
                    transform: translateY(-50%);
                }

                span{
                    display: inline-block;
                    margin-left: 14px;
                }
            }

            .right{
                display: flex;
                align-items: center;

                .time{
                    color: @blue !important;
                    margin-right: 10px;
                }

                .index{
                    font-size: 14px;

                    .active-index{
                        font-size: 16px;
                        font-weight: 500;
                    }
                }
            }
        }

        .content{
            text-align: left;
            font-size: 14px;
        }

        .select{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;

            .item{
                border-radius: 4px;
                border: 1px solid @tifiniyGreen;
                width: 90%;
                height: 30px;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                padding-left: 10px;

                &.active{
                    background-color: @tifiniyGreen;
                    color: #FFF;
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
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 5px 10px;

        .answer-preview{
            display: flex;
            flex-wrap: wrap;

            .item{
                width: 40px;
                height: 40px;
                border-radius: 999px;
                margin: 10px 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid;
                font-weight: 500;

                &.hasAnswered{
                    background-color: @blue;
                    color: #FFF;
                }
            }
        }
    }
</style>
