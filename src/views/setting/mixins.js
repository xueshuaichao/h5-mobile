// mixins
import api from '@/api/account';

export default {
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },

    methods: {
        async updateUserInfo(params, message = '') {
            this.$loading(message);
            try {
                const res = await api.updateUserInfo({ id: this.userInfo.id, ...params });

                if (res) {
                    this.$store.commit('setUserInfo', { ...this.userInfo, ...params });
                    this.$router.go(-1);
                }
            } finally {
                this.$toast.clear();
            }

        }
    },
}