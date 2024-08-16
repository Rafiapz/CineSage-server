import { Router } from 'express'
import { userAuth } from '../middlewares/authMiddleware'
import { addMovieController, fetchMovieDetailsController, fetchMoviesController } from '../controller/movieController'
import { uploadSingleFile } from '../_lib/multer'

const router = Router()

router.route('/add-movie').post(userAuth, uploadSingleFile, addMovieController)

router.route('/fetch-movies').get(fetchMoviesController)

router.route('/fetch-movie-details/:id').get(fetchMovieDetailsController)

export default router