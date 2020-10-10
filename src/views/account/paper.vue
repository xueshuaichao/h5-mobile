<template>
    <div class="wrong-detail">
        <van-nav-bar
            title="错题本"
            left-arrow
            @click-left="$router.go(-1)"
            right-text="移除"
            @click-right="onClickRight"
        />
       <div class="showpaper-title clearfix">
           <p>{{ typeName }}</p>
       </div>
       <div class="showpaper-content">
           <div class="showpaper-test">
                <div class="test-title">
                    <span>{{ currentQuestion.perMark }}分</span> {{ currentQuestion.title }}
                </div>
                <div class="test-questions">
                    <ul>
                        <li v-for="(item, index) in currentQuestion.contentItems" :key="index"
                            :class="currentQuestion.userAnswer && currentQuestion.userAnswer.indexOf(item.code) > -1 ? 'active' : ''"
                            >
                            <span>{{ item.code }}</span> <span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="showpaper-bottom">
                <p>试题解析</p>
                <p>正确答案：{{ currentQuestion.rightAnswer }}</p>
                <p>{{ currentQuestion.remark }}</p>
            </div>
       </div>
       <div class="showpaper-footer">
            <van-button type="default" size="large" class="showpaper-button" @click="handleClickBtn(-1)">上一题</van-button>
            <van-button type="default" size="large" class="showpaper-button" @click="handleClickBtn(1)">下一题</van-button>
        </div>
    </div>
</template>
<script>
import api from '../../api/exam';

const TYPE_NAME_MAP = ['单选题', '多选题', '判断题'];

export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            params: {
                type: 1,
                questionDifficulty: 2,
                sceneCategoryId: ''
            },
            typeName: '',
            currentQuestion: '',
            currentQuestionIndex: 0,
        };
    },
    
    created() {      
        const { query } = this.$route;

        this.typeName = TYPE_NAME_MAP[query.type - 1];
        this.params = query;
        this.pageSize = query.count;

        this.getWrongQuestions();
    },

    methods: {
        getWrongQuestions() {
            api.getWrongQuestions(this.pageNum, this.pageSize, this.params).then(({ list, total }) => {
                this.total = total;
                this.list = list;
                this.currentQuestion = list[this.currentQuestionIndex];
            })
        },

        removeWrongQuestion(id) {
            api.removeWrongQuestion(id).then(() => {
                this.$toast('移除成功');
                this.currentQuestionIndex--;
                this.handleClickBtn(1);
            })
        },
        
        onClickRight() {
            this.$dialog.confirm({
                message: '确定移除该题目？',
                beforeClose: (action, done) => {
                    done()
                    if (action === 'confirm') {
                        this.removeWrongQuestion(this.currentQuestion.id)
                    }
                }
            })
        },

        handleClickBtn(type){
            let { currentQuestionIndex: index } = this;
            const isNext = type > 0;
             
            index = Math[isNext ? 'min' : 'max']( isNext ? ++index : --index, isNext ? this.total - 1 : 0);
            this.currentQuestion = this.list[index];
            this.currentQuestionIndex = index;
        },
    }
};
</script>
<style lang="less">
    .wrong-detail{
        width:100%;
        min-height:100%;
        background: #F5F5FA;
        .showpaper-title{
            height: 76px;
            line-height: 76px;
            text-align: left;
            padding:32px 32px 32px 0;
            p{
                float:left;
                width: 160px;
                height: 76px;
                font-size: 28px;
                font-weight: 400;
                color: #737386;
                background: linear-gradient(0deg, transparent 0px, #F9FAFD 0) top left,
                linear-gradient(-110deg, transparent 18px, #F9FAFD 0) top right,
                linear-gradient(-66deg, transparent 18px, #F9FAFD 0) bottom right,
                linear-gradient(0deg, transparent 0px, #F9FAFD 0) bottom left;
                background-size: 50% 50%;
                background-repeat: no-repeat;
                
                padding-left: 30px;
                box-sizing: border-box;
            }
            span{
                font-size: 24px;
                font-weight: 400;
                color: #737386;
                &:nth-child(2){
                    padding:0 32px 0 56px;
                }
                &:last-child{
                    float:right;
                    strong{
                        font-size: 36px;
                        color: #272F55;
                        line-height: 36px;
                    }
                    
                
                }
                
            }
        }
        .showpaper-content{
            width:calc(100% - 1.6rem);
            min-height:calc(100% - 7.573rem);
            margin:0 auto;
            overflow-y:auto;
            background: #FFFFFF;
            border-radius: 12px;
            .showpaper-test{
                text-align: left;
                padding:48px;
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
                        font-size: 28px;
                        font-weight: bolder;
                        color: #737386;
                        line-height: 40px;
                        margin-bottom:32px;
                        display:flex;
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
                            color: #E85D3E;
                        }
                    }
                }
            }
            .showpaper-bottom{
                border-top: 2px solid #E6E6EB;
                text-align:left;
                padding: 0 48px;
                padding-bottom: 52px;
                p:first-child{
                    font-size: 30px;
                    color: #272F55;
                    line-height: 42px;
                    font-weight: bolder;
                    padding:40px 0 20px;
                }
                p:nth-child(2){
                    font-size: 28px;
                    font-weight: 400;
                    color: #00B288;
                    line-height: 40px;
                    margin-bottom:10px;
                }
                p:last-child{
                    font-size: 28px;
                    font-weight: 400;
                    color: #575765;
                    line-height: 40px;
                }
            }

        }
        .showpaper-footer{
            width:100%;
            margin-top: 32px;
            .showpaper-button{
                width: 206px;
                height: 80px;
                background: #F6734C;
                border-radius: 50px;
                margin-left:32px;
                color: #FFFFFF;
                font-weight: bolder;
                font-size: 28px;
                line-height: 80px;
                .van-button--default{
                    border: 0;
                }
                &.van-button::before{
                    background: #F6734C;
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
                        &:first-child{
                            color: #00B288;
                            margin-right:32px;
                            &::before {
                                position: absolute;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background: #00B288;
                                border: 2px solid #00B288;
                                content: '';
                                left: -34px;
                                top: 4px;
                            }
                            
                        }
                        &:nth-child(2){
                            color: #E85A3A;
                            margin-right:32px;
                            &::before {
                                position: absolute;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background: #E85A3A;
                                border: 2px solid #E85A3A;
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
                    &.sheetactive1{
                        color: #fff;
                        background: #00B288;
                        border: 2px solid #00B288;
                    }
                    &.sheetactive2{
                        color: #fff;
                        background: #E85A3A;
                        border: 2px solid #E85A3A;
                    }
                }
            }
        }
    }
    .van-nav-bar__text {
        color: #575765;
    }


</style>
