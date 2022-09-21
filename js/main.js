class Game {
    constructor(){
        this.player = null; //will store an instance of the class Player
        this.targets = []; //will store instances of the class Target
        this.score = 0;
    }
    start(){
        this.player = new Player();
        this.attachEventListeners();
        
        //create new obstacles
        setInterval(() => {
            const newTarget = new Target();
            this.targets.push(newTarget);
        }, 1000);

        //move obstacles
        setInterval(() => {
            this.targets.forEach( (targetInstance) => {
                targetInstance.moveDown(); //move
                this.detectCollision(targetInstance); //detect collision with current obstacle
                this.removeObstacleIfOutside(targetInstance); //check if we need to remove current obstacle
            });
        }, 60);


    }
    attachEventListeners(){ // MODIFY FOR MOUSE CLICKS
        const cursor = document.querySelector(".cursor");
        document.addEventListener("mousemove",(e) => {
            console.log(e);
            cursor.style.top = e.pageY + "px";
            cursor.style.left = e.pageX + "px";
        })

    }

    startBtn(){
        this.startBtn.innerRext = "SCORE: " + this.score;
    }

    detectClick(targetInstance) {
        document.body.addEventListener('click',(e)=> {
            cursor.style.top = e.pageY + "px";
            cursor.style.left = e.pageX + "px";

            if(e.this.targets === targetInstance) this.score ++;
        })
    }
    detectCollision(targetInstance){
        if (
            this.player.positionX < targetInstance.positionX + targetInstance.width &&
            this.player.positionX + this.player.width > targetInstance.positionX &&
            this.player.positionY < targetInstance.positionY + targetInstance.height &&
            this.player.height + this.player.positionY > targetInstance.positionY
        ) {
            console.log("game over....")
            location.href = 'gameover.html';
        }
    }
    removeObstacleIfOutside(targetInstance){
        if(targetInstance.positionY < 0){
            targetInstance.domElement.remove(); //remove from the dom
            this.targets.shift(); // remove from the array
        }
    }
}


class Player {

}


class Target {
    constructor(){
        this.width = 5;
        this.height = 5; 
        this.positionX = 10;
        this.positionY = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100-width
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement(){
        // create dom element
        this.domElement = document.createElement('div');

        // set id and css
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveDown(){
        this.positionX++;
        this.domElement.style.left = this.positionX + "vh";
    }
}

const game = new Game();
game.start();
