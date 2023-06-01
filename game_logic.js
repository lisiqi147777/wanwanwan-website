let playerText = document.getElementById('PlayerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

//let winnerIndicator = getComputedStyle(document.body).getProperty('--winning-blocks')

/*let form = document.forms['my-form'];
let menu = form.emoji;
let options = form.emoji.options;

/*menu.onchange = function(){
    let optionValue = this.value;
    console.log(optionValue);
}*/

/*var selectedValue = document.getElementsByName("emoji").value;  
var O_TEXT, X_TEXT;

if(selectedValue == "2"){ 
    O_TEXT = "😎" 
    X_TEXT = "😯"
}
if(selectedValue == "1"){
    O_TEXT = "🔪" 
    X_TEXT = "😠"
}*/


const O_TEXT = "😂"
const X_TEXT = "🤭"

let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer 
        e.target.innerText = currentPlayer 

        if(playerHasWon() !== false){
            playerText = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return 
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



function playerHasWon() {
    for (const condition of winningCombos) {
        let [a,b,c] = condition 

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c]
        }
    }
    return false 
}


restartBtn.addEventListener('click', restart)

function restart(){
    spaces.fill(null)

    boxes.forEach( box =>{
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()