'use strict';

const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length;

exports.encode = (num) => {
    let encoded = '';
    while (num) {
        let remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder] + encoded;
    }
    return encoded;
}

exports.decode = (str) => {
    let decoded = 0;
    while (str) {
        let index = alphabet.indexOf(str[0]);
        let power = str.length - 1;
        decoded += index * (Math.pow(base, power));
        str = str.substring(1);
    }
    return decoded;
}