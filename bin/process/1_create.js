
/* eslint-disable */
const axios = require('axios');
const _ = require('lodash');
const constants = require('../../common/lib/constant');
const uuid = require('uuid')
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const categories = ['Kinh Doanh', 'Kỹ Năng Công Việc', 'Marketing', 'Công Nghệ Thông Tin', 'Mỹ Thuật Đa Phương Tiện', 'Tài Chính', 'Quản Trị Nhân Sự', 'Kiến Trúc Công Trình', 'Anh Ngữ', "Tin Học Văn Phòng", "Quản Lý Kinh Doanh", "Kỹ Năng Mềm"];
const images = [
    fs.createReadStream(path.join(__dirname, '../assets/img/kinh_doanh.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/ky_nang_cong_viec.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/cong_nghe_thong-tin.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/my_thuat_da_phuong_tien.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/tai_chinh.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/quan_tri_nhan_su.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/kien_truc_cong_trinh.jpeg')),
    fs.createReadStream(path.join(__dirname, '../assets/img/anh_ngu.jpeg')),
]
const createCaterogyCourse = () => {};
module.exports = createCaterogyCourse;
