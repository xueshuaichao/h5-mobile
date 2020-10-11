import { axios } from '../libs/axios';

export default {
    getUserInfo() {
        return axios.get('/ucenter/sso/checkCookie')
    },

    getLearnCount() {
        return axios.get('/learn/v1/statistics/learn/count')
    },

    getStatisticsOfLearn() {
        return axios.get('/learn/v1/statistics/learn')
    },

    upload(params) {
        return axios.file('/resource/v1/resource/uploadImage', params)
    },

    updateUserInfo(params) {
        return axios.post('/ucenter/updateByToken', params);
    },

    updateUserPassword(params) {
        console.log(params);
        return axios.post('/ucenter/changePassword', params)
    },

    updateUserPhone(params) {
        return axios.post('/ucenter/changePhone', params);
    },

    getCode(params) {
        return axios.post('/ucenter/smsCode/changeInfo', params)
    },

    getMyExam(params) {
        return axios.get('/exam/v1/paper/getMyExam', params)
    },

    // 消息
    getMessageList(params) {
        return axios.get('/learn/v1/message/findByCondition', params)
    },

    // 区域机构
    getAreaUnitList() {
        return axios.get('/ucenter/field/searchDetail?id=1')
    }
}