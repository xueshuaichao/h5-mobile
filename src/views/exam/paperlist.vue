<template>
    <div class="paperlist">
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
        <van-dropdown-item title="筛选" ref="item1">
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
        <van-list
            v-model="loading"
            :finished="finished"
            @load="findByCondition"
            :error.sync="error"
            finished-text="没有更多了">
            <div class="itemlist" v-for="item in paperlist" :key="item.id" @click="handleClickItem(item)">
                <div class="itemlist-left">
                    <p>
                        {{item.name}}
                    </p>
                    <p>
                        {{item.categoryName}}
                    </p>
                </div>
                <div class="itembutton">
                    答题
                </div>
                
            </div>
        </van-list>
        
    </div>
</template>

<script>
import api from '../../api/exam';
export default {
  data() {
    return {
        activeId:null,
        sceactiveId:null,
        directionList:[],
        paperlist:[],
        seachtext: '',
        list: [{name: '暂无内容暂无内容暂无内容暂无内容暂无内容',
            picUrl: "https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/874e58ad9dc09f939c43ce06bd877d7b.jpg",
            categoryName:'1111',
            stars: 3,
            signUpCount: 16,
        }],
        listparam: {
            pageNum: 1,
            pageSize: 16,
            categoryId: null,
            type: 0,
        },
        loading: true,
        finished: true,
        pageSize: 10,
        pageNum: 1,
        error: false,
        statuslist: [
            {name: '全部', type: 0},
            {name: '简单', type: 1},
            {name: '一般', type: 2},
            {name: '困难', type: 3},
        ],
        classifyList: [],
        form:{
            categoryId: null,
            difficulty: '',
            isPublic: 1,
            status: 2,
            queryString: {
                pageNum: 1,
                pageSize: 10,
            },
        },
        statusId:null,
    }
  },
  components: {

  },
  methods: {
      statusbtn(item){
          this.statusId=item.type;
          if(this.statusId===0){
              this.form.difficulty=null;
          }else{
              this.form.difficulty=this.statusId;
          }
          this.$refs.item1.toggle();
          this.findByCondition();
      },
      classifybtn(item){
          if(item.id!==0){
                this.activeId=item.id;
                this.getChildren(this.activeId);
          }
          
      },
      sceclassifybtn(item){
          this.sceactiveId=item.id;
          if(this.sceactiveId===0){
            //   if(this.activeId==0){
                  this.form.categoryId=this.activeId;
            //   }
              
          }else{
              this.form.categoryId=this.sceactiveId;
          }
          
          this.$refs.item.toggle();
          this.findByCondition();
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
                if(this.directionList.length>2){
                    this.activeId=this.directionList[1].id;
                    this.getChildren(this.activeId);
                }
            });
        },
      findByCondition() {
          api.findByCondition(this.form).then((res) => {
                this.paperlist=res.list;
                this.loading=true;
                this.finished=true;
            })
           
        },

        handleClickItem(item) {
                this.$router.push({
                    path: '/answer',
                    query: {
                        sceneId:item.id
                    },
                });
            
            
        }
  },
  mounted() {
        this.getCategoryList();
        this.findByCondition();
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
<style lang="less">
.paperlist{
    .van-dropdown-menu__bar{
        box-shadow: none !important;
        border-bottom: 1px solid #E6E6EB;
    }
}
</style>