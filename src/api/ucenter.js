import { axios } from '../libs/axios';

export default {
    
    getUserInfo(params) {
        return axios.post('/ucenter/userInfo', params);
    },

    updateUserInfo(userId, params) {
        return axios.patch(`/ucenter/user/${userId}`, params)
    },

    updatePassword(params) {
        return axios.post('/ucenter/changePassword', params)
    }

}