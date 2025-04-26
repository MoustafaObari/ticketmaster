const express = require('express');
const orderItemController = require('../controllers/orderItemController');

const router = express.Router();

router.get('/api/orderItems', orderItemController.getAllOrderItems);

router.post('/api/orderItems', orderItemController.createOrderItem);

router.put('/api/orderItems/:id', orderItemController.updateOrderItem);

router.delete('/api/orderItems', orderItemController.deleteAllOrderItems);

module.exports = router;