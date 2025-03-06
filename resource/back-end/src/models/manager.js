const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
    ManagerName: { type: String, required: true },
    UserID: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
});

const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;
