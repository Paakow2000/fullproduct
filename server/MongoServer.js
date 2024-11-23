/* app.post("/books", (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const quantity = req.body.quantity
  const price = req.body.price
  const newProduct = new Product{
    name,
    quantity,
    price
  }
  newProduct.save()
}) */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const dbURI = MONGO_URL;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define a Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Create a Product Model
const Product = mongoose.model("Product", productSchema);

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Add a new product
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
});

/*   // Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});  */

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
