import { Request, Response } from 'express'
import Movies from '../model/MoviesModel'
const cloudinary = require('cloudinary').v2
import fs from 'fs'


export const addMovieController = async (req: Request, res: Response) => {

    try {

        const cloudName = process.env.cloudName
        const apiKey = process.env.cloudApiKey
        const apiSecret = process.env.cloudApiSecret

        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        });

        const result = await cloudinary.uploader.upload(req?.file?.path);

        let data = req?.body
        data.rating = 0
        data.poster = result?.url

        await Movies.create(data)
        const path = req?.file?.path || ''
        fs.unlink(path, (err: any) => {
            if (err) {
                console.log('failed to delete file')
            }
        })

        res.status(200).json({ status: 'ok', message: "success" })


    } catch (error: any) {
        console.log(error)
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const fetchMoviesController = async (req: Request, res: Response) => {

    try {

        const movies = await Movies.find({})

        res.status(200).json({ status: 'ok', data: movies })

    } catch (error: any) {
        res.status(error?.status || 400).json({ message: error?.message })
    }
}

export const fetchMovieDetailsController = async (req: Request, res: Response) => {

    try {

        const id = req?.params?.id
        const details = await Movies.findOne({ _id: id })
        res.status(200).json({ status: 'ok', data: details })

    } catch (error: any) {
        res.status(error?.status || 400).json({ message: error?.message })
    }
}