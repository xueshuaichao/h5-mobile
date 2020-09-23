<script>
import api from '@/api/account';
import './index.less';

export default {
    name: "Name",

    data() {
        return {
            form: {
                name: '',
            }
        }
    },
    
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
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
                        <img on-click={ this.handleClick } src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg' />
                    }
                    <input type="file" ref="file" style="display: none" on-change={ this.handleChange }/>
                </div>
            </div>
        )
    },

    methods: {

        onClickLeft() {
            console.log(1)
            this.$router.go(-1);
        },

        handleClick() {
            this.$refs.file.click();
        },

        handleChange(e) {
            const files = e.target.files;
            // this.$toast.loading({  
            //     message: '上传中',
            //     forbidClick: true,
            // })
            // console.log(e)

            api.upload({ file: files[0] })
        }
    }
}
</script>