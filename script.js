// DOM Elements
// top container
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
// screen
const valueEl = document.querySelector('.value');
// functions
const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');
//operators + decimal
const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const divisionEl = document.querySelector('.division');
const multiplicationEl = document.querySelector('.multiplication');
const equalEl = document.querySelector('.equal');
const decimalEl = document.querySelector('.decimal');
// numbers
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
// container to hold all of the nunmber button elements
const numberElArray = [
    number0El, number1El, number2El, number3El, number4El,
    number5El, number6El, number7El, number8El, number9El
];

// local variables to be kept in memory
let valueStrInMemory = null;
let operatorInMemory = null;

// Helper Functions
const getValueAsStr = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if(valueStr[valueStr.length - 1] === '.'){
        valueEl.textContent += '.';
        return;
    }
    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
        valueEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
        console.log(valueEl.textContent.length);
    }
    else {
        let valuebuffer = parseFloat(wholeNumStr).toLocaleString();
        if(valuebuffer.length < 12) {
            valueEl.textContent = valuebuffer;
            if(valueEl.textContent.length > 8) {
                valueEl.style.fontSize = '90px';
            }
            else {
                valueEl.style.fontSize = '130px';
            }
        }
    }
};

const handleNumberClick = (numStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        setStrAsValue(numStr);
    }
    else {
        setStrAsValue(currentValueStr + numStr);
    }
};

getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if(operatorInMemory === 'addition') {
        newValueNum = valueNumInMemory + currentValueNum;
    }
    else if(operatorInMemory === 'subtraction'){
        newValueNum = valueNumInMemory - currentValueNum;
    }
    else if(operatorInMemory === 'multiplication'){
        newValueNum = valueNumInMemory * currentValueNum;
    }
    else if(operatorInMemory === 'division'){
        newValueNum = valueNumInMemory / currentValueNum;
    }

    return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();

    if(!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }

    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');

}

// Event Listener to functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});

pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();
    
    if(currentValueStr === 'NaN'){
        setStrAsValue('-0');
        return;
    }
    if(currentValueStr === '-0'){
        setStrAsValue('0');
        return;
    }
    if(currentValueNum >= 0){
        setStrAsValue('-' + currentValueStr);
    }
    else {
        setStrAsValue(currentValueStr.substring(1));
    }
});

percentEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum/100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});

// Event Listeners to operators
additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
    if(valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});

// Event Listeners to numbers and buttons
for (let i=0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}

decimalEl.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if(!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.');
    }
});

// Setting up the time
const updateTime = () => {
    const currentTime = new Date();
    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour > 12) { // gets the 12 hour base instead of 24 hour base
        currentHour -= 12;
    }

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();