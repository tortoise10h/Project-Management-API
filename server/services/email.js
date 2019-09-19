const nodemailer = require('nodemailer')
const handlebars = require('handlebars')

const { getEmailConfig, global: { frontendPageUrl } } = require('../../common').config

const { emailBanana } = getEmailConfig()

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
`

const TEMPLATE = {
}

const transporter = nodemailer.createTransport({
  host: 'Gmail',
  port: 25,
  auth: {
    user: emailBanana.address,
    pass: emailBanana.password
  },
  tls: true
})

function sendMail (type, data = {}, mailOptions = {}) {
  const source = TEMPLATE[type]
  const template = handlebars.compile(source)
  const html = template(data)
  return new Promise((resolve, reject) => transporter.sendMail({
    from: emailBanana.address,
    html,
    ...mailOptions
  }, (err, info) => {
    if (err) {
      reject(err)
      return
    }
    resolve(info)
  }))
}

module.exports = {
  sendMail
}
