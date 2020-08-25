<template>
    <div class="identification">
        <van-nav-bar title="实名认证" left-arrow="">
            <!-- <template #left>
                <van-icon name="arrow-left" />
            </template> -->
        </van-nav-bar>
        <div class="identity-picture">
            <div class="front picture">
                <van-uploader v-model="fileList" multiple :max-count="1" />
                <p>上传身份证正面</p>
            </div>
            <div class="back picture">
                <van-uploader v-model="fileList1" multiple :max-count="1" />
                <p>上传身份证背面</p>
            </div>
        </div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="姓名"
                label="姓名"
                placeholder="请输入姓名"
                :rules="[{ required: true, message: '请输入姓名' }]"
            />
            <van-field
                v-model="idCard"
                name="身份证号"
                label="身份证号"
                placeholder="请输入身份证号"
                :rules="[{ required: true, message: '请输入身份证号' }]"
            />
            <div style="margin: 16px;">
                <van-button
                    round
                    block 
                    type="primary" 
                    native-type="submit"
                    :loading="loading"
                >
                    下一步
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            idCard: "",
            fileList: [],
            fileList1: [],
            loading: false,
        };
    },
    methods: {
        onSubmit(values) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.$router.push({
                    name: 'faceDetect',
                    query: this.$route.query
                });
            }, 1000);
            console.log("submit", values);
        }
    }
};
</script>
<style lang="less">
.identification {
    .van-uploader__upload {
        width: 40%;
    }
    .van-uploader__preview-image,
    .van-uploader,
    .van-uploader__upload,
    .van-uploader__preview {
        width: 100%;
    }
}
</style>
<style lang="less" scoped>
.identity-picture {
    margin-top: 30px;
    .picture {
        width: 64%;
        margin: 0 auto;
    }
}
</style>
