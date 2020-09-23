<script>
import api from '@/api/ucenter';
import './index.less';

const MAP = {
    oldPassword: '请输入原密码',
    password: '请输入新密码',
    secondPassword: '请再一次输入确认密码',
};

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
                    <van-field v-model={ this.form.oldPassword } class="form-item margin-b-16" label="原密码" placeholder="请输入原密码" />
                    <van-field v-model={ this.form.password } class="form-item" label="新密码" placeholder="请输入新密码6-20位英文+数字" />
                    <van-field v-model={ this.form.secondPassword} class="form-item" label="确认" placeholder="请再次输入新密码" />
                    
                    <p class="tip">密码必须为6-20位数字加字母组合</p>
                </div>
                
                <div class={ ['button--default', this.isBtnActive ? 'button--active' : ''] } on-click={ this.handleChangePassword }>
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
            const res = Object.keys(MAP).find(v => this.form[v] === '');
            
            if (res) {
                this.$toast(MAP[res]);
                return;
            }

            this.uodatePassword();
            
            this.$toast.loading({
                forbidClick: true,
                duration: 0,
            });
        },
        
        async uodatePassword() {
            try {
                const res = await api.updatePassword( { 
                    userId: '1000118612570985',
                    password: this.form.password,
                });

                if (res) {
                    this.$toast.clear();
                    this.$toast('修改成功')
                }
            } catch(e) {
                console.log(e)
                this.$toast.clear();
            }
        }
    }
}
</script>