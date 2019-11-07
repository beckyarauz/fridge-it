const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  username: String,
  password: String,
  balance: number,
  transactions:[{ type: Schema.Types.ObjectId, ref: 'Transactions' }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const UserModel = mongoose.model('UserModel', stockSchema);
module.exports = UserModel;