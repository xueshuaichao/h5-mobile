<template>
    <div class="coursepdf">
        <iframe :src="pdfurl" style="width: 100%;height: 100%;position: absolute; left: 0px"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pdfurl: ''
        };
    },
    components: {},
    methods: {},
    mounted() {
        if(this.$route.query.pdfurl) {
            this.pdfurl = this.$$router.query.pdfurl;
        }
    }
};
</script>

<style scoped lang="less">
.coursepdf{

}
</style>
