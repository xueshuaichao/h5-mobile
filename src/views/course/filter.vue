<template>
    <div class="filterpage">
        <div class="filterpage-header">
            <h3>课程筛选</h3>
            <router-link to="/course"><img src="../../assets/course/seach@2x.png" alt=""></router-link> 
        </div>
        <van-dropdown-menu active-color="#E85A3A" :overlay='false'>
            <van-dropdown-item @open="openclassifyStatus" @close="closeclassifyStatus" v-model="value3" title="全部" />
            <van-dropdown-item @open="filterStatus = true" @close="filterStatus = false" v-model="filterparam" title="筛选" />
            <van-dropdown-item @open="sortStatus = true" @close="sortStatus = false" v-model="sortparam" title="综合排序" />
        </van-dropdown-menu>
        <div v-if="classifyStatus" class="classify clearfix">
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
        <div v-if="filterStatus" class="filters">
            <div class="filters-type">
                <div class="filters-status">
                    <p>选择状态</p>
                    <span class="statuslist" v-for="(item, index) in statuslist" :key="index">
                        {{item.name}}
                    </span>
                </div>
                <div class="filters-status">
                    <p>内容类型</p>
                    <span class="contentlist" v-for="(item, index) in contentType" :key="index">
                        {{item.name}}
                    </span>
                </div>
            </div>
            <div class="footer clearfix">
                <div class="footer-left fl" @click="handleClearActiveList">
                    <img src="../../assets/learning/clear.png" alt="" width="18" srcset="">
                    <p>清空筛选</p>
                </div>
                <div class="button fr" @click="handleClickSave">
                    确定
                </div>
            </div>
        </div>
        <div v-if="sortStatus" class="sortStatus">
            <span v-for="(item, index) in sortType" :key="index">
                {{item.name}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        sortStatus: false,
        classifyStatus: true,
        filterStatus: false,
        value3: '全部',
        sortType: [
            {name: '最新', id: '0'},
            {name: '最热', id: '1'},
        ],
        statuslist: [
            {name: '全部', id: '0'},
            {name: '未加入选学', id: '1'},
            {name: '已加入选学', id: '2'},
        ],
        contentType: [
            {name: '全部', type: '0'},
            {name: '视频', type: '1'},
            {name: '音频', type: '2'},
            {name: '文档', type: '3'},
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
        filterparam: 'a',
        sortparam: 0,
    }
  },
  components: {

  },
  methods: {
      handleClearActiveList() {},
      handleClickSave() {},
      openclassifyStatus(){
          this.classifyStatus = true;
          this.sortStatus = false;
          this.filterStatus = false;
      },
      closeclassifyStatus(){
          this.classifyStatus = false;
      }
  },
  mounted() {
      this.openclassifyStatus();
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
<style lang="less">
.filterpage{
    .van-dropdown-menu__bar{
        box-shadow: none !important;
        border-bottom: 1px solid #E6E6EB;
    }
}
</style>