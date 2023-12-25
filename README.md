# CryptWallet

CryptWallet is a Node.js project that enables users to generate unique cryptocurrency wallet addresses, private keys, and public keys using BIP39 and BIP44 standards. It provides functionalities to manage and view all created wallets and also check the balance for a specific wallet. The project utilizes MongoDB for local storage of wallet information.

# Features

1. Address Generation: Generates unique wallet addresses for different cryptocurrencies (BTC, ETH, etc.) based on BIP39 and BIP44 standards.
2. Private & Public Keys: Derives private and public keys corresponding to generated wallet addresses.
3. Multiple Mnemonics: Supports using the same mnemonic or different mnemonics for generating wallets.
4. Local Storage: Stores wallet information securely in a local MongoDB database.
5. Wallet Management: Provides functionality to view all created wallets.
6. Balance Checking: Allows users to check the balance for a specific wallet.
   
# Setup

Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/CryptWallet.git
Install Dependencies:

bash
Copy code
cd CryptWallet
npm install
Configure MongoDB:

Ensure MongoDB is installed and running locally.
Update the MongoDB connection string in config.js to point to your local MongoDB instance.
Run the Application:

bash
Copy code
npm start

# Mongodb Storage
<img width="954" alt="image" src="https://github.com/BhuvneshSinghKushwah/cryptWallet/assets/74913365/a4935daf-0ab5-4dbe-bf51-8b23cd630435">

# Create Wallet API
<img width="778" alt="image" src="https://github.com/BhuvneshSinghKushwah/cryptWallet/assets/74913365/c3445db9-b50c-4b34-91b0-7a9a8018aa8a">

# check balance API
<img width="784" alt="image" src="https://github.com/BhuvneshSinghKushwah/cryptWallet/assets/74913365/738c7fe6-384c-4344-a4f0-a0bafc366ccd">

<img width="786" alt="image" src="https://github.com/BhuvneshSinghKushwah/cryptWallet/assets/74913365/9e48b17c-a6b9-4ad5-a66d-2b9d369ce431">

# See Wallets API
<img width="790" alt="image" src="https://github.com/BhuvneshSinghKushwah/cryptWallet/assets/74913365/636d784c-6957-45a0-963e-c31ce7c27a8f">


