<script>
import mixins from './mixins';
import './index.less';

export default {
    name: "Name",
    
    mixins: [mixins], 
    
    data() {
        return {
            form: {
                username: '',
            },
            isBtnActive: false,
        }
    },

    created() {
        const { userInfo } = this.$store.state;

        if (userInfo) {
            this.form.username = userInfo.username;
        }
    },

    render() {
        return (
            <div class="container setting setting-name">
                <van-nav-bar
                    title="姓名"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content common-form">
                    <van-field class="form-item" v-model={ this.form.username } placeholder="请输入姓名" clearable />
                </div>

                <div class={ ['button--default', this.form.username ? 'button--active' : ''] } on-click={ this.handleUpdateName }>
                    确认
                </div>
            </div>
        )
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },

        handleUpdateName() {
            if (!this.form.username) {
                this.$toast('请输入用户名');
                return;
            }
            this.updateUserInfo(this.form)
        },
    }
}
</script>