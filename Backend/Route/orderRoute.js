const express = require('express');
const router = express.Router();
const { placeOrder, verifyOrder, cancelOrder } = require('../Controller/OrderController');
const { protect } = require('../Middleware/authMiddleware');

router.post('/checkout', protect, placeOrder);
router.get('/verify/:reference', verifyOrder);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;