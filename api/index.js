import apiRoot from '../config/prod.env.js';
import service from './service';
import {
    userInfo
} from '../store/types';

export default {

    // 获取session_key
    getSessionKey(params) {
        return service.postP(apiRoot.baseApiUrl + '/auth/wechatLogin', params, false);
    },

    // 获取用户信息
    getWeChatUserInfo(params) {
        return service.postP(apiRoot.baseApiUrl + '/auth/getUserInfo', params, false);
    },

    // 获取用户信息
    getWeChatPhoneNumber(params) {
        return service.postP(apiRoot.baseApiUrl + '/auth/getUserPhone', params, false);
    },

    // findCustomerstructureDtos(params) {
    //     return service.postP(apiRoot.baseApiUrl + '/consumer/findCustomerstructureDtos', params,true); 
    // },

    // findVisiableHelmet(params) {
    //     return service.postP(apiRoot.baseApiUrl + '/consumer/findVisiableHelmet', params,true); 
    // },

    // findOwnHelmet(params) {
    //     return service.postP(apiRoot.baseApiUrl + '/consumer/findOwnHelmet', params,true); 
    // },

    // findMainInfo(params) {
    //     return service.postP(apiRoot.baseApiUrl + '/consumer/findMainInfo', params,true); 
    // },

    // 查询可见的帽子
    findVisiableHelmetPage(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/findVisiableHelmetPage', params, true);
    },

    // 查询已拥有的帽子
    findOwnHelmetPage(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/findOwnHelmetPage', params, true);
    },

    // 分配帽子
    allocationOwnHelmet(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/allocationOwnHelmet', params, true);
    },

    // 修改安全帽
    updateHelmet(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/updateHelmet', params, true);
    },

    // 组织架构树
    findCustomerstructureDtosTree(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/findCustomerstructureDtosTree', params, true);
    },

    // 组织架构树详情
    findCustomerstructureById(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/findCustomerstructureById', params, true);
    },

    // 新增组织
    addCustomerstructure(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/addCustomerstructure', params, true);
    },

    // 修改组织信息
    updateCustomerstructure(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/updateCustomerstructure', params, true);
    },

    // 删除组织
    deleteCustomerstructure(params) {
        return service.postP(apiRoot.baseApiUrl + '/consumer/deleteCustomerstructure', params, true);
    },

    // 新增管理员
    addPerson(params) {
        return service.postP(apiRoot.baseApiUrl + '/person/addPerson', params, true);
    },

    // 修改管理员
    updatePerson(params) {
        return service.postP(apiRoot.baseApiUrl + '/person/updatePerson', params, true);
    },

    // 删除管理员
    deletePerson(params) {
        return service.postP(apiRoot.baseApiUrl + '/person/deletePerson', params, true);
    },

    // 获取管理员
    listPerson(params) {
        return service.postP(apiRoot.baseApiUrl + '/person/listPerson', params, true);
    },

    // 获取组织帽子
    findHelmetPage(params) {
        return service.postP(apiRoot.baseApiUrl + '/custstruhelmet/findHelmetPage', params, true);
    },

    // 获取组织下的子组织
    findStruSelfAndSons(params) {
        return service.postP(apiRoot.baseApiUrl + '/custstruhelmet/findStruSelfAndSons', params, true);
    },

    // 获取可授权的组织帽子
    findCuststruHelmets(params) {
        return service.postP(apiRoot.baseApiUrl + '/custstruhelmet/findCuststruHelmets', params, true);
    },

    // 组织授权分配帽子
    allocationStruHelmet(params) {
        return service.postP(apiRoot.baseApiUrl + '/custstruhelmet/allocationStruHelmet', params, true);
    },

}