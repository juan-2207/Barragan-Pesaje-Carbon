# Minería y Registro de Carbón

API REST para el sistema de gestión de minería y registro de carbón. Esta aplicación permite gestionar usuarios, roles, flotas, vehículos, turnos, pesajes y reportes de rendimiento.

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para Node.js
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos (hospedada en Neon)
- **JWT** - Autenticación de tokens
- **bcrypt** - Encriptación de contraseñas
- **Zod** - Validación de datos
- **CORS** - Manejo de solicitudes cross-origin

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en `.env`
4. Ejecuta las migraciones de Prisma:
   ```bash
   npm run migrate
   ```
5. Genera el cliente de Prisma:
   ```bash
   npm run generate
   ```

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Perfil del usuario (requiere token)
- `POST /api/auth/forgot-password` - Recuperar contraseña
- `POST /api/auth/reset-password` - Resetear contraseña

### Gestión de Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Gestión de Roles
- `GET /api/roles` - Obtener todos los roles
- `GET /api/roles/:id` - Obtener rol por ID
- `POST /api/roles` - Crear rol
- `PUT /api/roles/:id` - Actualizar rol
- `DELETE /api/roles/:id` - Eliminar rol

### Gestión de Flotas
- `GET /api/fleets` - Obtener todas las flotas
- `GET /api/fleets/:id` - Obtener flota por ID
- `POST /api/fleets` - Crear flota
- `PUT /api/fleets/:id` - Actualizar flota
- `DELETE /api/fleets/:id` - Eliminar flota

### Gestión de Vehículos
- `GET /api/vehicles` - Obtener todos los vehículos
- `GET /api/vehicles/:id` - Obtener vehículo por ID
- `POST /api/vehicles` - Crear vehículo
- `PUT /api/vehicles/:id` - Actualizar vehículo
- `DELETE /api/vehicles/:id` - Eliminar vehículo

### Gestión de Sectores y Áreas
- `GET /api/sectors` - Obtener todos los sectores
- `GET /api/areas` - Obtener todas las áreas

### Gestión de Turnos
- `GET /api/shifts` - Obtener todos los turnos
- `GET /api/shift-assignments` - Obtener asignaciones de turno
- `GET /api/shift-cuts` - Obtener cortes de turno

### Pesaje y Reportes
- `POST /api/logistics/weighing` - Registrar pesaje
- `GET /api/logistics/report` - Reporte de rendimiento

### Gestión de Pesajes
- `GET /api/weighings` - Obtener todos los pesajes

## Variables de Entorno

Crear un archivo `.env` con:

```
DATABASE_URL="postgresql://usuario:password@host:puerto/database?sslmode=require"
JWT_SECRET="tu_clave_secreta_para_jwt"
PORT=3000
```

## Base de Datos

El proyecto utiliza PostgreSQL con Prisma ORM. Las migraciones se gestionan automáticamente.

## Testing

Para probar la API, puedes usar los ejercicios en `postman_exercises.md` que incluye ejemplos completos de uso.

## Licencia

ISC