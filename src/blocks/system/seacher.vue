<template>
    <div class="seacher-list">
        <div class="seacher-list-header">
            <img
                @click="$router.push('/')"
                class="header-left"
                src="../../assets/course/home@2x.png"
                alt=""
            />
            <van-search
                class="header-middle"
                v-model="listparam.name"
                shape="round"
                placeholder="输入课程关键字"
                @focus="$router.push('/seachpage')"
            />
            <img
                class="header-right"
                src="../../assets/course/time@2x.png"
                alt=""
            />
        </div>
    </div>
</template>
<script>
// import api from "@/api/course";

export default {
    name: "seachPageList",

    data() {
        return {
            iscourse: false,
            istask: false,
            showtype: false,
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
        
    },
    methods: {

    }
};
</script>

<style lang="less" scoped>
.seacher-list{
    padding: 32px 28px;
    height: 64px;
    line-height: 64px;
    &-header{
        .header-left{
            display: inline-block; //主要是这个属性
            vertical-align: middle;
            width: 72px;
            height: 36px;
            margin-top: -6px;
        }
        .header-right{
            display: inline-block;
            width: 40px;
            height: 40px;
            vertical-align: middle;
            margin-top: -6px;
        }
        .header-middle{
            display: inline-block;
            margin: 0px 20px;
            width: 77%;
            height: 64px;
            background-color: #F5F5FA;
            border-radius: 32px;
            padding: 0px 60px;
            border: none;
        }
    }
}
</style>
<style lang="less">
.van-list__finished-text {
    height: 80px;
    line-height: 50px;
}
</style>