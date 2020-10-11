<template>
    <div class="seachPage-list">
        <div class="seachPage-list-header clearfix">
            <img
                @click="$router.push('/')"
                class="header-left fl"
                src="../../assets/course/home@2x.png"
                alt=""
            />
            <span class="typename" @click="showtype = true">{{
                labelText
            }}</span>
            <van-search
                class="header-middle fl"
                v-model="listparam.name"
                shape="round"
                placeholder="输入课程关键字"
                @focus="showhistory"
            />
            <div v-if="showtype" class="changetype">
                <span
                    @click="changetypename(item1)"
                    v-for="(item1, index) in typelist"
                    :key="index"
                    >{{ item1.name }}</span
                >
            </div>
            <span @click="getcourseList('seach')" class="seachBtn">搜索</span>
        </div>
        <div v-if="ishistory" class="seachHistory">
            <div class="seachHistory-top clearfix">
                <span class="fl toptext">搜索历史</span>
                <span @click="historyList1 = []" class="fr topimg"
                    ><img src="../../assets/course/delete@2x.png" alt=""
                /></span>
            </div>
            <div class="seachHistory-list">
                <ul class="clearfix">
                    <li
                        class="fl"
                        v-for="(item, index) in historyList1"
                        :key="index"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
        <van-list
            v-if="!isNone"
            v-model="loading"
            :finished="finished"
            @load="getcourseList"
            :error.sync="error"
        >
            <div v-if="iscourse">
                <div
                    class="item van-hairline--bottom"
                    v-for="item in list"
                    :key="item.id"
                    @click="handleClickItem(item)"
                >
                    <div class="top">
                        <img class="img" :src="item.picUrl" alt="" />
                        <div class="info">
                            <p class="title van-multi-ellipsis--l2">
                                {{ item.name }}
                            </p>
                            <p class="status">{{ item.lastCategoryName }}</p>
                            <div class="tongji clearfix">
                                <span class="start fl">
                                    <img
                                        src="../../assets/course/seach.png"
                                        alt=""
                                    />
                                    {{ item.starAvg }}分
                                </span>
                                <span class="selected fr">
                                    已选1.2W+
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="istask">
                <div
                  class="itemcontent"
                  v-for="(item ,index) in list"
                  :key="index"
                  @click="goDetail(item.id)"
                >
                    <van-card
                      :thumb="item.iconUrl?item.iconUrl:'https://mz-tet.oss-cn-beijing.aliyuncs.com/minzheng/image/114 (2).jpg'
                      "
                    >
                        <template #title>
                            <div class="title">
                            {{item.name}}
                            </div>
                        </template>
                        <template #desc>
                            <div class="time">
                                <div class="traintime">
                                    培训时间:{{item.applyStartTime | dataFormat}}
                                </div>
                                <div class="enlisttime">
                                    报名时间:{{item.trainStartTime | dataFormat}}
                                </div>
                            </div>
                        </template>
                        <template #tags>
                          <div class="title">
                            <van-tag round  plain type="danger" class="tag">限制人</van-tag>
                          </div>
                          <span>已预约人</span>
                        </template>
                    </van-card>
                    <div class="line"></div>
                </div>
            </div>
        </van-list>

        <!-- 暂无数据 -->
        <div class="none" v-if="isNone">
            <img
                src="../../assets/learning/none.png"
                alt=""
                srcset=""
                width="80"
            />
            <p>暂无内容</p>
        </div>
    </div>
</template>
<script>
import api from "@/api/course";

export default {
    name: "seachPageList",

    data() {
        return {
            iscourse: false,
            istask: false,
            showtype: false,
            typelist: [
                { id: "1", name: "课程" },
                { id: "2", name: "任务" }
            ],
            ishistory: false,
            historyList: [],
            historyList1: [],
            labelText: "课程",
            seachtext: "",
            list: [],
            listparam: {
                pageNum: 1,
                pageSize: 10,
                name: "",
                courseItemDetailType: null, // 内容类型0：视频；1：音频；2：文档；全部选学（不填值，默认加载全部）
                categoryId: null, // 分类id
                type: 0, // 0:综合排序（默认）；1：热门；2：最新
                recordType: null // 是否加入选学 1：加入选学；0：未加入选学 全部选学（不填值，默认加载全部）
            },
            loading: false,
            finished: false,
            // pageSize: 10,
            // pageNum: 1,
            error: false,
            isNone: false
        };
    },
    mounted() {
        if (this.$route.query.seachlist) {
            let param = JSON.parse(this.$route.query.seachlist);
            console.log(this.$route.query.seachlist);
            this.listparam.courseItemDetailType = param.courseItemDetailType;
            this.listparam.recordType = param.recordType;
            this.listparam.type = param.type;
            this.listparam.categoryId = param.categoryId;
        }
    },
    methods: {
        changetypename(val) {
            this.labelText = val.name;
            this.showtype = false;
        },
        showhistory() {
            this.ishistory = true;
        },
        async getcourseList(type) {
            if (type) {
                this.listparam.pageNum = 1;
                this.list = [];
                if (this.listparam.name) {
                    this.historyList.push(this.listparam.name);
                    this.historyList1 =
                        this.historyList.length > 5
                            ? this.historyList.slice(0, 4)
                            : this.historyList;
                }
                if (this.labelText === "课程") {
                    this.iscourse = true;
                    const { list, total } = await api.getCourselist(
                        this.listparam
                    );
                    this.loading = false;
                    this.listparam.name = "";
                    if (!total || (list && !list.length && !this.list.length)) {
                        // no data
                        this.isNone = true;
                        return;
                    }
                    if (list && list.length) {
                        this.list.push(...list);
                    } else {
                        this.finished = true;
                    }
                    if (this.list.length >= total || total < 10) {
                        // finished
                        this.finished = true;
                    }
                    this.listparam.pageNum++;
                    this.error = false;
                }
            } else {
                this.finished = true;
            }
        },

        handleClickItem(item) {
            // todo router
            console.log(item);
            this.$router.push({
                path: "/course/detail",
                query: {
                    id: item.id
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "./index";
</style>
<style lang="less">
.van-list__finished-text {
    height: 80px;
    line-height: 50px;
}
.seachPage-list .van-icon-search::before {
    content: "";
}
</style>