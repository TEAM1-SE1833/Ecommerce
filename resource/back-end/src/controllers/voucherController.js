
const Voucher = require('../models/voucher');

// 📌 Create Voucher
exports.createVoucher = async (req, res) => {
    try {
        const { Code, Discount, MinOrder, MaxValue, StartDate, ExpiryDate, ShopID } = req.body;

        const newVoucher = new Voucher({
            Code,
            Discount,
            MinOrder,
            MaxValue,
            StartDate,
            ExpiryDate,
            ShopID
        });

        await newVoucher.save();
        res.status(201).json({ msg: 'Voucher created successfully', voucher: newVoucher });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Get All Vouchers
exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find().populate('ShopID', 'ShopName Address');
        res.status(200).json(vouchers);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Get Voucher By ID
exports.getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id).populate('ShopID', 'ShopName Address');
        if (!voucher) return res.status(404).json({ msg: 'Voucher not found' });

        res.status(200).json(voucher);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Update Voucher
exports.updateVoucher = async (req, res) => {
    try {
        const updatedVoucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedVoucher) return res.status(404).json({ msg: 'Voucher not found' });

        res.status(200).json({ msg: 'Voucher updated successfully', voucher: updatedVoucher });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// 📌 Delete Voucher
exports.deleteVoucher = async (req, res) => {
    try {
        const deletedVoucher = await Voucher.findByIdAndDelete(req.params.id);

        if (!deletedVoucher) return res.status(404).json({ msg: 'Voucher not found' });

        res.status(200).json({ msg: 'Voucher deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};