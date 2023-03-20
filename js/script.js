/*
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.
*/

const levelForm = document.getElementById('levelForm');
levelForm.addEventListener('submit', play);

//Funzione per disegnare la cella
function drawSquare(index, numSquares) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.height = square.style.width;
    square.innerHTML = `<span>${index}</span>`;
    return square;
}


//Funzione per generare l'array delle bombe
function generateBombs(bombnum, numsquares) {
    const bombs = [];
    while (bombs.length < 16) {
        const bomb = getRndNumber(1, numsquares);  
        if(!bombs.includes(bomb)) {
            bombs.push(bomb); 
        }          
    }
    return bombs;
}


//Funzione per mostrare tutte le mine dopo che si perde
function showMines(bombs) {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      if (bombs.includes(parseInt(square.innerText))) {
        square.classList.add('mine');
      }
    });
  }

function play(e) {
    e.preventDefault();
    const playground = document.getElementById('playground');
    playground.classList.remove('d-none');
    playground.innerHTML = '';
    const NUM_BOMBS = 16;
    const score = document.getElementById('score');
    let risultato = 0;
    let gameOver = false;
    let maxScore = score - NUM_BOMBS;

    //Prendo il livello
    const level = document.getElementById('level').value;
    console.log(level);
    
    //Imposto il numero di celle a seconda del livello
    let squareNumbers;

    switch (level) {
        case 'easy':
            squareNumbers = 100;
            break;
        case 'medium':
            squareNumbers = 81;
            break;
        case 'hard':
            squareNumbers = 49;
            break;
    };
    console.log(squareNumbers);

    //determino il numero di celle per lato
    let squareperRow = Math.sqrt(squareNumbers);
    console.log(squareperRow);

    const bombs = generateBombs(NUM_BOMBS, squareNumbers);
    console.log(bombs);

    //ciclo per il numero di celle genero cella
    for (let i = 1; i <= squareNumbers; i++) {
        const square = drawSquare(i, squareperRow);

        square.addEventListener('click', function clickHandler() {

            if (gameOver) return; // blocca il gioco se gameOver è true
            
            if (bombs.includes(i)) {
                square.classList.add('mine');
                
                // blocca il gioco
                const block = document.querySelectorAll('.square');
                block.forEach(square => square.removeEventListener('click', clickHandler));
                
                gameOver = true;        

                // mostra tutte le mine
                showMines(bombs); 
                score.innerHTML = `BOOOM!! Hai totalizzato ${risultato} punti`;  

                       
            
            } else {
                square.classList.add('safe');                 
                risultato ++;

                if (risultato === maxScore) {
                    score.innerHTML = `Congratulazione hai ottenuto il punteggio massimo. Come hai fatto :O`;
                } else{
                    score.innerHTML = `<br>Il tuo punteggio è ${risultato}`;
                }
            }

            
        
            // non permette di selezionare più di una volta lo stesso quadrato
            square.removeEventListener('click', clickHandler);
        });

        playground.appendChild(square);
    }
    
}
