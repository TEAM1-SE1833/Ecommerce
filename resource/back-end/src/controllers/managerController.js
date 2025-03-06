const Shop = require('../models/shop');
const Voucher = require('../models/voucher');

exports.createShop = async (req, res) => {
    try {
        const { ShopName, Address, Phone } = req.body;
        const newShop = new Shop({ ShopName, Address, Phone, UserID: req.user.userId });
        await newShop.save();
        res.status(201).json({ msg: 'Shop created successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.createVoucher = async (req, res) => {
    try {
        const { Code, Discount, MinOrder, MaxValue, StartDate, ExpiryDate } = req.body;
        const newVoucher = new Voucher({
            Code, Discount, MinOrder, MaxValue, StartDate, ExpiryDate
        });
        await newVoucher.save();
        res.status(201).json({ msg: 'Voucher created successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
