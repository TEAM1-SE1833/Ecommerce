const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Avatar: { type: String },
    RoleID: { type: Schema.Types.ObjectId, ref: 'Role' }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
