
import { axios } from '../libs/axios';

export default {
    // 获取课程列表
    findByCondition(param) {
        return axios.request('/exam/v1/scene/findByCondition', param);
    },
    getScenePaper(param) {
        return axios.get('/exam/v1/scene/getScenePaper', param);
    },
}