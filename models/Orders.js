const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customer: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true }
        },

        products: [
            {
                productId: { type: Number, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String }
            }
        ],

        subtotal: { type: Number, required: true },
        shipping: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        total: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);