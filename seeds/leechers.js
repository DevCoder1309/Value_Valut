const Product = require('../models/items');

const mongoose = require('mongoose');



mongoose
  .connect("mongodb://127.0.0.1:27017/e-auction")
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log(err));

const seed = async () => {
    await Product.deleteMany({})
    await Product.insertMany([
      {
        name: "Apple",
        basePrice: 23,
        image:
          "https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=",
        author: `65ae9c48f323661d250d9f6d`,
      },
      {
        name: "Mango",
        basePrice: 46,
        image:
          "https://t4.ftcdn.net/jpg/05/41/05/85/360_F_541058586_BI3eaJvZO132lNExAwbARYSg7FfHknWz.jpg",
        author: `65ae9c48f323661d250d9f6d`,
      },
      {
        name: "Banana",
        basePrice: 21,
        image:
          "https://www.shutterstock.com/image-photo/bunch-bananas-isolated-on-white-600nw-1722111529.jpg",
        author: `65ae9c48f323661d250d9f6d`,
      },
    ]);
} 

seed().then(() => {
    mongoose.connection.close();
})