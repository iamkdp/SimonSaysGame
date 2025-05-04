let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let btns=["orange","red","green","blue"];

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false)
    {
        console.log("game is started");
        started=true;
        
        levelUP();
    }
});

function flash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },240);
}
function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },240);
}
function levelUP(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    flash(randBtn);
}
function checkAns(idx){
//    let idx=level-1;

    if(userSeq[idx]===gameSeq[idx]){
        console.log("same value");  
        if(userSeq.length==gameSeq.length){
          setTimeout(levelUP,1000);
        } 
    }
    else{
        updateHighScore(level);
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b><br>Press any key to start. `;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function()
        {
            document.querySelector("body").style.backgroundColor="gray";
        },150);
        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}
//HowTo play
howtoplaybtn.onclick=()=>{
    var x=document.getElementById("howtoplaypopup");
    if(x.style.display==='none')
        howtoplaypopup.style.display='block';
    else
        howtoplaypopup.style.display='none';
    };
closepopup.onclick=()=>howtoplaypopup.style.display='none';

//High score
let highscore=localStorage.getItem('simonHighScore') || 0;
document.getElementById('highscoreval').textContent=highscore;
function updateHighScore(currentScore){
    document.getElementById('highScore').style.display='block';
    if(currentScore>highscore){
        highscore=currentScore;
        localStorage.setItem('simonHighScore',highscore);
        document.getElementById('highscoreval').textContent=highscore;
    }
}