const crypto = require('crypto');

class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '0', new Date().toISOString(), { message: 'PROLEAK Block Chain' }, this.calculateHash(0, '0', new Date().toISOString(), { message: 'JMM ENTERTAINMENT Block Chain' }));
    }

    calculateHash(index, previousHash, timestamp, data) {
        return crypto.createHash('sha256').update(index + previousHash + timestamp + JSON.stringify(data)).digest('hex');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.hash = this.calculateHash(newBlock.index, newBlock.previousHash, newBlock.timestamp, newBlock.data);
        this.chain.push(newBlock);
    }

    createBlock(data) {
        const latestBlock = this.getLatestBlock();
        const newIndex = latestBlock.index + 1;
        const newTimestamp = new Date().toISOString();
        const newHash = this.calculateHash(newIndex, latestBlock.hash, newTimestamp, data);
        return new Block(newIndex, latestBlock.hash, newTimestamp, data, newHash);
    }
}

module.exports = Blockchain;