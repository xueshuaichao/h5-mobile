/* eslint-disable no-unused-vars */
import { Promise } from  'es6-promise-polyfill';
import api from './api';
import { getQueryByName } from './utils';
import CONF from './config';
var platInfo = window.centerPlatInfo || {};
var host = window.passPortHost || window.location.origin;
export class Passport {
    constructor (host, options) {
        host && api.setHost(host);
        console.log(window.centerPlatInfo)
        if (options && options.header) {
            api.setHeader(options.header);
            platInfo = options.header;
            console.log(options);
        } else if (window.centerPlatInfo) {
            api.setHeader(window.centerPlatInfo);
        }
    }
    checkCookie() {
        return new Promise(function(resolve, reject) {
            api.checkCookie().then(function(res) {
                if (res.data) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            }, function(err) {
                reject(err);
            });
        });
    }
    setToken(Token) { // setToken in 其他平台
        var token = Token || getQueryByName(location.search, 'Token');
        return new Promise(function(resolve, reject){
            if (!token) {
                reject('no token')
            } else {
                api.checkToken({}, Token).then(function(res) {
                    if(res.data) {
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                }, function(err) {
                    reject(err);
                });
            }
        })
    }
    getToken() {
        return getQueryByName(location.search, 'Token');
    }
    goPcLogin() {
        window.location.replace(`${CONF.PassportHost}/pc/login?returnUrl=${encodeURIComponent(location.href)}&platformId=${platInfo.platformId}&userType=${platInfo.userType}`);
    }
    goH5Login() {
        window.location.replace(`${CONF.PassportHost}/h5/login?returnUrl=${encodeURIComponent(location.href)}&platformId=${platInfo.platformId}&userType=${platInfo.userType}`);
    }
}


if (host) {
    // lost protocol
    if (host.indexOf('http:') != 0 && host.indexOf('//') != 0) {
        host = '//' + host;
    }
}

// export var passport = new Passport(host, options);
