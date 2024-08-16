import jwt from 'jsonwebtoken'

export const genereateToken = (payload: any) => {

    try {
        const secret: any = process.env.jwtSecret;

        return jwt.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: 60 * 60 * 24,
        });
    } catch (error: any) {
        throw new Error(error.message);
    }

}

export const verifyToken = (token: any) => {

    try {

        const secret: any = process.env.jwtSecret;
        const decoded = jwt.verify(token, secret) as { [key: string]: any };

        if (decoded) {
            return decoded;
        } else {
            throw new Error('Failed to verify token')
        }

    } catch (error: any) {
        throw new Error(error)
    }
}