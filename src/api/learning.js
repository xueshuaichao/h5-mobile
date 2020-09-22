import { axios } from '../libs/axios';

export default {
    getTaskList(params) {
        return axios.post('/task/findByCondition', params)
    },

    getLearnList(params) {
        return axios.post('/userCourse/elective', params)
    },

    getStatisticsOfLearn() {
        return axios.get('/statistics/learn')
    }
}