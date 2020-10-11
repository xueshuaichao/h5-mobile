import { axios } from '../libs/axios';

export default {
    // 获取课程列表
    getCourselist(param) {
        return axios.get('/course/v1/course/student/findAppCourseStudentList', param);
    },
    // 获取课程分类
    getCourseCategory() {
        return axios.get('/course/v1/course/student/getCourseCategory');
    },
    // 获取课程详情
    findById(param) {
        return axios.get(
            `/course/v1/course/student/findStudentCourseInfoById?id=${param}`
        );
    },
    // 获取课程目录
    findCourseItemByCourseId(data) {
        return axios.get('/course/v1/course/student/findStudentCourseItem', data);
    },
    // 加入选学
    startStudy(data) {
        return axios.post(
            `/course/v1/userCourseRecord/student/course/signup?courseId=${data}`,
        );
    },
    // 提交评价
    submitCourseRatingForm(data) {
        return axios.post(
            '/course/v1/courseRatingForm/student/submitCourseRatingForm',
            data,
        );
    },
    // 课程视频播放 resource/getVideoPlayURLById
    getVideoPlayURLById(data) {
        return axios.get('/resource/v1/resource/getVideoPlayURLById', data);
    },
    // 根据资源ID查询音频或文档地址
    getAudioOrDocUrl(data) {
        return axios.get('/resource/v1/resource/getAudioOrDocUrl', data);
    },
    // 保存课程进度 /courseLearningLog/student/saveLearningLog
    saveLearningLog(data) {
        return axios.post(
            '/course/v1/courseLearningLog/student/saveLearningLog',
            data,
        );
    },
    // 根据父级分类id查询子类 /category/getChildren
    getChildren(data) {
        return axios.get('/resource/v1/category/getChildren', data);
    },
    // /userCourseRecord/app/course/findSignUpCourseAppWithPage
    myChoseCourse(data) {
        return axios.post(`/course/v1/userCourseRecord/app/course/findSignUpCourseAppWithPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, data);
    },
    // 精品课程   /course/student/findBoutiqueCourseList
    findBoutiqueCourseList(data) {
        return axios.get('/course/v1/course/student/findBoutiqueCourseList', data);
    },
    // 获取banner 
    bannerList() {
        return axios.get('system/v1/replay/student/list?channel=1');
    },

    // 判断用户是否已报名
    userTaskGetTaskInfoByUserId(data) {
        return axios.get('/train/v1/userTask/getTaskInfoByUserId', data);
    },
}