const express = require('express');
const { encryptPassword } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', encryptPassword, UserController.createUser);
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico única del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             required:
 *               - username
 *               - email
 *               - password
 *             example:
 *               username: "nuevoUsuario"
 *               email: "usuario@ejemplo.com"
 *               password: "ContraseñaSegura123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 userId:
 *                   type: string
 *                   description: ID del usuario creado
 *               example:
 *                 message: "Usuario creado exitosamente"
 *                 userId: "60af924bfc13ae3d5000000b"
 *       400:
 *         description: Datos de entrada inválidos
 *       409:
 *         description: El usuario ya existe
 */


router.get('/', UserController.getAllUsers);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lista todos los usuarios
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT necesario para la autenticación.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - username
 *                   - email
 *                   - password
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: Nombre de usuario único.
 *                   email:
 *                     type: string
 *                     description: Dirección de correo electrónico única.
 *                   password:
 *                     type: string
 *                     description: Contraseña del usuario, almacenada de manera segura.
 *                 example:
 *                   username: "usuario_ejemplo"
 *                   email: "usuario@ejemplo.com"
 *                   password: "contraseñaSegura123"
 */


router.put('/:id', encryptPassword, UserController.updateUser);
/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *             required:
 *               - username
 *               - email
 *               - password
 *             example:
 *               username: "usuarioActualizado"
 *               email: "nuevoemail@ejemplo.com"
 *               password: "nuevaContraseña123"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *               example:
 *                 message: "Usuario actualizado exitosamente"
 *                 user:
 *                   _id: "idDelUsuario"
 *                   username: "usuarioActualizado"
 *                   email: "nuevoemail@ejemplo.com"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 */

router.post('/login', UserController.loginUser);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Autentica a un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: "usuario@ejemplo.com"
 *               password: "contraseñaSegura"
 *     responses:
 *       200:
 *         description: Login exitoso. Retorna el token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT generado para la sesión del usuario.
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Dirección de correo electrónico del usuario.
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario.
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   email: "usuario@ejemplo.com"
 *                   username: "nombreDeUsuario"
 *       401:
 *         description: Autenticación fallida. Email o contraseña incorrectos.
 */


module.exports = router;