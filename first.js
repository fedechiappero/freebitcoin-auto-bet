var config = { 
    maxBet: 0.00001024,
    minBet: 0.00000008,
    profit: 0.00000100,
    delay: 500,
    payout: 2.00,
}; 

var betButton = 'hi';
var multiplier = 1;
var cant = 0;
var initialBalance = 0;
var iWin = 0;
var iLose = 0;
var end = 0;

var hiButton = document.getElementById("double_your_btc_bet_hi_button");
var loButton = document.getElementById("double_your_btc_bet_lo_button");
var winMessage = $('#double_your_btc_bet_win');
var loseMessage = $('#double_your_btc_bet_lose');

//change the bet button
var switchButton = function(valor) { 
    return valor === 'hi' ? 'lo' : 'hi';
}; 

//check if the bet buttons are enabled
var buttonsEnabled = function(){
    return (hiButton.getAttribute('disable') !== 'disabled') && 
    (loButton.getAttribute('disabled') !== 'disabled');
};

//operations after win
var afterWin = function (){
    console.log("Win! " + (winMessage.html()).substring(22,36));
    $('#double_your_btc_min').click(); 
    multiplier = 1; 
    iWin++; 
    cant = 0; 
    betButton = 'hi';    
};

//operations after lose
var afterLose = function (){
    console.log("Lose, raising the bet"); 
    $('#double_your_btc_2x').click(); 
    iLose++;  
    multiplier++;  
    if(cant == config.payout) {  
        betButton = switchButton(betButton);
        cant = 0;
    }
};

//show results
var showBalance = function (){
    console.log("Statistics:"); 
    console.log("Initial balance: " + initialBalance);
    console.log("Profit/Loss: " + String(Math.round((parseFloat($('#balance').html()) - initialBalance) * 100000000)) + " Satoshis");
    console.log("Final balance: " + String($('#balance').html()));     
    console.log("Bets won: " + String(iWin));
    console.log("Bets lost: " + String(iLose));
    console.log("Total bets: " + String(iWin + iLose));
};

var makeBet = function(){
    $('#double_your_btc_bet_' + betButton + '_button').click(); 
    console.log("I made a bet pressing " + betButton);
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
        if (parseFloat($('#balance').html()) > end) { 
            showBalance();
            return;
        } 
        makeBet();
    } else {
        console.log("Standby calculation"); 
    } 
    setTimeout(function() {
        start()
    }, (multiplier * config.delay) + Math.round(Math.random() * 10000));
}; 

initialBalance = parseFloat($('#balance').html());
//config.profit = config.apuestaMaxima / 2;/*yo configuro que la ganancia esperada es la mitad de la apuesta maxima, me parece que es una buena forma de asegurarme de obtener ganancias*/
end = config.profit + initialBalance;
$('#double_your_btc_payout_multiplier').val(String(config.payout));
//$('#double_your_btc_min').click();/*se presiona el boton de apuesta minima, pero si todavia no aposte nada.. ya se, sirve solo en el caso que haya terminado el script y lo ejecuten sin regargar la pagina*/
$('#double_your_btc_stake').val(String(config.minBet));
start()
