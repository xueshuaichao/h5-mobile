
import { axios } from '../libs/axios';

export default {
    // 一级分类列表
    getCategoryList() {
        return axios.get('/resourceCenter/v1/category/getTree');
    },
    getChildren(categoryId) {
        return axios.get(`/resourceCenter/v1/category/getChildren?categoryId=${categoryId}`);
    },
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
    getResult(param) {
        return axios.get('/exam/v1/paper/getExamResultOverview', param);
        
    },
    getNote(param) {
        return axios.get('/exam/v1/scene/getExamNote', param);
    },
}