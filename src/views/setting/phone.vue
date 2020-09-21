<script>
export default {
    name: "Name",

    data() {
        return {
            form: {
                name: '',
            }
        }
    },

    render() {
        return (
            <div class="container">
                <van-nav-bar
                    title="修改手机号"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content">
                    <van-cell-group>
                        <van-field v-model={ this.form.name } label="手机号" placeholder="请输入手机号" />
                        <van-field v-model={ this.form.name } label="验证码" placeholder="请输入验证码">
                            <template slot="button">
                                <van-button size="small" plain hairline type="info" on-click={ this.getCode }>
                                    发送验证码
                                </van-button>
                            </template>
                        </van-field>
                    </van-cell-group>
                </div>

                <van-button type="primary" size="large" class="fixed-bottom">确定</van-button>
            </div>
        )
    },

    methods: {
        onClickLeft() {
            console.log(1)
            this.$router.go(-1);
        },

        getCode() {
            console.log('发送验证码');
        }
    }
}
</script>

<style lang="less" scoped>

</style>