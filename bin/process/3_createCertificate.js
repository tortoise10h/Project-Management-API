
/* eslint-disable */
const axios = require('axios');
const _ = require('lodash');

const constants = require('../../common/lib/constant');
const createCourse = async (apiURL) => {
        try {
            /** Login */
            const { data: login } = await axios.post(`${apiURL}/api/auth/login`, { username: 'admin', password: process.env.PASSWORD_ADMIN || '12345678' });
            const token = `Bearer ${login.token}`;
            const { data: certificateC } = await axios.post(`${apiURL}/api/course/1/certificateType`, {
                "code": "JAVA",
                "expire_time": 4,
                "duration_in": "year",
                "is_active": true,
                "certificate_format_id": 1,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateC.code);

            const { data: certificateD } = await axios.post(`${apiURL}/api/course/2/certificateType`, {
                "code": "JAVASCRIPT",
                "expire_time": 5,
                "duration_in": "year",
                "is_active": true,
                "certificate_format_id": 2,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateD.code);

            const { data: certificateE } = await axios.post(`${apiURL}/api/course/3/certificateType`, {
                "code": "C_SHARP",
                "expire_time": 6,
                "duration_in": "year",
                "is_active": true,
                "certificate_format_id": 3,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateE.code);

            const { data: certificateF } = await axios.post(`${apiURL}/api/course/4/certificateType`, {
                "code": "ATVSTP",
                "expire_time": 7,
                "duration_in": "month",
                "is_active": true,
                "certificate_format_id": 4,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateF.code);

            const { data: certificateG } = await axios.post(`${apiURL}/api/course/5/certificateType`, {
                "code": "PYTHON",
                "expire_time": 8,
                "duration_in": "month",
                "is_active": true,
                "certificate_format_id": 1,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateG.code);

            const { data: certificateH } = await axios.post(`${apiURL}/api/course/6/certificateType`, {
                "code": "atld_certification",
                "expire_time": 9,
                "duration_in": "month",
                "is_active": true,
                "certificate_format_id": 2,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateH.code);

            const { data: certificateI } = await axios.post(`${apiURL}/api/course/7/certificateType`, {
                "code": "course_certification",
                "expire_time": 10,
                "duration_in": "month",
                "is_active": true,
                "certificate_format_id": 3,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateI.code);

            const { data: certificateJ } = await axios.post(`${apiURL}/api/course/8/certificateType`, {
                "code": "managing_safely",
                "expire_time": 11,
                "duration_in": "month",
                "is_active": true,
                "certificate_format_id": 4,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateJ.code);

            const { data: certificateK } = await axios.post(`${apiURL}/api/course/9/certificateType`, {
                "code": "hlatvls_certification",
                "expire_time": 1,
                "duration_in": "year",
                "is_active": true,
                "certificate_format_id": 1,
            }, { headers: { Authorization: token } });
            console.log('-----> Certificate-Type: ', certificateK.code);
        } catch (ex) {
            console.log(ex)
        }
};
module.exports = createCourse;
