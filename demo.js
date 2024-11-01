const LightChain = require('./LightChain');
const Transaction = require('./Transaction');
const BigNumber = require('bignumber.js');

// Инициализация блокчейна
console.log('🚀 Инициализация WidePiper Light Blockchain...\n');
const chain = new LightChain();

// Тестовые кошельки
const wallets = {
    alice: 'wallet_alice',
    bob: 'wallet_bob',
    charlie: 'wallet_charlie'
};

// Функция для красивого вывода транзакций
const printTransaction = (tx) => {
    console.log(`📝 Транзакция:
    От: ${tx.fromAddress}
    Кому: ${tx.toAddress}
    Сумма: ${tx.amount.toString()}
    Хеш: ${tx.calculateHash().substring(0, 10)}...
    `);
};

// 1. Создаем и добавляем транзакции
console.log('1️⃣ Тестируем создание транзакций...\n');

const transactions = [
    new Transaction(wallets.alice, wallets.bob, '100'),
    new Transaction(wallets.bob, wallets.charlie, '50'),
    new Transaction(wallets.charlie, wallets.alice, '25')
];

transactions.forEach(tx => {
    chain.addTransaction(tx);
    printTransaction(tx);
});

// 2. Майним блок
console.log('2️⃣ Майним новый блок...\n');
chain.minePendingTransactions('miner_wallet');
console.log(`✅ Блок успешно создан
    Длина цепочки: ${chain.chain.length}
    Хеш последнего блока: ${chain.getLatestBlock().hash.substring(0, 10)}...
`);

// 3. Проверяем балансы
console.log('3️⃣ Проверяем балансы кошельков...\n');
Object.entries(wallets).forEach(([name, address]) => {
    const balance = chain.getBalance(address);
    console.log(`💰 Баланс ${name}: ${balance.toString()}`);
});

// 4. Проверяем валидность цепочки
console.log('\n4️⃣ Проверяем валидность блокчейна...');
const isValid = chain.isChainValid();
console.log(`🔍 Статус: ${isValid ? '✅ Валидна' : '❌ Невалидна'}`);

// 5. Проверяем zero-cost stability
console.log('\n5️⃣ Проверяем zero-cost stability...');
const lastBlock = chain.getLatestBlock();
console.log(`📊 DeltaL: ${lastBlock.deltaL.toString()}`);
console.log(`🔒 Zero-cost stability: ${lastBlock.deltaL.isZero() ? '✅ Поддерживается' : '❌ Нарушена'}`);

// 6. Выводим структуру последнего блока
console.log('\n6️⃣ Структура последнего блока:');
console.log(JSON.stringify(lastBlock, null, 2));
