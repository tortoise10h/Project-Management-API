
/* eslint-disable */
const axios = require('axios');
const _ = require('lodash');

const constants = require('../../common/lib/constant');
const createStudyShift = async (apiURL) => {
        try {
            /** Login */
            const { data: login } = await axios.post(`${apiURL}/api/auth/login`, { username: 'admin', password: process.env.PASSWORD_ADMIN || '12345678' });
            const token = `Bearer ${login.token}`;
            /** Study shift */
            const { data: shift1 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '7:30',
                end_time: '9:30',
                day_of_week: 1,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift1.id}, ${shift1.start_time} - ${shift1.end_time}`);
            const { data: shift2 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '7:30',
                end_time: '9:30',
                day_of_week: 2,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift2.id}, ${shift2.start_time} - ${shift2.end_time}`);
            const { data: shift3 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '7:30',
                end_time: '9:30',
                day_of_week: 3,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift3.id}, ${shift3.start_time} - ${shift3.end_time}`);
            const { data: shift4 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '7:30',
                end_time: '9:30',
                day_of_week: 4,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift4.id}, ${shift4.start_time} - ${shift4.end_time}`);
            const { data: shift5 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '7:30',
                end_time: '9:30',
                day_of_week: 5,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift5.id}, ${shift5.start_time} - ${shift5.end_time}`);
            const { data: shift6 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '7:30',
                end_time: '9:30',
                day_of_week: 6,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift6.id}, ${shift6.start_time} - ${shift6.end_time}`);
            const { data: shift7 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '7:30',
                end_time: '9:30',
                day_of_week: 0,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift7.id}, ${shift7.start_time} - ${shift7.end_time}`);
            const { data: shift8 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '10:00',
                end_time: '11:30',
                day_of_week: 1,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift8.id}, ${shift8.start_time} - ${shift8.end_time}`);
            const { data: shift9 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '10:00',
                end_time: '11:30',
                day_of_week: 2,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift9.id}, ${shift9.start_time} - ${shift9.end_time}`);
            const { data: shift10 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '10:00',
                end_time: '11:30',
                day_of_week: 3,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift10.id}, ${shift10.start_time} - ${shift10.end_time}`);
            const { data: shift11 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '10:00',
                end_time: '11:30',
                day_of_week: 4,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift11.id}, ${shift11.start_time} - ${shift11.end_time}`);
            const { data: shift12 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '10:00',
                end_time: '11:30',
                day_of_week: 5,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift12.id}, ${shift12.start_time} - ${shift12.end_time}`);
            const { data: shift13 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '10:00',
                end_time: '11:30',
                day_of_week: 6,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift13.id}, ${shift13.start_time} - ${shift13.end_time}`);
            const { data: shift14 } = await axios.post(`${apiURL}/api/shift`, [{
                start_time: '10:00',
                end_time: '11:30',
                day_of_week: 0,
            }], { headers: { Authorization: token } });
            console.log(`-----> Study Shift: ${shift14.id}, ${shift14.start_time} - ${shift14.end_time}`);
        } catch (ex) {
            console.log(ex)
        }
};
module.exports = createStudyShift;
