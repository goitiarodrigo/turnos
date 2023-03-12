const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    port:465,
    host: 'smtp.gmail.com',
    auth:{
        pass: process.env.PASSWORDNUTRI,
        user: process.env.USERMAIL
    },
    tls: {rejectUnaauthorized: false}
})

module.exports = transport
