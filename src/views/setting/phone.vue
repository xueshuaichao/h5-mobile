<script>
import api from '@/api/ucenter';
import './index.less';

export default {
    name: "Name",

    data() {
        return {
            form: {
                userMobile: '',
                isBtnActive: '',
            }
        }
    },
    
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },

    created() {
        this.form.userMobile = this.userInfo.userMobile;
    },

    render() {
        return (
            <div class="container setting-phone setting">
                <van-nav-bar
                    title="修改手机号"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content common-form">
                    <van-field v-model={ this.form.userMobile } class="form-item" label="手机号" placeholder="请输入手机号" />
                    <van-field v-model={ this.form.code } class="form-item" label="验证码" placeholder="请输入验证码">
                        <template slot="button">
                            <p class="code">发送验证码</p>
                        </template>
                    </van-field>
                </div>

                <div class={ ['button--default', this.isBtnActive ? 'button--active' : ''] } on-click={ this.handleChangePhone }>
                    确认
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
        },

        handleChangePhone() {
            const { userMobile, code } = this.form;

            if (!userMobile) {
                this.$toast('请输入手机号');
                return;
            }
            if (!code) {
                this.$toast('请输入验证码');
            }

            this.updatePhone();
        },

        async updatePhone() {
            try {
                const res = await api.updateUserInfo('1000118612570985', {
                    password: this.form.userMobile,
                });

                if (res) {
                    this.$toast.clear();
                    this.$toast('修改成功');
                    this.$router.go(-1)
                }
            } catch(e) {
                console.log(e)
                this.$toast.clear();
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>