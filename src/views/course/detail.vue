<template>
    <div class="courseDetail">
        <div class="courseDetail-header">
            <h3>{{courseInfo.name}}</h3>
        </div>
        <div class="courseDetail-player">
            <img v-if="!hasresourceURl" :src="courseInfo.picUrl" alt="" />
            <div
                v-if="hasvideo"
                id="player-con"
                style="height: 233px"
            />
            <iframe v-if="ispdf" :src="pdfurl" style="width: 100%;height: 233px;position: absolute; left: 0px"/>
            <span class="detail-fenlei">
                {{courseInfo.categoryName}}
            </span>
        </div>
        <div class="courseDetail-content">
            <div class="content-header">
                <span
                    @click="changetype = item.id"
                    v-for="(item, index) in contentType"
                    :key="index"
                >
                    {{ item.name }}
                </span>
            </div>
            <div v-if="changetype === '0'" class="content-info">
                <p>
                    {{courseInfo.intro}}
                </p>
            </div>
            <div v-if="changetype === '1'" class="content-catalog">
                <van-collapse v-model="activeNames">
                    <van-collapse-item name="1" v-for="(item, index) in catelogList" :key="index">
                        <template #title>
                            <div class="catalog-title">
                                <span class="catalog-index">
                                    {{index+1}}
                                </span>
                                <span class="catalog-futitle" @click="showvideo(item)">
                                    {{item.title}}
                                </span>
                                <span class="catalog-hours">3 课时</span>
                            </div>
                        </template>
                        <div class="catalog-level">
                            <ul class="firstlevel">
                                <li class="firstlevel-li" v-for="(item1, index) in item.childrenList" :key="index">
                                    <p class="firstlevel-li-p pstyle" @click="showvideo(item1)">
                                        {{item1.detailName}}
                                    </p>
                                    <ul class="secLevel">
                                        <li class="secLevel-li listyle1" v-for="(item2, index) in item1.childrenList" :key="index">
                                            <p class="secLevel-li-p pstyle1" @click="showvideo(item2)">
                                                {{item2.detailName}}
                                            </p>
                                            <ul class="triLevel">
                                                <li
                                                    class="triLevel-li listyle1"
                                                    v-for="(item3, index) in item2.childrenList" :key="index"
                                                >
                                                    <p
                                                        class="triLevel-li-p pstyle1"
                                                        @click="showvideo(item3)"
                                                    >
                                                        {{item3.detailName}}
                                                    </p>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </van-collapse-item>
                    <!-- <van-collapse-item title="标题2" name="2" icon="shop-o">
                        内容
                    </van-collapse-item> -->
                </van-collapse>
            </div>
            <div v-if="changetype === '2'" class="content-judge">
                <div v-if="gojudge" class="showjudge clearfix">
                    <div class="showjudge-left fl">
                        <p class="showjudge-left-top">综合评分 <span>4.6</span></p>
                        <van-rate
                        v-model="judge"
                        :size="27"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                        disabled
                        />
                        <p class="showjudge-left-bottom">12个评价</p>
                    </div>
                    <div class="fr showjudge-right">
                        <div class="showjudge-right-btn" @click="gojudge = false">
                            我要评价
                        </div>
                    </div>
                </div>
                <div v-else class="myjudge">
                    <p class="myjudge-text">点击星星可以评价哦</p>
                    <van-rate
                        v-model="judge"
                        size="40"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                        gutter='20px'
                        />
                    <p class="myjudge-level">较差</p>
                    <van-button class="myjudge-button" :disabled="!isjudge"  @click="onChangeJudge">确定</van-button>
                </div>
            </div>
        </div>
        <div v-if="!isjoin" class="courseDetail-btn">
            <div class="button" @click="startStudy(courseInfo.id)">
                加入选学
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/course';
export default {
    data() {
        return {
            gojudge: true,
            pdfurl: '',
            hasvideo: false,
            ispdf: false,
            isjudge: false,
            hasresourceURl: false,
            judge: 0,
            isjoin: false,
            activeNames: ["1"],
            changetype: "0",
            courseInfo: {},
            judgeparam: {
                courseId: null,
                recordId: null,
                stars: 0,
                remark: '',
            },
            player: null,
            contentType: [
                { name: "简介", id: "0" },
                { name: "目录", id: "1" },
                { name: "评价", id: "2" }
            ],
            saveLearningParams: {
                recordId: '',
                detailId: '',
                pollingTime: '15',
                curSecond: '',
            },
            catelogList: [],
        };
    },
    components: {},
    watch: {
        judge(val) {
            console.log(val);
            if(val>0){
                 this.isjudge = true;
            }
        },
        changetype(val) {
            if(val === '1'){
                this.findCourseItemByCourseId();
            }
        },
    },
    methods: {
        getPDFandYinpin(val) {
            api.getAudioOrDocUrl({ id: val.detailId }).then((res) => {
                // if (res.success) {
                    const  data  = res;
                    if(val.detailType === '2'){
                        this.resourceUrl = data;
                        this.ispdf = false;
                        this.hasresourceURl = this.resourceUrl.length > 0;
                        this.hasvideo = true;
                        console.log(this.resourceUrl)
                        this.getaliPlay(this.resourceUrl, '2');
                    }else if(val.detailType === '3'){
                        this.pdfurl = data;
                        this.ispdf =true;
                        this.hasresourceURl = false;
                        this.hasvideo = false;
                        console.log(this.pdfurl);
                    }
                // }
            });
        },
        getVideo(val) {
            api.getVideoPlayURLById({ id: val }).then((res) => {
                const data = res;
                [this.resourceUrl] = data;
                this.ispdf = false;
                this.hasresourceURl = this.resourceUrl.length > 0;
                this.hasvideo = true;
                this.$nextTick(() => {
                    this.getaliPlay(this.resourceUrl, '1');
                })
            });
        },
        getaliPlay(courseUrl,type ,seekTime, iscomplate) {
            
            let contTime = seekTime;
            if (!contTime) {
                contTime = 0;
            }
            $('#player-con').height('233px');
            if ($('#J_prismPlayer').length > 0) {
                this.player.dispose();
                $('#J_prismPlayer').remove();
            }
            const boarddiv = '<div id="J_prismPlayer"></div>';
            $('#player-con').append(boarddiv);
            $('#J_prismPlayer').height('100%');
            this.$nextTick(() => {
                // eslint-disable-next-line no-undef
                this.player = new Aliplayer({
                    id: 'J_prismPlayer',
                    source: courseUrl,
                    width: '100%',
                    height: '500px',
                    // seek: contTime,
                    cover: '',
                    /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
                    autoplay: true,
                    preload: false,
                    isLive: false,
                    useH5Prism: true,
                });
                
                this.player.on('error', () => {
                    this.clearTimeing();
                });
                this.player.on('ready', () => {
                    this.timing();
                    contTime = contTime >= Math.round(this.player.getDuration())
                        ? '0'
                        : contTime;
                        console.log(type);
                    if (!iscomplate) {
                        let video = null;
                        
                        if(type === '2'){
                            video = document.querySelector('audio');
                        }else if(type === '1'){
                            video = document.querySelector('video');
                        }
                        video.currentTime = contTime;
                        let supposedCurrentTime = 0;
                        let maxtime = contTime;
                        // 监听当前的播放位置发送改变时触发。
                        video.addEventListener('timeupdate', () => {
                            if (video.currentTime > maxtime) {
                                maxtime = video.currentTime;
                            }
                            if (!video.seeking) {
                                supposedCurrentTime = video.currentTime;
                            }
                        });
                        // prevent user from seeking
                        // 寻址中（Seeking）指的是用户在音频/视频中移动/跳跃到新的位置。
                        video.addEventListener('seeking', () => {
                            if (maxtime < video.currentTime) {
                                video.currentTime = supposedCurrentTime;
                            }
                        });
                    }
                    this.player.seek(contTime);
                });
                this.player.on('play', () => {
                    this.videoplay = true;
                });
                this.player.on('pause', () => {
                    this.videoplay = false;
                    // this.saveLearningParams.courseId = localStorage.getItem(
                    //     'courseId',
                    // );
                    this.saveLearningLog();
                    this.clearTimeing();
                });
                this.player.on('ended', () => {
                    for (let i = 0; i < this.catelogList.length; i += 1) {
                        const item = this.catelogList[i];
                        for (let j = 0; j < item.lessonList.length; j += 1) {
                            if (
                                this.saveLearningParams.lessId
                                === item.lessonList[j].id
                            ) {
                                item.lessonList[j].complate = 1;
                            }
                        }
                    }
                    // 保存记录
                    this.saveLearningLog();
                    // this.getNextid();
                });
            });
        },
        // 清除定时器
        clearTimeing() {
            if (this.IntervalName) {
                clearInterval(this.IntervalName);
                this.IntervalName = null;
                console.log('清楚定时器');
            }
        },
        timing() {
            this.IntervalName = setInterval(() => {
                this.saveLearningLog();
            }, 15000);
        },
        saveLearningLog() {
            this.saveLearningParams.detailId = this.courseItemDetailId;
            this.saveLearningParams.recordId = this.courseInfo.recordId;
            this.saveLearningParams.curSecond = Math.round(
                this.player.getCurrentTime(),
            );
            if (this.saveLearningParams.curSecond > 0) {
                return api
                    .saveLearningLog(this.saveLearningParams)
                    .then((res) => {
                        console.log(res);
                    });
            }
            return true;
        },
        showvideo(val) {
            if(!val.menuFlag && this.isjoin){
                this.courseItemDetailId = val.courseItemDetailId;
                // 视频
                if(val.detailType === '1'){
                    console.log(val.detailType)
                    this.getVideo(val.detailId);
                } else if(val.detailType === '3' || val.detailType === '2'){
                    console.log(val.detailType);
                    // 文档、音频
                    this.getPDFandYinpin(val); 
                } else if(val.detailType === '4'){
                    // 试题
                }
            }else {
                this.$toast('加入选学后才可观看');
            }
        },
        // 
        onChangeJudge() {
            console.log(this.judge);
            if(this.judge > 0){
               
                this.judgeparam.courseId = this.courseInfo.id;
                this.judgeparam.recordId = this.courseInfo.recordId;
                this.judgeparam.stars = this.judge;
                api.submitCourseRatingForm(this.judgeparam).then((res) => {
                    console.log(res);
                });
            } else {
                console.log(this.judge);
                this.$toast('请评价后提交');
            }
        },
        // 加入选学
        startStudy(id) {
            api.startStudy(id).then(() => {
                // if (res.success) {
                    this.isjoin = true;
                // }
            });
        },
        courseDetail(id) {
            api.findById(id).then((res) => {
                // console.log(res);
                const data = res;
                this.courseInfo = data;
                this.courseName = this.courseInfo.name;
                this.isjoin = this.courseInfo.recordId
                    ? true
                    : false;
            })
            // console.log(data);
                
        },
        findCourseItemByCourseId() {
            const param = {
                courseId: this.courseInfo.id,
                recordId: this.courseInfo.recordId,
            };
            api.findCourseItemByCourseId(param).then((res) => {
                this.catelogList = res;
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        },
    },
    mounted() {
        if (this.$route.query.id) {
            this.courseDetail(this.$route.query.id);
        }
    }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
<style lang="less">
.courseDetail {
    .van-collapse-item--border::after {
        border-top: 0px !important;
    }
    .van-cell::after {
        border-bottom: 0px !important;
    }
    .van-hairline--top-bottom::after {
        border: 0px !important;
    }
    .van-cell {
        line-height: 40px;
    }
    .van-cell__right-icon {
        line-height: 40px;
    }
    .van-collapse-item__content {
        padding: 12px 0px !important;
    }
    .van-cell--clickable:active {
        background: #fff;
    }
}
</style>
