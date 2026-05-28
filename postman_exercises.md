# Ejercicios para el Sistema de Minería y Registro de Carbón

## Configuración Inicial
1. Inicia el servidor: Ejecuta `npm run dev` en la terminal.
2. Abre Postman y crea una nueva colección llamada "Minería y Registro de Carbón API".
3. Para peticiones que requieren autenticación, incluye el header `Authorization: Bearer <token>` (obtén el token del login).

## Ejercicio 1: Registro de Usuario
- **Método**: POST
- **URL**: http://localhost:3000/api/auth/register
- **Body** (JSON):
  ```json
  {
    "email": "admin@example.com",
    "password": "123456",
    "name": "Admin User",
    "role": "Admin"
  }
  ```
- **Esperado**: Código 201, respuesta con el usuario creado.
- **Prueba de Error**: Envía un email inválido, debería dar 400 con mensaje de validación.

## Ejercicio 2: Login
- **Método**: POST
- **URL**: http://localhost:3000/api/auth/login
- **Body** (JSON):
  ```json
  {
    "email": "admin@example.com",
    "password": "123456"
  }
  ```
- **Esperado**: Código 200, respuesta con user y token. Copia el token para usar en otros ejercicios.

## Ejercicio 3: Registrar Pesaje (Caso 1: Proporcionar Gross y Tare, Calcular Net)
- **Método**: POST
- **URL**: http://localhost:3000/api/logistics/weighing
- **Headers**: Authorization: Bearer <token>
- **Body** (JSON):
  ```json
  {
    "truckId": "TRUCK001",
    "gross": 50000,
    "tare": 10000,
    "maxCapacity": 60000
  }
  ```
- **Esperado**: Código 201, respuesta con el pesaje calculado (net debería ser 40000).
- **Prueba de Error**: Pon gross > maxCapacity, debería dar error.

## Ejercicio 4: Registrar Pesaje (Caso 2: Proporcionar Net y Tare, Calcular Gross)
- **Método**: POST
- **URL**: http://localhost:3000/api/logistics/weighing
- **Headers**: Authorization: Bearer <token>
- **Body** (JSON):
  ```json
  {
    "truckId": "TRUCK002",
    "net": 30000,
    "tare": 8000,
    "maxCapacity": 50000
  }
  ```
- **Esperado**: Código 201, gross calculado como 38000.

## Ejercicio 5: Registrar Pesaje (Caso 3: Proporcionar Gross y Net, Calcular Tare)
- **Método**: POST
- **URL**: http://localhost:3000/api/logistics/weighing
- **Headers**: Authorization: Bearer <token>
- **Body** (JSON):
  ```json
  {
    "truckId": "TRUCK003",
    "gross": 45000,
    "net": 35000,
    "maxCapacity": 50000
  }
  ```
- **Esperado**: Código 201, tare calculado como 10000.

## Ejercicio 6: Obtener Reporte de Rendimiento
- **Método**: GET
- **URL**: http://localhost:3000/api/logistics/report?startDate=2026-01-01&endDate=2026-12-31
- **Headers**: Authorization: Bearer <token>
- **Esperado**: Código 200, objeto con totalNetWeight sumando todos los net de los pesajes en ese rango.

## Ejercicio 7: Obtener Perfil de Usuario
- **Método**: GET
- **URL**: http://localhost:3000/api/auth/profile
- **Headers**: Authorization: Bearer <token>
- **Esperado**: Código 200, información del usuario logueado.

## Ejercicio 8: Recuperación de Contraseña
- **Método**: POST
- **URL**: http://localhost:3000/api/auth/forgot-password
- **Body** (JSON):
  ```json
  {
    "email": "admin@example.com"
  }
  ```
- **Esperado**: Código 200, mensaje con resetToken (en desarrollo, en producción enviaría email).

## Ejercicio 9: Resetear Contraseña
- **Método**: POST
- **URL**: http://localhost:3000/api/auth/reset-password
- **Body** (JSON):
  ```json
  {
    "token": "<resetToken del paso anterior>",
    "newPassword": "newpassword123"
  }
  ```
- **Esperado**: Código 200, mensaje de éxito.

## Ejercicio 10: Error de Validación
- **Método**: POST
- **URL**: http://localhost:3000/api/logistics/weighing
- **Headers**: Authorization: Bearer <token>
- **Body** (JSON):
  ```json
  {
    "truckId": "TRUCK004",
    "gross": 20000,
    "maxCapacity": 30000
  }
  ```
- **Esperado**: Código 400, mensaje de que exactamente dos valores deben ser proporcionados.

Estos ejercicios cubren todas las funcionalidades principales del sistema de minería y registro de carbón. Recuerda que algunos requieren datos en la base de datos, así que ejecuta primero el registro y login.