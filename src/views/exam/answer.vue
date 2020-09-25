<template>
    <div class="answer-page">
        <div class="answer-top clearfix">
            养老护理员初级理论考试
            <p @click="papersbtn">交卷</p>
        </div>
        <div class="answer-content">
            <img
                class="img"
                src="@/assets/exam/bg.png"
            />
            <div class="answer-number">
                1 / 20
            </div>
            <div class="answer-main">
                <div class="answer-title">
                    <span>00:30:23</span>
                    <span>总分：100分</span>
                    <span>及格分：60分</span>
                </div>
                <div class="answer-type">
                <img
                class="type-img"
                        src="@/assets/exam/tx.png"
                    />
                    <p>单选题</p>
                </div>
                <div class="answer-test">
                    <div class="test-title">
                        <span>2分</span> 这是题目这是题目这是题目这是题目这是题目这是题目这是题目这是题目这是题目这是题目这是题目？
                    </div>
                    <div class="test-questions">
                       <ul>
                            <li><span>A</span> <span>这是第一个选项这是第一个选项这是 第一个选项</span></li>
                            <li><span>B</span> <span>这是第二个选项</span></li>
                            <li><span>C</span> <span>这是第三个选项</span></li>
                            <li><span>D</span> <span>这是第四个选项</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="answer-footer">
                <van-button type="default" size="large" class="answer-button" @click="issheet = true">答题卡</van-button>
                <van-button type="default" size="large" class="answer-button" @click="isontopic">上一题</van-button>
                <van-button type="default" size="large" class="answer-button" @click="iscode=true">下一题</van-button>
            </div>
        </div>
        <van-action-sheet v-model="issheet">
            <div class="sheet-content">
                <div class="sheet-line" @click="issheet=false"></div>
                <div class="sheet-title clearfix">
                    <p>
                        答题卡
                    </p>
                    <div class="sheet-condition">
                        <span class="active">
                            已答
                        </span>
                        <span>
                            未答
                        </span>
                    </div>
                    
                </div>
                <div class="sheet-list">
                    <p v-for="(item, index) in actions" :key="index" :class="(index+1)==1?'sheetactive':''">
                        {{index+1}}
                    </p>
                </div>
            </div>
        </van-action-sheet>
        <van-dialog v-model="iscode" @confirm="codehandleConfirm">
            <div class="code-main">
                <div class="code-title">为保证本人考试，系统已往12345678手机上发送了验证码，验证码正确后可继续考试，验证码错误终止考试</div> 
                <div class="code-input">
                    <van-field v-model="digit" type="digit" placeholder="输入短信验证码"/>
                    <div class="code-time">120s</div>
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
import { Dialog } from 'vant';
export default {
    data(){
        return{
            digit:'',
            iscode:false,
            issheet:false,
            actions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        }
    },
    

    created() {
    },

    methods: {
        //答题卡
       issheetbtn(){
           this.issheet = true;
       },
       codehandleConfirm(){
           Dialog.alert({
            message: '验证码输入错误，系统将终止考试',
            }).then(() => {
            // on close
            });
       },
       //交卷
       papersbtn(){
           Dialog.alert({
            message: '考试时间已到，系统自动交卷',
            }).then(() => {
            // on close
            });
           
       },
       isontopic(){
           Dialog.confirm({
            message: "剩余 <span style='color:red'>"+ 5 +"</span> 题未做",
            confirmButtonText:'提交答案',
            cancelButtonText:'继续答题',
            })
            .then(() => {
                // on confirm
            })
            .catch(() => {
                // on cancel
            });
       },
      
    }
    
}
</script>
<style scoped lang="less">
.answer-page {
    height:100%;
    width:100%;
    .answer-top{
        padding:0px 32px;
        font-size: 34px;
        font-weight: bolder;
        color: #272F55;
        height:88px;
        line-height: 88px;
        p{
            float:right;
            font-size: 30px;
            font-weight: bolder;
            color: #575765;
            line-height: 88px;
        }
    }
    .answer-content{
        width:100%;
        height:calc(100% - 2.35rem);
        background: #FDD0A5;
        position: relative;
        .img{
            width:100%;
            height:calc(100% - 3.46rem);
        }
        .answer-number{
            position: absolute;
            top:72px;
            right:60px;
            font-size: 0.64rem;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 34px;
            transform:rotate(45deg);
        }
        .answer-main{
            width: calc(100% - 2.56rem);
            height:calc(100% - 6.1rem);
            position: absolute;
            left: 48px;
            top: 50px;
            padding:48px 48px 0;
            box-sizing: border-box;
            overflow-y:auto;
            .answer-title{
                text-align: left;
                span{
                    font-size: 0.64rem;
                    font-weight: 400;
                    color: #737386;
                    line-height: 34px;
                    margin-right:32px;
                    &:first-child{
                        font-size: 28px;
                        font-weight: bolder;
                        color: #E85D3E;
                        line-height: 40px;
                        margin-right: 48px;
                    }
                    
                }
            }
            .answer-type{
                margin-top:64px;
                position: relative;
                .type-img{
                    width: 210px;
                }
                p{
                    width:100%;
                    line-height: 40px;
                    font-size: 24px;
                    font-weight: 400;
                    color: #E85D3E;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
            .answer-test{
                margin-top:48px;
                text-align: left;
                .test-title{
                    font-size: 30px;
                    font-weight: bolder;
                    color: #272F55;
                    line-height: 42px;
                    span{
                        font-size: 28px;
                        font-weight: 400;
                        color: #E85D3E;
                        position: relative;
                        line-height: 40px;
                        padding-left: 16px;
                        &::before {
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: #E85D3E;
                            content: '';
                            left: 0;
                            top: 8px;
                        }
                    }
                }
                .test-questions{
                    ul li{
                        border-radius: 60px;
                        border: 2px solid #EEEEEE;
                        padding:32px 24px;
                        font-size: 28px;
                        font-weight: bolder;
                        color: #272F55;
                        line-height: 40px;
                        margin-bottom:32px;
                        span{
                            width:30px;
                            &:last-child{
                                flex:1
                            }
                        }
                        &:first-child{
                            margin-top:64px;
                        }
                    }
                }
            }
        }
        .answer-footer{
            width:100%;
            position: absolute;
            left:0px;
            bottom: 48px;
            .answer-button{
                width: 196px;
                height: 80px;
                background: #F6734C;
                border-radius: 50px;
                margin-left:32px;
                color: #FFFFFF;
                font-weight: bolder;
                font-size: 28px;
                line-height: 80px;
                &.van-button::before{
                    background: #F6734C;
                }
                &:first-child{
                    color: #E85D3E;
                    background: #FFFFFF;
                    margin-left: 0px;
                    &.van-button::before{
                        background: #FFFFFF;
                    }
                }
                
            }
            .van-button--default{
                border: 0;
            }
            
        }
    }
    .sheet-content{
        padding:0 32px;
        .sheet-line{
            width: 40px;
            height: 4px;
            background: #DDDDDD;
            border-radius: 2px;
            margin: 20px auto 0 auto;
        }
        .sheet-title{
            text-align:left;
            height:36px;
            line-height: 36px;
            margin:32px 0 64px 0;
            p{
                font-size: 36px;
                font-weight: bolder;
                color: #272F55;
                
                float:left;
            }
            .sheet-condition{
                float:right;
                span{
                    display:inline-block;
                    font-size: 28px;
                    font-weight: 400;
                    color: #575765;
                    position: relative;
                    width:90px;
                    &:first-child{
                        margin-right:32px;
                    }
                     &::before {
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        border: 2px solid #E6E6EB;
                        border-radius: 50%;
                        background: #fff;
                        content: '';
                        left: -34px;
                        top: 4px;
                    }
                    &.active{
                        color: #E85A3A;
                        &::before {
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: rgba(232, 90, 58, 0.1);
                            border: 2px solid rgba(232, 90, 58, 0.2);
                            content: '';
                            left: -34px;
                            top: 4px;
                        }
                        
                    }
                }
            }
        }
        .sheet-list{
            p{
                width: 64px;
                height: 64px;
                line-height:66px;
                border: 2px solid #E6E6EB;
                border-radius: 50%;
                font-size: 30px;
                font-weight: bolder;
                color: #737386;
                display:inline-block;
                margin:0 54px 54px 0;
                &:nth-child(6n){
                    margin-right:0px;
                }
                &.sheetactive{
                    color: #E85A3A;
                    background: rgba(232, 90, 58, 0.1);
                    border: 2px solid rgba(232, 90, 58, 0.2);
                }
            }
        }
    }
    .code-main{
        padding:48px;
        .code-title{
            text-align:left;
            font-size: 30px;
            font-weight: bolder;
            color: #272F55;
            line-height: 42px;
        }
        .code-input{
            width: 100%;
            height: 80px;
            background: #F5F5F5;
            border-radius: 8px;
            padding:20px 32px;
            box-sizing: border-box;
            display:flex;
            margin-top:40px;
            .van-cell{
                background: #F5F5F5;
                padding:0;
                flex:1,
            }
            .code-time{
                font-size: 28px;
                font-weight: 400;
                color: #272F55;
                line-height: 40px;
                width:60px;
                margin-left:100px;
            }
        }
    }
    
}
</style>