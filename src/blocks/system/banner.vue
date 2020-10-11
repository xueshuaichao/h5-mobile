<template>
    <div v-if="showbanner" class="swiper-wrap">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="(item, i) in images" :key="i" class="swiper-slide">
                    <!-- 具体内容 -->
                    <img
                        @click="goDetail(item)"
                        :src="item.banner"
                        alt="商品图片"
                    />
                </div>
                <!-- <div class="swiper-slide">
                    <img
                        @click="goDetail(item)"
                        src="../../assets/exam/instructions-bg.png"
                        alt="商品图片"
                    />
                </div>
                <div class="swiper-slide">
                    <img
                        @click="goDetail(item)"
                        src="../../assets/exam/instructions-bg.png"
                        alt="商品图片"
                    />
                </div>
                <div class="swiper-slide">
                    <img
                        @click="goDetail(item)"
                        src="../../assets/exam/instructions-bg.png"
                        alt="商品图片"
                    />
                </div>
                <div class="swiper-slide">
                    <img
                        @click="goDetail(item)"
                        src="../../assets/exam/instructions-bg.png"
                        alt="商品图片"
                    />
                </div> -->
            </div>
            <div class="swiper-pagination" />
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import api from "../../api/course";
export default {
    props: ["videolist"],
    data() {
        return {
            showbanner: true,
            swiper: null,
            images: []
        };
    },
    components: {},
    computed: {},
    mounted() {
        // eslint-disable-next-line no-new
        this.getbannerList();
        setTimeout(()=>{
            this.initSwiper();
        },100)
    },
    methods: {
        initSwiper() {
            this.swiper = new Swiper(".swiper-container", {
                observer: true,
                observerParents: true,
                effect: "coverflow",
                centeredSlides: true,
                spaceBetween: "18%",
                slidesPerView: "auto",
                loopedSlides: this.images.length+2,
                loop: true,
                autoplay: true,
                //   loopedSlides: 2,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false
                },
                pagination: {
                    el: ".swiper-pagination"
                    // clickable: true,
                },
                
            });
        },
        getbannerList() {
            api.bannerList().then(res => {
                this.images = res;
                this.showbanner = true;
                
            });
        },
        goDetail(item) {
            const type = item.jumpType;
            const id = item.quoteId;
            const { outLink } = item;
            api.reportClick({
                id,
            });
            if (type === 2) {
                this.$router.push({
                    path: '/course/detail',
                    query: {
                        id,
                    },
                });
            } else if (type === 3) {
                this.$router.push({
                    path: '/taskdetail',
                    query: {
                        id,
                    },
                });
            } else if (type === 4) {
                window.open(outLink);
            }
        }
    }
};
</script>
<style lang="less">
// .swiper-pagination-bullet-active {
//     background: #d02e3d !important;
// }
.swiper-wrap {
    width: 750px;
    overflow: hidden;
}
.swiper-pagination-bullet {
    width: 8px;
    height: 4px;
    background: #ffffff;
    border-radius: 3px;
    opacity: 0.4;
}
.swiper-pagination-bullet-active {
    width: 32px;
    height: 8px;
    background: #ffffff;
    border-radius: 6px;
    opacity: 1;
}
</style>
<style lang="less" scoped>
.touch-select() {
    -webkit-touch-callout: none;
    -webkit-user-select: none; /*webkit浏览器*/
    -khtml-user-select: none; /*早期浏览器*/
    -moz-user-select: none; /*火狐*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
}
.swiper-container {
    margin-top: 16px;
    width: 670px;
    height: 376px;
    // margin-bottom: 80px;
    overflow: visible !important;
    .swiper-wrapper .swiper-slide {
        width: 670px;
        border-radius: 20px;
        box-shadow: 0px 20px 10px 0px #e5edf8;
    }
    .swiper-wrapper .swiper-slide .img {
        width: 100%;
        height: 100%;
        background-size: 100%;
        border-radius: 20px;
    }
    .swiper-wrapper .swiper-slide img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }

    .swiper-pagination {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #8a91a4;
        // bottom: -80px !important;
        .touch-select();
    }
}
</style>
