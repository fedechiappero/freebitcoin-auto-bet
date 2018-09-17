# Freebitcoin HI-LO Auto Bet

## Take a break, read this...

This script doesn't guarantee you that you go to win every bet, it just play automatically like you would do it but you don't have to do anything beside to start the script, the game mode is a sort of [martingale](https://en.wikipedia.org/wiki/Martingale_(probability_theory)). Keep reading if you're interested.

## What it does?

When the script is started, it bet the minBet. 
+ When lose, it duplicate the bet.
+ When won, it reset the bet back to minBet and start again.
Ends when:
+ Before bet the maxBet.
+ It overcome the profit.

# How do i use it?

## Params (config var)

These are values you may tweak as you prefer.

+ maxBet: the script ends before bet this value.
+ minBet: minimal value to bet.
+ profit: how much you expect to win.
+ delay: this combined with other values is the delay between bets.
+ payout: payout multiplier.

## Run it

Copy the whole script, paste it in the browser developers console, hit enter, lie back and relax.
(uncomment the 'console.log(...)' to see verbose mode)

## Issues

+ When minBet is set in the textbox it's shows as E-notation (xe-x). Isn't critical, just weird to watch.

# Support

If you find this script useful, you can register with [this link](https://freebitco.in/?r=1837499), or if you already have an account, you can send it to a friend.