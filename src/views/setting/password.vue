<script>
import api from '@/api/account';
import './index.less';

export default {
    name: "Name",

    data() {
        return {
            form: {
                password: '',
                oldPassword: '',
                secondPassword: '',
                isBtnActive: false,
            }
        }
    },

    render() {
        return (
            <div class="container setting-password setting">
                <van-nav-bar
                    title="设置密码"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content common-form">
                    <van-field v-model={ this.form.oldPassword } type="password" class="form-item margin-b-16" clearable label="原密码" placeholder="请输入原密码" />
                    <van-field v-model={ this.form.password } maxlength="20" type="password" class="form-item" label="新密码" clearable placeholder="请输入新密码6-20位英文+数字" />
                    <van-field v-model={ this.form.secondPassword} type="password"  maxlength="20" class="form-item" label="确认" clearable placeholder="请再次输入新密码" />
                    
                    <p class="tip">密码必须为6-20位数字加字母组合</p>
                </div>
                
                <div class={ ['button--default', 'button--active'] } on-click={ this.handleChangePassword }>
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
        
        handleChangePassword() {
            const reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
            const { oldPassword, password, secondPassword } = this.form;

            if (!oldPassword) {
                this.$toast('请输入原密码');
                return;
            }

            if (!password) {
                this.$toast('请输入新密码');
                return;
            } else if(!reg.test(password)){
                this.$toast('密码格式不正确');
                return;
            }

            if (!secondPassword) {
                this.$toast('请再次输入新密码');
                return;
            } else if( secondPassword !== password) {
                this.$toast('两次密码不一致');
                return;
            }

            this.uodatePassword(oldPassword, password, secondPassword);
        },
        
        async uodatePassword(oldPassword, password, secondPassword) {
            this.$loading();

            try {
                const res = await api.updateUserPassword({ password: oldPassword, newPassword: password, repeatPassword: secondPassword });
                if (res) {
                    this.$toast('修改成功');
                }
                this.$router.go(-1);
            } finally {
                this.$toast.clear();
            }
        }
    }
}
</script>