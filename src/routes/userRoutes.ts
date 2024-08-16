import { Router } from 'express'
import { fetchUserController, loginController, loginWithGoogle, signOutController } from '../controller/userController'
import { userAuth } from '../middlewares/authMiddleware'

const router = Router()

router.route('/login').post(loginController)

router.route('/fetch-user').get(userAuth, fetchUserController)

router.route('/login-with-google').post(loginWithGoogle)

router.route('/signout').get(signOutController)

export default router