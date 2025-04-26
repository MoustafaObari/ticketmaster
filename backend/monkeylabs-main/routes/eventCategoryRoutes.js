const express = require('express');
const eventCategoryController = require('../controllers/eventCategoriesController');

const router = express.Router();

router.get('/api/eventcategories', eventCategoryController.getAllEventCategories);

router.post('/api/eventCategories', eventCategoryController.createEventCategory);

router.put('/api/eventCategories/:id', eventCategoryController.updateEventCategory);

router.delete('/api/eventCategories', eventCategoryController.deleteAllEventCategories);

module.exports = router;