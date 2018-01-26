/*
Часть 1

Создать два потока: чтение и запись файла.
Используя crypto.createHash() вычислить md5 читаемых данных.
Результат вывести в консоль и записать в файл.
Использовать pipe()
*/

const fs = require('fs');
const crypto = require('crypto');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('hashes.txt');
const hashStream = crypto.createHash('md5');

readStream.pipe(hashStream);
hashStream.pipe(writeStream);
hashStream.pipe(process.stdout);
