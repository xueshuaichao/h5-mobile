
import { axios } from '../libs/axios';

export default {
    // 获取课程列表
    findByCondition(param) {
        return axios.request('/exam/v1/scene/findByCondition', param);
    },
    //试题列表
    getScenePaper(param) {
        return axios.get('/exam/v1/scene/getScenePaper', param);
    },
    commitPaper(param) {
        return axios.post('/exam/v1/paper/commitPaper', param);
    },
    getExamResultDetail(param) {
        return axios.get('/exam/v1/paper/getExamResultDetail', param);
    },
    joinScene(param) {
        return axios.get('/exam/v1/scene/joinScene', param);
    },
    

    
    
}