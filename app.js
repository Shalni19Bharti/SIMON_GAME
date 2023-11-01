let gameSeq = [];
let userSeq = [];

let btns = ["red","yellow","green","blue"];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener("keypress" , function(){
    if(started == false){
        started=true;

        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    } , 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    } , 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = (`Level : ${level}`);

    let randIdx = Math.floor(Math.random()*3);
    let randColor= btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    // console.log(gameSeq);
    gameflash(randBtn);
}

function checkAns(idx){

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = (`Game Over ! Your Score was <b>${level}</b> <br> Press any key to start`);
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor="white";
        } , 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtn = document.querySelectorAll(".btn");

for(btn of allbtn){
    btn.addEventListener("click" , btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}