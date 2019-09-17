/* eslint-disable */
const axios = require('axios');
const _ = require('lodash');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const constants = require('../../common/lib/constant');

const createCustomer = async (base) => {
    const { data: login } = await axios.post(`${base}/api/auth/login`, { username: 'admin', password: process.env.PASSWORD_ADMIN || '12345678' });
    const token = `Bearer ${login.token}`;
    let form;
    /** Create company user */
    try {
        const { data: digitechCo } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.COMPANY,
            name: `Digitech Global Co`,
            address: '215 Thống Nhất, quận Đống Đa, Hà Nội',
            phone: `0918447831`,
            email: `business@digitechglobalco.com`,
            extra_details: `Công ty TNHH Digitech Solutions`,
            contact_person: `Tony Hoang`,
            short_name: `DGS`,
            identifier: '13396843',
            login_info: {
                username: `business`,
                password: '12345678',
            },
        }, { headers: { Authorization: token } });

        form = new FormData();
        form.append('photo', fs.createReadStream(path.join(__dirname, '../assets/img/digitech-logo.png')));
        await axios({ 
            url: `${base}/api/customer/${digitechCo.id}/photo`,
            method: 'PUT',
            data: form,
            headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        console.log('-----> Customer -> Company: ', digitechCo.name);

        const { data: travalaCompany } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.COMPANY,
            name: `Travala`,
            address: '25 Thống Nhất, Từ Liêm, Hà Nội',
            phone: `0918447832`,
            email: `business@travala.com`,
            extra_details: `Công ty TNHH Đặt khách sạn Quốc tế`,
            contact_person: `Mr. Stark`,
            short_name: `AVA`,
            identifier: '828393841',
            login_info: {
                username: `travala`,
                password: '12345678',
            },
        }, { headers: { Authorization: token } });
        form = new FormData();
        form.append('photo', fs.createReadStream(path.join(__dirname, '../assets/img/travala-banner.jpg')));
        await axios({
            url: `${base}/api/customer/${travalaCompany.id}/photo`,
            method: 'PUT',
            data: form,
            headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        console.log('-----> Customer -> Company: ', travalaCompany.name);

        const { data: grabCompany } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.COMPANY,
            name: `Alibaba`,
            address: '221 khu công nghiệp tân Thuận, phường 12, quận 7, Việt nam',
            phone: `035887855`,
            email: `business@grabbike.com`,
            extra_details: `Alibaba Group Holding Limited is a Chinese multinational conglomerate holding company specializing in e-commerce, retail, Internet, and technology. Founded 4 April 1999, the company provides consumer-to-consumer (C2C), business-to-consumer (B2C), and business-to-business (B2B) sales services via web portals, as well as electronic payment services, shopping search engines and cloud computing services. It owns and operates a diverse array of businesses around the world in numerous sectors, and is named as one of the world's most admired companies by Fortune`,
            contact_person: `Mr. Jack Ma `,
            short_name: `grab`,
            identifier: '325255455',
            login_info: {
                username: `grab`,
                password: '12345678',
            },
        }, { headers: { Authorization: token } });
        form = new FormData();
        form.append('photo', fs.createReadStream(path.join(__dirname, '../assets/img/travala-banner.jpg')));
        await axios({
            url: `${base}/api/customer/${grabCompany.id}/photo`,
            method: 'PUT',
            data: form,
            headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        console.log('-----> Customer -> Company: ', grabCompany.name);

        //=======================================================================

        const { data: tmaCompany } = await axios.post(`${base}/api/customer`, {
            type: 'COMPANY',
            name: `Công ty TNHH TMA Solution`,
            address: '25 Hồ Chí Minh',
            phone: `0315887855`,
            email: `business@tmasolution.com`,
            extra_details: `Công ty TNHH Cpp`,
            contact_person: `Mr. Jack Ma `,
            short_name: `TMA`,
            identifier: '32554855',
            login_info: {
                username: `tmasolution`,
                password: '12345678',
            },
        }, { headers: { Authorization: token } });
        form = new FormData();
        form.append('photo', fs.createReadStream(path.join(__dirname, '../assets/img/tma-solutions-logo.png')));
        await axios({
            url: `${base}/api/customer/${tmaCompany.id}/photo`,
            method: 'PUT',
            data: form,
            headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        console.log('-----> Customer -> Company: ', tmaCompany.name);
        
        //=======================================================================

        const { data: iblCompany } = await axios.post(`${base}/api/customer`, {
            type: 'COMPANY',
            name: `Infinity blockchain Labs`,
            address: '15 Lê Đại Hành, phướng 15, quận 11, Hồ Chí Minh, Việt nam',
            phone: `028887855`,
            email: `business@infinityblockchainlabs.asia`,
            extra_details: `Công ty hàng đầu về  blockchain tại Việt Nam`,
            contact_person: `Mr. Jamamoto`,
            short_name: `IBL`,
            identifier: '90254855',
            login_info: {
                username: `iblasia`,
                password: '12345678',
            },
        }, { headers: { Authorization: token } });
        form = new FormData();
        form.append('photo', fs.createReadStream(path.join(__dirname, '../assets/img/ibl-logo.jpg')));
        await axios({
            url: `${base}/api/customer/${iblCompany.id}/photo`,
            method: 'PUT',
            data: form,
            headers: {
                Authorization: token,
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        console.log('-----> Customer -> Company: ', iblCompany.name);

        /** Create personal user */
        const { data: personalPhat } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.PERSONAL,
            name: `Nguyễn Tấn Phát`,
            address: '27/1 Trường Chinh, phường 15, quận Tân Bình, HCM',
            phone: '0918447833',
            email: `phatnt@infinityblockchainlabs.asia`,
            short_name: `NTP`,
            identifier: `678943232`,
            login_info: {
                username: `phatnt`,
                password: 'phatnt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalPhat.name);

        const { data: personalDanh } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.PERSONAL,
            name: `Võ Thành Danh`,
            address: '27 Phan Văn Hớn, phường 15, quận 12, HCM',
            phone: '0372002632',
            email: `thanhdanhit1994@gmail.com`,
            identifier: `3246783423`,
            short_name: `VTD`,
            login_info: {
                username: `danhvt`,
                password: '12345678',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalDanh.name);

        const { data: personalHung } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.PERSONAL,
            name: `Dương Tấn Hùng`,
            address: '27/1 Trường Chinh, phường 15, quận Tân Bình, HCM',
            phone: '0918447835',
            email: `hungdt@digitechglobalco.com`,
            short_name: `DTH`,
            identifier: `324433894`,
            login_info: {
                username: `hungdt`,
                password: 'hungdt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalHung.name);

        const { data: personalLuu } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.PERSONAL,
            name: `Lưu Ý Hoàng`,
            address: '27/1 Bau Cat, phường 14, quận Tân Bình, HCM',
            phone: '0918447835',
            email: `Lyh@gmail.com`,
            short_name: `LYH`,
            identifier: `326588785`,
            login_info: {
                username: `honagdt`,
                password: 'honagdt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalLuu.name);

        const { data: personalHuong } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.PERSONAL,
            name: `Hương Huy`,
            address: 'Viva Bau Cat, phường 14, quận Tân Bình, HCM',
            phone: '0548878555',
            email: `hh@gmail.com`,
            short_name: `HH`,
            identifier: `325688855`,
            login_info: {
                username: `huyhuongdt`,
                password: 'huyhuongdt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalHuong.name);

        const { data: personalNinh } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.PERSONAL,
            name: `Ninh Nasan`,
            address: '12 Bình Chánh HCM',
            phone: '0356658555',
            email: `nnss@gmail.com`,
            short_name: `NN`,
            identifier: `689785546`,
            login_info: {
                username: `ninhdt`,
                password: 'ninhdt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalNinh.name);

        const { data: personalCuong } = await axios.post(`${base}/api/customer`, {
            type: constants.CUSTOMER_TYPE.PERSONAL,
            name: `Cường Lê`,
            address: '21 Bình Chánh HCM',
            phone: '0366585505',
            email: `cml@gmail.com`,
            identifier: `22555554`,
            login_info: {
                username: `cuongdt`,
                password: 'cuongdt',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Customer -> Personal: ', personalCuong.name);

        //          *******        //
        //  ***Created Student***  //
        //          *******        //

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
            nationality: "Japanese",
            login_info: {
                username: `hoaian`,
                password: 'hoaian',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentC.first_name, studentC.last_name);

        const { data: studentD } = await axios.post(`${base}/api/customer/${travalaCompany.id}/student`, {
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
            nationality: "Japanese",
            login_info: {
                username: `tonystark`,
                password: 'tonystark',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentD.first_name, studentD.last_name);

        const { data: studentE } = await axios.post(`${base}/api/customer/${travalaCompany.id}/student`, {
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
            nationality: "Japanese",
            login_info: {
                username: `captainameria`,
                password: 'captainameria',
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentE.first_name, studentE.last_name);

        const { data: studentF } = await axios.post(`${base}/api/customer/${travalaCompany.id}/student`, {
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
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentPhat.first_name, studentPhat.last_name);


        const { data: studentTieu } = await axios.post(`${base}/api/customer/${personalPhat.id}/student`, {
            first_name: `Tieu`,
            last_name: `Hoai`,
            gender: 'male',
            year_of_birth: '2002',
            address: `Ấp Xuân Thới Đông 1,Tân Xuân, Hóc Môn, Ho Chi Minh City, Vietnam`,
            identifier: `325548555`,
            city: `Ho Chi Minh`,
            country: `Ho Chi Minh`,
            zip: `70000`,
            nationality: "Japanese",
            phone: `0949887555`,
            email: `tthl@gmail.com`,
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentTieu.first_name, studentTieu.last_name);

        const { data: studentLe } = await axios.post(`${base}/api/customer/${personalPhat.id}/student`, {
            first_name: `Lê`,
            last_name: `Văn Quý`,
            gender: 'male',
            year_of_birth: '2002',
            address: `Xuân Thới Thượng, 87/8p ấp Xuân Thới Đông 1, Xuân Thới Đông, Hóc Môn, Hồ Chí Minh, Vietnam`,
            identifier: `36588785`,
            city: `Ho Chi Minh`,
            country: `Ho Chi Minh`,
            zip: `70000`,
            nationality: "Japanese",
            phone: `0947712252`,
            email: `lvq@gmail.com`,
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentLe.first_name, studentLe.last_name);


        const { data: studentAn } = await axios.post(`${base}/api/customer/${personalPhat.id}/student`, {
            first_name: `An`,
            last_name: `khang`,
            gender: 'male',
            year_of_birth: '2000',
            address: `14/7A Nguyễn Thị Sóc, Xuân Thới Đông, Hóc Môn, Hồ Chí Minh, Vietnam`,
            identifier: `3578854`,
            city: `Ho Chi Minh`,
            country: `Ho Chi Minh`,
            zip: `70000`,
            nationality: "Japanese",
            phone: `0132554788`,
            email: `ak@gmail.com`,
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentAn.first_name, studentAn.last_name);

        const { data: studentMy } = await axios.post(`${base}/api/customer/${personalPhat.id}/student`, {
            first_name: `Mỹ`,
            last_name: `Mơ`,
            gender: 'female',
            year_of_birth: '2000',
            address: `Lô B23-24, Cụm CN-TTCN Xuân Thới Sơn số 5A, QL22, Xuân Thới Đông, Hóc Môn, Hồ Chí Minh, Vietnam`,
            identifier: `32554475`,
            city: `Ho Chi Minh`,
            country: `Ho Chi Minh`,
            zip: `70000`,
            nationality: "Japanese",
            phone: `0949587885`,
            email: `mmd@gmail.com`,
        }, { headers: { Authorization: token } });
        console.log('-----> Company -> Student: ', studentMy.first_name, studentMy.last_name);


        //*** ***//
        //*** ***//
        //*** ***//
        const { data: courses } = await axios.get(`${base}/api/course`, { headers: { Authorization: token } });
        /** Create registration */
        const regisInfo1 = {
            message: `Registration #1 for customer: ${digitechCo.name}`,
            course_id: courses.data[0].id,
            customer_id: digitechCo.id,
            student_ids: [studentA.id, studentB.id, studentC.id],
        };

        console.log('Regist Info 1', regisInfo1)

        const { data: registration1 } = await axios.post(`${base}/api/registration`, regisInfo1, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration1.id, registration1.message);

        const { data: registration2 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #2 for customer: ${travalaCompany.name}`,
            course_id: courses.data[1].id,
            customer_id: travalaCompany.id,
            student_ids: [studentD.id, studentE.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration2.id, registration2.message);

        const { data: registration3 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #3 for customer: ${personalPhat.name}`,
            course_id: courses.data[2].id,
            customer_id: personalPhat.id,
            student_ids: [studentPhat.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration3.id, registration3.message);

        const { data: registration4 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #4 for customer: ${digitechCo.name}`,
            course_id: courses.data[5].id,
            customer_id: digitechCo.id,
            student_ids: [studentA.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration4.id, registration4.message);

        const { data: registration5 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #5 for customer: ${digitechCo.name}`,
            course_id: courses.data[6].id,
            customer_id: digitechCo.id,
            student_ids: [studentB.id, studentC.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration5.id, registration5.message);

        const { data: registration6 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #6 for customer: ${digitechCo.name}`,
            course_id: courses.data[3].id,
            customer_id: digitechCo.id,
            student_ids: [studentA.id, studentB.id, studentC.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration6.id, registration6.message);

        const { data: registration7 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #7 for customer: ${personalPhat.name}`,
            course_id: courses.data[4].id,
            customer_id: personalPhat.id,
            student_ids: [studentPhat.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration7.id, registration7.message);

        const { data: registration8 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #8 for customer: ${personalPhat.name}`,
            course_id: courses.data[5].id,
            customer_id: personalPhat.id,
            student_ids: [studentPhat.id, studentLe.id, studentMy.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration8.id, registration8.message);

        const { data: registration9 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #9 for customer: ${personalHuong.name}`,
            course_id: courses.data[6].id,
            customer_id: personalHuong.id,
            student_ids: [studentPhat.id, studentLe.id, studentMy.id, studentTieu.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration9.id, registration9.message);

        const { data: registration10 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #10 for customer: ${personalHuong.name}`,
            course_id: courses.data[7].id,
            customer_id: personalHuong.id,
            student_ids: [studentTieu.id, studentLe.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration10.id, registration10.message);

        const { data: registration11 } = await axios.post(`${base}/api/registration`, {
            message: `Registration #10 for customer: ${personalHuong.name}`,
            course_id: courses.data[8].id,
            customer_id: personalHuong.id,
            student_ids: [studentTieu.id, studentLe.id],
        }, { headers: { Authorization: token } });
        console.log('-----> registration: ', registration11.id, registration11.message);

        /**********************************************************************************/

        await axios.put(`${base}/api/registration/${registration1.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        /****************** * Create class ***************************************/
        /***********************************************************************/

        const { data: newPubClass1 } = await axios.post(`${base}/api/class`, {
            name: `${courses.data[0].name} Class 1`,
            capacity: 50,
            course_id: courses.data[0].id,
            is_publish: true,
        }, { headers: { Authorization: token } });
        console.log('-----> Publish class: ', newPubClass1.name);

        const { data: newPubClass2 } = await axios.post(`${base}/api/class`, {
            name: `${courses.data[0].name} Class 2 `,
            capacity: 50,
            course_id: courses.data[0].id,
            is_publish: true,
        }, { headers: { Authorization: token } });
        console.log('-----> Publish class: ', newPubClass2.name);

        const { data: newPubClass3 } = await axios.post(`${base}/api/class`, {
            name: `${courses.data[0].name} Class 1`,
            capacity: 50,
            course_id: courses.data[1].id,
            is_publish: true,
        }, { headers: { Authorization: token } });
        console.log('-----> Publish class: ', newPubClass3.name);


        const { data: newClass1 } = await axios.post(`${base}/api/class`, {
            name: `${courses.data[0].name} Class`,
            capacity: 50,
            course_id: courses.data[0].id,
            registration_ids: [registration1.id],
        }, { headers: { Authorization: token } });
        console.log('-----> class: ', newClass1.name);

        

        await axios.put(`${base}/api/registration/${registration2.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        const { data: newClass2 } = await axios.post(`${base}/api/class`, {
            name: `${courses.data[1].name} Class`,
            capacity: 50,
            course_id: courses.data[1].id,
            registration_ids: [registration2.id],
        }, { headers: { Authorization: token } });
        console.log('-----> class: ', newClass2.name);

        await axios.put(`${base}/api/registration/${registration3.id}`, {
            status: constants.REGISTRATION_STATUS.APRROVED,
        }, { headers: { Authorization: token } });

        const { data: newClass3 } = await axios.post(`${base}/api/class`, {
            name: `${courses.data[2].name} Class`,
            capacity: 50,
            course_id: courses.data[2].id,
            registration_ids: [registration3.id],
        }, { headers: { Authorization: token } });
        console.log('-----> class: ', newClass3.name);

        /******************************** Upload student ****************************************/
        /************************************************************************************** */
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
                    "address": "Lê Minh Triết, Hồ Chí Minh",
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
                },
                {
                    "first_name": "Lý",
                    "last_name": "Hoài An",
                    "gender": "FEMALE",
                    "date_of_birth": "1996-09-15",
                    "address": "Lý Văn Lâm, Thành Phố Cà Mau",
                    "identifier": "355844588",
                    "city": "Cà Mau",
                    "country": "Cà Mau",
                    "zip": "357885",
                    "phone": "0325545855",
                    "email": "lha@gmail.com",
                    "position": "Stuent",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Lưu",
                    "last_name": "Chí Tôn",
                    "gender": "MALE",
                    "date_of_birth": "1997-09-15",
                    "address": "Lê Duân, Thành Phố HCM",
                    "identifier": "1445878555",
                    "city": "Hải Phòng",
                    "country": "Hải Phòng",
                    "zip": "35668555",
                    "phone": "0788545222",
                    "email": "lct@gmail.com",
                    "position": "Stuent",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Nguyễn",
                    "last_name": "Văn Toán",
                    "gender": "MALE",
                    "date_of_birth": "2001-09-15",
                    "address": "Lý Thái Tổ, Thành Phố HCM",
                    "identifier": "325545885",
                    "city": "Huế",
                    "country": "Vinh",
                    "zip": "32554585",
                    "phone": "0125458731",
                    "email": "nvt@gmail.com",
                    "position": "Stuent",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Lý",
                    "last_name": "Học Mãi",
                    "gender": "MALE",
                    "date_of_birth": "2005-09-15",
                    "address": "Thành Phố Đồng Nai",
                    "identifier": "85554555",
                    "city": "Đồng Nai",
                    "country": "Đồng Nai",
                    "zip": "352245555",
                    "phone": "0545585555",
                    "email": "lhm@gmail.com",
                    "position": "Stuent",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Đồi",
                    "last_name": "Mộng Mơ",
                    "gender": "FEMALE",
                    "date_of_birth": "2017-09-15",
                    "address": "Thành Phố Lâm Đồng",
                    "identifier": "85554555",
                    "city": "Đạt Lạt",
                    "country": "Đà Lạt",
                    "zip": "32554558",
                    "phone": "0949878221",
                    "email": "dmm@gmail.com",
                    "position": "Stuent",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Biển",
                    "last_name": "Nha Trang",
                    "gender": "FEMALE",
                    "date_of_birth": "2017-09-15",
                    "address": "351, Nha Trang",
                    "identifier": "32554555",
                    "city": "Nha Trang",
                    "country": "Nha Trang",
                    "zip": "32554557",
                    "phone": "0147747777",
                    "email": "bnt@gmail.com",
                    "position": "Stuent",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
                {
                    "first_name": "Hồ",
                    "last_name": "Xuân Hương",
                    "gender": "FEMALE",
                    "date_of_birth": "2017-09-15",
                    "address": "58 chè hé, Đà Lạt",
                    "identifier": "322554558",
                    "city": "Đà Lạt",
                    "country": "Đà Lạt",
                    "zip": "3255455",
                    "phone": "0978854522",
                    "email": "hxh@gmail.com",
                    "position": "Stuent",
                    "nationality": "Japanese",
                    "is_active": true,
                    "customer_relationship": "EMPLOYER"
                },
            ]
            , { headers: { Authorization: token } }
        );
        console.log('-----> Upload students::success.length: ', data.length);

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

        const { data: teacherHuy } = await axios.post(`${base}/api/teacher`, {
            "fullname": "Tấn Huy",
            "gender": "female",
            "date_of_birth": "1990",
            "identifier": "3577884885",
            "address": "Digitech Globalco",
            "phone": "078854552",
            "email": "th@gmail.com",
            "is_active": true,
            "login_info": {
                "username": "huyyeuhuong",
                "password": "123456"
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Teacher: ', teacherHuy.fullname);


        const { data: teacherNinh } = await axios.post(`${base}/api/teacher`, {
            "fullname": "Ninh Nasan",
            "gender": "male",
            "date_of_birth": "1998",
            "identifier": "389978555",
            "address": "Digitech Globalco",
            "phone": "0125545855",
            "email": "nnn@gmail.com",
            "is_active": true,
            "login_info": {
                "username": "ninhanime",
                "password": "123456"
            },
        }, { headers: { Authorization: token } });
        console.log('-----> Teacher: ', teacherNinh.fullname);

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

    } catch (ex) {
        console.log("=========Output==========:>: createCustomer -> ex", ex)

    }
};
module.exports = createCustomer;