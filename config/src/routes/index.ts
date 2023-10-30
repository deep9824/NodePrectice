import {
  postApi,
  getAll,
  getbyId,
  updatebyId,
  deletebyId,
  registerApi,
  login,
  Products,
  Reviews,
  PopulatedData} from "../controllers/commoncontroller";
const express = require("express");

const app = express();
//Get Post
app.post("/post", postApi);

//Get All
app.get("/getAll", getAll);

//Get by ID
app.get("/getOne/:id", getbyId);

//Update by ID
app.patch("/update/:id", updatebyId);

//Delete by ID
app.delete("/delete/:id", deletebyId);

app.post("/register",registerApi)
app.post("/login",login)
app.post('/products',Products)
app.post("/product/:id",Reviews)
app.post ("/populated/:id",PopulatedData)


export default app;
