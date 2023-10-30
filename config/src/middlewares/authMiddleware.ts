
import { NextFunction, Request, Response } from 'express'
import { NotAuthorize } from '../errors/notAuthorize'
import Token from '../models/Tokens'
import { createJwtToken, verifyJwtToken } from '../utils/jwt'
import axios from 'axios'
declare global {
    namespace Express {
        interface Request {
            userInfo?: any
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.signedCookies

    if (!refreshToken) {
        throw new NotAuthorize('Not Authorize to access page!')
    }

    try {
        // if accessToken is present and valid no need to generate newTokens
        if (accessToken) {
            const payload = verifyJwtToken(accessToken)
            req.userInfo = payload
            next()
            return
        }

        const data = verifyJwtToken(refreshToken)
        const { id, firstName, role, email, refreshTokenDB } = data
        const token = await Token.findOne({
            user: id,
            refreshTokenDB: refreshTokenDB,
        })

        if (!token || !token.isValid) {
            throw new NotAuthorize('Not Authorize to access page!')
        }

        // refresh the access token using Refresh token
        createJwtToken(res, { id, firstName, role, email }, refreshTokenDB)

        // set payload on request
        req.userInfo = { id, firstName, role, email }

        next()
    } catch (error) {
        throw new NotAuthorize('Not authorize')
    }
}
