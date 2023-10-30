import { Request, Response } from "express";
import model from "../models/model";
import userRegister from "../models/userRegister";
var bcrypt = require("bcryptjs");
var JsonWebToken = require("jsonwebtoken");
import { BadRequest } from "../errors/badRequest";
import { createJwtToken } from "../utils/jwt";
import crypto from "crypto";
import Tokens from "../models/Tokens";
import Product from "../models/Product";
import Review from "../models/Review";

const postApi = async (req: Request, res: Response) => {
  const data = new model({
    ProductName: req.body.ProductName,
    Description: req.body.Description,
    Price: req.body.Price,
    rating: req.body.rating,
    SellerName: req.body.SellerName,
    SellerContectNo: req.body.SellerContectNo,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
const getAll = async (req: any, res: any) => {
  try {
    const data = await model.find();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
const getbyId = async (req: Request, res: Response) => {
  try {
    const data = await model.findById(req.params.id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
const updatebyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
const deletebyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data: any = await model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
const registerApi = async (req: Request, res: Response) => {
  const { email, password, password2 } = req.body;

  const user = await userRegister.findOne({ email });
  if (!user) {
    if (!email || !password || !password2) {
      res.json({ success: false, error: "please pass all parameters" });
      return;
    }
    userRegister
      .create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        password2: bcrypt.hashSync(req.body.password2),
      })
      .then((user) => {
        res.json({ success: true });
      })
      .catch((error) => {
        res.json({ success: false, error: error });
      });
  } else {
    res.json({ success: false, message: "user exists" });
  }
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRegister.findOne({ email });

  if (!user) {
    throw new BadRequest("Wrong email or password");
  }
  const match = await user.comparePassword(password);
  if (!match) {
    res.json({ success: false, error: "Wrong Password" });
    throw new BadRequest("Not authorize");
  }
  const refreshToken = await Tokens.findOne({ user: user._id });
  if (refreshToken) {
    const { isValid } = refreshToken;
    if (!isValid) {
      throw new BadRequest("Not authorize");
    }
    createJwtToken(res, { email: user?.email }, refreshToken.refreshTokenDB);

    return res.status(200).json({
      msg: "User logged in",
      user: { firstName: user.email, token: refreshToken.refreshTokenDB },
    });
  }

  const tokenPayload = {
    refreshTokenDB: crypto.randomBytes(40).toString("hex"),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    user: user._id,
  };

  const token = await Tokens.create(tokenPayload);
  createJwtToken(res, { email: user?.email }, token.refreshTokenDB);
  res.status(200).json({
    msg: "User logged in",
    user: { firstName: user.email, token: token },
  });
};
const Products = async (req: Request, res: Response) => {
  const data = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    departments: req.body.departments,
    review: req.body.review,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
const Reviews = async (req: Request, res: Response) => {
  const data = new Review({
    stars: req.body.stars,
    review: req.body.review,
  });
  try {
    const dataToSave = await data
      .save()
      .then((dataToSave) => {
        return Product.findOneAndUpdate(
          { _id: req.params.id },
          { review: dataToSave._id },
          { new: true }
        );
      })
      .then((dbProduct) => {
        res.json(dbProduct);
      });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
const PopulatedData = async (req: Request, res: Response) => {
  const data = new Product({});
  try {
    Product.findOne({ _id: req.params.id })
      .populate("review")
      .then((dbProduct) => {
        res.json(dbProduct);
      });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export {
  postApi,
  getAll,
  getbyId,
  updatebyId,
  deletebyId,
  registerApi,
  login,
  Products,
  Reviews,
  PopulatedData,
};
