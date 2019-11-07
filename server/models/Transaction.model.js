const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: number,
}, {
    timestamps: {
      createdAt: 'created_at'
    }
  });

const Transaction = mongoose.model('Transactions', transactionSchema);
module.exports = Transaction;
