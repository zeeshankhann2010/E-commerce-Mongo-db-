const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./models/Orders");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-commerce API is running!");
});

app.post("/api/orders", async (req, res) => {
    try {
        const { customer, products, subtotal, shipping, discount, total } = req.body;

        if (!customer || !products || products.length === 0) {
            return res.status(400).json({
                message: "Customer and products are required"
            });
        }

        const order = await Order.create({
            customer,
            products,
            subtotal,
            shipping: shipping || 0,
            discount: discount || 0,
            total
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.log("Order save error:", error);

        res.status(500).json({
            message: "Failed to save order"
        });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });