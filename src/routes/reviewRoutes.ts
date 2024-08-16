import { Router } from 'express'
import { createReviewController, fetchAllReviesController } from '../controller/reviewController'
import { userAuth } from '../middlewares/authMiddleware'


const router = Router()

router.route('/submit-review').post(userAuth, createReviewController)

router.route('/fetch-all-reviews/:id').get(fetchAllReviesController)

export default router