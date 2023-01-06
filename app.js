let num =5;


//Part 1: Number Facts
//=====================

// 1 . get a fact about your favorite number
async function getNumber() {
    let factNum = await $.getJSON('http://numbersapi.com/random/year?json');
       console.log("Text: " + factNum.text);
       console.log("Number: " +factNum.number);
       console.log("Type: " +factNum.type);
}


// 2. get data on multiple numbers in a single request

async function getMultipleNumber(num) {
    let factNum = await $.getJSON(`http://numbersapi.com/1..${num}/math`);
    for (let i = 1; i <= num; i++) {
        console.log(factNum[i]);
    }
}
 
// 3. get 4 facts on your favorite number.

async function getFactFavoriteNumber(arr) {  
    for(let i = 0; i < arr.length; i++) {
        const res = await $.getJSON(`http://numbersapi.com/${arr[i]}/math?json`);
        const listVal =  '<li>' + res.text + '</li>';
        $('.List').append(listVal);
        console.log(res);
    }
}

 


