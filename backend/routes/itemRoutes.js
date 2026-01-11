const express = require('express');
const router = express.Router();
const { getItems, createItem, deleteItem } = require('../controllers/itemController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Anyone logged in can see items
router.get('/', verifyToken, getItems);

// Only Admins can add items
router.post('/', verifyToken, isAdmin, createItem);

// Only Admins can delete items
router.delete('/:id', verifyToken, isAdmin, deleteItem);

module.exports = router;