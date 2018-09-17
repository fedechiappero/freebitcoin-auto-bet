var config = { 
    maxBet: 0.00000128, //before bet this amount, the script will stop
    minBet: 0.00000002,
    profit: 0.00000010,
    delay: 500,
    payout: 2.00,
}; 

var betButton = 'hi';
var multiplier = 1;
var cant = 0;
var initialBalance = 0;
var iWon = 0;
var iLose = 0;
var end = 0;

var hiButton = document.getElementById("double_your_btc_bet_hi_button");
var loButton = document.getElementById("double_your_btc_bet_lo_button");
var winMessage = $('#double_your_btc_bet_win');
var loseMessage = $('#double_your_btc_bet_lose');

var stake = $('#double_your_btc_stake');

//change the bet button
var switchButton = function(val) { 
    return val === 'hi' ? 'lo' : 'hi';
}; 

//check if the bet buttons are enabled
var buttonsEnabled = function() {
    return (hiButton.getAttribute('disable') !== 'disabled') && 
    (loButton.getAttribute('disabled') !== 'disabled');
};

//operations after win
var afterWin = function () {
    //console.log("Won! " + (winMessage.html()).substring(22,36));
    stake.val(String(config.minBet)); 
    multiplier = 1; 
    iWon++; 
    cant = 0; 
    betButton = 'hi';    
};

//operations after lose
var afterLose = function () {
    $('#double_your_btc_2x').click(); 
    //console.log("Lose, raising the bet: "+stake.val()); 
    iLose++;  
    multiplier++;  
    if(cant == config.payout) {  
        betButton = switchButton(betButton);
        cant = 0;
    }
};

//show results
var showBalance = function () {
    console.log("Statistics:"); 
    console.log("Initial balance: " + initialBalance);
    console.log("Profit: " + String(Math.round((parseFloat($('#balance').html()) - initialBalance) * 100000000)) + " Satoshis");
    console.log("Final balance: " + String($('#balance').html()));     
    console.log("Bets won: " + String(iWon));
    console.log("Bets lost: " + String(iLose));
    console.log("Total bets: " + String(iWon + iLose));
};

var makeBet = function() {
    $('#double_your_btc_bet_' + betButton + '_button').click(); 
    //console.log("I made a bet pressing " + betButton);
    cant++;
};

//main function
var start = function() { 
    if (buttonsEnabled()) {
                
        if (winMessage.html() !== '') { 
            afterWin();                            
        } else if (loseMessage.html() !== '') {  
            afterLose();
        } 

        //end = (profit + initialBalance)
        if (parseFloat($('#balance').html()) > end || stake.val() >= config.maxBet) {
            showBalance();
            return;
        }

        setTimeout(function() {
            makeBet();
        }, config.delay);
    
    } else {
        //console.log("Standby calculation"); 
    } 
    setTimeout(function() {
        start()
    }, (multiplier * config.delay) + Math.round(Math.random() * 2000));
}; 

//useful when re-execute the script without reload the webpage
$('#double_your_btc_bet_lose').html("");
$('#double_your_btc_bet_win').html("");

initialBalance = parseFloat($('#balance').html());
end = config.profit + initialBalance;
$('#double_your_btc_payout_multiplier').val(String(config.payout));
stake.val(String(config.minBet));
start();