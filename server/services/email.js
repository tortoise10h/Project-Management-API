const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const { getEmailConfig, global: { frontendPageUrl } } = require('../../common').config;

const { emailNoReply } = getEmailConfig();

const style = `
    <style>
        .button {
            display: inline-block;
            border-radius: 4px;
            background-color: #f4511e;
            border: none;
            color: #FFFFFF;
            text-align: center;
            font-size: 20px;
            padding: 17px;
            width: 300px;
            transition: all 0.5s;
            cursor: pointer;
            margin: 5px;
        }

        .button span {
            cursor: pointer;
            display: inline-block;
            position: relative;
            transition: 0.5s;
        }

        .button span:after {
            content: "00bb";
            position: absolute;
            opacity: 0;
            top: 0;
            right: -20px;
            transition: 0.5s;
        }

        .button:hover span {
            padding-right: 25px;
        }

        .button:hover span:after {
            opacity: 1;
            right: 0;
        }
    </style>
`;

const TEMPLATE = {
  signup: `
        ${style}
        <h2>Chào mừng bạn đến với <strong>CCP</strong>!</h2>
        <br />
        <p><strong>CCP</strong> là một trong những nhà cấp chứng chỉ đào tạo quốc tế hàng đầu Việt Nam. </p>
        <br />
        <p>Chúng tôi là trung tâm đào tạo được ủy quyền bởi các tổ chức chứng nhận quốc tế chuyên nghiệp đến từ Vương Quốc Anh và Hoa Kỳ như Hội đồng đánh giá quốc gia về an toàn lao động và Sức khỏe nghề nghiệp (NEBOSH)</p>
        <p>Để hoàn tất quá trình đăng ký mời bạn click vào link sau để kích hoạt tài khoản:</p>
        <a class="button" style="vertical-align:middle" href="${frontendPageUrl}/verify?token={{token}}&email={{email}}">Confirm this email</a>
        <br />
        <p>Nếu liên kết trên không hoạt động hoặc có bất kỳ thắc mắc về quá trình đăng ký, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:contact@jobnows.com">hotro@Jobnows.com</a><p>
        <br />
        <p>Chúc bạn một ngày tốt lành!</p>
        <br />
        <p>Trân trọng!</p>
        <br />
    `,
  forgetPassword: `<a href="${frontendPageUrl}/changePassword?token={{token}}&email={{email}}">${frontendPageUrl}/changePassword?token={{token}}&email={{email}}</a>`,
  registerSuccess: `
         ${style}
        <h3> Hi {{customerName}} </h3>
        <p>Cảm ơn bạn đã đăng ký vào khóa học {{coursename}} của chúng tôi.</p>
        <p>Hợp đồng của bạn đã được xác nhận vào hệ thống và đang được xứ lý, chúng tôi sẽ báo kết quả cho bạn trong thời gian sớm nhất.</p>
        <a href="${frontendPageUrl}" class="button" style="vertical-align:middle" >Quay về trang chủ</a>
    `,
  addEnquiry: `
         ${style}
        <h3> Hi {{customerName}} </h3>
        <p>Cảm ơn bạn đã đăng ký vào lớp học {{className}} của chúng tôi.</p>
        <p>Đơn ghi danh của bạn đã được xác nhận vào hệ thống và đang được xứ lý, chúng tôi sẽ báo kết quả cho bạn trong thời gian sớm nhất.</p>
        <a href="${frontendPageUrl}" class="button" style="vertical-align:middle" >Quay về trang chủ</a>
    `,
  approveEnquiry: `
        ${style}
        <h3>Chúc mừng {{customerName}} </h3>
        <p>Đơn ghi danh vào lớp {{className}} của bạn đã được chấp nhận.</p>
        <p>Chúng tôi sẽ liên hệ bạn sớm nhất. Cảm ơn</p>
        <a href="${frontendPageUrl}" class="button" style="vertical-align:middle" >Quay về trang chủ</a>
    `,
  desclineEnquiry: `
        ${style}
        <h3>Hi {{customerName}} </h3>
        <p>Đơn ghi danh vào lớp {{className}} của bạn đã không được chấp nhận, vì một vài lí do.</p>
        <p>Chúng tôi mong bạn sẽ chọn lớp phù hợp khác. Cảm ơn</p>
        <a href="${frontendPageUrl}" class="button" style="vertical-align:middle" >Quay về trang chủ</a>
    `,
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: emailNoReply.address,
    pass: emailNoReply.password,
  },
  tls: true,
});

function sendMail(type, data = {}, mailOptions = {}) {
  const source = TEMPLATE[type];
  const template = handlebars.compile(source);
  const html = template(data);
  return new Promise((resolve, reject) => transporter.sendMail({
    from: emailNoReply.address,
    html,
    ...mailOptions,
  }, (err, info) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(info);
  }));
}

module.exports = {
  sendMail,
};
