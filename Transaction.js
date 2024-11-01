const CryptoJS = require('crypto-js');
const BigNumber = require('bignumber.js');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = new BigNumber(amount);
    this.timestamp = Date.now();
  }

  calculateHash() {
    return CryptoJS.SHA256(
      this.fromAddress +
      this.toAddress +
      this.amount +
      this.timestamp
    ).toString();
  }

  isValid() {
    if (!this.fromAddress || !this.toAddress) {
      return false;
    }

    if (!this.amount || this.amount.isLessThanOrEqualTo(0)) {
      return false;
    }

    return true;
  }
}
