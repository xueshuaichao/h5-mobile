<template>
    <div class="paperlist">
       <van-dropdown-menu>
        <van-dropdown-item title="分类">
            <div class="classify clearfix">
            <div class="classify-left fl">
                <ul>
                    <li v-for="(item, index) in classifyparam" :key="index">
                        <span class="line"></span>
                        {{item.name}}
                        <span class="top-yuan yuan"></span>
                        <span class="bottom-yuan yuan"></span>
                    </li>
                </ul>
            </div>
            <div class="classify-right fl">
                <span v-for="(item, index) in classifyparam" :key="index">
                    {{item.name}}
                </span>
            </div>
        </div>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="item">
           <div class="filters">
            <div class="filters-type">
                <div class="filters-status">
                    <span class="contentlist" v-for="(item, index) in statuslist" :key="index">
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
            {name: '全部', type: '0'},
            {name: '简单', type: '1'},
            {name: '一般', type: '2'},
            {name: '困难', type: '3'},
        ],
        classifyparam: [
            {name: '全部'},
            {name: '电子信息大类'},
            {name: '人文与社会'},
            {name: '数理类'},
            {name: '电子信息大类电子信息大类电子信息大类电子信息大类'},
            {name: '电子信息大类'},
            {name: '电子信息大类'},
            {name: '电子信息大类'},
            {name: '电子信息大类'},
            {name: '电子信息大类'},
            {name: '电子信息大类'},
        ],
        form:{
            "categoryId": 1,
            "difficulty": 1,
            "isPublic": 1,
            "status": 2,
            queryString: {
                pageNum: 1,
                pageSize: 10,
            },
        }
    }
  },
  components: {

  },
  methods: {
      findByCondition() {
          api.findByCondition(this.form).then((res) => {
              console.log(res)
              res.list[0].name="广东省少时诵诗书所所付多所过发的方法付付付付付所付三四十个"
                this.paperlist=res.list;
                this.loading=true;
                this.finished=true;
            })
           
        },

        handleClickItem(item) {
            api.joinScene({sceneId:item.id}).then((res) => {
                this.$router.push({
                    path: '/answer',
                    query: {
                        sceneId:item.id,
                        paperId: res,
                    },
                });
            })
            
            
        }
  },
  mounted() {
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