<template>
  <div class="train-item" @click="toDetail">
    <img :src="image" />
  </div>
</template>
<script>
import style1 from '../../../assets/training-1.png';
import style2 from '../../../assets/training-2.png';

export default {
    props: {
        s: {
           type: String,
           default: 'style1'
        },
        data: {
            type: Object,
            require: true
        }
    },
    computed: {
        image() {
            return ({
                style1,
                style2
            })[this.s] || style1;
        }
    },
    methods: {
        toDetail() {
            this.$router.push({ 
                name: 'trainDetail', 
                params: { 
                id: this.data.id 
                }
            });
        }
    }
}
</script>

<style scoped lang="less">
.train-item img {
    width: 100%;
    min-height: 193px;
}
</style>
