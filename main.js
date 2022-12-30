// #region Variables
let activeElement = document.querySelector('.active');
let difficulty = activeElement.textContent;
const options = document.querySelectorAll('.option');

const box = document.getElementById('box');
const container = document.getElementById('container');

const hashCode = document.getElementById('hashCode');

let colors;
let winnerColor;
let count = 0;

const guess = document.getElementById('guess');
const restartBtn = document.createElement('button');
// #endregion

// #region getRandomColor
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// #endregion

// #region Difficulty
console.log('Difficulty: ' + difficulty);

options.forEach(element => {
    element.addEventListener('click',
        function () {
            if (activeElement) {
                activeElement.classList.remove('active');
            }
            activeElement = element;
            activeElement.classList.add('active');
            difficulty = activeElement.textContent;
            setColors();
            console.log('Difficulty: ' + difficulty);
            console.log(colors);
        });
});
// #endregion

// #region winnerColor
function setWinnerColor() {
    winnerColor = getRandomColor();
    hashCode.textContent = '#' + winnerColor;
    console.log('WinnerColor: ' + winnerColor);
}
// #endregion

// #region setColors
function setColors() {
    let randomIndex = Math.floor(Math.random() * difficulty);
    setWinnerColor();
    box.innerHTML = '';
    for (let i = 0; i < difficulty; i++) {
        if (i === randomIndex) {
            createColor(winnerColor);
        } else {
            createColor(getRandomColor());
        }
    }
    colors = document.querySelectorAll('.color');
    colorClick();
    restartBtn.remove();
    guess.innerHTML = '<p>GUESS THE COLOR</p>';
    count = 0;
    hashCode.style.color = 'black';
}
setColors();
// #endregion

// #region createColor
function createColor(background) {
    const color = document.createElement('div');
    color.setAttribute('class', 'color');
    box.appendChild(color);
    color.style.background = '#' + background;
    color.id = background;
}
// #endregion

// #region colorClick
function colorClick() {
    colors.forEach(function (element) {
        element.addEventListener('click', guessColor)
    });
}
colorClick();
// #endregion

// #region guessColor
function guessColor() {
    if (this.id === winnerColor) {
        winner();
        count++;
    } else {
        count++;
        this.classList.add('clicked');
        guess.innerHTML = 'Špatně, tahle barva je <span id="guessedColor">#' + this.id;
        document.getElementById('guessedColor').style.color = '#' + this.id;
        console.log('guess: ' + this.id)
    }
}
// #endregion   

// #region winner
function winner() {
    hashCode.style.color = '#' + winnerColor;
    colors.forEach(function (element) {
        if (element.id !== winnerColor) {
            element.classList.add('clicked');
        }
    })
    if(count > 4){
        guess.innerHTML = '<p>Výborně!</p><p id="count">Měli jste na to '+count+' pokusů';  
    }else{
        guess.innerHTML = '<p>Výborně!</p><p id="count">Měli jste na to '+count+' pokusy';
    }
    if(count === 0) guess.innerHTML = '<p>Paráda!</p><p id="count">Zvládli jste to na první pokus';
    
    newGame();
    console.log('winner: ' + winnerColor);
}
// #endregion

// #region newGame
function newGame() {

    restartBtn.textContent = "New game";
    restartBtn.classList.add('new-game');

    restartBtn.addEventListener('click', function () {
        console.log('GAME WAS RESTART')
        restartBtn.remove();
        hashCode.style.color = 'black';
        guess.innerHTML = '<p>GUESS THE COLOR</p>';
        setColors();
    });
    container.appendChild(restartBtn);
}
// #endregion
