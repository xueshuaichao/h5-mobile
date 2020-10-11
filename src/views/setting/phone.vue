<script>
import mixins from './mixins';
import api from '@/api/account';
import './index.less';

export default {
    name: "Name",
    
    mixins: [mixins],

    data() {
        return {
            form: {
                phone: '',
                verifyCode: '',
            },
            time: 60 * 1000,
            codeText: '获取验证码',
        }
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
                    <van-field v-model={ this.form.phone } maxlength="11" class="form-item" label="手机号" placeholder="请输入手机号" />
                    <van-field v-model={ this.form.verifyCode } class="form-item" label="验证码" placeholder="请输入验证码">
                        <template slot="button">
                            <p class="code" on-click={ this.handleGetCode }> { this.codeText } </p>
                        </template>
                    </van-field>
                </div>

                <div class={ ['button--default', 'button--active' ] } on-click={ this.handleChangePhone }>
                    确认
                </div>
            </div>
        )
    },
    
    created() {
        this.$once('hook:beforeDestroy', () => {
            clearInterval(this.codeTimer);
        });
    },

    methods: {
        onClickLeft() {
            console.log(1)
            this.$router.go(-1);
        },

        async handleGetCode() {
            const { phone } = this.form;

            if (!phone) {
                return this.$toast('请输入手机号');
            }
            
            this.$loading();
            try {
                await api.getCode({ phone });
                this.$toast.clear();
                this.$toast.success('发送成功');
                this.timer();
            }catch(e) {
                this.$toast.clear();
                this.$toast('获取失败请重试！');
            }
        },

        handleChangePhone() {
            if (!this.form.verifyCode) {
                return this.$toast('请输入验证码');
            }
            this.updatePhone();
        },
        
        async updatePhone() {
            const { phone, verifyCode } = this.form;
            this.$loading();

            try {
                const res = await api.updateUserPhone({ userMobile: phone, vcode: verifyCode });
                if (res) {
                    this.$toast.clear();
                    this.$toast('修改成功');
                    this.$router.go(-1);
                }
            }catch(e) {
                console.log(e)
            }
        },

        
        timer() {
            if (this.codeTimer) return;

            let time = 60;
            this.codeTimer = setInterval(() => {
                this.codeText = `${(time -= 1)}s`;

                if (time === 1) {
                    clearInterval(this.codeTimer);
                    this.codeText = '获取验证码';
                    this.codeTimer = null;
                }
            }, 1000);
        },
    }
}
</script>

<style lang="less" scoped>

</style>