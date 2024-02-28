const fs = require('fs');
const CryptoJS = require('crypto-js');

// Function to encrypt content
function encryptContent(content, password) {
    return CryptoJS.AES.encrypt(content, password).toString();
}

// Function to read file content
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// Function to write encrypted content to file
function writeFile(filePath, encryptedContent) {
    fs.writeFileSync(filePath, `var encryptedContent = "${encryptedContent}";`);
}

// Main function to encrypt file
function encryptFile(filePath, password) {
    try {
        // Read file content
        const content = readFile(filePath);

        // Encrypt content
        const encryptedContent = encryptContent(content, password);

        // Write encrypted content to JavaScript file
        const outputFilePath = 'index_encrypted.js';
        writeFile(outputFilePath, encryptedContent);

        console.log(`File encrypted successfully. Encrypted content saved to ${outputFilePath}`);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Example usage: node encrypt_file.js path/to/your/file.txt yourpassword
const filePath = process.argv[2];
const password = process.argv[3];

if (!filePath || !password) {
    console.error('Usage: node encryptFile.js <file_path> <password>');
} else {
    encryptFile(filePath, password);
}