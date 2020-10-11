import { axios } from '../libs/axios';
export default {
    getTasks(params) {
        return axios.request('/train/v1/userTask/findTaskListAndUserApplyStatus', params)
    },
    getMyTasks(params) {
        return axios.get('/train/v1/userTask/getMyTaskList', params)
    },
    getDetail(id) {
        return axios.get(`/train/v1/userTask/getTaskInfoByUserId?taskId=${id}`)
    },
    getUserInfo() {
        return axios.get('/ucenter/sso/checkCookie')
    },
    changeTaskApply(data) {
        return axios.post(
            `/train/v1/userTask/apply?taskId=${data.taskId}&isApply=${data.isApply}`,
            data,
        );
    },
    getAreaList() {
        return axios.get('/ucenter/field/searchDetail?id=1');
    }
}