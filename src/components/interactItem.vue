<template>
  <div class="interact-item">
    <p class="title">钢筋现场验收有哪些重点？</p>
    <div class="content">
      <p class="desc">请教请教请教钢筋现场验收有哪些重点？请教请教请教钢筋现场 验收有哪些重点请教请教请教钢筋现场验收有哪些重点？
      </p>
      <div class="img">
        <img src="../assets/example1.jpg">
        <img src="../assets/example1.jpg">
      </div>
      <div class="bottom">
        <div class="author">
          <van-icon name="user-o" style="margin-right: 5px"/>
          <span>张三</span>
        </div>
        <div class="operate">
          <div :class="{active: hasPrasie}" style="margin-right: 5px" @click="changePraise">
            <van-icon name="good-job-o" style="position: relative;top: 3px; margin-right: 5px"/>
            <span>{{praise}}</span>
          </div>
          <div :class="{active: hasComment}" @click="changeComment">
            <van-icon name="chat-o" style="position: relative;top: 3px"/>
            <span>{{comment}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'interactItem',
  data: ()=>{
    return {
      praise: 13,
      hasPrasie: false,
      comment: 13,
      hasComment: false
    }
  },
  methods: {
    changePraise: function(){
      this.hasPrasie && this.praise-- || this.praise ++
      this.hasPrasie = !this.hasPrasie
    },
    changeComment: function(){
      this.hasComment && this.component-- || this.comment ++
      this.hasComment = !this.hasComment
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../css/variables';

.active{
  color: @blue;
}

.interact-item {
  border: 1px solid;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;

  .title{
    display: flex;
  }

  .content {
    font-size: 12px;

    .desc{
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow:hidden;
      text-align: left;
    }

    .img{
      margin: 5px;
      display: flex;
      flex-wrap: wrap;

      img{
        margin-right: 5px;
        width: 100px;
        height: 75px;
      }
    }

    .bottom{
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author{
        color: @blue;
        display: flex;
        align-items: center;
      }

      .operate{
        display: flex;
      }
    }
  }
}

.active{
  color: @blue;
}
</style>
