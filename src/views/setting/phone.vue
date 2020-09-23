<script>
import './index.less';

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
            <div class="container setting-phone">
                <van-nav-bar
                    title="修改手机号"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content common-form">
                    <van-field v-model={ this.form.name } class="form-item" label="手机号" placeholder="请输入手机号" />
                    <van-field v-model={ this.form.name } class="form-item" label="验证码" placeholder="请输入验证码">
                        <template slot="button">
                            <p class="code">发送验证码</p>
                        </template>
                    </van-field>
                </div>

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