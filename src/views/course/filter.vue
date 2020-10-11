<template>
    <div class="filterpage">
        <div class="filterpage-header">
            <h3>课程筛选</h3>
            <img
                @click="goList"
                src="../../assets/course/seach@2x.png"
                alt=""
            />
        </div>
        <van-dropdown-menu active-color="#E85A3A" :overlay="false">
            <van-dropdown-item :title="seachparam.categorytitle">
                <div class="classify clearfix">
                    <div class="classify-left fl">
                        <ul>
                            <li
                                :class="
                                    seachparam.firstClass === null
                                        ? 'activeCalss'
                                        : ''
                                "
                                @click="getChildren()"
                            >
                                <span class="line"></span>
                                全部
                                <span class="top-yuan yuan"></span>
                                <span class="bottom-yuan yuan"></span>
                            </li>
                            <li
                                :class="
                                    seachparam.firstClass === item.id
                                        ? 'activeCalss'
                                        : ''
                                "
                                @click="getChildren(item)"
                                v-for="(item, index) in classifyparam"
                                :key="index"
                            >
                                <span class="line"></span>
                                {{ item.name }}
                                <span class="top-yuan yuan"></span>
                                <span class="bottom-yuan yuan"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="classify-right fl">
                        <span
                            :class="
                                seachparam.secondClass === null
                                    ? 'activeCalss'
                                    : ''
                            "
                            @click="getSecond()"
                            >全部</span
                        >
                        <span
                            :class="
                                seachparam.secondClass === child.id
                                    ? 'activeCalss'
                                    : ''
                            "
                            @click="getSecond(child)"
                            v-for="child in secondCategory"
                            :key="child.id"
                        >
                            {{ child.name }}
                        </span>
                    </div>
                </div>
                <div class="footer footer1 clearfix">
                    <div
                        class="footer-left fl"
                        @click="handleClearActiveList('1')"
                    >
                        <img
                            src="../../assets/learning/clear.png"
                            alt=""
                            width="18"
                            srcset=""
                        />
                        <p>清空筛选</p>
                    </div>
                    <div class="button fr" @click="handleClickSave('1')">
                        确定
                    </div>
                </div>
            </van-dropdown-item>
            <van-dropdown-item ref="filter" v-model="filterparam" title="筛选">
                <div class="filters">
                    <div class="filters-type">
                        <div class="filters-status">
                            <p>选择状态</p>
                            <span
                                :class="
                                    statusId === item.id ? 'activespan' : ''
                                "
                                @click="getStatus(item)"
                                v-for="(item, index) in statuslist"
                                :key="index"
                            >
                                {{ item.name }}
                            </span>
                        </div>
                        <div class="filters-status">
                            <p>内容类型</p>
                            <span
                                :class="
                                    typeId === item.type ? 'activespan' : ''
                                "
                                @click="getType(item)"
                                v-for="(item, index) in contentType"
                                :key="index"
                            >
                                {{ item.name }}
                            </span>
                        </div>
                    </div>
                    <div class="footer clearfix">
                        <div
                            class="footer-left fl"
                            @click="handleClearActiveList('2')"
                        >
                            <img
                                src="../../assets/learning/clear.png"
                                alt=""
                                width="18"
                                srcset=""
                            />
                            <p>清空筛选</p>
                        </div>
                        <div class="button fr" @click="handleClickSave('2')">
                            确定
                        </div>
                    </div>
                </div>
            </van-dropdown-item>
            <van-dropdown-item v-model="sortparam" title="综合排序">
                <div class="sortStatus">
                    <span
                        :class="sortId === item.id ? 'activesort' : ''"
                        @click="getsort(item)"
                        v-for="(item, index) in sortType"
                        :key="index"
                    >
                        {{ item.name }}
                    </span>
                    <div class="footer clearfix">
                    <div
                        class="footer-left fl"
                        @click="handleClearActiveList('3')"
                    >
                        <img
                            src="../../assets/learning/clear.png"
                            alt=""
                            width="18"
                            srcset=""
                        />
                        <p>清空筛选</p>
                    </div>
                    <div class="button fr" @click="handleClickSave('3')">
                        确定
                    </div>
                </div>
                </div>
            </van-dropdown-item>
        </van-dropdown-menu>
    </div>
</template>

