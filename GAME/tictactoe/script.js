console.log("Welcome to TicTacToe")
let music = new Audio("start.mp3")
let audioturn = new Audio("turn.mp3")
let over = new Audio("over.wav")
let win = new Audio("win.mp3")
let turn = "X"
let gameover = false
const changeTurn=()=>{
    return turn ==="X"?"0":"X"
}
const checkWin = ()=>{
    let boxtext=document.getElementsByClassName('boxtext');
    let wins =[
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135],
    ]
    wins.forEach(e =>{
        if(boxtext[e[0]].innerText === boxtext[e[1]].innerText && (boxtext[e[2]].innerText ===boxtext[e[1]].innerText)&&(boxtext[e[0]].innerText !== "")){
            document.querySelector('.Info').innerText=boxtext[e[0]].innerText + " Won!!"
            gameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width ="250px";
            document.querySelector(".line").style.width="20vw";
            document.querySelector(".line").style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
            win.play();
        }
        })

}
function checkDraw(){
    let boxtexts=document.querySelectorAll('.boxtext');
    let allFilled = Array.from(boxtexts).every(box => box.innerText !== '');
    if (allFilled && !gameover) {
        document.getElementsByClassName("Info")[0].innerText="It's a draw!";
        over.play();
        gameover = true;
    }
}
//Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', (e)=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn= changeTurn();
            audioturn.play();
            checkWin();
            checkDraw();
            if(!gameover){
            document.getElementsByClassName("Info")[0].innerText="Turn for "+ turn;
            }
        }
    })
})
//Add onclick listener to reset button
reset.addEventListener('click',()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element =>{
        element.innerText =""
    });
    turn="X"
    gameover=false
    document.getElementsByClassName("Info")[0].innerText="Turn for "+ turn;
    document.querySelector(".line").style.width="0vw";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width ="0px"


})