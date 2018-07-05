/**
 * Задача
 * Вы разрабатываете текстовый редактор для программистов и хотите реализовать проверку
 * корректности расстановки скобок. В коде могут встречаться скобки []{}(). Из них скобки [,{
 * и ( считаются открывающими, а соответству-ющими им закрывающими скобками являются ],} и ).
 * В случае, если скобки расставлены неправильно, редактор должен также сообщить пользователю 
 * первое место, где обнаружена ошибка.
 * В первую очередь необходимо найти закрывающую скобку, для кото-рой либо нет соответствующей 
 * открывающей (например, скобка ] в строке “]()”), либо же она закрывает не соответствующую ей 
 * откры-вающую скобку (пример: “()[}”). Если таких ошибок нет, необходи-мо найти первую открывающую 
 * скобку, для которой нет соответству-ющей закрывающей (пример: скобка ( в строке “{}([]”).
 * Помимо скобок, исходный код может содержать символы латин-ского алфавита, цифры и знаки препинания.
 * Формат входа. 
 * Строка s[1 : : : n], состоящая из заглавных и пропис-ных букв латинского алфавита, цифр, знаков препинания и ско-бок из множества []{}().
 * Формат выхода. Если скобки в s расставлены правильно, выведите строку “Success". 
 * В противном случае выведите индекс (исполь-зуя индексацию с единицы) первой закрывающей скобки, для
 * которой нет соответствующей открывающей. Если такой нет, выведите индекс первой открывающей скобки, для которой нет
 * соответствующей закрывающей.
 * Sample Input 1: ([](){([])})      Sample Output 1: Success
 * Sample Input 2: ()[]}      Sample Output 2: 5
 * Sample Input 3: {{[()]]      Sample Output 3: 7
 * 
 */

module.exports = ValidateStringWithParentheses;

function ValidateStringWithParentheses(inputString) {
    var inputStr = inputString || '';
    const allPairedSymbols = {
        '(': ')',
        '[': ']', 
        '{': '}',
        ')': '(',
        ']': '[', 
        '}': '{'
    };

    return Object.freeze({
        validate,
        clearEndOfStr, 
        // delPairedParentheses, 
        // findNonPairParentheses, 
        // findRight,
    });

    function validate() {
        clearEndOfStr();
        if(inputStr.length === 0) {
            return 'Success';
        }
        let onlyParentheses = getOnlyParentheses(inputStr);
        // console.log(`onlyParentheses = ${onlyParentheses}`);
        let countOfParentheses = onlyParentheses.length;
        if(countOfParentheses === 0) {
            return 'Success';
        }

        // Ищем закрывающую скобку, для кото-рой либо нет соответствующей открывающей
        let singleClosingParen = findSingleClosingParen();
        if(singleClosingParen != undefined) {
            // console.log(`match in = ${singleClosingParen}`);
            return singleClosingParen;
        }

        // найти первую открывающую скобку, для которой нет соответствующей закрывающей 
        // (пример: скобка ( в строке “{}([]”)
        let singleOpeningParen = findSingleOpeningParen();
        if(singleOpeningParen != undefined) {
            // console.log(`match in = ${singleClosingParen}`);
            // return singleOpeningParen;
            return inputStr.length;
        }

        // return inputStr;
        // return findNonPairParentheses();
        return 'Success'
    };

    function findSingleOpeningParen() {
        // console.log(`Starting findSingleOpeningParen()`);
        const pairForOpeningSymbol = {
            '(': ')',
            '[': ']', 
            '{': '}'
        };
        let inpArr = [].slice.call(inputStr.split(''));
        // console.log(`inpArr = ${inpArr}`);
        for(let i=0, countMatched=0; i < inputStr.length; i++) {
            let symbol = inputStr[i];
            let pairedSymbol = pairForOpeningSymbol[symbol];
            if(pairedSymbol === undefined) {
                continue;
            }
            let matchIdx = inpArr.indexOf(pairedSymbol, fromIndex=i);
            if(matchIdx === -1 ) { //  не найдена закрывающая скобка 
                return i + 1;
            }
        }

    };

    function findSingleClosingParen() {
        const pairForClosingSymbol = {
            ')': '(',
            ']': '[', 
            '}': '{'
        };
        let inpArr = [].slice.call(inputStr.split(''));
        for(let i=0, countMatched=0; i < inputStr.length; i++) {
            let symbol = inputStr[i];
            let pairedSymbol = pairForClosingSymbol[symbol];
            if(pairedSymbol === undefined) {
                continue;
            }
            let matchIdx = inpArr.indexOf(pairedSymbol);
            if(matchIdx === -1 || (matchIdx+countMatched) > i) { //  не найдено или открывающая скобка идет после закрывающей (с учетом удаленных) - нашли
                return i + 1;
            }
            // удаляем найденную парную открывающую скобку 
            countMatched ++;
            inpArr.splice(matchIdx, 1);
            // console.log(`inpArr = ${inpArr}`);

            // и продолжаем цикл
        }
        //  не нашли "одинокой" закрывающей скобки
        return undefined;
    };

    function clearEndOfStr() {
        while(inputStr[inputStr.length-1] === ';') {
            inputStr =  inputStr.slice(0, inputStr.length-1);
        }
        return inputStr;
    };

    function getOnlyParentheses(inputString) {
        let outputString = '';
        for(let i=0, j=0; i < inputString.length; i++, j++) {
            let elem = inputString[i];
            let pairedSymbol = allPairedSymbols[elem];
            if(pairedSymbol === undefined) {
                continue;
            }
            outputString = outputString + inputString[i];
        }
        return outputString;
    };

}


const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);
// rl.setPrompt('guess> ');
// rl.setPrompt('>>> ');
rl.prompt();
var inpStr;
rl.on('line', function(line) {
    inpStr = line;
    // if (line === "right") 
    rl.close();
    // rl.prompt();
}).on('close',function(){
    var result = new ValidateStringWithParentheses(inpStr);
    console.log(`${result.validate()}`)
    process.exit(0);
});


