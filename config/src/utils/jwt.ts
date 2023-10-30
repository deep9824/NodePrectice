import dotenv from 'dotenv'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
dotenv.config()

export const verifyJwtToken: (token: string) => any = (token: string) => jwt.verify(token, process.env.SECRET_JWT_CODE!)

export const createJwtToken = (res: Response, payload: any, refreshTokenDB: string) => {
    const accessToken = jwt.sign(payload, process.env.SECRET_JWT_CODE!, {
        expiresIn: '1d',
    })

    const refreshToken = jwt.sign({ ...payload, refreshTokenDB }, process.env.SECRET_JWT_CODE!, {
        expiresIn: '30d',
    })

    // res.cookie('accessToken', accessToken, {
    //     path: '/',
    //     httpOnly: true,
    //     secure: process.env.NODE_DEVELOPMENT === 'production',
    //     expires: new Date(Number(Date.now) + 1000 * 60),
    //     signed: true,
    //     sameSite: 'none',
    //     maxAge: 1000 * 60,
    // })

    // res.cookie('refreshToken', refreshToken, {
    //     path: '/',
    //     httpOnly: true,
    //     secure: process.env.NODE_DEVELOPMENT === 'production',
    //     expires: new Date(Number(Date.now) + 1000 * 60 * 60 * 24),
    //     signed: true,
    //     sameSite: 'none',
    //     maxAge: 1000 * 60 * 60 * 24,
    // })
}
