import { NextFunction, Request, Response } from 'express'
import { BaseError } from '../errors/baseError'

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
   
    if (err instanceof BaseError) {
        console.log("ye");
        
        return res.status(err.statusCode).json({ errors: err.serializeErrors() })
    }

    if (err.name === 'CastError') {
        return res.status(404).json({
            errors: [{ msg: 'Cannot request resource' }],
        })
    }

    if (err.name === 'MongoServerError') {
        return res.status(400).json({
            errors: [
                {
                    msg: `Duplicate value entered for ${Object.keys(
                        //@ts-ignore
                        err.keyValue
                    )}  field, please choose another value`,
                },
            ],
        })
    }

    return res.status(500).json({ errors: [{ msg: err.message }] || [{ msg: 'something went wrong' }] })
}

export default errorHandlerMiddleware