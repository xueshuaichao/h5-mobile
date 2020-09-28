<template>
    <div class="answer-page">
        <div class="answer-top clearfix">
            养老护理员初级理论考试
            <p @click="papersbtn">交卷</p>
        </div>
        <div class="answer-content" v-if="istest">
            <img
                class="img"
                src="@/assets/exam/bg.png"
            />
            <div class="answer-number">
                {{testindex+1}} / {{testform.totalCount}}
            </div>
            <div class="answer-main">
                <div class="answer-title">
                    <span>{{duration}}</span>
                    <span>总分：{{testform.totalScore}}分</span>
                    <span>及格分：{{testform.itemList[0].perMark}}分</span>
                </div>
                <div class="answer-type">
                <img
                class="type-img"
                        src="@/assets/exam/tx.png"
                    />
                    <p>{{testlist[testindex].type===1?'单选题':testlist[testindex].type===2?'多选题':'判断题'}}</p>
                </div>
                <div class="answer-test">
                    <div class="test-title">
                        <span>2分</span> {{testlist[testindex].title}}
                    </div>
                    <div class="test-questions">
                       <ul>
                            <li v-for="(opt,index) in testlist[testindex].contentItems" :key="index"
                                :class="[testlist[testindex].answerList.indexOf(opt.code)!==-1?'active':'']"
                                @click="activebtn(testlist[testindex],opt)">
                                <span>{{opt.code}}</span> <span>{{opt.value}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="answer-footer">
                <van-button type="default" size="large" class="answer-button" @click="issheet = true">答题卡</van-button>
                <van-button type="default" size="large" class="answer-button" @click="onquestion">上一题</van-button>
                <van-button type="default" size="large" class="answer-button" @click="nextquestion">下一题</van-button>
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
                    <p v-for="(item, index) in testlist" :key="index" :class="item.answerList.length>0?'sheetactive':''">
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
                    <div class="code-time">{{codetime}}s</div>
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
import { Dialog } from 'vant';
import exam from '../../api/exam';
export default {
    data(){
        return{
            codetime:120,
            testindex:0,
            testlist:[],
            testform:{},
            istest:false,
            digit:'',
            iscode:false,
            issheet:false,
            maxtime: 0,
            duration:'00:00:00',
            time: null,
            timer:null,
            iscodetime:0,
            codetimer:null,
            
        }
    },
    

    created() {
        this.getScenePaper(this.$route.query.id)
        
    },

    methods: {
        activebtn(item,opt){
            let that=this;
            if(item.type===1 || item.type===3){
                if(this.testlist[this.testindex].answerList.indexOf(opt.code)===-1){
                    this.testlist[this.testindex].answerList=[];
                    this.testlist[this.testindex].answerList.push(opt.code)
                }
            }else if(item.type===2){
               if(this.testlist[this.testindex].answerList.indexOf(opt.code)===-1){
                    this.testlist[this.testindex].answerList.push(opt.code)
                }else{
                    this.testlist[this.testindex].answerList.forEach((val,index)=>{
                        if(val===opt.code){
                            that.testlist[this.testindex].answerList.splice(index, 1);
                        }
                    })
                }
            }
            this.$forceUpdate();
        },
        onquestion(){
            if(this.testindex!==0){
                this.testindex--;
            }
        },
        nextquestion(){
            if(this.testindex+1 < this.testform.totalCount){
                this.testindex++;
            }
            
        },
        async getScenePaper(id){
            let that=this;
            exam.getScenePaper({sceneId:id}).then((res) => {
                res.itemList.forEach(val=>{
                    if(val.questionList){
                        val.questionList.forEach(opt=>{
                            opt.answerList=[];
                            that.testlist.push(opt)
                        })
                    }
                })
                this.testform = res;
                this.istest=true;
                this.maxtime=this.testform.duration;
                this.countDown();
            });
        },
        // 倒计时
        countDown() {
            // 定义函数 此函数名必须与触发事件的函数名一致
            const self = this;
            self.maxtime *= 60;

            this.timer = setInterval(() => {
                if (self.maxtime > 0) {
                    const hours = Math.floor(self.maxtime / 60/60);
                    const minutes = Math.floor(self.maxtime /60 %60);
                    const seconds = Math.floor(self.maxtime % 60);
                    var hours1 = hours< 10 ?'0'+hours:hours;
                    var minutes1 = minutes< 10 ?'0'+minutes:minutes;
                    var seconds1 = seconds< 10 ?'0'+seconds:seconds;
                    this.duration=hours1+':'+minutes1+':'+seconds1
                    self.maxtime -= 1;
                    self.iscodetime+=1;
                    if(self.iscodetime===300){
                        this.iscode=true;
                        this.codetimebtn();
                    }
                } else {
                    clearInterval(this.timer);
                       Dialog.alert({
                        message: '考试时间已到，系统自动交卷',
                        }).then(() => {
                            this.papersbtn(1)
                        });
                }
            }, 1000);
        },
        codetimebtn(){
            const self = this;
            this.codetimer = setInterval(() => {
                if (self.codetime > 0) {
                   self.codetime -= 1;
                    this.$forceUpdate();
                } else {
                    clearInterval(this.codetimer);
                    self.codehandleConfirm()
                }
            }, 1000);
        },
        //答题卡
       issheetbtn(){
           this.issheet = true;
       },
       codehandleConfirm(){
           clearInterval(this.codetimer);
           Dialog.alert({
            message: '验证码输入错误，系统将终止考试',
            }).then(() => {
            // on close
            });
       },
       //交卷
       papersbtn(tag){
           let formItem={
                paperId:this.$route.query.id,
                commitTime:(new Date()).getTime(),
                answerList:[],
            }
            this.testlist.forEach(val=>{
               if(val.answerList.length>0){
                   let params={
                        answer: val.answerList.join(","),
                        mark: 0,
                        questionId: val.id,
                        questionType: val.type,
                    }
                    formItem.answerList.push(params);
               }
           })
           if(tag!==1 && formItem.answerList.length<this.testform.totalCount){
               let count= this.testform.totalCount- formItem.answerList.length;
                    Dialog.confirm({
                    message: "剩余 <span style='color:red'>"+ count +"</span> 题未做",
                    confirmButtonText:'提交答案',
                    cancelButtonText:'继续答题',
                    })
                    .then(() => {
                        this.commitPaper(formItem);
                        // on confirm
                    })
                    .catch(() => {
                        // on cancel
                    });
           }else{
               this.commitPaper(formItem);
           }
        //    return;
            // 

        //    Dialog.alert({
        //     message: '考试时间已到，系统自动交卷',
        //     }).then(() => {
        //     // on close
        //     });
       },
       commitPaper(formItem){
           exam.commitPaper(formItem).then((res) => {
               this.$router.push({
                    path: '/result',
                    query: {
                        id: this.$route.query.id,
                    },
                });
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
                        &.active{
                            background: rgba(0, 178, 136, 0.1);
                            color: #00B288;
                            border: 2px solid rgba(0, 178, 136, 0.1);
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
            text-align:left;
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
                text-align:center;
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