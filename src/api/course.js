import { axios } from '../libs/axios';

export default {
    // 获取课程列表
    getCourselist(param) {
        return axios.get('/course/student/findCourseStudentList', param);
    },
    // 获取课程分类
    getCourseCategory() {
        return axios.get('/course/student/getCourseCategory');
    },
    // 获取课程详情
    findById(param) {
        return axios.get(
            `/course/student/findStudentCourseInfoById?id=${param}`
        );
    },
}