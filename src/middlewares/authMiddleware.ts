import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../_lib/jwt'

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const userAuth = (req: Request, res: Response, next: NextFunction) => {

    try {


        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const user = verifyToken(token)
            req.user = user

            if (user) {

                next()
            } else {
                throw new Error('User is not authorized')
            }
        } else {
            throw new Error('User is not authorized')
        }

    } catch (error: any) {

        res.status(error?.status || 500).json({ message: error?.message })
    }
}