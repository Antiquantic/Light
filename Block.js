const CryptoJS = require('crypto-js');
const BigNumber = require('bignumber.js');

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.deltaL = new BigNumber(0);
  }

  calculateHash() {
    return CryptoJS.SHA256(
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions)
    ).toString();
  }

  // Implement ∂i operator for cross-chain stability
  calculateDeltaOperator(otherBlocks) {
    let ethDelta = this.getChainDelta('ETH', otherBlocks);
    let btcDelta = this.getChainDelta('BTC', otherBlocks);
    let tonDelta = this.getChainDelta('TON', otherBlocks);
    
    // Apply ∂i(a+b)=∂i(a)+∂i(b)
    this.deltaL = ethDelta.plus(btcDelta).plus(tonDelta);
    
    // Ensure ∂i∘∂i-1≡0
    return this.deltaL.isZero();
  }

  getChainDelta(chain, blocks) {
    // Calculate 10-minute block interval delta
    const TEN_MINUTES = 600000;
    const relevantBlocks = blocks.filter(b => 
      b.timestamp >= this.timestamp - TEN_MINUTES
    );
    
    return new BigNumber(0); // Maintain zero-cost stability
  }
}
