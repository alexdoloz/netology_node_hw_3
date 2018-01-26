/*

Дополнительное задание

Реализовать свой класс на основе: Readable, Writable, Transform
Readable класс должен генерировать бесконечное кол-во случайных цифр.
Writable класс должен выводить полученные данные через _write в консоль.
Transform класс должен как-либо изменять данные и передавать их на дальнейшую обработку, но с интервалами в 1 сек.
Использовать pipe()

*/

const { Writable, Readable, Transform } = require('stream');
const crypto = require('crypto');

class MyReadable extends Readable {
    constructor(options) {
        super(options);
    }

    _read(size) {
        this.push(crypto.randomBytes(size));
    }
}


class MyWritable extends Writable {
    constructor(options) {
        super(options);
    }

    _write(chunk, encoding, callback) {
        process.stdout.write(chunk);
        callback();
    }
}

class HexTransform extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        setTimeout(() => {
            this.push(chunk.toString('hex'));
            callback();
        }, 1000);
    }
}

class UppercaseTransform extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

const readableStream = new MyReadable();
const writableStream = new MyWritable();
const hexTransform = new HexTransform();
const uppercaseTransform = new UppercaseTransform();

readableStream.pipe(hexTransform).pipe(uppercaseTransform).pipe(writableStream);