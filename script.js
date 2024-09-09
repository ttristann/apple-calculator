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
const subtractionEl = document.querySelector('subtraction');
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
    }
    else {
        valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};

const handleNumberClick = (numStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        // valueEl.textContent = numStr;
        setStrAsValue(numStr);
    }
    else {
        // valueEl.textContent = parseFloat(currentValueStr + numStr).toLocaleString();
        setStrAsValue(currentValueStr + numStr);
    }
};

// Event Listener to functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
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