const Order = require('../Model/OrderModel');
const Cart = require('../Model/CartModel');
const Product = require('../Model/ProductModel');
const axios = require('axios');

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalAmount = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

        const order = await Order.create({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
                farmer: item.product.farmer
            })),
            totalAmount,
            shippingAddress: req.body.shippingAddress
        });

        const response = await axios.post('https://api.paystack.co/transaction/initialize', {
            email: req.user.email,
            amount: totalAmount * 100, 
            reference: `SER-${order._id}-${Date.now()}`,
            callback_url: `${process.env.FRONTEND_URL}/verify-payment`
        }, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
        });

        res.status(200).json({ success: true, paymentUrl: response.data.data.authorization_url, orderId: order._id });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.verifyOrder = async (req, res) => {
    try {
        const { reference } = req.params;
        
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
        });

        if (response.data.data.status === 'success') {
            const orderId = reference.split('-')[1];
            const order = await Order.findById(orderId);

            order.paymentStatus = 'Paid';
            order.paymentReference = reference;
            await order.save();

            for (let item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stockQuantity: -item.quantity }
                });
            }

            await Cart.findOneAndDelete({ user: order.user });

            res.status(200).json({ success: true, message: "Payment Verified & Stock Updated" });
        } else {
            res.status(400).json({ success: false, message: "Payment failed" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Verification Error" });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Not authorized to cancel this order" });
        }

        if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {
            return res.status(400).json({ 
                success: false, 
                message: `Cannot cancel an order that is already ${order.orderStatus.toLowerCase()}` 
            });
        }

        if (order.orderStatus === 'Cancelled') {
            return res.status(400).json({ success: false, message: "Order is already cancelled" });
        }

        if (order.paymentStatus === 'Paid') {
            const restoreStockPromises = order.items.map(item => {
                return Product.findByIdAndUpdate(item.product, {
                    $inc: { stockQuantity: item.quantity }
                });
            });
            await Promise.all(restoreStockPromises);
        }

        order.orderStatus = 'Cancelled';
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully and stock restored.",
            data: order
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};