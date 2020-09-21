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
                    title="姓名"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content">
                    <van-cell-group>
                        <van-field v-model={ this.form.name } label="姓名" placeholder="请输入用户名" />
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