//let randVal = Math.floor(Math.random() * (6 - 1 + 1) + 1);
let cards =[]
let decks =[]

async function getTwoCard() {
    let randVal = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    let deck_id = await $.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${randVal}`);
    let card = await $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id.deck_id}/draw/?count=1`);
    let res = "";
    for (let i = 0; i < card.cards.length; i++) {
        res = res + `"${card.cards[i].value} of ${card.cards[i].suit}"`;
        if (i != card.cards.length-1)
            res = res+',';
        else
            res = res +'.';   
    }
    decks.push(res);   
    if (decks.length==2) {
        console.log(decks);
        decks=[];
     }
}

$(document).on('click', '#btnClick', function() { 
    getTwoCard(); 
});

async function drawCard() {
    let randVal = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    let deck_id = await $.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${randVal}`);
    let card = await $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id.deck_id}/draw/?count=1`);
    let remaining = card.remaining;
    
    if (cards.indexOf(card.cards[0].code) ==-1 ) {
        cards.push(card.cards[0].code);
        $('.Images').prepend(`<img  src="${card.cards[0].image}" />`);
        if(cards.length == remaining) {
            $("#btnGetAllClick").prop("disabled",true);
        }
    }else{
        console.log(`card ${card.cards[0].code} already displayed`);
    }
}
 
$(document).on('click', '#btnGetAllClick', function() { 
    drawCard();
});
 
 
 