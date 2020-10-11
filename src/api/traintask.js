import { axios } from '../libs/axios';
export default {
    getTrainTasks(params) {
        return axios.get('/train/v1/userTask/getMyTaskList', params)
    }
}