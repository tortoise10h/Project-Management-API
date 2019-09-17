/* eslint-disable */

require('dotenv').config({});
const axios = require('axios');
const _ = require('lodash');

const port = process.env.SERVER_PORT || 3000;
const base = `http://127.0.0.1:${port}`;
const constants = require('./../common/lib/constant')

const listCustomer = [];
const NUMBER_STUDENT = 100;
//==========================================================
const getFakeStudentData = (relationship) => {
    return axios.get('https://randomuser.me/api/?nat=us')
        .then(({ data }) => {
            const [student] = data.results;
            const {
                id,
                gender,
                name,
                location,
                email,
                dob,
                phone,
                nat,
                login,
            } = student;
            const obj = {
                first_name: name.first,
                last_name: name.last,
                gender: gender,
                date_of_birth: dob.date,
                address: location.street,
                identifier: id.value,
                city: location.city,
                country: nat,
                zip: `${location.postcode}`,
                phone,
                email,
                customer_relationship: relationship,
                login_info: {
                    username: login.username,
                    password: login.password,
                }
            }
            return obj;

        })
}

const createTestData = async () => {
    try {
        /** Login */
        const { data: login } = await axios.post(`${base}/api/auth/login`, { username: 'admin', password: 'admin' });
        const token = `Bearer ${login.token}`;

        /** Create company user */
        const { data: digitechCo } = await axios.post(`${base}/api/customer`, {
            type: 'COMPANY',
            name: `Digitech Global Co`,
            address: 'HCM',
            phone: `0903211315`,
            email: `business1@digitechglobalco.com`,
            extra_details: `Công ty TNHH Digitech Solutions`,
            contact_person: `Tony Hoang`,
            short_name: `DGS`,
            zip_code: `DGSZIP`,
            login_info: {
                username: `business`,
                password: 'business',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Company: ', digitechCo.name);
        listCustomer.push({
            id: digitechCo.id,
            type: digitechCo.type,
        });

        const { data: avengerCo } = await axios.post(`${base}/api/customer`, {
            type: 'COMPANY',
            name: `Avenger`,
            address: 'Hà Nội',
            phone: `0903211315`,
            email: `business@avenger.com`,
            extra_details: `Công ty TNHH Avenger US`,
            contact_person: `Mr. Stark`,
            short_name: `AVG`,
            zip_code: `AVGZIP`,
            login_info: {
                username: `avenger`,
                password: 'avenger',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Company: ', avengerCo.name);
        listCustomer.push({
            id: avengerCo.id,
            type: avengerCo.type,
        });

        /** Create personal user */
        const { data: personalPhat } = await axios.post(`${base}/api/customer`, {
            type: 'PERSONAL',
            name: `Nguyễn Tấn Phát`,
            address: 'HCM',
            phone: '01234566789',
            email: `phatnt@digitechglobalco.com`,
            identifier: `456789323224`,
            login_info: {
                username: `phatnt`,
                password: 'phatnt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalPhat.name);
        listCustomer.push({
            id: personalPhat.id,
            type: personalPhat.type,
        });

        const { data: personalDanh } = await axios.post(`${base}/api/customer`, {
            type: 'PERSONAL',
            name: `Võ Thành Danh`,
            address: 'HCM',
            phone: '9876543232',
            email: `danhvt@digitechglobalco.com`,
            identifier: `56789402342378`,
            login_info: {
                username: `danhvt`,
                password: 'danhvt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalDanh.name);
        listCustomer.push({
            id: personalDanh.id,
            type: personalDanh.type,
        });

        const { data: personalHung } = await axios.post(`${base}/api/customer`, {
            type: 'PERSONAL',
            name: `Dương Tấn Hùng`,
            address: 'HCM',
            phone: '3241654887',
            email: `hungdt@digitechglobalco.com`,
            identifier: `67238940234`,
            login_info: {
                username: `hungdt`,
                password: 'hungdt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalHung.name);
        listCustomer.push({
            id: personalHung.id,
            type: personalHung.type,
        });

        /** Create student for company user */
        let promises = [];
        for (let i = 0; i < NUMBER_STUDENT; i++) {
            const promise = getFakeStudentData('EMPLOYER');
            promises.push(promise);
        }

        const studentsDigitech = await Promise.all(promises);
        console.log(`Get students for digitech, ${studentsDigitech.length}`);
        await axios.post(`${base}/api/customer/${digitechCo.id}/student/import`, studentsDigitech, { headers: { Authorization: token } });
        console.log('-----> [Raw all students data] Completed', NUMBER_STUDENT);

        promises = [];
        for (let i = 0; i < NUMBER_STUDENT; i++) {
            const promise = getFakeStudentData('EMPLOYER');
            promises.push(promise);
        }

        const studentsAvenger = await Promise.all(promises);
        console.log(`Get students for avanger, ${studentsAvenger.length}`);
        await axios.post(`${base}/api/customer/${avengerCo.id}/student/import`, studentsAvenger, { headers: { Authorization: token } });

        console.log('-----> [Raw all students data] Completed', promises.length);
        /** Create institute */
        let { data: createdInstitute } = await axios.get(`${base}/api/institute`);
        if (createdInstitute.length === 0) {
            const { data: institute } = await axios.post(`${base}/api/institute`, {
                name: 'Main Institute',
                address: 'Address of main institute',
                phone: '0234567891231',
                email: 'main@institute.com',
                extra_details: 'Testing main institute extra details',
            }, { headers: { Authorization: token } });
            createdInstitute = institute;
        } else {
            createdInstitute = createdInstitute[0];
        }
        console.log('-----> Institute: ', createdInstitute.name);

        /** Create center for main institute */
        let { data: createdMainCenter } = await axios.get(`${base}/api/center`);
        if (createdMainCenter.data.length === 0) {
            const { data: center } = await axios.post(`${base}/api/institute/${createdInstitute.id}/center`, {
                name: 'Main center',
                address: 'Address of main center',
                phone: '0234567891231',
                email: 'main@center.com',
                extra_details: 'Testing main center extra details',
            }, { headers: { Authorization: token } });
            createdMainCenter = center;
        } else {
            createdMainCenter = createdMainCenter.data[0];
        }
        console.log('-----> Center:', createdMainCenter.name);

        let { data: createdAlterCenter } = await axios.get(`${base}/api/center`);
        if (createdAlterCenter.data.length === 1) {
            const { data: center } = await axios.post(`${base}/api/institute/${createdInstitute.id}/center`, {
                name: 'Alter center',
                address: 'Address of alter center',
                phone: '0234567891231',
                email: 'alter@center.com',
                extra_details: 'Testing alter center extra details',
            }, { headers: { Authorization: token } });
            createdAlterCenter = center;
        } else {
            createdAlterCenter = createdAlterCenter.data[0];
        }
        console.log('-----> Center:', createdAlterCenter.name);

        /** Create category */
        const categories = ['Java', 'CSharp', 'JavaScript', 'C', 'CPP', 'Go', 'Python', 'Ruby', 'Pascal'];
        const { data: currentCategories } = await axios.get(`${base}/api/course/category`, { headers: { Authorization: token } });
        if (currentCategories.totalRecord < categories.length) {
            const names = currentCategories.data.map(c => c.name);
            const diff = _.difference(categories, names);
            if (diff.length > 0) {
                for (let i = 0; i < diff.length; i++) {
                    const { data: cate } = await axios.post(`${base}/api/course/category`, {
                        name: diff[i],
                        detail: `${diff[i]} language`,
                    }, { headers: { Authorization: token } });
                    console.log('-----> Categories:', cate.name);
                }
            }
        }

        /** Create course */
        const courses = [];
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const { data: course } = await axios.post(`${base}/api/institute/1/course`, {
                code: `${category.toUpperCase()}_BASIC`,
                name: `${category} Fundamentals`,
                detail: `${category} for beginner`,
                total_sessions: 20,
                session_duration: 1.5,
                session_duration_in: 'hour',
                fee_on_unit: 200,
                fee_currency: '$',
                is_active: true,
                course_category_id: i + 1,
            }, { headers: { Authorization: token } });
            courses.push(course);
            console.log('-----> Course: ', course.name);
        }

        /** Get students from customer */
        const _10StudentsOfDigitech = await axios.get(`${base}/api/customer/${digitechCo.id}/student`, {
            limit: 10,
            page: 1,
        }, { headers: { Authorization: token } });

        const _10StudentsOfAvenger = await axios.get(`${base}/api/customer/${avengerCo.id}/student`, {
            limit: 10,
            page: 1,
        }, { headers: { Authorization: token } });

        /** Create registration */
        const { data: registration1 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #1 for customer: ${digitechCo.name}`,
            course_id: courses[0].id,
            customer_id: digitechCo.id,
            student_ids: _10StudentsOfDigitech.map((stu) => stu.id),
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration1.id, registration1.message);

        const { data: registration2 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #2 for customer: ${avengerCo.name}`,
            course_id: courses[1].id,
            customer_id: avengerCo.id,
            student_ids: _10StudentsOfAvenger.map((stu) => stu.id),
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration2.id, registration2.message);

        // const { data: registration3 } = await axios.post(`${base}/api/registration`, {
        //     message: `Registration #3 for customer: ${personalPhat.name}`,
        //     course_id: courses[2].id,
        //     customer_id: personalPhat.id,
        //     student_ids: studentsDigitech.map((stu) => stu.id),
        // }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration3.id, registration3.message);

        const { data: registration4 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #4 for customer: ${digitechCo.name}`,
            course_id: courses[1].id,
            customer_id: digitechCo.id,
            student_ids: _10StudentsOfDigitech.map((stu) => stu.id),
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration4.id, registration4.message);

        const { data: registration5 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #5 for customer: ${digitechCo.name}`,
            course_id: courses[2].id,
            customer_id: digitechCo.id,
            student_ids: _10StudentsOfDigitech.map((stu) => stu.id),
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration5.id, registration5.message);

        const { data: registration6 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #6 for customer: ${digitechCo.name}`,
            course_id: courses[3].id,
            customer_id: digitechCo.id,
            student_ids: _10StudentsOfDigitech.map((stu) => stu.id),
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration6.id, registration6.message);

        // const { data: registration7 } = await axios.post(`${base}/api/registration`, {
        //     message: `Registration #7 for customer: ${personalPhat.name}`,
        //     course_id: courses[0].id,
        //     customer_id: personalPhat.id,
        //     student_ids: [studentPhat.id],
        // }, { headers: { Authorization: token } });
        // console.log('-----> registration: ', registration7.id, registration7.message);

        /** Create class */

        await axios.put(`${base}/api/registration/${registration1.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        const { data: newClass1 } = await axios.post(`${base}/api/class`, {
            name: `${courses[0].name} Class`,
            capacity: 50,
            start_date: '2019-07-30',
            end_date: '2019-09-30',
            course_id: courses[0].id,
            center_id: createdMainCenter.id,
            registration_ids: [registration1.id],
        }, { headers: { AuthAuthorizationorization: token } });
        console.log('-----> class: ', newClass1.name);

        await axios.put(`${base}/api/registration/${registration2.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        const { data: newClass2 } = await axios.post(`${base}/api/class`, {
            name: `${courses[1].name} Class`,
            capacity: 50,
            start_date: '2019-07-30',
            end_date: '2019-09-30',
            course_id: courses[1].id,
            center_id: createdMainCenter.id,
            registration_ids: [registration2.id],
        }, { headers: { Authorization: token } });
        console.log('-----> class: ', newClass2.name);

        await axios.put(`${base}/api/registration/${registration3.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        const { data: newClass3 } = await axios.post(`${base}/api/class`, {
            name: `${courses[2].name} Class`,
            capacity: 50,
            start_date: '2019-07-30',
            end_date: '2019-09-30',
            course_id: courses[2].id,
            center_id: createdMainCenter.id,
            registration_idsAuthorization: [registration3.id],
        }, { headers: { Authorization: token } });
        console.log('-----> class: ', newClass3.name);

        /** Update student in class */
        const { data: updated } = await axios.put(`${base}/api/class/${newClass1.id}/student`,
            [
                {
                    student_id: 'S-00000001',
                    theory_marks: 4.5,
                    practice_marks: 3
                },
                {
                    student_id: 'S-00000002',
                    theory_marks: 1,
                    practice_marks: 2
                },
                {
                    student_id: 'S-00000003',
                    theory_marks: 5,
                    practice_marks: 5
                }
            ]
            , { headers: { Authorization: token } });
        console.log('-----> update student in class: ', newClass1.name);

        /** Import student */
        const { data } = await axios.post(`${base}/api/customer/${digitechCo.id}/student/import`,
            [
                {
                    "first_name": "Huu Hien",
                    "last_name": "Le",
                    "gender": "MALE",
                    "date_of_birth": "1996-09-15",
                    "address": "Quy Nhon",
                    "identifier": "234541768",
                    "city": "Quy nhon",
                    "country": "vietnam",
                    "zip": "01123121",
                    "phone": "0321345178",
                    "email": "huuhien@digitechgobalco.com",
                    "position": "Developer",
                    "nationality": "Indian",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "D Luffy",
                    "last_name": "Monkey",
                    "gender": "MALE",
                    "date_of_birth": "1996-09-15",
                    "address": "East Blue",
                    "identifier": "123124121",
                    "city": "East Blue",
                    "country": "One piece",
                    "zip": "01231123",
                    "phone": "0712651268",
                    "email": "luffy@digitechglobalco.com",
                    "position": "Master",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Robin",
                    "last_name": "Nico",
                    "gender": "FEMALE",
                    "date_of_birth": "1996-09-15",
                    "address": "East Blue",
                    "identifier": "230192311",
                    "city": "East Blue",
                    "country": "One piece",
                    "zip": "12212313",
                    "phone": "0361736168",
                    "email": "nrobin@digitechglobalco.com",
                    "position": "Blackberry",
                    "nationality": "Brazil",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Zoro",
                    "last_name": "Ronoroa",
                    "gender": "MALE",
                    "date_of_birth": "1996-09-15",
                    "address": "East Blue",
                    "identifier": "2311567893454",
                    "city": "East Blue",
                    "country": "One piece",
                    "zip": "12345123",
                    "phone": "0712343531",
                    "email": "zoro@digitechglobalco.com",
                    "position": "Blueswitch",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                }
            ]
            , { headers: { Authorization: token } }
        );
        console.log('-----> import students::failed.length: ', data.failedList.length);
        /** Study shift */
        const { data: shift1 } = await axios.post(`${base}/api/shift`, {
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 1,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift1.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift2 } = await axios.post(`${base}/api/shift`, {
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 2,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift2.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift3 } = await axios.post(`${base}/api/shift`, {
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 3,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift3.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift4 } = await axios.post(`${base}/api/shift`, {
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 4,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift4.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift5 } = await axios.post(`${base}/api/shift`, {
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 5,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift5.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift6 } = await axios.post(`${base}/api/shift`, {
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 6,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift6.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift7 } = await axios.post(`${base}/api/shift`, {
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 7,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift7.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift8 } = await axios.post(`${base}/api/shift`, {
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 1,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift8.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift9 } = await axios.post(`${base}/api/shift`, {
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 2,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift9.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift10 } = await axios.post(`${base}/api/shift`, {
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 3,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift10.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift11 } = await axios.post(`${base}/api/shift`, {
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 4,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift11.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift12 } = await axios.post(`${base}/api/shift`, {
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 5,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift12.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift13 } = await axios.post(`${base}/api/shift`, {
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 6,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift13.id}, ${shift.start_time} - ${shift.end_time}`);
        const { data: shift14 } = await axios.post(`${base}/api/shift`, {
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 7,
            center_id: 1,
            added_by: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift14.id}, ${shift.start_time} - ${shift.end_time}`);

        /** Schedule */
        const { data: schedule1 } = await axios.post(`${base}/api/class/CLS-CSHARP_BASIC-00001/schedule`, {
            study_shift_id: 1,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule1.id}`);
        const { data: schedule2 } = await axios.post(`${base}/api/class/CLS-CSHARP_BASIC-00001/schedule`, {
            study_shift_id: 5,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule2.id}`);
        const { data: schedule3 } = await axios.post(`${base}/api/class/CLS-CSHARP_BASIC-00001/schedule`, {
            study_shift_id: 7,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule3.id}`);

        const { data: schedule4 } = await axios.post(`${base}/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule`, {
            study_shift_id: 2,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule4.id}`);
        const { data: schedule5 } = await axios.post(`${base}/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule`, {
            study_shift_id: 4,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule5.id}`);
        const { data: schedule6 } = await axios.post(`${base}/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule`, {
            study_shift_id: 9,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule6.id}`);

        const { data: schedule7 } = await axios.post(`${base}/api/class/CLS-JAVA_BASIC-00001/schedule`, {
            study_shift_id: 11,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule5.id}`);
        const { data: schedule8 } = await axios.post(`${base}/api/class/CLS-JAVA_BASIC-00001/schedule`, {
            study_shift_id: 13,
        }, { headers: { Authorization: token } });
        console.log(`-----> Class -> Schedule: ${schedule6.id}`);

        /** Timetable */
        
    } catch (ex) {
        console.log(ex.message);
    }
};

createTestData();
