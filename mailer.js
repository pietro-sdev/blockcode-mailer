const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Host SMTP da Hostinger
  port: 465, // Porta para SSL
  secure: true, // true para 465 (SSL), false para 587 (TLS)
  auth: {
    user: 'atendimento@blockcode.online', // Seu e-mail comercial
    pass: '!7HfKz8@3QrT1&9B', // Sua senha
  },
});

module.exports = transporter;
