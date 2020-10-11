<template>
    <div class="instructions-page">
        <div class="page-top">
            <img
                class="top-img"
                src="@/assets/exam/instructions-top.png"
            />
        </div>
        <div class="main">
            <div class="ready">
                准备好了吗
            </div>
            <div class="content">
                <p>
                    <span>
                        注意：
                    </span>
                    进入考试后必须在
                    <b>{{detail.duration}}</b>
                    分钟内提交试卷，时间截止后系统将自动交卷，中途意外退出也会计时，若异常退出，请
                    <b>
                        尽快再次回到考试
                    </b>
                </p>
                <!-- <p>
                    <span>
                        考核记录最高成绩：
                    </span>
                    60分
                </p> -->
                <p>
                    <span>
                        考试标准：
                    </span>
                    {{detail.totalCount}}道题{{detail.duration}}分钟
                </p>
                <p>
                    <span>
                        合格标准：
                    </span>
                    {{detail.passingScore}}分及格、满分{{detail.totalScore}}分
                </p>
                <p>
                    <span>
                        考试题型：
                    </span>
                    {{detail.types}}
                </p>
            </div>
            <div 
                class="btn"
                @click="jumpToExam"
            >
                开始考试
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../api/exam';
export default {
    data() {
        return {
            detail: {
                questionType: [],
                duration: 0,
                totalScore: 0,
                passingScore: 0,
                totalCount: 0,
                types: ''
            },
            sceneId: 51,
        }
    },
    created() {
        if (this.$route.query.id !== undefined) {
            this.sceneId = Number(this.$route.query.id);
        }
        
        api.getNote({id: this.sceneId}).then((res) => {
            let types = '';
            if (res.questionType && res.questionType.length) {
               types = res.questionType.join('、');
            }
            this.detail = {...this.detail, ...res, duration: this.transferTime(res.duration),types }
        })
    },
    methods: {
        transferTime(time) {
            return Math.round(time / 60);
        },
        jumpToExam() {
            this.$router.push({
                path: '/answer',
                query: {
                    sceneId: this.sceneId,
                    examType:1
                }
            })
        }
    }
}
</script>
<style scoped lang="less">
.instructions-page {
    font-size: 0.746rem;
    height: 100%;
    background: linear-gradient(180deg,#fff 0% ,#FE6A44 10.4rem, #FE774A 12.4rem, #FFB782 66%, #FF9142 100%);
    .page-top {
        background: linear-gradient(180deg,#FE9F5A 0%, #FB884C 100%);
        .top-img {
            width: 100%;
            display: block;
        }
    }
    .main {
        width: 100%;
        background-image: url(../../assets/exam/instructions-bg.png);
        background-size: 100% 18.4rem;
        background-repeat: no-repeat;
        .ready {
            width: 11.68rem;
            height: 1.706rem;
            margin: 0 auto 0.853rem;
            background: url(../../assets/exam/instructions-title.png);
            background-size: cover;
            line-height: 1.706rem;
            text-align: center;
            color: #fff;
            position: relative;
            margin-top: -2.1rem;
        }
        .content {
            margin: 0 1.7rem 0;
            padding: 1.28rem;
            background: #fff;
            border-radius: 0.32rem;
            p {
                margin-bottom: 1.12rem;
                padding-left: 0.6rem;
                position: relative;
                line-height: 1.067rem;
                text-align: left;
                &::before {
                    position: absolute;
                    width: 0.32rem;
                    height: 0.32rem;
                    border-radius: 50%;
                    background: #A7ADBB;
                    content: '';
                    left: 0;
                    top: 0.373rem;
                }
            }
            span {
                color: #272F55;
                font-weight: 500;
            }
            b {
                color: #E85A3A;
                font-weight: normal;
                font-style: normal;
            }
        }
        .btn {
            border-radius: 1.1rem;
            height: 2.1333rem;
            line-height: 2.1333rem;
            width: 18.29rem;
            margin: 1.7rem auto 0;
            color: #fff;
            font-weight: 500;
            background: linear-gradient(111deg, #FE774A 0%, #F74118 100%);
        }
    }
    
}
</style>