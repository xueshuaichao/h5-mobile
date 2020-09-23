import { axios } from '../libs/axios';

export default {
    getTaskList(pageSize = 10, pageNum = 1, params) {
        return axios.post(`/learnCenter/task/findByCondition?pageSize=${pageSize}&pageNum=${pageNum}`, params)
    },

    getLearnList(pageSize = 10, pageNum = 1, params) {
        return axios.post(`/learnCenter/userCourse/elective?pageSize=${pageSize}&pageNum=${pageNum}`, params)
    },

    getStatisticsOfLearn() {
        return axios.get('/learnCenter/statistics/learn')
    }
}