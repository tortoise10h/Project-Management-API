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
  signup: `
    ${style}
    <h2>Welcome to project management application of <strong>Banana boys</strong></h2>
    <br />
    <a class="button" style="vertical-align:middle" href="${frontendPageUrl}/#/verify?token={{token}}&email={{email}}">Confirm this email</a>
    <br />
    <p>Have a nice day!</p>
    <br />
  `,
  addedUserToProject: `
    <h2>Congratulation!</h2>
    <br />
    <p>You have added to {{projectName}} by {{authorName}}</p>
    <br>
    <p>{{invitationMessage}}</p>
    <br />
    <p>Go to that project <a href="${frontendPageUrl}/#/project-kanban/{{projectId}}">here</a> and have a good time!</p>
    <br />

  `
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 25,
  secure: false,
  auth: {
    user: 'bananaboys249@gmail.com',
    pass: 'bananaboys@'
    // user: emailBanana.address,
    // pass: emailBanana.password
  },
  tls: {
    rejectUnauthorized: false
  }
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
