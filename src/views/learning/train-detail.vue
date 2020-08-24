<template>
  <div class="training-detail">
    <van-nav-bar
      title="培训详情"
      left-arrow
      right-text="学情报告"
      @click-left="handleClickNavLeft"
      @click-right="handleClickNavRight"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClickNavLeft() {
      this.$router.go(-1);
    },
    handleClickNavRight() {
      console.log('nav-right-click');
    }
  }
};
</script>
