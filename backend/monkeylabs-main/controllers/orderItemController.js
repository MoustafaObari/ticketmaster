const OrderItems = require('../models/OrderItem');

const getAllOrderItems = async (req, res) => {
  try {
      const venues = await OrderItems.find({});
      res.status(200).json(venues);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching venues.' });
  }
};

const getOrderItemById = async (req, res) => {
  const orderItemsId = req.params.id;

    try {
        const orderItems = await OrderItems.findById(orderItemsId);
        
        if (!orderItems) {
            return res.status(404).json({ message: 'OrderItems not found.' });
        }

        res.status(200).json(orderItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching orderItems.' });
    }
};

const createOrderItem = async (req, res) => {
    const { order_id, ticket_id, quantity } = req.body;

    if (!order_id || !ticket_id || !quantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newOrderItems = new OrderItems({
          order_id,
          ticket_id,
          quantity
        });

        const savedOrderItems = await newOrderItems.save();

        res.status(201).json(savedOrderItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding orderItems.' });
    }
};

const updateOrderItem = async (req, res) => {
  const orderItemsId = req.params.id;

  try {
      const updatedOrderItems = await OrderItems.findByIdAndUpdate(orderItemsId, req.body, { new: true, runValidators: true });
      
      if (!updatedOrderItems) {
          return res.status(404).json({ message: 'OrderItems not found.' });
      }

      res.status(200).json(updatedOrderItems);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating orderItems.' });
  }
};

const deleteAllOrderItems = async (req, res) => {
  try {
      const orderItems = await OrderItems.deleteMany({});
      res.status(200).json({ message: 'All orderItems successfully deleted.', deletedOrderItems: orderItems });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting orderItems.' });
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteAllOrderItems
}