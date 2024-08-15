const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota para envio de e-mail
app.post('/sendEmail', async (req, res) => {
  const { name, email, message } = req.body;

  // Configuração do transporte de e-mail usando Hostinger
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Host SMTP da Hostinger
    port: 465, // Porta para SSL
    secure: true, // true para SSL (porta 465), false para TLS (porta 587)
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail comercial na Hostinger
      pass: process.env.EMAIL_PASS, // Sua senha ou senha de aplicativo
    },
  });

  try {
    await transporter.sendMail({
        from: `atendimento@blockcode.online`, // Use o mesmo e-mail que está autenticado
        to: process.env.EMAIL_USER, // O destinatário do e-mail (seu próprio e-mail)
        subject: `Contato via formulário - ${name}`,
        text: message,
        html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong> ${message}</p>`,
      });

    res.status(200).json({ success: true }); // Resposta de sucesso
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ success: false, error: 'Erro ao enviar e-mail.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
