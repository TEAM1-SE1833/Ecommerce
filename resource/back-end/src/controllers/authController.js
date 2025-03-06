const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const Role = require('../models/role');
const Manager = require('../models/manager');
const Shop = require('../models/shop');
const Customer = require('../models/customer');

exports.register = async (req, res) => {
    try {
        const { UserName, Password, Email, RoleID, extraInfo } = req.body;

        // Kiểm tra nếu người dùng đã tồn tại
        const existingUser = await Account.findOne({ UserName });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        // Kiểm tra role hợp lệ
        const role = await Role.findById(RoleID);
        if (!role) return res.status(400).json({ msg: 'Invalid role' });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Tạo tài khoản mới trong Collection `accounts`
        const newUser = await Account.create({
            UserName,
            Password: hashedPassword,
            Email,
            RoleID
        });

        console.log("✅ Tạo tài khoản thành công:", newUser);

        let createdRoleData;

        // Tạo bản ghi mới trong Collection tương ứng
        if (role.RoleName === 'Manager') {
            if (!extraInfo.ManagerName) return res.status(400).json({ msg: 'ManagerName is required' });

            createdRoleData = await Manager.create({ ManagerName: extraInfo.ManagerName, UserID: newUser._id });

            console.log("✅ Tạo Manager thành công:", createdRoleData);
        } 
        else if (role.RoleName === 'Shop') {
            if (!extraInfo.ShopName || !extraInfo.Address || !extraInfo.Phone)
                return res.status(400).json({ msg: 'Shop information is required' });

            createdRoleData = await Shop.create({
                ShopName: extraInfo.ShopName,
                Address: extraInfo.Address,
                Phone: extraInfo.Phone,
                UserID: newUser._id
            });

            console.log("✅ Tạo Shop thành công:", createdRoleData);
        } 
        else if (role.RoleName === 'Customer') {
            if (!extraInfo.CustomerName || !extraInfo.Address || !extraInfo.PhoneNumber)
                return res.status(400).json({ msg: 'Customer information is required' });

            createdRoleData = await Customer.create({
                CustomerName: extraInfo.CustomerName,
                Address: extraInfo.Address,
                PhoneNumber: extraInfo.PhoneNumber,
                UserID: newUser._id
            });

            console.log("✅ Tạo Customer thành công:", createdRoleData);
        }

        res.status(201).json({ 
            msg: 'User registered successfully',
            account: newUser,
            roleData: createdRoleData
        });

    } catch (err) {
        console.error("❌ Lỗi khi tạo tài khoản:", err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};


// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { UserName, Password } = req.body;

        const user = await Account.findOne({ UserName }).populate('RoleID');
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Tạo token
        const token = jwt.sign(
            { userId: user._id, role: user.RoleID.RoleName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
