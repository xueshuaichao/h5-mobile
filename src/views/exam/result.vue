<template>
    <div class="exam-result-page">
        <div class="page-top">
            <gauge
                :rate="detail.rate"
            >
                <div slot="txt" class="gauge-txts">
                    <p class="level">{{detail.isPass ? '合格': '不合格'}}</p>
                    <p class="score">
                        {{detail.score}}分
                    </p>
                </div>
            </gauge>
        </div>
        <div class="page-info">
            <div>
                <p class="num">
                    {{detail.rightCount}}%
                </p>
                <p>
                   正确率 
                </p>
            </div>
            <div class="border">
                |
            </div>
            <div>
                <p class="num">
                    36min
                </p>
                <p>
                   答题时间 
                </p>
            </div>
        </div>
        <div class="page-info">
            <div>
                <p class="num">
                    {{detail.totalCount}}
                </p>
                <p>
                    总题数
                </p>
            </div>
            <div>
                <p class="num">
                    {{detail.rightCount}}
                </p>
                <p>
                    答对
                </p>
            </div>
            <div>
                <p class="num">
                    {{detail.totalCount - detail.rightCount}}
                </p>
                <p>
                    答错
                </p>
            </div>
        </div>
        <button
            class="btn"
            @click="btnJump1"
        >
            {{ examtype&&status===2 ? '查看答题': '申请重考' }}
        </button>
        <p 
            class="tip"
            @click="btnJump2"
        >
            {{ examtype&&status===1?'任务结束之后，才能查看试卷详情':'查看试卷详情' }}
        </p>
        <userInfo />
        <taskArea />
    </div>
</template>
<script>
import api from '../../api/exam';
import gauge from '../../components/gauge.vue'
import userInfo from '../../components/userInfo.vue'
import taskArea from '../../components/taskArea.vue'

export default {
    components: {
        gauge,
        userInfo,
        taskArea,
    },
    data() {
        return {
            paperId: 1,
            detail: {
                totalScore: 100,
                totalCount: 0,
                timeUsed: 0,
                score: 0,
                rightRate: 0,
                rightCount: 0,
                passingScore: 0,
                isPass: 0,
                rate: 0,
            },
            status: 1, // 任务： 1正在进行中 2 已经结束，
            examtype: 0 // 0随堂考试 1终极考试
        }
    },
    created() {
        console.log(this.$route, 'route');
        if (this.$route.query.id !== undefined) {
            this.paperId = Number(this.$route.query.id);
        }
        this.getResult();
    },
    methods: {
        btnJump1() {
            if (this.examtype&&this.status===2) {
                this.$router.push({
                    path: '/showpaper',
                    query: {
                        paperId:  this.paperId,
                    }
                })
            } else {
                // window.history.back() // 返回答题。
                const { sceneId } = this.$route.query;

                if (sceneId) {
                    this.$router.push({ path: '/answer', query: { sceneId } })
                } else {
                    this.$router.go(-1);
                }
            }
        },
        btnJump2() {
            if (this.examtype&&this.status===1) {
                return false
            }
            return this.$router.push({
                    path: '/showpaper',
                    query: {
                        paperId:  this.paperId,
                    }
                })
        },
        getResult() {
            api.getResult({paperId: 1}).then((res) => {
                this.detail = {...res, rate: (res.score / res.totalScore)};
            })
        }
    }
    
}
</script>
<style scoped lang="less">
.exam-result-page {
    padding: 32px;
    background: #F5F5FA;
    height: 100%;
    .page-info {
        padding: 44px 78px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #737386;
        margin-top: 32px;
        line-height: 34px;
        .num {
            font-size: 36px;
            color: #272F55;
            line-height: 50px;
            font-weight: 500;
        }
        .border {
            font-size: 50px;
            line-height: 60px;
            color: #EEEEEE;
        }
    }
    .btn {
        width: 400px;
        height: 80px;
        background: linear-gradient(111deg, #F5936C 0%, #F74118 100%);
        border-radius: 50px;
        margin: 80px auto 26px;
        text-align: center;
        line-height: 80px;
        color: #fff;
        font-size: 28px;
        font-weight: 500;
        border: none;
        outline: none;
    }
    .tip {
        font-size: 24px;
        font-weight: 400;
        color: #A7ADBB;
        line-height: 34px;
        text-align: center;
    }
    .page-top {
        position: relative;
        background: #fff;
        padding-top: 60px;
        box-sizing: content-box;
        height: 360px;
        .gauge-txts {
            text-align: center;
            position: absolute;
            top: 125px;
            left: 0;
            width: 400px;
            .level {
                color: #737386;
                font-size: 28px;
                line-height: 40px;
            }
            .score {
                color: #E85A3A;
                font-weight: 500;
                font-size: 60px;
                line-height: 84px;
                margin-top: 10px;
            }
        }
    }
    
}
</style>