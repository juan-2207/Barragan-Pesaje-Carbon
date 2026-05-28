import 'dotenv/config'; // Esto carga automáticamente tu archivo .env

import app from './src/server.js';


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log('¡Listo para recibir peticiones!');
});