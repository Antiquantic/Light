const LightChain = require('./LightChain');
const Transaction = require('./Transaction');

// Test implementation
async function runTests() {
  console.log('Starting Light Blockchain tests...');
  
  const lightChain = new LightChain();
  
  // Test 1: Create and add transactions
  console.log('\nTest 1: Adding transactions...');
  const tx1 = new Transaction('wallet1', 'wallet2', '100');
  const tx2 = new Transaction('wallet2', 'wallet3', '50');
  
  try {
    lightChain.addTransaction(tx1);
    lightChain.addTransaction(tx2);
    console.log('✓ Transactions added successfully');
  } catch (error) {
    console.error('✗ Failed to add transactions:', error);
  }

  // Test 2: Mine block
  console.log('\nTest 2: Mining block...');
  try {
    lightChain.minePendingTransactions('minerWallet');
    console.log('✓ Block mined successfully');
    console.log('Chain length:', lightChain.chain.length);
  } catch (error) {
    console.error('✗ Mining failed:', error);
  }

  // Test 3: Verify zero-cost stability
  console.log('\nTest 3: Verifying zero-cost stability...');
  const lastBlock = lightChain.getLatestBlock();
  if (lastBlock.deltaL.isZero()) {
    console.log('✓ Zero-cost stability maintained');
  } else {
    console.log('✗ Zero-cost stability violated');
  }

  // Test 4: Chain validity
  console.log('\nTest 4: Verifying chain validity...');
  if (lightChain.isChainValid()) {
    console.log('✓ Blockchain is valid');
  } else {
    console.log('✗ Blockchain validation failed');
  }
}

runTests().catch(console.error);
