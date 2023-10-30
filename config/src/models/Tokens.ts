import mongoose, { model, Schema } from 'mongoose'
import { Token } from '../interface/basicinterface'

const TokenSchema: Schema = new Schema(
    {
        refreshTokenDB: {
            type: String,
            required: [true, 'refreshToken required'],
        },
        ip: {
            type: String,
            required: [true, 'ip required'],
        },
        userAgent: {
            type: String,
            required: true,
        },
        isValid: {
            type: String,
            default: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model<Token>('Tokens', TokenSchema)
