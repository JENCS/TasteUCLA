import express from 'express'
import loginLimiter from '../middleware/loginLimiter.js'
import * as authController from '../controllers/authController.js'

const router = express.Router()

router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

export default router