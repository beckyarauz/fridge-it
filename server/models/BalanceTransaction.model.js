const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceEventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: number, //can be negative to reduce from balance
  reason: string, // add to balance, drinks bought
}, {
    timestamps: {
      createdAt: 'created_at'
    }
  });

const BalanceEvent = mongoose.model('BalanceEvent', balanceEventSchema);
module.exports = BalanceEvent;
