class Game {
    constructor(){
        this.player = null; 
        this.targets = [];
        this.score = 0;
        this.started = false;
        this.attachEventListeners();
        this.countdown = 10;
        this.displayCountdown = document.querySelector("span");
    
    }
    start(){
        this.displayCountdown.classList.add("display-countdown");

        this.starded = true; 
        if(!this.started){

            
            //create new targets
            setInterval(() => {
                const newTarget = new Target();
                this.targets.push(newTarget);
                this.countdown--;
                this.displayCountdown.innerText = this.countdown;
                if(this.countdown <= 0){
                    location.href = 'score.html';
                    localStorage.setItem('score', this.score)
                    
                }
            }, 1000);
    
            //move targets
            setInterval(() => {
                this.targets.forEach( (targetInstance) => {
                    targetInstance.moveFromLeft(); 
                    this.removeTargetIfOutside(targetInstance); //check if we need to remove the target
                });
            }, 60);    
            

        }

        
    }

   
    attachEventListeners(){ 
        const cursor = document.querySelector(".cursor");
        document.addEventListener("mousemove",(e) => {
            //console.log(e);
            cursor.style.top = e.pageY + "px";
            cursor.style.left = e.pageX + "px";
        })

    }

    removeTargetIfOutside(targetInstance){
        if(targetInstance.positionX > 190){ 
            targetInstance.domElement.remove(); 
            this.targets.shift(); // remove from the array
        }
    }



}

const game = new Game();


class Target {
    constructor(){
        this.width = 10;
        this.height = 10; 
        this.positionX = 10;
        this.positionY = Math.floor(Math.random() * (100 - this.width + 1)); 
        this.domElement = null;

        this.createDomElement();
    }

    createDomElement(){
        // create dom element
        this.domElement = document.createElement('img');

        // set id and css
        this.domElement.setAttribute('class', 'target');
        this.domElement.setAttribute('src','./images/bird.png');
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.removeTargetIfClick(this.domElement);
        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveFromLeft(){
        this.positionX++;
        this.domElement.style.left = this.positionX + "vh";
    }

    removeTargetIfClick(target){
        target.addEventListener('click', (e)=>{
            target.remove(); 
            game.score = game.score + 10;
            document.querySelector(".startBtn").innerText = "SCORE: " + game.score;
        })
   }
}



const startButton = document.querySelector(".startBtn"); 
startButton.addEventListener('click', (e)=>{
    game.start();

}, { once: true})




