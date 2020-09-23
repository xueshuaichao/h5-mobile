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

    // upload img
    upload(params) {
        return axios.file('/file/upload', params)
    }
}