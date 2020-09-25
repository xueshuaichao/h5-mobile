<template>
    <div class="showpaperBox">
       <div class="showpaper-title clearfix">
           <p>单选题</p>
           <span>总分：100分</span>
           <span>及格分：60分</span>
           <span><strong>1</strong> / 20</span>
       </div>
       <div class="showpaper-content">
           <div class="showpaper-test">
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
            <div class="showpaper-bottom">
                <p>试题解析</p>
                <p>正确答案：C</p>
                <p>因为是这样，所以我们要选这个，因为是这样，所以我们要选这个因为是这样，所以我们要。</p>
            </div>
       </div>
       <div class="showpaper-footer">
            <van-button type="default" size="large" class="showpaper-button" @click="issheet = true">答题卡</van-button>
            <van-button type="default" size="large" class="showpaper-button" @click="isontopic">上一题</van-button>
            <van-button type="default" size="large" class="showpaper-button" @click="iscode=true">下一题</van-button>
        </div>
        <van-action-sheet v-model="issheet">
            <div class="sheet-content">
                <div class="sheet-line" @click="issheet=false"></div>
                <div class="sheet-title clearfix">
                    <p>
                        答题卡
                    </p>
                    <div class="sheet-condition">
                        <span>
                            答对
                        </span>
                        <span>
                            答错
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
    </div>
</template>
<script>
// import api from '@/api/account';

export default {
    data() {
        return {
          issheet:false,
          iscode:false,
          actions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        };
    },
    
    created() {
       
    },

    methods: {
        isontopic(){

        },
    }
};
</script>
<style lang="less" >
    .showpaperBox{
        width:100%;
        height:100%;
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
            height:calc(100% - 7.573rem);
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
                    }
                }
            }
            .showpaper-bottom{
                border-top: 2px solid #E6E6EB;
                text-align:left;
                padding: 0 48px;
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
            position: absolute;
            left:0px;
            bottom: 32px;
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
                &:first-child{
                    color: #E85D3E;
                    background: #FFFFFF;
                    margin-left: 0px;
                    &.van-button--default{
                        border: 1px solid #E85A3A;
                    }
                    &.van-button::before{
                        background: #FFFFFF;
                    }
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
    }


</style>
