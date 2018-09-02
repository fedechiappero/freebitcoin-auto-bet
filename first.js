
/*lo que esta dentro de config es lo pueden modificar (si no tienen mucha idea, toquen solo esto, sino denle pa' delante nomas) */
config = { 
    apuestaMaxima: 0.00001024, /*transparente, cuando se llega a apostar este valor, termina la ejecucion*/
    gananciaEsperada: 0.0,  /*esto es cuanto esperamos ganar antes de terminar la ejecucion, ahora lo definimos, despues le asignamos un valor*/
    espera: 500, /*esto es un tiempo de espera que se va a usar (combinado con otros valores) para esperar entre apuesta y apuesta*/
    payout: 3, /*este es el valor de payout que queremos poner en la pagina*/ 
}; 

/*aca hay definiciones de variables necesarias para el funcionamiento del script*/ 
boton = 'hi'; /*esto indica con cual es el primer boton de apuesta que se presiona*/ 
multiplicador = 1; /*esto es parte del calculo de la espera entre apuesta y apuesta*/ 
cantidad = 0; /*cuenta la cantidad de veces que se presiona cada boton de apuesta(despues digo porque)*/
balanceInicial=0; /*definicion de la variable para almacenar el balance inicial*/ 
gane=0; /*cuenta la cantidad de veces que gane*/ 
perdi=0; /*cuenta la cantidad de veces que perdi*/ 
salida=0; /*sirve para saber cuando debe terminar la ejecucion porque llegamos a la gananci deseada, despues le damos el valor concreto*/

/*esta funcion se encarga de cambiar el boton de apuesta, entre HI y LO, simple, si se venia apretando el HI, cambia para que se apriete el LO, y al reves*/
CambiarBoton = function(valor) { 
    if (valor === 'hi') {  
        return 'lo'; 
    }  
    else  
    { 
        return 'hi'; 
    } 
}; 

