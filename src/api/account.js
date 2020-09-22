import { axios } from '../libs/axios';

export default {
    getUserInfo() {
        return axios.get('/user/info')
    },

    // /statistics/learn/count
    getLearnCount() {
        return axios.get('/statistics/learn/count')
    },

    // 个人评估 /statistics/learn
    getStatisticsOfLearn() {
        return axios.get('/statistics/learn')
    }
}