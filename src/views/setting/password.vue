<script>
import './index.less';

export default {
    name: "Name",

    data() {
        return {
            form: {
                name: '',
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
                    <van-field v-model={ this.form.name } class="form-item margin-b-16" label="原密码" placeholder="请输入原密码" />
                    <van-field v-model={ this.form.name } class="form-item" label="新密码" placeholder="请输入新密码6-20位英文+数字" />
                    <van-field v-model={ this.form.name } class="form-item" label="确认" placeholder="请再次输入新密码" />
                    
                    <p class="tip">密码必须为6-20位数字加字母组合</p>
                </div>
                
                <div class={ ['button--default', this.isBtnActive ? 'button--active' : ''] }>
                    确认
                </div>
            </div>
        )
    },
 
    methods: {
        onClickLeft() {
            console.log(1)
            this.$router.go(-1);
        }
    }
}
</script>