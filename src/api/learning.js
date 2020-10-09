import { axios } from '../libs/axios';

export default {
    getTaskList(pageSize = 10, pageNum = 1, params) {
        return axios.post(`/learn/v1/task/findByCondition?pageSize=${pageSize}&pageNum=${pageNum}`, params)
    },

    getLearnList(pageSize = 10, pageNum = 1, params) {
        return axios.post(`/learn/v1/userCourse/elective?pageSize=${pageSize}&pageNum=${pageNum}`, params)
    },

    getStatisticsOfLearn() {
        return axios.get('/learn/v1/statistics/learn')
    }
}