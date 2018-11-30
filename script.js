/* Dictionary:
Canvas: (computer graphics) A region on which graphics can be rendered.
 */

//The functions execute after window is loaded
window.onload = function () {
    let boxNumber;
    let symbol;
    let ctx;
    //turn maxVal = 9
    let turnNumber = 1;
    let filledBoxes = [];
    let playerSymbols = [];
    let gameOver = false;
    let human = 'X';
    let ai = 'O';
    let result = {};
    let winner =
        [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

    //Init game with no filled boxes and empty of player symbols
    for (let i=0; i<9; i++){
        filledBoxes[i] = false;
        playerSymbols[i] = '';
    }

    //Create new game
    let newGame = document.getElementById("newGame");
    //Click event that calls the new game function
    newGame.addEventListener("click", startNewGame);
    
    //Reload page
    function startNewGame() {
        document.location.reload();
    }
    //Recognize clicks for certain boxes
    document.getElementById("allBoxes").addEventListener("click", function (e) {
        fillBox(e.target.id);
    });

    //Draw player symbols
    function drawX(){
        symbol.style.backgroundColor = "#ff66dc";
        ctx.beginPath();
        ctx.moveTo(15, 15);
        ctx.lineTo(85, 85);
        ctx.moveTo(85, 15);
        ctx.lineTo(15, 85);
        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

        playerSymbols[boxNumber-1] = human;
    }
    function drawO(next) {
        symbol.style.backgroundColor = "#5be84e";
        ctx.beginPath();
        ctx.arc(50, 50, 35, 0, 2*Math.PI);
        ctx.lineWidth = 20;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
        playerSymbols[next] = ai;
    }

    //Check winner
    function checkWinner(playerSymbols, player){
        for (let j = 0; j < winner.length; j++) {
            if ((playerSymbols[j][0] === player) && (playerSymbols[j][1] === player) && playerSymbols[j][2]){
                j = 0;
                winner[j][0] = winner[0][0] = 0;
                return true;
            }
        }
        return false;
    }
    
    //Fill box (Human player)
    function fillBox(boxId) {
        symbol = document.getElementById(boxId);
        ctx = symbol.getContext("2d");
        switch(boxId){
            case "canvas1": boxNumber = 1;
                break;
            case "canvas2": boxNumber = 2;
                break;
            case "canvas3": boxNumber = 3;
                break;
            case "canvas4": boxNumber = 4;
                break;
            case "canvas5": boxNumber = 5;
                break;
            case "canvas6": boxNumber = 6;
                break;
            case "canvas7": boxNumber = 7;
                break;
            case "canvas8": boxNumber = 8;
                break;
            case "canvas9": boxNumber = 9;
                break;
        }
        if (filledBoxes[boxNumber-1] === false){
            if (gameOver === false){
                if (turnNumber%2 !== 0){
                    drawX();
                    turnNumber++;
                    filledBoxes[boxNumber-1] = true;
                    if (checkWinner(playerSymbols, playerSymbols[boxNumber-1]) === true){
                        document.getElementById("result").innerText = "Player '" + playerSymbols[boxNumber-1] + "' won!";
                        gameOver = true;
                    }
                    if (turnNumber > 9 && gameOver !== true){
                        document.getElementById("result").innerText = "It's a draw!";
                        return;
                    }
                    if (turnNumber%2 === 0){
                        playAi();
                    }
                }
            }
            else{
                alert("Game Over!");
            }
        }
        else{
            alert("This box was already filled");
        }
    } //fillBox
};
