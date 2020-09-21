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
                    title="设置密码"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content">
                    <van-cell-group>
                        <van-field v-model={ this.form.name } label="原密码" placeholder="请输入原密码" />
                        <van-field v-model={ this.form.name } label="新密码" placeholder="请输入新密码6-20位英文+数字" />
                        <van-field v-model={ this.form.name } label="确认" placeholder="请再次输入新密码" />
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
        }
    }
}
</script>

<style lang="less" scoped>

</style>