// mixins
import api from '@/api/account';

export default {
    computed: {
        userInfo() {
            return this.$store.state.userInfo || { };
        }
    },

    methods: {
        async updateUserInfo(params, message = '', payload = {}) {
            this.$loading(message);
            try {
                const res = await api.updateUserInfo({ ...params });

                if (res) {
                    this.$store.commit('setUserInfo', { ...this.userInfo, ...params, ...payload });
                    this.$router.go(-1);
                }
            } finally {
                this.$toast.clear();
            }

        }
    },
}