var assert = require('assert');

var ValidateStringWithParentheses = require('./ValidateStringWithParentheses.js');

// Создаем объект
let parenthesesString = new ValidateStringWithParentheses('();');
console.info('Test 01 is starting');
assert.equal(parenthesesString.clearEndOfStr(), '()');
console.info('Test 01 is OK');

console.info('Test 02 is starting');
parenthesesString = new ValidateStringWithParentheses('([](){([])});');
// console.info('parenthesesString.validate() =', parenthesesString.validate());
assert.equal(parenthesesString.clearEndOfStr(), '([](){([])})');
assert.equal(parenthesesString.validate(), 'Success');
assert.deepEqual(parenthesesString.validate(), 'Success');
console.info('Test 02 is OK');

console.info('Test 03 is starting');
parenthesesString = new ValidateStringWithParentheses('{[]}()');
assert.equal(parenthesesString.validate(), 'Success');
assert.deepEqual(parenthesesString.validate(), 'Success');
console.info('Test 03 is OK');

console.info('Test 04 is starting');
parenthesesString = new ValidateStringWithParentheses('');
assert.equal(parenthesesString.validate(), 'Success');
assert.deepEqual(parenthesesString.validate(), 'Success');
console.info('Test 04 is OK');

console.info('Test 04 is starting');
parenthesesString = new ValidateStringWithParentheses('foo(bar);');
assert.equal(parenthesesString.validate(), 'Success');
assert.deepEqual(parenthesesString.validate(), 'Success');
console.info('Test 04 is OK');

console.info('Test 05 is starting');
parenthesesString = new ValidateStringWithParentheses('{{[()]]');
assert.equal(parenthesesString.validate(), 7);
assert.deepEqual(parenthesesString.validate(), 7);
console.info('Test 05 is OK');

console.info('Test 06 is starting');
parenthesesString = new ValidateStringWithParentheses('()[]}');
assert.equal(parenthesesString.validate(), 5);
assert.deepEqual(parenthesesString.validate(), 5);
console.info('Test 06 is OK');


console.info('Test 07 is starting');
parenthesesString = new ValidateStringWithParentheses('foo(bar[i);');
// console.info('validate() =', parenthesesString.validate());
assert.equal(parenthesesString.validate(), 10);
assert.deepEqual(parenthesesString.validate(), 10);
console.info('Test 07 is OK');

console.info('All tests are OK !!!');
