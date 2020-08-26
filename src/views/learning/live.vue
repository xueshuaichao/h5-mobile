<template>
    <div>
        <van-nav-bar :title="course.title" left-arrow @click-left="back" />
        <div class="video">
            <div class="poster">
                <div class="play"></div>
            </div>
<!--            <video src="https://www.runoob.com/try/demo_source/movie.mp4" playsinline controls></video>-->
        </div>
        <van-tabs title-active-color="#00B288" color="#00B288" :line-width="16">
            <van-tab title="简介">
                <div class="brief">
                    <p>直播已结束，可观看回放</p>
                    <p>直播时间：{{liveTimeStr}}</p>
                    <p>课程简介</p>
                    <p class="desc">{{desc}}</p>
                </div>
            </van-tab>
            <van-tab title="聊天"></van-tab>
        </van-tabs>
        <div class="replay">查看回放</div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "live",
        data: ()=>{
            return {
                course: {
                    title: '钢筋现场验收重点'
                },
                liveTime: new Date(),
                desc: '本课程紧跟企业人力资源岗位需求，高效构建HR所需的知识体系和专业能力。通过本课程的学习，学员能够正确理解人力资源管理的概念，掌握人力资源管理的主要职能，并能综合用于对实际问题的分析与解决，培养并提高他们在人力资源管理领域的实操能力。',
            }
        },
        computed: {
            liveTimeStr: function(){
                return moment(this.liveTime).format('YYYY.MM.DD hh:mm')
            }
        },
        methods:{
            back() {
                this.$router.back();
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../css/variables';

    .video{
        width: 100%;
        height: 192px;

        .poster{
            background: url('../../assets/livebg@2x.png');
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: contain;
            height: 100%;

            .play{
                width: 50px;
                height: 50px;
                background: url('../../assets/videoPlay@2x.png');
                background-size: contain;
            }
        }

        video{
            width: 100%;
            height: 100%;
        }
    }

    .brief{
        color: @grayfont;
        font-size: 14px;
        padding: 14px 20px 0;
        text-align: left;

        .desc{
            font-size: 13px;
            text-indent:25px;
            line-height: 20px;
        }
    }

    .replay{
        position: absolute;
        bottom: 0;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        color: #fff;
        z-index: 1;
        border-radius: 4px;
        background: rgba(2,179,138,1);
        width: 100%;
    }
</style>
