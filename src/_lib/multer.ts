import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'

const uploadDir = path.join('./public/posters');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


export const uploadSingleFile = (req: Request, res: Response, next: NextFunction) => {

    try {

        const upload = multer({
            storage: storage,
            limits: { fileSize: 10 * 1024 * 1024 },
        }).single('poster');

        upload(req, res, (err: any) => {
            if (err) {
                throw new Error(err)
            }
            next()
        })


    } catch (error: any) {
        console.log('first')
        console.log(error.message);

        // res.json({ status: 'failed', message: error.message })
    }
}