/*esta es la funcion principal, la que hace los "clicks" en todos los botones de la pagina como si fueramos nosotros*/
Iniciar = function() { 
    /*este control sirve por si el servidor de la pagina anda lento, me paso muchas veces que se quedaba calculando el numero por unos segundos y sin decir si ganaba o perdia el script llegaba a ejecutarse de nuevo realizando varias apuestas*/
    if ((!(document.getElementById("double_your_btc_bet_hi_button").getAttribute("disabled") == "disabled")) && (!(document.getElementById("double_your_btc_bet_lo_button").getAttribute("disabled") == "disabled"))) {
        /*si en la seccion de mensajes se muestra que ganamos*/ 
        if ($('#double_your_btc_bet_win').html() !== '') { 
            /*escribe cuanto ganamos en la consola, esto es solo para hacerlo mas visual, se puede borrar tranquilamente*/
            console.log("Gane! " + ($("#double_your_btc_bet_win").html()).substring(22,36));
            /*se presiona el boton de apuesta minima para empezar de nuevo*/   
            $('#double_your_btc_min').click(); 
            /*se reseteal el multiplicador*/ 
            multiplicador = 1; 
            /*se incrementa la cantidad de veces ganadas*/ 
            gane++; 
            /*se resetea la cantidad de veces apretada el boton de apuesta*/ 
            cantidad = 0; 
            /*se selecciona el primer boton de apuesta*/ 
            boton = 'hi';                                      
        }  
        /*si en la seccion de mensajes se muestra que perdimos*/ 
        else if ($('#double_your_btc_bet_lose').html() !== '') {  
            /*igual que arriba, solo para hacerlo visual, se puede borrar*/ 
            console.log("Perdi, aumento la apuesta"); 
            /*se duplica la apuesta presionando el boton X2*/ 
            $('#double_your_btc_2x').click(); 
            /*se incrementa la cantidad de veces perdidas */ 
            perdi++;  
            /*se incrementa el multiplicador*/ 
            multiplicador++;  
            if(cantidad == config.payout) {  
                /* aca se controla si "cantidad" veces apretadas un boton de apuesta es igual a el payout, explico porque
                cuando ponemos el payout en 3, la pagina te dice que la probabilidad de ganar es de un 31%, o sea,
                este razonamiento no se si es correcto, pero como lo pense es, si en cada apuesta tengo un 31% de probabilidad
                de ganar, en 3 "deberia" ganar porque llego al 100%, pero estoy en la seccion de mensaje que perdi
                osea que llegue al 100% y no gane, por eso cambio el boton de apuesta para probar suerte con el otro*/
                boton = CambiarBoton(boton); /*cambio el boton de apuesta*/ 
                cantidad = 0;/*reseteo la cantidad de veces que se apreto el boton*/ 
                console.log("cambio boton de apuesta"); /*solo visual, se puede borrar*/
            } 
        } 
        /*estos son los controles de finalizacion del script, la primera parte antes del "||" controla que la ultima apuesta no sea mayor a la apuesta maxima configurarda y la parte despues del "||" controla si se alcanzo la ganancia esperada*/
        if ((parseFloat($('#double_your_btc_stake').val()) > config.apuestaMaxima) || (parseFloat($('#balance').html()) > salida)){ 
            /*en caso de cumplirse cualquiera de las dos condiciones se terminan las apuestas y se muestra un poco de info al respecto*/
            console.log("@xxxbxxx para Taringa!"); 
            console.log("Nos vemos en Narnia"); 
            console.log("Estadisticas:"); 
            console.log("Balance inicial: " + balanceInicial);/*cuanto dinero teniamos al principio*/
            console.log("Ganancia/Perdida: " + String(Math.round((parseFloat($('#balance').html()) - balanceInicial) * 100000000)) + " Satoshis");/*cuanto ganamos/perdimos, este valor esta expresado en satoshis porque a veces al ser un numero con muchos decimales no se mostraba bien, entonces ahora es un entero.*/
            console.log("Balance final: " + String($('#balance').html())); /*cuanto dinero tenemos ahora */     
            console.log("Apuestas ganadas: " + String(gane));/*cantidad de veces que ganamos*/
            console.log("Apuestas perdidas: " + String(perdi));/*cantidad de veces que perdimos*/
            console.log("Total de apuestas: " + String(gane + perdi));/*cantidad de apuestas realizadas*/
            return; /*y finalizacion del script*/ 
        } 
        /*aca se hacen las apuestas segun corresponda*/ 
        $('#double_your_btc_bet_' + boton + '_button').click(); 
        console.log("Hice una apuesta apretando " + boton);/*solo visual*/ 
        cantidad++;/*incremento cantidad*/ 
    }else{/*en este caso es cuando el servidor esta lento y la pagina se queda calculando, en vez de realizar apuestas y hacer lio solo se escribe en la consola ese mensaje, y se espera de nuevo las veces que sea necesario*/
        console.log("Calculo en espera"); 
    } 
    /*aca explico para que sirve "multiplicador" y la "espera".. que pasa? se supone que uno mismo deberia estar clickeando los botones de la pagina 
    y como somos humanos, nos lleva tiempo, mover el mouse de un boton, a otro, apretar el boton, pensar cual boton apretar, etc, entonces
    esto lo que hace es dar la "sensacion" de que el script es humano, el calculo es partiendo de el numero de apuestas seguidas que llevamos
    , la espera que configuramos(en milisegundos) sumado a un numero al azar multiplicado por otro, osea, es bien al azar, para que no haya 
    problemas de ningun tipo.. volviendo, se espera esa cantidad de tiempo al azar y se vuelve a ejecutar la funcion que hace las apuetas*/
    setTimeout(function() {Iniciar()}, (multiplicador * config.espera) + Math.round(Math.random() * 10000));
}; 

/*esto es el programa principal*/ 
balanceInicial = parseFloat($('#balance').html());/*se guarda el balance inicial*/ 
config.gananciaEsperada = config.apuestaMaxima / 2;/*yo configuro que la ganancia esperada es la mitad de la apuesta maxima, me parece que es una buena forma de asegurarme de obtener ganancias*/
salida = config.gananciaEsperada + parseFloat($('#balance').html());/*a "salida" le asigno, el balance actual + la ganancia esperada*/
$('#double_your_btc_payout_multiplier').val(String(config.payout)+".00");/*aca se aplica el payout que hayamos definido*/
$('#double_your_btc_min').click();/*se presiona el boton de apuesta minima, pero si todavia no aposte nada.. ya se, sirve solo en el caso que haya terminado el script y lo ejecuten sin regargar la pagina*/
Iniciar()/*y la llamada a la funcion principal que se encarga de las apuestas*/ 
