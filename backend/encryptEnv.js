const fs = require('fs');
const crypto = require('crypto-js');

const PASSWORD = 'securepassword';  // Replace with your password

// Read .env file
const envData = fs.readFileSync('.env', 'utf8');

// Encrypt the data
const encryptedData = crypto.AES.encrypt(envData, PASSWORD).toString();

// Write the encrypted data to a new file
fs.writeFileSync('.env.enc', encryptedData);

console.log('Encrypted .env file saved as .env.enc');
