/* eslint-disable */
const axios = require('axios');
const _ = require('lodash');

const constants = require('../../common/lib/constant');

const createDocument = async (base) => {
    const { data: login } = await axios.post(`${base}/api/auth/login`, { username: 'admin', password: process.env.PASSWORD_ADMIN || '12345678' });
    const token = `Bearer ${login.token}`;
    try {
        const { data: courses } = await axios.get(`${base}/api/course`, { headers: { Authorization: token } });
        if (courses && courses.data) {
            courses.data.map(async (course, index) => {
                const { data: document } = await axios.post(`${base}/api/course/1/document`, {
                    //"course_id": `${course.id}`,
                    "name": `Tài liệu ${course.name}`,
                    "license": "Digitech global",
                    "is_active": true,
                    //"document": null,
                }, { headers: { Authorization: token } });
                console.log('-----> Certificate-Type: ', document.code);
            })
        }
        else {
            console.log(err);
        }
    } catch (ex) {
        console.log("=========Output==========:>: createDocument -> ex", ex)
    }
}
module.exports = createDocument;