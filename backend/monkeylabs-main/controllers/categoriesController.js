const Categories = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryById = async (req, res) => {
  const categoriesId = req.params.id;

    try {
        const categories = await Categories.findById(categoriesId);
        
        if (!categories) {
            return res.status(404).json({ message: 'Categories not found.' });
        }

        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching categories.' });
    }
};

const createCategory = async (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newCategories = new Categories({
          category_name
        });

        const savedCategories = await newCategories.save();

        res.status(201).json(savedCategories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding categories.' });
    }
};

const updateCategory = async (req, res) => {
  const categoriesId = req.params.id;

  try {
      const updatedCategories = await Categories.findByIdAndUpdate(categoriesId, req.body, { new: true, runValidators: true });
      
      if (!updatedCategories) {
          return res.status(404).json({ message: 'Categories not found.' });
      }

      res.status(200).json(updatedCategories);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating categories.' });
  }
};

const deleteAllCategories = async (req, res) => {
  try {
      const categories = await Categories.deleteMany({});
      res.status(200).json({ message: 'All categories successfully deleted.', deletedCategories: categories });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting categories.' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteAllCategories,
}