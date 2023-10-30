import mongoose from "mongoose";
import { model } from "mongoose";
import { Basic } from "../interface/basicinterface";

const Schema = new mongoose.Schema({
    ProductName: {
        required: true,
        type: String
    },
    Description: {
        required: true,
        type: String
    },
    Price:{
        required:true,
        type:String
    },
    rating:{
        required:false,
        type:String
    },
    SellerName:{
        required:true,
        type:String
    },
    SellerContectNo:{
        required:false,
        type:String
    }

})
export default model<Basic>('Schema', Schema)
