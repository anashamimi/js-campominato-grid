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
    square.innerHTML = index;
    return square;
}


//Funzione per generare l'array delle bombe
function generateBombs(bombnum, numsquares) {
    const bombs = [];
    while (bombs.length <= 16) {
        const bomb = getRndNumber(1, numsquares);  
        if(!bombs.includes(bomb)) {
            bombs.push(bomb); 
        }          
    }
    return bombs;
}

function play(e) {
    e.preventDefault();
    const playground = document.getElementById('playground');
    playground.classList.remove('d-none');
    playground.innerHTML = '';
    const NUM_BOMBS = 16;
    document.getElementById('score').classList.add('d-none');
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

        square.addEventListener('click', function() {

            if (bombs.includes(i)) {
                square.classList.add('mine');
            } else {
                square.classList.add('safe');
            }
        });


        playground.appendChild(square);
    }
}