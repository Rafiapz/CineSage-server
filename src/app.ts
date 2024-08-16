import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import cors from 'cors'
import cookieParser = require('cookie-parser')
import nocache from 'nocache'
import { connect } from './_boot/database'
import movieRoutes from './routes/movieRoutes'
import userRoutes from './routes/userRoutes'
import reviewRoutes from './routes/reviewRoutes'
import path from 'path'

dotenv.config()

const app = express()

const port = process.env.PORT || 5000

const secret: string = process.env.SESSION_SECRET || 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'

app.use(session({ secret: secret, resave: true, saveUninitialized: true }));

const corsOptions = {
    origin: process?.env?.FRONT_END_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(nocache())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/image', express.static(path.join(__dirname, '..', 'public')))

connect()

app.use('/user', userRoutes)

app.use('/movies', movieRoutes)

app.use('/reviews', reviewRoutes)



app.listen(port, () => {
    console.log(`server running on the port ${port}`);

})


