import { axios } from '../libs/axios';

export default {
    getUserInfo() {
        return axios.get('/learn/v1/user/info')
    },

    getLearnCount() {
        return axios.get('/learn/v1/statistics/learn/count')
    },

    getStatisticsOfLearn() {
        return axios.get('/learn/v1/statistics/learn')
    },

    upload(params) {
        return axios.file('/resourceCenter/v1/resource/uploadImage', params)
    },

    updateUserInfo(params) {
        return axios.post('/learn/v1/user/update', params);
    },

    updateUserPassword(params) {
        return axios.post('/learn/v1/user/updatePassword', params)
    },

    updateUserPhone(params) {
        return axios.post('/learn/v1/user/updatePhone', params);
    },

    getCode(params) {
        return axios.get('/learn/v1/user/sendSms', params)
    }

}