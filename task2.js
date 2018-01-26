/*

Часть 2

Расширить предыдущие решние используя stream.Transform
Реализовать свой класс, который будет конвертировать результат crypto.createHash() (бинарные данные - хеш‑сумма) в hex формат.
Результат вывести в консоль и записать в файл.
Использовать pipe()

*/

const fs = require('fs');
const crypto = require('crypto');
const { Transform } = require('stream');

class HexTransform extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        this.push(chunk.toString('hex'));
        callback();
    }
}

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('hashes.txt');
const hexTransform = new HexTransform();
const hashStream = crypto.createHash('md5');

readStream.pipe(hashStream).pipe(hexTransform);
hexTransform.pipe(writeStream);
hexTransform.pipe(process.stdout);

