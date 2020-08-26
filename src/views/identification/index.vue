<template>
    <div class="identification">
        <van-nav-bar title="实名认证" left-arrow @click-left="back">
            <!-- <template #left>
                <van-icon name="arrow-left" />
            </template>-->
        </van-nav-bar>
        <div class="identity-picture">
            <div class="front picture">
                <img src="../../assets/images/front.png" alt />

                <van-uploader v-model="fileList" multiple :max-count="1">
                    <van-icon name="add" class="add" />
                </van-uploader>
                <p>上传身份证正面</p>
            </div>
            <div class="back picture">
                <img src="../../assets/images/backId.png" alt />
                <van-uploader v-model="fileList1" multiple :max-count="1">
                    <van-icon name="add" class="add" />
                </van-uploader>
                <p>上传身份证背面</p>
            </div>
        </div>
        <van-form @submit="onSubmit">
            <div class="input">
                <van-field v-model="username" name="姓名" label="姓名" placeholder="请输入姓名" />
                <van-field v-model="idCard" name="身份证号" label="身份证号" placeholder="请输入身份证号" />
            </div>
            <div style="margin: 16px;">
                <van-button block type="primary" native-type="submit" :loading="loading">下一步</van-button>
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
            loading: false
        };
    },
    methods: {
        back() {
            this.$router.back();
        },
        onSubmit(values) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.$router.push({
                    name: "faceDetect",
                    query: {
                        action: "auth",
                        ...this.$route.query
                    }
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
        height: 160px;
        background-color: transparent;
    }
    .van-uploader {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
<style lang="less" scoped>
.identity-picture {
    margin-top: 30px;

    .picture {
        width: 482px;
        margin: 0 auto 30px;
        position: relative;
        p {
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(167, 173, 187, 1);
            line-height: 28px;
        }
        img {
            width: 100%;
        }
        .add {
            font-size: 100px;
            color: #6fd3bb;
            position: relative;
            left: 192px;
            top: 110px;
        }
    }
}
.input {
    width: 690px;
    margin: 0 auto;
    background: #f9fafd;
    .van-cell {
        background: transparent;
    }
}
</style>
