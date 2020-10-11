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
                avatar: this.$store.state.userInfo.avatar || '',
            }
        }
    },
    
    render() {
        return (
            <div class="container setting-photo">
                <van-nav-bar
                    title="修改头像"
                    left-arrow
                    on-click-left={ this.onClickLeft }
                />
                <div class="content">
                    {
                        <img on-click={ this.handleClick } src={ this.form.avatar } />
                    }
                    <input type="file" ref="file" style="display: none" on-change={ this.handleChange }/>
                </div>
            </div>
        )
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },

        handleClick() {
            this.$refs.file.click();
        },

        handleChange(e) {
            const files = e.target.files;
            this.$loading('上传中');
            api.upload({ file: files[0] }).then((data) => {
                this.form.avatar = data;
                this.$toast.clear();
                this.$toast.success('上传成功');

                this.updateUserInfo(this.form);
            });
        },
    }
}
</script>