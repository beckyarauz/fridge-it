class UserBalanceService {
  constructor() {
    this.users = {
      "1234": {balance: 42.42},
      "456": {balance: -3.50}
    };
  }

  get(userId) {
    const user = this.users[userId];
    if (!user) {
      return 0;
    } else {
      return user.balance;
    }
  }
}

module.exports = new UserBalanceService();
