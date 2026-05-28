# Tecnologías del Sistema de Minería y Registro de Carbón

## Node.js
### ¿Qué es?
Node.js es un entorno de ejecución de JavaScript fuera del navegador. Permite ejecutar código JavaScript en el servidor, no solo en la web. Fue creado en 2009 y es muy popular para crear aplicaciones backend.

### ¿Para qué lo usamos?
Usamos Node.js porque es rápido, eficiente y permite manejar muchas conexiones simultáneas (como peticiones a la API). Es ideal para APIs RESTful como la nuestra para el sistema de minería y registro de carbón, ya que puede procesar solicitudes HTTP rápidamente.

### ¿Por qué?
- Es ligero y no requiere un servidor web separado (como Apache).
- Tiene un ecosistema enorme de librerías (npm).
- Es el mismo lenguaje (JavaScript) en frontend y backend, facilitando el desarrollo.

### ¿Cómo lo aplicamos?
En `app.js`, usamos Node.js para crear un servidor que escucha en el puerto 3000. Ejecutamos con `node app.js` o `npm run dev`.

## Express.js
### ¿Qué es?
Express es un framework web minimalista para Node.js. Proporciona herramientas para crear rutas, manejar middlewares y gestionar peticiones HTTP.

### ¿Para qué lo usamos?
Para estructurar nuestra API. Define rutas como `/api/auth/login` y conecta controladores que manejan la lógica.

### ¿Por qué?
- Es simple y flexible, no impone mucho código boilerplate.
- Maneja middlewares fácilmente (como CORS o errores).
- Es el framework más usado para APIs en Node.js.

### ¿Cómo lo aplicamos?
En `app.js`, creamos una app con `express()`, agregamos middlewares con `app.use()`, y definimos rutas con `app.use('/api/auth', authRoutes)`.

## JavaScript (ES Modules)
### ¿Qué es?
JavaScript es el lenguaje de programación. Usamos la versión moderna con módulos ES (import/export) en lugar de CommonJS.

### ¿Para qué lo usamos?
Para escribir todo el código: controladores, servicios, validaciones, etc.

### ¿Por qué?
- Es el lenguaje nativo de Node.js.
- Los módulos ES permiten importar/exportar código de forma limpia y organizada.

### ¿Cómo lo aplicamos?
En cada archivo, usamos `import` para traer funciones de otros archivos, y `export` para compartirlas. En `package.json`, ponemos `"type": "module"` para habilitar esto.

## Prisma
### ¿Qué es?
Prisma es un ORM (Object-Relational Mapping) para bases de datos. Genera un cliente para interactuar con la DB usando código TypeScript/JavaScript en lugar de SQL crudo.

### ¿Para qué lo usamos?
Para conectar y manipular la base de datos PostgreSQL (via Neon). En lugar de escribir SQL, usamos métodos como `prisma.user.create()`.

### ¿Por qué?
- Es seguro: Evita inyecciones SQL.
- Es tipo-seguro: Sabe qué campos existen en las tablas.
- Genera esquemas automáticamente con `prisma generate`.

### ¿Cómo lo aplicamos?
Definimos el esquema en `prisma/schema.prisma`, generamos el cliente con `npx prisma generate`, y lo usamos en servicios como `prisma.weighing.create()`.

## PostgreSQL y Neon
### ¿Qué es?
PostgreSQL es una base de datos relacional gratuita. Neon es un servicio en la nube que hospeda PostgreSQL, proporcionando una URL de conexión.

### ¿Para qué lo usamos?
Para almacenar datos: usuarios, pesajes, etc. Neon porque es fácil de configurar sin instalar PostgreSQL localmente.

### ¿Por qué?
- PostgreSQL es robusto y soporta transacciones complejas.
- Neon es serverless, escala automáticamente y es gratis para desarrollo.

### ¿Cómo lo aplicamos?
La URL de Neon va en `.env` como `DATABASE_URL`. Prisma se conecta automáticamente.

## Zod
### ¿Qué es?
Zod es una librería para validar datos en JavaScript. Define esquemas que verifican si los datos cumplen reglas (ej: email válido, número positivo).

### ¿Para qué lo usamos?
Para validar entradas de la API. Antes de guardar en DB, verificamos que los datos sean correctos.

### ¿Por qué?
- Es simple y declarativo: `z.string().email()` es claro.
- Integra bien con TypeScript (aunque usamos JS), pero funciona sin él.
- Lanza errores detallados si falla la validación.

### ¿Cómo lo aplicamos?
En `src/models/weighingValidation.js`, creamos `createWeighingSchema` y lo usamos en controladores con `.parse(req.body)`.

## bcrypt
### ¿Qué es?
bcrypt es una librería para encriptar contraseñas. Convierte texto plano en un hash irreversible.

### ¿Para qué lo usamos?
Para almacenar contraseñas de forma segura. Nunca guardamos texto plano.

### ¿Por qué?
- Es lento intencionalmente, dificultando ataques de fuerza bruta.
- Genera "sal" automática para mayor seguridad.

### ¿Cómo lo aplicamos?
En `authService.js`, usamos `bcrypt.hash()` para encriptar y `bcrypt.compare()` para verificar.

## JWT (jsonwebtoken)
### ¿Qué es?
JWT (JSON Web Token) es un estándar para crear tokens de autenticación. Es una cadena codificada que contiene información del usuario.

### ¿Para qué lo usamos?
Para autenticar usuarios después del login. El cliente envía el token en headers para acceder a rutas protegidas.

### ¿Por qué?
- Es stateless: El servidor no guarda sesiones.
- Es compacto y seguro si se firma correctamente.

### ¿Cómo lo aplicamos?
En `authService.js`, generamos con `jwt.sign()`. En `auth.js` middleware, verificamos con `jwt.verify()`.

## dotenv
### ¿Qué es?
dotenv es una librería que carga variables de entorno desde un archivo `.env`.

### ¿Para qué lo usamos?
Para configurar secretos como la clave JWT o la URL de DB sin hardcodearlos en el código.

### ¿Por qué?
- Seguridad: No expones claves en el repositorio.
- Flexibilidad: Cambias configuración sin tocar código.

### ¿Cómo lo aplicamos?
En `app.js`, llamamos `dotenv.config()`. Variables como `process.env.JWT_SECRET`.

## CORS
### ¿Qué es?
CORS (Cross-Origin Resource Sharing) es un mecanismo que permite peticiones desde dominios diferentes.

### ¿Para qué lo usamos?
Para que el frontend (en otro dominio) pueda llamar a nuestra API.

### ¿Por qué?
Sin CORS, navegadores bloquean peticiones por seguridad.

### ¿Cómo lo aplicamos?
En `app.js`, usamos `app.use(cors())`.

## Resumen
Cada tecnología tiene un propósito específico: Node.js para el runtime, Express para el framework, Prisma para DB, Zod para validaciones, bcrypt/JWT para seguridad, etc. Juntos, crean una API robusta, segura y mantenible.