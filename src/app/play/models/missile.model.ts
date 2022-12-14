import { ElementRef, Renderer2 } from "@angular/core";


export class Missile {


    constructor(public width: string, public bottom: string, public left: string, public isLaunched: boolean) {

    }



    launchMissile(){

    }

    keyboardController(){

    }

    moveRight(){

    }
    moveLeft(){

    }
    /*
    keyboardController(theEvent) {
        let interval = 15;
        let code = theEvent.key;


        switch (code) {
            case 'ArrowRight':
                this.moveMissileRight.bind(this)();
                break;
            case 'ArrowLeft':
                this.moveMissileLeft.bind(this)();
                break;
            case ' ':
                if (!this.launchedMissile) {
                    this.interval = setInterval(this.launch.bind(this), 25);
                    this.launchedMissile = true;
                }
                break;
        }

    }
    */
}
