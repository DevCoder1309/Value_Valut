const express = require('express');
const Product = require('../models/items')
const router = express.Router();


router.get("/new", (req, res) => {
  if(req.user){
    const name = "New";
    res.render("new.ejs", { name });
  }
  else {
    res.redirect('/users/login');
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("author");
  const name = product.name;
  res.render("about.ejs", { product, name });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const name = product.name;
  res.render("edit.ejs", { product, name });
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  product.save();
  res.redirect(`/products/${product.id}`);
});

router.post("/new", async (req, res) => {
  const body = req.body;
  await new Product(body).save();
  res.redirect("/");
});


router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/');
})

module.exports = router;