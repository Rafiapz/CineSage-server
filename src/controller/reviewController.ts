import { Request, Response } from 'express'
import Reviews from '../model/ReviewModel'
import Movies from '../model/MoviesModel'

export const createReviewController = async (req: Request, res: Response) => {

    try {

        const data = req?.body
        const user = req?.user
        const userId = user?.id
        data.userId = userId

        await Reviews.create(data)
        const all = await Reviews.find({ movieId: data?.movieId })
        let rating = 0
        all?.map((ob: any) => {
            const val = parseFloat(ob?.rating)
            rating += val
        })

        rating = Math.floor(rating / all.length)
        await Movies.updateOne({ _id: data?.movieId }, { $set: { rating: rating } })
        res.status(200).json({ status: 'ok', message: 'Success' })

    } catch (error: any) {
        console.log(error)
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const fetchAllReviesController = async (req: Request, res: Response) => {

    try {

        const id = req?.params?.id
        const reviews = await Reviews.find({ movieId: id }).populate('userId')

        res.status(200).json({ status: 'ok', data: reviews })

    } catch (error: any) {
        console.log(error)
        res.status(error?.status || 400).json({ message: error?.message })
    }
}