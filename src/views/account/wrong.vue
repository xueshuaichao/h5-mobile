<template>
    <div class="paperlist container">
        <van-nav-bar
            title="错题本"
            left-arrow
            @click-left="$router.go(-1)"
        /> 
       <van-dropdown-menu>
            <van-dropdown-item title="分类" ref="item">
                <div class="classify clearfix">
                    <div class="classify-left fl">
                        <ul>
                            <li v-for="(item, index) in directionList" :class="activeId==item.id?'active':''" @click="classifybtn(item)" :key="index">
                                <span class="line"></span>
                                {{item.name}}
                                <span class="top-yuan yuan"></span>
                                <span class="bottom-yuan yuan"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="classify-right fl">
                        <span v-for="(item, index) in classifyList" :key="index" :class="sceactiveId==item.id?'sceactive':''" @click="sceclassifybtn(item)"> 
                            {{item.name}}
                        </span>
                    </div>
                </div>
            </van-dropdown-item>
            <van-dropdown-item title="难易度" ref="item1">
            <div class="filters">
                    <div class="filters-type">
                        <div class="filters-status">
                            <span class="contentlist" v-for="(item, index) in statuslist" :class="statusId==item.type?'statusactive':''" :key="index" @click="statusbtn(item)">
                                {{item.name}}
                            </span>
                        </div>
                    </div>
                </div>
            </van-dropdown-item>
        </van-dropdown-menu>
        <div class="content">
            <div class="list">
                <div class="item" v-for="item in typesList" :key="item.type" @click="handleClickItem(item)">

                    <div class="left">
                        <img :src="require(`../../assets/account/${['dx', 'duox', 'pd'][item.type - 1]}.png`)" alt="" width="16">
                        <p>{{ item.typeName }}</p>
                    </div>
                    <div class="right">
                        <p>{{ item.count }}</p>错题
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/exam';

export default {
    data() {
        return {
            activeId: null,
            sceactiveId: null,
            directionList:[],
            statuslist: [
                {name: '全部', type: 0},
                {name: '简单', type: 1},
                {name: '一般', type: 2},
                {name: '困难', type: 3},
            ],
            classifyList: [],
            statusId: null,
            typesList: [],
            questionDifficulty: '',
            sceneCategoryId: '',
        }
    },
    
    created() {
        this.getAllTypesCount();
        this.getCategoryList();
    },
    
    methods: {
        getAllTypesCount() {
            const { questionDifficulty, sceneCategoryId } = this;
            this.$loading();
            api.getAllTypesCount({ questionDifficulty: questionDifficulty || '', sceneCategoryId: sceneCategoryId || '' }).then(res => {
                this.typesList = res;
                this.$toast.clear();
            })
        },

        statusbtn(item){
            this.statusId = item.type;
            
            if(this.statusId === 0){
                this.questionDifficulty = null;
            }else{
                this.questionDifficulty = this.statusId;
            }
            this.$refs.item1.toggle();

            this.getAllTypesCount();
        },
        
        classifybtn(item){
            this.activeId = item.id;
            this.sceactiveId = null;
            if(item.id !== 0){
                this.getChildren(this.activeId);
            } 
        },
        
        sceclassifybtn(item){
            this.sceactiveId=item.id;
            
            if(this.sceactiveId === 0){
                this.sceneCategoryId = this.activeId;        
            }else{
                this.sceneCategoryId = this.sceactiveId;
            }
            
            this.$refs.item.toggle();
            this.getAllTypesCount();
        },
        
        getChildren(id) {
            api.getChildren(id).then((res) => {
                this.classifyList = res;
                    let params={
                        name:'全部',
                        id:0
                    }
                    this.classifyList.unshift(params);
            });
        },

        getCategoryList() {
            api.getCategoryList().then((res) => {
                this.directionList=res;
                let params={
                    name:'全部',
                    id:0
                }
                this.directionList.unshift(params);
                if(this.directionList.length > 2){
                    this.activeId=this.directionList[1].id;
                    this.getChildren(this.activeId);
                }
            });
        },

        handleClickItem({ type, count }) {
            const { questionDifficulty, sceneCategoryId } = this;

            this.$router.push({
                path: `/wrong/detail/${type}`,
                query: {
                    questionDifficulty,
                    sceneCategoryId: sceneCategoryId === 0 ? '' : sceneCategoryId,
                    type,
                    count,                       
                }
            })
        }
    },
}
</script>

<style lang="less">
@import './index.less';
</style>
<style lang="less" scoped>
.paperlist{
    .van-dropdown-menu__bar{
        box-shadow: none !important;
        border-bottom: 1px solid #E6E6EB;
    }

    .content {
        padding: 32px;
        margin-top: 0;
    }

    .item {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        height: 108px;
        padding: 0 32px;
        margin-bottom: 32px;
        background: #FFFFFF;
        border-radius: 12px;
    }

    .left {
        display: flex;
        flex-flow: row;
        align-items: center;
    }

    .left p {
        padding-left: 32px;
        font-size: 32px;
        color: #272F55;
    }

    .right {
        display: flex;
        flex-flow: row;
        align-items: center;
        font-size: 28px;
        color: #A7ADBB;

        p {
            padding-right: 8px;
            color: #272F55;
        }
    }
}
</style>