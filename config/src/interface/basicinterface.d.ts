import mongoose, { Document } from 'mongoose'

export interface Basic {
    name: string,
    surname:string
  
}

export interface User {
    email:string,
    password:string,
    password2:string,
}

export interface Token {
    refreshTokenDB: string
    ip: string
    userAgent: string
    isValid: Boolean
    user: mongoose.Types.ObjectId
}