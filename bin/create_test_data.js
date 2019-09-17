/* eslint-disable */

require('dotenv').config({});
const axios = require('axios');
const _ = require('lodash');

const port = process.env.SERVER_PORT || 3000;
const base = `http://127.0.0.1:${port}`;
const constants = require('./../common/lib/constant')

const createTestData = async () => {
    try {
        /** Login */
        const { data: login } = await axios.post(`${base}/api/auth/login`, { username: 'admin', password: process.env.PASSWORD_ADMIN });
        const token = `Bearer ${login.token}`;

        /** Create company user */
        const { data: digitechCo } = await axios.post(`${base}/api/customer`, {
            type: 'COMPANY',
            name: `Digitech Global Co`,
            address: '215 Thống Nhất, quận Đống Đa, Hà Nội',
            phone: `0918447831`,
            email: `business1@digitechglobalco.com`,
            extra_details: `Công ty TNHH Digitech Solutions`,
            contact_person: `Tony Hoang`,
            short_name: `DGS`,
            zip_code: `DGSZIP`,
            identifier: '13396843',
            login_info: {
                username: `business`,
                password: 'business',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Company: ', digitechCo.name);

        const { data: avengerCo } = await axios.post(`${base}/api/customer`, {
            type: 'COMPANY',
            name: `Avenger`,
            address: '25 Thống Nhất, Từ Liêm, Hà Nội',
            phone: `0918447832`,
            email: `business@avenger.com`,
            extra_details: `Công ty TNHH Avenger US`,
            contact_person: `Mr. Stark`,
            short_name: `AVG`,
            zip_code: `AVGZIP`,
            identifier: '828393841',
            login_info: {
                username: `avenger`,
                password: 'avenger',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Company: ', avengerCo.name);

        /** Create personal user */
        const { data: personalPhat } = await axios.post(`${base}/api/customer`, {
            type: 'PERSONAL',
            name: `Nguyễn Tấn Phát`,
            address: '27/1 Trường Chinh, phường 15, quận Tân Bình, HCM',
            phone: '0918447833',
            email: `phatnt@digitechglobalco.com`,
            identifier: `678943232`,
            login_info: {
                username: `phatnt`,
                password: 'phatnt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalPhat.name);

        const { data: personalDanh } = await axios.post(`${base}/api/customer`, {
            type: 'PERSONAL',
            name: `Võ Thành Danh`,
            address: '27 Phan Văn Hớn, phường 15, quận 12, HCM',
            phone: '0918447834',
            email: `danhvt@digitechglobalco.com`,
            identifier: `3246783423`,
            login_info: {
                username: `danhvt`,
                password: 'danhvt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalDanh.name);

        const { data: personalHung } = await axios.post(`${base}/api/customer`, {
            type: 'PERSONAL',
            name: `Dương Tấn Hùng`,
            address: '27/1 Trường Chinh, phường 15, quận Tân Bình, HCM',
            phone: '0918447835',
            email: `hungdt@digitechglobalco.com`,
            identifier: `324433894`,
            login_info: {
                username: `hungdt`,
                password: 'hungdt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalHung.name);

        /** Create student for company user */
        const { data: studentA } = await axios.post(`${base}/api/customer/${digitechCo.id}/student`, {
            first_name: `Văn Tưởng`,
            last_name: `Trần`,
            gender: 'male',
            year_of_birth: '1993',
            address: `200 Trần Duật, Quận 1`,
            identifier: `231593454`,
            city: `TPHCM`,
            country: `Việt Nam`,
            zip: `70000`,
            phone: `0918447836`,
            email: `vantuong@digitechglobalco.com`,
            position: 'Employee',
            customer_relationship: 'EMPLOYER',
            nationality: "Japanese",
            login_info: {
                username: `vantuong`,
                password: 'vantuong',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentA.first_name, studentA.last_name);

        const { data: studentB } = await axios.post(`${base}/api/customer/${digitechCo.id}/student`, {
            first_name: `Văn Thanh`,
            last_name: `Nguyễn`,
            gender: 'female',
            year_of_birth: '1993',
            address: `201 Trần Não, Quận 2`,
            identifier: `2315627893454`,
            city: `TPHCM`,
            country: `Việt Nam`,
            zip: `70000`,
            phone: `0918447837`,
            email: `vanthanh@digitechglobalco.com`,
            position: 'Manager',
            nationality: "Japanese",
            customer_relationship: 'employer',
            login_info: {
                username: `vanthanh`,
                password: 'vanthanh',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentB.first_name, studentB.last_name);

        const { data: studentC } = await axios.post(`${base}/api/customer/${digitechCo.id}/student`, {
            first_name: `Hoài An`,
            last_name: `Lý`,
            gender: 'other',
            year_of_birth: '1993',
            address: `12 Nguyễn Huệ, Quận 1`,
            identifier: `231567289854`,
            city: `TPHCM`,
            country: `Việt Nam`,
            zip: `70000`,
            phone: `0918447838`,
            // email: `hoaian@digitechglobalco.com`,
            position: 'Operator',
            customer_relationship: 'EMPLOYER',
            nationality: "Japanese",
            login_info: {
                username: `hoaian`,
                password: 'hoaian',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentC.first_name, studentC.last_name);

        const { data: studentD } = await axios.post(`${base}/api/customer/${avengerCo.id}/student`, {
            first_name: `Tony`,
            last_name: `Stark`,
            gender: 'male',
            year_of_birth: '1976',
            address: `786 Navi US`,
            identifier: `+002923156789854`,
            city: `New York`,
            country: `United States`,
            zip: `70000`,
            phone: `0918447839`,
            // email: `tonystark@digitechglobalco.com`,
            position: 'Assistant',
            customer_relationship: 'EMPLOYER',
            nationality: "Japanese",
            login_info: {
                username: `tonystark`,
                password: 'tonystark',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentD.first_name, studentD.last_name);

        const { data: studentE } = await axios.post(`${base}/api/customer/${avengerCo.id}/student`, {
            first_name: `Captain`,
            last_name: `Ameria`,
            gender: 'female',
            year_of_birth: '1993',
            address: `999 End Game`,
            identifier: `2311256789854`,
            city: `San Diego`,
            country: `United States`,
            zip: `70000`,
            phone: `0918447840`,
            // email: `captainameria@digitechglobalco.com`,
            customer_relationship: 'EMPLOYER',
            nationality: "Japanese",
            login_info: {
                username: `captainameria`,
                password: 'captainameria',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentE.first_name, studentE.last_name);

        const { data: studentF } = await axios.post(`${base}/api/customer/${avengerCo.id}/student`, {
            first_name: `Hulk`,
            last_name: `Buffalo`,
            gender: 'male',
            year_of_birth: '1993',
            address: `888 Infinity War`,
            identifier: `41229854`,
            city: `San Diego`,
            country: `United States`,
            zip: `70000`,
            phone: `0918447841`,
            email: `hulkbuffalo@digitechglobalco.com`,
            nationality: "Japanese",
            customer_relationship: 'EMPLOYER',
            login_info: {
                username: `hulkbuffalo`,
                password: 'hulkbuffalo',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentF.first_name, studentF.last_name);

        const { data: studentPhat } = await axios.post(`${base}/api/customer/${personalPhat.id}/student`, {
            first_name: `Issac`,
            last_name: `Newton`,
            gender: 'male',
            year_of_birth: '1990',
            address: `888 Infinity War`,
            identifier: `312412314`,
            city: `San Diego`,
            country: `United States`,
            zip: `70000`,
            nationality: "Japanese",
            phone: `0918447842`,
            email: `issacnewton@digitechglobalco.com`,
            customer_relationship: 'EMPLOYER',
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentPhat.first_name, studentPhat.last_name);

        /** Create institute */
        let { data: createdInstitute } = await axios.get(`${base}/api/institute`);
        if (createdInstitute.data.length === 0) {
            const { data: institute } = await axios.post(`${base}/api/institute`, {
                name: 'Main Institute',
                address: 'Address of main institute',
                phone: '0918447843',
                email: 'main@institute.com',
                extra_details: 'Testing main institute extra details',
            }, { headers: { Authorization: token } });
            createdInstitute = institute;
        } else {
            createdInstitute = createdInstitute.data[0];
        }
        console.log('-----> Institute: ', createdInstitute.name);

        /** Create center for main institute */
        let { data: createdMainCenter } = await axios.get(`${base}/api/center`);
        if (createdMainCenter.data.length === 0) {
            const { data: center } = await axios.post(`${base}/api/institute/${createdInstitute.id}/center`, {
                name: 'Main center',
                address: 'Address of main center',
                phone: '0918447844',
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
                phone: '0918447845',
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
                price: 200,
                type_cost: constants.COURSE_TYPE_COST.BY_COURSE,
                fee_currency: '$',
                is_active: true,
                course_category_id: i + 1,
            }, { headers: { Authorization: token } });
            courses.push(course);
            console.log('-----> Course: ', course.name);
        }

        /** Create registration */
        const { data: registration1 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #1 for customer: ${digitechCo.name}`,
            course_id: courses[0].id,
            customer_id: digitechCo.id,
            student_ids: [studentA.id, studentB.id, studentC.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration1.id, registration1.message);

        const { data: registration2 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #2 for customer: ${avengerCo.name}`,
            course_id: courses[1].id,
            customer_id: avengerCo.id,
            student_ids: [studentD.id, studentE.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration2.id, registration2.message);

        const { data: registration3 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #3 for customer: ${personalPhat.name}`,
            course_id: courses[2].id,
            customer_id: personalPhat.id,
            student_ids: [studentPhat.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration3.id, registration3.message);

        const { data: registration4 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #4 for customer: ${digitechCo.name}`,
            course_id: courses[1].id,
            customer_id: digitechCo.id,
            student_ids: [studentA.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration4.id, registration4.message);

        const { data: registration5 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #5 for customer: ${digitechCo.name}`,
            course_id: courses[2].id,
            customer_id: digitechCo.id,
            student_ids: [studentB.id, studentC.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration5.id, registration5.message);

        const { data: registration6 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #6 for customer: ${digitechCo.name}`,
            course_id: courses[3].id,
            customer_id: digitechCo.id,
            student_ids: [studentA.id, studentB.id, studentC.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration6.id, registration6.message);

        const { data: registration7 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #7 for customer: ${personalPhat.name}`,
            course_id: courses[0].id,
            customer_id: personalPhat.id,
            student_ids: [studentPhat.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration7.id, registration7.message);

        /** Create class */

        await axios.put(`${base}/api/registration/${registration1.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        const { data: newClass1 } = await axios.post(`${base}/api/class`, {
            name: `${courses[0].name} Class`,
            capacity: 50,
            course_id: courses[0].id,
            center_id: createdMainCenter.id,
            registration_ids: [registration1.id],
        }, { headers: { Authorization: token } });
        console.log('-----> class: ', newClass1.name);

        await axios.put(`${base}/api/registration/${registration2.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        const { data: newClass2 } = await axios.post(`${base}/api/class`, {
            name: `${courses[1].name} Class`,
            capacity: 50,
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
            course_id: courses[2].id,
            center_id: createdMainCenter.id,
            registration_ids: [registration3.id],
        }, { headers: { Authorization: token } });
        console.log('-----> class: ', newClass3.name);

        /** Add teachers */
        const { data: teacherDanh } = await axios.post(`${base}/api/teacher`, {
            "fullname": "Võ Thành Danh",
            "gender": "male",
            "date_of_birth": "1990-01-01",
            "identifier": "456676142",
            "address": "Trái đất",
            "phone": "(+84)03456789",
            "email": "danhchunhan@gmail.com",
            "position": "super teacher",
            "is_active": true,
            "login_info": {
                "username": "danhchunhan",
                "password": "123456"
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Teacher: ', teacherDanh.fullname);

        const { data: teacherPhat } = await axios.post(`${base}/api/teacher`, {
            "fullname": "Nguyễn Tấn Phát",
            "gender": "male",
            "date_of_birth": "1990-01-01",
            "identifier": "0123456676144",
            "address": "Việt Nam, Quảng Ngãi",
            "phone": "0123456799",
            "email": "phatnt@gmail.com",
            "position": "boss of teacher",
            "is_active": true,
            "login_info": {
                "username": "phatcute",
                "password": "123456"
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Teacher: ', teacherPhat.fullname);

        const { data: teacherHung } = await axios.post(`${base}/api/teacher`, {
            "fullname": "Dương Tấn Hùng",
            "gender": "male",
            "date_of_birth": "1990-01-01",
            "identifier": "012345667232",
            "address": "Đâu đó ở Cộng Hòa",
            "phone": "0223456789",
            "email": "hungdt@gmail.com",
            "position": "Giáo viên mỹ thuật",
            "is_active": true,
            "login_info": {
                "username": "hunghoicute",
                "password": "123456"
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Teacher: ', teacherHung.fullname);

        const { data: teacherTam } = await axios.post(`${base}/api/teacher`, {
            "fullname": "Hoàng Văn Tam",
            "gender": "male",
            "date_of_birth": "1990",
            "identifier": "01234566328122",
            "address": "Forgot address",
            "phone": "0123456787",
            "email": "tonyhoang@gmail.com",
            "is_active": true,
            "login_info": {
                "username": "bossdigitech",
                "password": "123456"
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Teacher: ', teacherTam.fullname);

        /** Update student mark in class */

        // Assign teacher to class
        await axios.post(`${base}/api/class/${newClass1.id}/teacher/assign`, {
            list_teacher_id: [
                teacherHung.id,
                teacherDanh.id,
            ]
        }, { headers: { Authorization: token } });

        await axios.post(`${base}/api/class/${newClass2.id}/teacher/assign`, {
            list_teacher_id: [
                teacherTam.id,
                teacherDanh.id,
            ]
        }, { headers: { Authorization: token } });

        // Start class
        // await axios.put(`${base}/api/class/${newClass1.id}/status`, {
        //     status: constants.CLASS_STATUS.PROCESSING,
        // }, { headers: { Authorization: token } })

        // await axios.put(`${base}/api/class/${newClass1.id}/status`, {
        //     status: constants.CLASS_STATUS.COMPLETED,
        // }, { headers: { Authorization: token } })

        // Update mark
        // const { data: updated } = await axios.put(`${base}/api/class/${newClass1.id}/student`,
        //     [
        //         {
        //             student_id: 'S-00000001',
        //             theory_marks: 4.5,
        //             practice_marks: 3
        //         },
        //         {
        //             student_id: 'S-00000002',
        //             theory_marks: 1,
        //             practice_marks: 2
        //         },
        //         {
        //             student_id: 'S-00000003',
        //             theory_marks: 5,
        //             practice_marks: 5
        //         }
        //     ]
        //     , { headers: { Authorization: token } });
        // console.log('-----> update student in class: ', newClass1.name);

        /** Upload student */
        const { data } = await axios.post(`${base}/api/customer/${digitechCo.id}/student/upload`,
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
                    "nationality": "Idiann",
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
                    "nationality": "Japanese",
                    "email": "nrobin@digitechglobalco.com",
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
        console.log('-----> Upload students::success.length: ', data.length);

        /** Add certificate */
        // const { data: certificateA } = await axios.post(`${base}/api/course/1/certificateType`, {
        //     "code": "ATVSTP",
        //     "expire_time": 2,
        //     "duration_in": "year",
        //     "is_active": true,
        // }, { headers: { Authorization: token } });
        // console.log('-----> Certificate-Type: ', certificateA.code);

        // const { data: certificateB } = await axios.post(`${base}/api/course/2/certificateType`, {
        //     "code": "NODEJS",
        //     "expire_time": 3,
        //     "duration_in": "year",
        //     "is_active": true,
        // }, { headers: { Authorization: token } });
        // console.log('-----> Certificate-Type: ', certificateB.code);

        const { data: certificateC } = await axios.post(`${base}/api/course/1/certificateType`, {
            "code": "JAVA",
            "expire_time": 4,
            "duration_in": "year",
            "is_active": true,
            "certificate_format_id": 1,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateC.code);

        const { data: certificateD } = await axios.post(`${base}/api/course/2/certificateType`, {
            "code": "JAVASCRIPT",
            "expire_time": 5,
            "duration_in": "year",
            "is_active": true,
            "certificate_format_id": 2,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateD.code);

        const { data: certificateE } = await axios.post(`${base}/api/course/3/certificateType`, {
            "code": "C_SHARP",
            "expire_time": 6,
            "duration_in": "year",
            "is_active": true,
            "certificate_format_id": 3,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateE.code);

        const { data: certificateF } = await axios.post(`${base}/api/course/4/certificateType`, {
            "code": "ATVSTP",
            "expire_time": 7,
            "duration_in": "month",
            "is_active": true,
            "certificate_format_id": 4,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateF.code);

        const { data: certificateG } = await axios.post(`${base}/api/course/5/certificateType`, {
            "code": "PYTHON",
            "expire_time": 8,
            "duration_in": "month",
            "is_active": true,
            "certificate_format_id": 1,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateG.code);

        const { data: certificateH } = await axios.post(`${base}/api/course/6/certificateType`, {
            "code": "atld_certification",
            "expire_time": 9,
            "duration_in": "month",
            "is_active": true,
            "certificate_format_id": 2,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateH.code);

        const { data: certificateI } = await axios.post(`${base}/api/course/7/certificateType`, {
            "code": "course_certification",
            "expire_time": 10,
            "duration_in": "month",
            "is_active": true,
            "certificate_format_id": 3,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateI.code);

        const { data: certificateJ } = await axios.post(`${base}/api/course/8/certificateType`, {
            "code": "managing_safely",
            "expire_time": 11,
            "duration_in": "month",
            "is_active": true,
            "certificate_format_id": 4,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateJ.code);

        const { data: certificateK } = await axios.post(`${base}/api/course/9/certificateType`, {
            "code": "hlatvls_certification",
            "expire_time": 1,
            "duration_in": "year",
            "is_active": true,
            "certificate_format_id": 1,
        }, { headers: { Authorization: token } });
        console.log('-----> Certificate-Type: ', certificateK.code);

        /** Issue certificate */
        // await axios.post(`${base}/api/class/${newClass1.id}/issue`, {
        //     "certificate_type_id": `${certificateI.id}`,
        //     "list_student_id": [studentA.id, studentB.id]
        // }, { headers: { Authorization: token } });

        // await axios.post(`${base}/api/class/${newClass2.id}/issue`, {
        //     "certificate_type_id": `${certificateB.id}`,
        // }, { headers: { Authorization: token } });
        /** Study shift */
        const { data: shift1 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 1,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift1.id}, ${shift1.start_time} - ${shift1.end_time}`);
        const { data: shift2 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 2,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift2.id}, ${shift2.start_time} - ${shift2.end_time}`);
        const { data: shift3 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 3,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift3.id}, ${shift3.start_time} - ${shift3.end_time}`);
        const { data: shift4 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 4,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift4.id}, ${shift4.start_time} - ${shift4.end_time}`);
        const { data: shift5 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 5,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift5.id}, ${shift5.start_time} - ${shift5.end_time}`);
        const { data: shift6 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 6,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift6.id}, ${shift6.start_time} - ${shift6.end_time}`);
        const { data: shift7 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '7:30',
            end_time: '9:30',
            day_of_week: 0,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift7.id}, ${shift7.start_time} - ${shift7.end_time}`);
        const { data: shift8 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 1,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift8.id}, ${shift8.start_time} - ${shift8.end_time}`);
        const { data: shift9 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 2,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift9.id}, ${shift9.start_time} - ${shift9.end_time}`);
        const { data: shift10 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 3,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift10.id}, ${shift10.start_time} - ${shift10.end_time}`);
        const { data: shift11 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 4,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift11.id}, ${shift11.start_time} - ${shift11.end_time}`);
        const { data: shift12 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 5,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift12.id}, ${shift12.start_time} - ${shift12.end_time}`);
        const { data: shift13 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 6,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift13.id}, ${shift13.start_time} - ${shift13.end_time}`);
        const { data: shift14 } = await axios.post(`${base}/api/center/1/shift`, [{
            start_time: '10:00',
            end_time: '11:30',
            day_of_week: 0,
        }], { headers: { Authorization: token } });
        console.log(`-----> Study Shift: ${shift14.id}, ${shift14.start_time} - ${shift14.end_time}`);

        /** Schedule */
        // const { data: schedule1 } = await axios.post(`${base}/api/class/CLS-CSHARP_BASIC-00001/schedule`, [{
        //     study_shift_id: 1,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule1.id}`);
        // const { data: schedule2 } = await axios.post(`${base}/api/class/CLS-CSHARP_BASIC-00001/schedule`, [{
        //     study_shift_id: 5,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule2.id}`);
        // const { data: schedule3 } = await axios.post(`${base}/api/class/CLS-CSHARP_BASIC-00001/schedule`, [{
        //     study_shift_id: 7,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule3.id}`);

        // const { data: schedule4 } = await axios.post(`${base}/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule`, [{
        //     study_shift_id: 1,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule4.id}`);
        // const { data: schedule5 } = await axios.post(`${base}/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule`, [{
        //     study_shift_id: 4,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule5.id}`);
        // const { data: schedule6 } = await axios.post(`${base}/api/class/CLS-JAVASCRIPT_BASIC-00001/schedule`, [{
        //     study_shift_id: 9,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule6.id}`);

        // const { data: schedule7 } = await axios.post(`${base}/api/class/CLS-JAVA_BASIC-00001/schedule`, [{
        //     study_shift_id: 11,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule5.id}`);
        // const { data: schedule8 } = await axios.post(`${base}/api/class/CLS-JAVA_BASIC-00001/schedule`, [{
        //     study_shift_id: 13,
        // }], { headers: { Authorization: token } });
        // console.log(`-----> Class -> Schedule: ${schedule6.id}`);

        /** Timetable */
    } catch (ex) {
        console.log(ex);
    }
};

createTestData();
