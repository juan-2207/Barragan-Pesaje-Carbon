# Explicación Paso a Paso del Código de la API de Extracción de Carbón

## 1. Estructura General del Proyecto
El proyecto sigue una **Arquitectura en Capas** limpia. Esto significa que el código está organizado en diferentes carpetas, cada una con una responsabilidad específica:

- `/src/controllers`: Aquí van las funciones que manejan las solicitudes HTTP (como POST, GET).
- `/src/services`: Aquí va la lógica de negocio, como cálculos o interacciones con la base de datos.
- `/src/models`: Aquí están las validaciones de datos usando Zod.
- `/src/routes`: Aquí se definen las rutas (URLs) de la API.
- `/src/middlewares`: Aquí van los intermediarios, como el manejo de errores.
- `/src/config`: Aquí está la configuración de la base de datos.

El punto de entrada es `app.js`, que configura Express y conecta todo.

## 2. Configuración Inicial (app.js)
En `app.js`, importamos las librerías necesarias:
- `express`: El framework web para crear la API.
- `dotenv`: Para cargar variables de entorno desde `.env`.
- `cors`: Para permitir peticiones desde otros dominios.

Luego, configuramos la app:
- `app.use(cors())`: Permite que la API sea accedida desde un navegador.
- `app.use(express.json())`: Convierte el cuerpo de las peticiones a JSON.

Después, conectamos las rutas:
- `/api/auth`: Para autenticación (login, registro).
- `/api/logistics`: Para logística (pesaje de camiones).

Finalmente, agregamos el middleware de errores al final.

## 3. Autenticación (Auth Module)
### Validaciones (src/models/userValidation.js)
Usamos Zod para validar los datos de entrada. Por ejemplo:
- `registerSchema`: Verifica que el email sea válido, la contraseña tenga al menos 6 caracteres, el nombre no esté vacío, y el rol sea uno de los permitidos (Admin, Operador de Báscula, Gerente de Minas).

### Servicio (src/services/authService.js)
Aquí está la lógica:
- `register`: Crea un usuario nuevo, encripta la contraseña con bcrypt, y lo guarda en la base de datos.
- `login`: Verifica el email y contraseña, si es correcto, genera un JWT (token de acceso).
- `forgotPassword`: Genera un token para resetear contraseña.
- `resetPassword`: Cambia la contraseña usando el token.
- `getProfile`: Obtiene la información del usuario logueado.

### Controlador (src/controllers/authController.js)
Maneja las peticiones HTTP:
- `register`: Toma los datos del body, los valida, llama al servicio, y responde con el usuario creado.
- `login`: Similar, pero devuelve el usuario y el token.
- Si hay error (como validación fallida), lo pasa al middleware de errores.

### Rutas (src/routes/authRoutes.js)
Define las URLs:
- POST /api/auth/register
- POST /api/auth/login
- etc.

## 4. Logística y Pesaje (Logistics Module)
### Validaciones (src/models/weighingValidation.js)
- `createWeighingSchema`: Valida que se envíen exactamente dos de los tres valores (gross, net, tare), y que sean positivos. También que maxCapacity sea positivo.

### Servicio (src/services/weighingService.js)
La lógica core:
- `create`: Calcula el valor faltante usando la ecuación gross = net + tare.
  - Si falta gross, lo calcula como net + tare.
  - Si falta net, lo calcula como gross - tare.
  - Si falta tare, lo calcula como gross - net.
  - Verifica que gross no exceda maxCapacity, si no, lanza error.
  - Luego, guarda en la base de datos usando Prisma.
- `getPerformanceReport`: Suma el peso neto total entre dos fechas usando Prisma aggregate.

### Controlador (src/controllers/logisticsController.js)
- `registerWeighing`: Valida los datos, llama al servicio para crear el pesaje, y responde.
- `getPerformanceReport`: Toma startDate y endDate del query, llama al servicio, y devuelve el total.

### Rutas (src/routes/logisticsRoutes.js)
- POST /api/logistics/weighing: Para registrar un pesaje.
- GET /api/logistics/report: Para obtener el reporte de rendimiento.

## 5. Middleware de Errores (src/middlewares/errorHandler.js)
Captura errores:
- Si es un error de Zod, responde con mensaje de validación.
- Si es un error de Prisma, responde con mensaje de base de datos.
- Para otros errores, un mensaje genérico de error interno.

## 6. Configuración de Base de Datos (src/config/database.js)
Importa PrismaClient y lo exporta como `prisma` para usarlo en los servicios.

## 7. Variables de Entorno (.env)
Contiene:
- DATABASE_URL: La URL de Neon para conectar a la base de datos.
- JWT_SECRET: Una clave secreta para firmar los tokens JWT.
- PORT: El puerto donde corre el servidor (3000).

## 8. Prisma Schema (prisma/schema.prisma)
Define los modelos de la base de datos:
- User: Para usuarios.
- Extraction: Para registros de extracción (aunque no implementado aún).
- Weighing: Para pesajes de camiones.
- Machinery: Para mantenimiento de maquinaria.

## Flujo de una Petición
1. Una petición llega a una ruta (ej: POST /api/logistics/weighing).
2. La ruta llama al controlador correspondiente.
3. El controlador valida los datos con Zod.
4. Si pasa, llama al servicio.
5. El servicio interactúa con la base de datos via Prisma.
6. El controlador responde con el resultado.
7. Si hay error en cualquier paso, el middleware lo captura y responde adecuadamente.

Esto asegura que el código sea modular, fácil de mantener y escalable.