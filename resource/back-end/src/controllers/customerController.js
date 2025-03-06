const Cart = require('../models/cart');
const Order = require('../models/order');
const Review = require('../models/review');
const CartItem = require('../models/cartItem');

exports.addToCart = async (req, res) => {
    const { ProductID, Quantity } = req.body;
    const cart = await Cart.findOne({ CustomerID: req.user.userId });

    if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
    }

    const newCartItem = new CartItem({
        CartID: cart._id,
        ProductID,
        Quantity
    });
    await newCartItem.save();
    res.status(200).json({ msg: 'Product added to cart' });
};

exports.placeOrder = async (req, res) => {
    const { cartId } = req.body;
    const cartItems = await CartItem.find({ CartID: cartId });

    if (cartItems.length === 0) {
        return res.status(400).json({ msg: 'Cart is empty' });
    }

    // Tạo order từ giỏ hàng
    const total = cartItems.reduce((sum, item) => sum + item.Quantity * item.ProductID.Price, 0);

    const order = new Order({
        CustomerID: req.user.userId,
        Total: total,
        CartID: cartId
    });
    await order.save();
    res.status(201).json({ msg: 'Order placed successfully' });
};

exports.addReview = async (req, res) => {
    const { ProductID, Rating, Comment } = req.body;
    const newReview = new Review({
        ProductID,
        CustomerID: req.user.userId,
        Rating,
        Comment
    });
    await newReview.save();
    res.status(201).json({ msg: 'Review added successfully' });
};
