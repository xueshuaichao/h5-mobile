<script>
import './index.less';

export default {
    name: "Name",

    data() {
        return {
            form: {
                name: this.$store.state.userInfo.name || '',
            },

            isBtnActive: false,
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
                    } } class="form-item" v-model={ this.form.name } placeholder="请输入用户名" clearable />
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
            this.$toast.loading({
                forbidClick: true,
            })
        }
    }
}
</script>