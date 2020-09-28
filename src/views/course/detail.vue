<template>
  <div class="courseDetail">
      <div class="courseDetail-header">
          <h3>这里显示课程名称</h3>
      </div>
      <div class="courseDetail-player">
          <img src="../../assets/learning/new@2x.png" alt="">
          <span class="detail-fenlei">
              课程分类
          </span>
      </div>
      <div class="courseDetail-content">
          <div class="content-header">
              <span @click="changetype = item.id" v-for="(item, index) in contentType" :key="index">
                  {{item.name}}
              </span>
          </div>
          <div v-if="changetype === '0'" class="content-info">
              <p>中国疾控中心表示，全球新冠肺炎疫情此起彼伏，秋冬季是呼吸道疾病高发季节。</p>
          </div>
          <div v-if="changetype === '1'" class='content-catalog'>
                <van-collapse v-model="activeNames">
                    <van-collapse-item name="1">
                        <template #title>
                        <div class="catalog-title">
                            <span class="catalog-index">
                                1
                            </span> 
                            <span class="catalog-futitle">
                                标题1
                            </span>
                            <span class="catalog-hours">3 课时</span>
                        </div>
                        </template>
                        <div class="catalog-level">
                            <ul class="firstlevel">
                                <li class="firstlevel-li">
                                    <p class="firstlevel-li-p pstyle">第一节 人力资源</p>
                                    <ul class="secLevel">
                                        <li class="secLevel-li listyle1">
                                            <p class="secLevel-li-p pstyle1">1.1人力资源导论</p> 
                                            <ul class="triLevel">
                                                <li class="triLevel-li listyle1">
                                                    <p class="triLevel-li-p pstyle1">第三课 引论</p> 
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
      </div>
      <div class="courseDetail-btn">
            <div class="button" @click="handleClickSave">
                加入选学
            </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
         activeNames: ['1'],
        changetype: '1',
        contentType: [
            {name: '简介', id: '0'},
            {name: '目录', id: '1'},
            {name: '评价', id: '2'},
        ]
    }
  },
  components: {

  },
  methods: {
      handleClickSave(){},
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
<style lang="less">
.courseDetail{
    .van-collapse-item--border::after{
        border-top: 0px !important;
    }
    .van-cell::after{
        border-bottom: 0px !important;
    }
    .van-hairline--top-bottom::after{
        border: 0px !important;
    }
    .van-cell{
        line-height: 40px;
    }
    .van-cell__right-icon{
        line-height: 40px;
    }
    .van-collapse-item__content{
        padding: 12px 0px !important;
    }
    .van-cell--clickable:active{
        background: #fff;
    }
}
</style>
