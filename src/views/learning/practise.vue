<template>
    <div>
        <van-nav-bar
            title="实训"
            left-arrow
            @click-left="goback"
        />
        <div class="container">
            <div class="item">
                <div class="title practise-target"></div>
                <div class="content">{{target}}</div>
            </div>
            <div class="item">
                <div class="title practise-info"></div>
                <div class="content">
                    <div>实训时间：{{time}}</div>
                    <div>实训地点：{{address}}</div>
                    <div>指导老师：{{teacher}}</div>
                </div>
            </div>
            <div class="item">
                <div class="title practise-desc"></div>
                <div class="content">
                    {{desc}}
                </div>
            </div>
            <div class="item">
                <div class="title practise-sign"></div>
                <div class="content">
                    <div>{{startSign}}</div>
                    <div>{{endSign}}</div>
                </div>
            </div>
        </div>
        <div v-show="!startSign || !endSign" class="sign" @click="sign">
            {{!startSign? '上课打卡' : '下课打卡'}}
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "practise2",
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
    .container{
        display: flex;
        flex-direction: column;
        background: rgba(255,255,255,1);
        padding: 15px;

        .item{
            background:rgba(255,255,255,1);
            box-shadow:0px 12px 32px 0px rgba(57,97,104,0.06);
            color: rgba(39,47,85,1);
            padding: 15px;
            font-size: 14px;
            margin-bottom: 15px;

            .title{
                width: 86px;
                height: 26px;
                margin-bottom: 15px;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .practise-info{
                background-image: url("../../assets/practise-info@2x.png");
            }

            .practise-sign{
                background-image: url("../../assets/practise-sign@2x.png");
            }

            .practise-target{
                background-image: url("../../assets/practise-target@2x.png");
            }

            .practise-desc{
                background-image: url("../../assets/practise-desc@2x.png");
            }

            .content{
                text-align: left;
            }
        }
    }

    .sign{
        width:80px;
        height:80px;
        background:linear-gradient(116deg,rgba(44,193,171,1) 0%,rgba(2,169,159,1) 100%);
        box-shadow:0px 0px 10px 0px rgba(0,0,0,0.2);
        border-radius: 999px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 50px;
        top: 75%;
        color: #fff;
        font-size: 14px;
    }
</style>
