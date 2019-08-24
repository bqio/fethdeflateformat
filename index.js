const fs = require('fs');
const pako = require('pako');
const path = require('path');
const Stream = require('./lib/Stream');

const data = new Stream(Buffer.from(fs.readFileSync(process.argv[2])));

let uncChunkSize = data.readU32();
let chunkCount = data.readU32();
let uncFileSize = data.readU32();
let chunkSizeWithMeta = [];

for (let i = 0; i < chunkCount; i++) {
    chunkSizeWithMeta.push(data.readU32());
}

let dist = Buffer.alloc(0);
let distFile = fs.createWriteStream(`${path.basename(process.argv[2], path.extname(process.argv[2]))}.bin`);

for (let i = 0; i < chunkCount; i++) {
    data.seek(0x80);
    let chunkSize = data.readU32();
    let deflateData = pako.inflate(data.read(chunkSize));
    let tbuf = Buffer.from(deflateData);

    dist = Buffer.concat([dist, tbuf]);
}

distFile.write(dist);