import { axios } from '../libs/axios';
export default {
    getTasks(params) {
        return axios.request('/train/v1/userTask/findTaskListAndUserApplyStatus', params)
    },
    getDetail(id) {
        return axios.get(`/train/v1/userTask/getTaskInfoByUserId?taskId=${id}`)
    }
}