<script>
import api from "@/api/course";
export default {
    data() {
        return {
            sortStatus: false,
            classifyStatus: false,
            filterStatus: false,
            firstname: "",
            // 搜索参数
            seachparam: {
                secondClass: null,
                firstClass: null,
                categorytitle: "全部",
                courseItemDetailType: null, // 内容类型0：视频；1：音频；2：文档；全部选学（不填值，默认加载全部）
                categoryId: null, // 分类id
                type: 0, // 0:综合排序（默认）；1：热门；2：最新
                recordType: null // 1：加入选学；0：未加入选学 全部选学（不填值，默认加载全部）
            },
            sortType: [
                { name: "综合排序", id: "0" },
                { name: "最新", id: "2" },
                { name: "最热", id: "1" }
            ],
            statuslist: [
                { name: "全部", id: "2" },
                { name: "未加入选学", id: "0" },
                { name: "已加入选学", id: "1" }
            ],
            contentType: [
                { name: "全部", type: "3" },
                { name: "视频", type: "0" },
                { name: "音频", type: "1" },
                { name: "文档", type: "2" }
            ],
            classifyparam: [],
            filterparam: "a",
            sortparam: 0,
            secondCategory: [],
            statusId: null,
            typeId: null,
            sortId: null
        };
    },
    components: {},
    methods: {
        goList() {
            //   this.seachparam.categoryId = this.seachparam.secondClass ? this.seachparam.secondClass : this.seachparam.firstClass;
            this.$router.push({
                path: "/seachpage"
                //   query: {
                //       seachlist: JSON.stringify(this.seachparam),
                //   },
            });
            //   console.log(this.seachparam);
        },
        getsort(item) {
            this.sortId = item.id;
            this.seachparam.type = item.id;
        },
        getStatus(item) {
            this.seachparam.recordType = item.id === "2" ? "" : item.id;
            this.statusId = item.id;
        },
        getType(item) {
            if (item.type === "3") {
                this.seachparam.courseItemDetailType = "";
            } else {
                this.seachparam.courseItemDetailType = item.type;
            }
            this.typeId = item.type;
        },
        getSecond(item) {
            if (!item) {
                this.seachparam.secondClass = null;
                this.seachparam.categorytitle = this.firstname;
            } else {
                this.seachparam.secondClass = item.id;
                this.seachparam.categorytitle = item.name;
            }
        },
        getChildren(item) {
            if (!item) {
                this.seachparam.categorytitle = "全部";
                this.seachparam.firstClass = null;
            } else {
                this.seachparam.firstClass = item.id;
                this.seachparam.categorytitle = item.name;
                this.firstname = item.name;
                api.getChildren({ categoryId: item.id }).then(res => {
                    console.log(res);
                    this.secondCategory = res;
                });
            }
        },
        handleClearActiveList(num) {
            switch (num) {
                case "1":
                    this.seachparam.categorytitle = "全部";
                    this.seachparam.firstClass = null;
                    break;
                // return (this.categoryId = null);
                default:
                    break;
            }
            this.typeId = null;
            this.statusId = null;
            this.seachparam.courseItemDetailType = null;
            this.seachparam.recordType = null;
        },
        handleClickSave() {
            // switch(num) {
            //     case '1':
            // }
            this.seachparam.categoryId = this.seachparam.secondClass ? this.seachparam.secondClass : this.seachparam.firstClass;
            this.$router.push({
                path: "/course",
                query: {
                    seachlist: JSON.stringify(this.seachparam)
                }
            });
            // this.$refs.filter.toggle(false);
        },
        getCourseCategory() {
            api.getCourseCategory().then(res => {
                this.classifyparam = res;
            });
        }
    },
    mounted() {
        if (this.$route.query.paramslist) {
            let params = this.$route.query.paramslist;
            this.seachparam = JSON.parse(params);
            this.statusId = this.seachparam.recordType;
            this.typeId = this.seachparam.courseItemDetailType;
            this.sortId = this.seachparam.type;
        }
        this.getCourseCategory();
    }
};
</script>

<style lang="less">
@import "./index.less";
</style>
<style lang="less">
.filterpage {
    .van-dropdown-item__content {
        max-height: 90%;
    }
    .van-dropdown-menu__bar {
        box-shadow: none !important;
        border-bottom: 1px solid #e6e6eb;
    }
}
</style>