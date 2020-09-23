<script>
import api from '@/api/ucenter';
import './index.less';

export default {
    name: "Name",

    data() {
        return {
            form: {
                username: this.$store.state.userInfo.username || '',
            },

            isBtnActive: false,
        }
    },
    
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
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
                    <van-field on-input={ (value) => {
                        this.isBtnActive = !!value;
                    } } class="form-item" v-model={ this.form.username } placeholder="请输入用户名" clearable />
                </div>

                <div class={ ['button--default', this.isBtnActive ? 'button--active' : ''] } on-click={ this.handleUpdateName }>
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
            if (!this.isBtnActive) {
                this.$toast('请输入姓名');
                return;
            }

            this.$toast.loading({
                forbidClick: true,
                duration: 0,
            });
            this.updateUserInfo();
        },

        async updateUserInfo() {
            const res = await api.updateUserInfo(1000118612570985, this.form)
            
            if (res) {
                this.$toast.clear();
                this.$toast('修改成功');
                this.$router.go(-1);
            }
        }
    }
}
</script>