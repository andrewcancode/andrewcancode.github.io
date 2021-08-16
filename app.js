console.log('JS connected!');

// initializing variable and object needed for game logic

const gameObject = {
    currentTurn: 'X',
    hasWon: false,
    tilesMarked: ['', '', '', '', '', '', '', '', ''], // this array will keep track of the game progress
    numWinsX: 0,
    numWinsO: 0,
    isDraw: false
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

// adding mobile functionality

const $gameCountMobile = $('<h3>').addClass('gameCountMobile');

const isMobileUser = window.matchMedia('(max-width: 600px)');
if (isMobileUser.matches) {
    $('.tallyDiv').css({ 'display': 'none' });
    $gameCountMobile.text(`X: ${gameObject.numWinsX} \t O: ${gameObject.numWinsO}`).css({ 'text-align': 'center', 'margin': 'auto', 'font-size': '24px' });
    $newGameBtn.css({ 'border': '1px solid black', 'width': '120px', 'height': '30px', 'font-size': '18px', 'padding-top': '0 px', 'margin-bottom': '30px', 'margin-top': '20px' })
    $('body').css({ 'text-align': 'center' })
    $('.gameStatus').css({ 'margin': '5px' })
    $('.container').css({ 'margin': '5px auto' })
    $('.container').css({ 'width': '324px', 'height': '324px', 'border': '4px solid dimgrey' })
    $('.box').css({'width': '100px', 'height': '100px', 'border': '4px solid dimgrey', 'margin': '0px'})
    $('body').append($gameCountMobile);
    $('body').append($newGameBtn);
}

// initializing variables that will be needed

const newGame = () => {
    gameObject.tilesMarked = ['', '', '', '', '', '', '', '', ''];
    $('.box').html('');
    gameObject.hasWon = false;
    gameObject.isDraw = false;
    gameObject.currentTurn === 'X' ? gameObject.currentTurn = 'O' : gameObject.currentTurn = 'X';
    $gameStatus.html(`The current player is: ${gameObject.currentTurn}`);
}

$('.newGameBtn').on('click', (btn) => {
    btn.preventDefault();
    newGame();
})


const checkGameStatus = () => {
    for (let i = 0; i < 8; i++) {
        let box1 = gameObject.tilesMarked[winStates[i][0]]; 
        let box2 = gameObject.tilesMarked[winStates[i][1]];
        let box3 = gameObject.tilesMarked[winStates[i][2]];

        if (box1 === '' || box2 === '' || box3 === '') {
            continue;
        }
        
        if (box1 === box2 && box2 === box3) { 
            gameObject.hasWon = true;
            break;
        }
    }
    
    if (gameObject.hasWon === true) {
        $gameStatus.html(`Congratulations ${gameObject.currentTurn}, you have won the game!`);
        if (gameObject.currentTurn === 'X') {
            gameObject.numWinsX++;
        } else {
            gameObject.numWinsO++;
        }
        $li1.text(`X: ${gameObject.numWinsX}`);
        $li2.text(`O: ${gameObject.numWinsO}`);
        $gameCountMobile.text(`X: ${gameObject.numWinsX} \t O: ${gameObject.numWinsO}`);
        return;
    }

    if (gameObject.tilesMarked.includes('') === false) {
        gameObject.isDraw = true;
        $gameStatus.html('The game has ended in a draw');
    }

    if (gameObject.currentTurn === 'X' && gameObject.isDraw === false) {
        gameObject.currentTurn = 'O';
        $gameStatus.html(`The current player is: ${gameObject.currentTurn}`);
    } else if (gameObject.currentTurn === 'O' && gameObject.isDraw === false) {
        gameObject.currentTurn = 'X';
        $gameStatus.html(`The current player is: ${gameObject.currentTurn}`);
    }
}

$('.box').on('click', (box) => {
    box.preventDefault();
    let clickIndex = parseInt(box.target.getAttribute('id'));
    if (gameObject.hasWon === false && box.target.innerHTML === "") { 
        box.target.innerHTML = gameObject.currentTurn;
        gameObject.tilesMarked[clickIndex] = gameObject.currentTurn;
        checkGameStatus();       
    } else {
        return
    };
})

$(() => {

})