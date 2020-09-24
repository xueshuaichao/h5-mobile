import { axios } from '../libs/axios';

export default {
    getUserInfo() {
        return axios.get('/learnCenter/user/info')
    },

    getLearnCount() {
        return axios.get('/learnCenter/statistics/learn/count')
    },

    getStatisticsOfLearn() {
        return axios.get('/learnCenter/statistics/learn')
    },

    upload(params) {
        return axios.file('/resource/file/upload', params)
    },

    updateUserInfo(params) {
        return axios.post('/learnCenter/user/update', params);
    },

    updateUserPassword(params) {
        return axios.post('/learnCenter/user/updatePassword', params)
    },

    updateUserPhone(params) {
        return axios.post('/learnCenter/user/updatePhone', params);
    },
}