<template>
    <div>
        <van-nav-bar
            title="实训"
            left-arrow
            @click-left="goback"
        />
        <div class="container">
            <div class="item">
                <p class="title">
                    <span>实训目标</span>
                </p>
                <p class="content">{{target}}</p>
            </div>
            <div class="item">
                <p class="title">
                    <span>实训时间</span>
                </p>
                <p class="content">{{time}}</p>
            </div>
            <div class="item">
                <p class="title">
                    <span>实训地点</span>
                </p>
                <p class="content">{{address}}</p>
            </div>
            <div class="item">
                <p class="title">
                    <span>指导老师</span>
                </p>
                <p class="content">{{teacher}}</p>
            </div>
            <div class="item">
                <p class="title">
                    <span>实训说明</span>
                </p>
                <p class="content">{{desc}}</p>
            </div>
            <div class="item">
                <p class="title">
                    <span>打卡记录</span>
                </p>
                <div class="content">
                    <div>{{startSign}}</div>
                    <div>{{endSign}}</div>
                </div>
            </div>
        </div>
        <div v-show="!startSign || !endSign" class="sign" @click="sign">{{!startSign? '上课打卡' : '下课打卡'}}</div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "practise",
        data: ()=>{
            return {
                target: '一类环境中，钢筋混凝土梁的保护层厚度最小取 保护层厚度最小取保护层厚度最小取',
                time: '2020-08-20  14:00',
                address: '大钟寺怡和8号院',
                teacher: '张三',
                desc: '一类环境中，钢筋混凝土梁的保护层厚度最小取保护层厚度最小取保护层厚度最小取',
                startSign: '',
                endSign: ''
            }
        },
        methods: {
            goback: function(){
                history.back();
            },
            sign: function(){
                if(!this.startSign){
                    this.startSign = `上课打卡：${moment().format('YYYY-MM-DD hh:mm')} 正常`
                }else{
                    this.endSign = `下课打卡：${moment().format('YYYY-MM-DD hh:mm')} 正常`
                }
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../css/variables';

.container{
    padding: 5px 20px;
}

.item{

    .title{
        position: relative;
        display: flex;
        font-weight: 500;

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

    .content{
        font-size: 14px !important;
        text-align: left !important;
    }
}

.sign{
    width: 100px;
    height: 100px;
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @blue;
    position: absolute;
    right: 60px;
    top: 65%;
}
</style>
