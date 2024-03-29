const express = require("express");

const { SportsToysModel } = require("../Models/SportsToys.model");

const SportsToys = express.Router();

SportsToys.get("/", async (req, res) => {
  const {orderBy} = req.query
  try {
    const product =  orderBy?.length == 0 ? await SportsToysModel.find() : await SportsToysModel.find().sort({'price': orderBy });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

SportsToys.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const SportsToys = await SportsToysModel.findById(id);
    res.send(SportsToys);
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

SportsToys.post("/create", async (req, res) => {
  const payload = req.body;
  // console.log(payload)
  try {
    const new_user = new SportsToysModel(payload);
    await new_user.save();
    res.send({ massage: "Created Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

SportsToys.patch("/update/:productsID", async (req, res) => {
  try {
    const payload = req.body;
    const productsID = req.params.productsID;
    // const userID = req.body.userID;
    // const product = await SportsToysModel.findOne({ _id: productsID });
    // if (userID !== product.userID) {
    //   res.send("Not Authorised");
    // } else {
    await SportsToysModel.findByIdAndUpdate({ _id: productsID }, payload);
    res.send({ massage: "Updated Successfully" });
    // }
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

SportsToys.delete("/delete/:productsID", async (req, res) => {
  try {
    const productsID = req.params.productsID;
    //   const userID = req.body.userID;
    //   const product = await SportsToysModel.findOne({ _id: productsID });
    //   if (userID !== product.userID) {
    //     res.send("Not Authorised");
    //   }
    //  else{
    await SportsToysModel.findByIdAndDelete({ _id: productsID });
    res.send({ massage: "Deleted Successfully" });
    //  }
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

module.exports = { SportsToys };