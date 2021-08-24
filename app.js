// working tic tac toe game
// to possibly add in future?  option to play vs. computer
// 08-17 - added computer play functionality! and it even works!
// not perfect .. may update it a bit

console.log('JS connected!');

// initializing variable and object needed for game logic

const gameObject = {
    currentTurn: 'X',
    hasWon: false,
    tilesMarked: ['', '', '', '', '', '', '', '', ''], // this array will keep track of the game progress
    numWinsX: 0,
    numWinsO: 0,
    isDraw: false,
    isComp: false
}

const winStates = [ // these are all the scenarios in which one can win the game by box div id
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// building the DOM elements with jQuery

$(() => {

const $container = $('<div>').addClass('container');

const $gameStatus = $('<h2>').addClass('gameStatus');

$gameStatus.html(`The current player is: ${gameObject.currentTurn}`); // X always goes first

for (let i = 0; i < 9; i++) {
    $container.append('<div class="box" id="' + i + '"/>');
};

const $tallyDiv = $('<div>').addClass('tallyDiv')
const $tallyHead = $('<h2>').addClass('tallyHead');

$tallyHead.text('Game Tally');

$ul = $('<ul>').addClass('tallyList');
$li1 = $('<li>').addClass('tallyList-li1');
$li2 = $('<li>').addClass('tallyList-li2');

$li1.text(`X: ${gameObject.numWinsX}`);
$li2.text(`O: ${gameObject.numWinsO}`);

$tallyDiv.append($tallyHead);

$ul.append($li1);
$ul.append($li2);
$tallyDiv.append($ul);

$newGameBtn = $('<input type="submit" value="New Game" class="newGameBtn" />');

$tallyDiv.append($newGameBtn);

$container.append($tallyDiv);

$('body').append($container);
$('body').append($gameStatus);

$('.container').css({ 'display': 'none' });
$('.gameStatus').css({ 'display': 'none'});
$newGameBtn.css({ 'display': 'none' });

$chooseDiv = $('<div>').addClass('chooseDiv');
$humanBtn = $('<input type="submit" value="vs. Human" class="chooseBtn" />');
$compBtn = $('<input type="submit" value="vs. Computer" class="chooseBtn" />');

$($chooseDiv).append($humanBtn);
$($chooseDiv).append($compBtn);
$('body').append($chooseDiv);

$footerDiv = $('<footer>').text('Created for the Mod-1 Project by Andrew Lee ');
$('body').append($footerDiv);

// adding mobile functionality

const $gameCountMobile = $('<h3>').addClass('gameCountMobile');

$gameCountMobile.css({ 'display': 'none' });

const isMobileUser = window.matchMedia('(max-width: 600px)');
if (isMobileUser.matches) {
    $('.tallyDiv').css({ 'display': 'none' });
    $gameCountMobile.text(`X: ${gameObject.numWinsX} \t O: ${gameObject.numWinsO}`).css({ 'text-align': 'center', 'margin': 'auto', 'font-size': '24px' });
    $newGameBtn.css({ 'text-align': 'center', 'border': '1px solid black', 'width': '120px', 'height': '30px', 'font-size': '18px', 'padding-top': '0 px', 'margin-bottom': '30px', 'margin-top': '20px' })
    $('body').css({ 'text-align': 'center' })
    $('.gameStatus').css({ 'margin': '5px' })
    $('.container').css({ 'margin': '5px auto' })
    $('.container').css({ 'width': '324px', 'height': '324px', 'border': '4px solid dimgrey' })
    $('.box').css({'width': '100px', 'height': '100px', 'border': '4px solid dimgrey', 'margin': '0px'})
    $('body').append($gameCountMobile);
    $('body').append($newGameBtn);
}

// creating functions to make the game work

const newGame = () => {
    gameObject.tilesMarked = ['', '', '', '', '', '', '', '', '']; // zero out the tiles in the game object 
    $('.box').html('');                                            // ...  and as displayed on the DOM
    gameObject.hasWon = false;
    gameObject.isDraw = false;
    gameObject.currentTurn === 'X' ? gameObject.currentTurn = 'O' : gameObject.currentTurn = 'X';
    $gameStatus.html(`The current player is: ${gameObject.currentTurn}`);
}

const checkGameStatus = () => { // core game ~mega function~ - runs after every new move
    for (let i = 0; i < 8; i++) {
        let box1 = gameObject.tilesMarked[winStates[i][0]]; // for loop iterates thru the win states and assigns those values stored in gameobject
        let box2 = gameObject.tilesMarked[winStates[i][1]]; // to variables for below logical comparison to determine if game is won
        let box3 = gameObject.tilesMarked[winStates[i][2]]; // ie to win by a diagnal line from top left to bottom right, would be win state i=6 or
                                                            // [0,4,8] and if those are all marked by X on board, all 3 variables would be == 'X'
        if (box1 === '' || box2 === '' || box3 === '') { // this statement checks to see if any of these are not marked and if so leaves for loop
            continue;
        }
        
        if (box1 === box2 && box2 === box3) { // logic to determine win - all three variables have to equal same ie X or O, across above iterated
            gameObject.hasWon = true;         // win states
            break;
        }
    }
    
    if (gameObject.hasWon === true) { // what to do when win has been triggered
        $gameStatus.html(`Congratulations ${gameObject.currentTurn}, you have won the game!`);
        if (gameObject.currentTurn === 'X') {
            gameObject.numWinsX++;
        } else {
            gameObject.numWinsO++;
        }
        $li1.text(`X: ${gameObject.numWinsX}`);
        $li2.text(`O: ${gameObject.numWinsO}`);
        $gameCountMobile.text(`X: ${gameObject.numWinsX} \t O: ${gameObject.numWinsO}`); // dont forget mobile users!
        return;
    }

    if (gameObject.tilesMarked.includes('') === false) { // logic to handle draw scenario - if all tiles are marked but none has triggered the win 
        gameObject.isDraw = true;                        // logic described above, then scenario is draw
        $gameStatus.html('The game has ended in a draw');
    }

    if (gameObject.currentTurn === 'X' && gameObject.isDraw === false) { // if none of the above are true, then game isn't finished -- change turns
        gameObject.currentTurn = 'O';
        $gameStatus.html(`The current player is: ${gameObject.currentTurn}`);
    } else if (gameObject.currentTurn === 'O' && gameObject.isDraw === false) {
        gameObject.currentTurn = 'X';
        $gameStatus.html(`The current player is: ${gameObject.currentTurn}`);
    }
}

// giving the buttons functionality

$('.box').on('click', (box) => { // this is for the box divs that make the tic tac toe grid
    box.preventDefault();
    let clickIndex = parseInt(box.target.getAttribute('id')); // grab box div id and parse it to usable integer form
    if (gameObject.hasWon === false && box.target.innerHTML === "") { 
        box.target.innerHTML = gameObject.currentTurn;
        gameObject.tilesMarked[clickIndex] = gameObject.currentTurn;
        checkGameStatus();      
        if (gameObject.isComp === true && gameObject.hasWon === false) {   // added play vs computer functionality!!
            const openTiles = gameObject.tilesMarked.reduce((arr, e, i) => { // use a reducer function to grab an array of all index values of the
                if (e !== "X" && e !== "O") {                               // tilesMarked index that are open spaces and store in a variable
                    arr.push(i);
                };
                return arr;
            }, []);
            
            const randomMove = () => {
                const compMove =  openTiles[Math.floor(Math.random() * openTiles.length)]; // use above openTiles var to create our random move!
                document.getElementById(compMove).innerText = gameObject.currentTurn;      // ... and add it to our DOM
                gameObject.tilesMarked[compMove] = gameObject.currentTurn;                 // ... and add it as a new marked tile!
            };
            randomMove();                                                                  // call the function
        checkGameStatus();                                                                 // and back thru the big game function we go!
        } 
    } else {
        return
    };
});

$('.newGameBtn').on('click', (btn) => {
    btn.preventDefault();
    newGame();
});

$($humanBtn).on('click', (btn) => {
    btn.preventDefault();
    $chooseDiv.css({ 'display': 'none' });
    $('.container').css({ 'display': 'grid' });
    $('.gameStatus').css({ 'display': 'inherit' });
    $newGameBtn.css({ 'display': 'inherit' });
    $gameCountMobile.css({ 'display': 'inherit' });
});

$($compBtn).on('click', (btn) => {
    btn.preventDefault();
    $chooseDiv.css({ 'display': 'none' });
    $('.container').css({ 'display': 'grid' });
    $('.gameStatus').css({ 'display': 'inherit' });
    $newGameBtn.css({ 'display': 'unset' });
    $gameCountMobile.css({ 'display': 'inherit' });
    gameObject.isComp = true;
});

})