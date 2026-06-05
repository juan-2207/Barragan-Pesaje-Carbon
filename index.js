import 'dotenv/config'; // Esto carga automáticamente tu archivo .env

import app from './src/server.js';

import nodemailer from 'nodemailer';

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log('¡Listo para recibir peticiones!');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // ¡Tiene que coincidir exactamente con el nombre en .env!
    pass: process.env.EMAIL_PASS
  }
});