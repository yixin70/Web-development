import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/services/settingsServices';
import { Missile } from './models/missile.model';
import { UFO } from './models/ufo.model';


@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit {

    numberOfUfos = this.settings.getUFOPreferences();
    time = this.settings.getTimePreferences() as any as number;
    score = 0;

    setOfUfos: UFO[] = [];
    setOfUfosRenderer: any = [];
    missileObject: any;
    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth;

    interval: any;
    timeInterval: any

    @ViewChild('body') body!: ElementRef;


    constructor(private settings: SettingsService, private renderer: Renderer2, private router: Router) {
    }
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
        let bottom = 650;
        let left = 50;

        for (let i = 0; i < this.numberOfUfos!; i++) {
            this.setOfUfos[i] = new UFO('70', bottom as any as string, left as any as string, 10);
            this.crearUFO(this.setOfUfos[i]);
            left += 100;
            bottom = bottom - 100;
        }
        this.missileObject = new Missile('40', '20', '100', false);
        this.crearMissile(this.missileObject);
        this.launchUFOS();
        this.timeInterval = setInterval(this.timeTick.bind(this), 100);

    }
    @HostListener('window:beforeunload')
    doSomething() { //Fixed bug when you change windows before ending the game.
        clearInterval(this.timeInterval);
    }

    timeTick() {
        this.time--;

        if (this.time == 0) {
            this.calculateFinalScore();
            clearInterval(this.interval);

            this.router.navigate(['/gameover']);
        }
    }
    calculateFinalScore() {
        let finalscore = this.score;
        finalscore = finalscore / (this.settings.getTimePreferences() as any as number / 60);
        let ufos = this.settings.getUFOPreferences() as any as number;
        finalscore = finalscore - ((ufos - 1) * 50);
        this.settings.saveFinalScore(finalscore as any as string);
    }
    crearUFO(ufo: UFO) {
        let ufoRenderer = this.renderer.createElement('img');
        this.renderer.setAttribute(ufoRenderer, 'class', 'ufo');
        this.renderer.setAttribute(ufoRenderer, 'src', '../../assets/ufo.png');

        this.renderer.setStyle(ufoRenderer, 'width', ufo.width + 'px');
        this.renderer.setStyle(ufoRenderer, 'position', 'absolute');
        this.renderer.setStyle(ufoRenderer, 'bottom', ufo.bottom + 'px');
        this.renderer.setStyle(ufoRenderer, 'left', ufo.left + 'px');

        this.renderer.appendChild(this.body.nativeElement, ufoRenderer);

        return ufoRenderer;
    }

    crearMissile(missile: Missile) {
        let missileRenderer = this.renderer.createElement('img');
        this.renderer.setProperty(missileRenderer, 'id', 'missile');
        this.renderer.setAttribute(missileRenderer, 'src', '../../assets/missile.png');

        this.renderer.setStyle(missileRenderer, 'width', missile.width + 'px');
        this.renderer.setStyle(missileRenderer, 'position', 'absolute');
        this.renderer.setStyle(missileRenderer, 'bottom', missile.bottom + 'px');
        this.renderer.setStyle(missileRenderer, 'left', missile.left + 'px');

        this.renderer.appendChild(this.body.nativeElement, missileRenderer);
    }



    launchUFOS() {
        setInterval(this.moveUFO.bind(this), 25);
    }
    moveUFO() {
        let UFOCollection = document.getElementsByClassName('ufo') as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < UFOCollection.length; i++) {

            let currentLeft = parseInt(this.setOfUfos[i].left);

            if (currentLeft >= innerWidth - 70 || currentLeft <= 0) {
                this.setOfUfos[i].step *= -1;
            }

            currentLeft += this.setOfUfos[i].step;
            this.setOfUfos[i].left = currentLeft as any as string;
            UFOCollection[i].style.left = currentLeft + 'px';
        }
    }


    @HostListener('document:keydown', ['$event'])
    keyboardController(ev: KeyboardEvent) {
        let code = ev.key;
        switch (code) {
            case 'ArrowRight':
                this.moveMissileRight.bind(this)();
                break;
            case 'ArrowLeft':
                this.moveMissileLeft.bind(this)();
                break;
            case ' ':
                if (!this.missileObject.isLaunched) {
                    this.interval = setInterval(this.launchMissile.bind(this), 25);
                    this.missileObject.isLaunched = true;
                }
                break;
        }
    }

    moveMissileRight() {
        let missile = document.getElementById('missile');
        let currentLeft = parseInt(this.missileObject.left);


        if (currentLeft < this.innerWidth - 70) {

            currentLeft += 5;
            this.missileObject.left = currentLeft;
            missile!.style.left = currentLeft as any as string + 'px';
        }
    }
    moveMissileLeft() {
        let missile = document.getElementById('missile');
        let currentLeft = parseInt(this.missileObject.left);


        if (currentLeft > 0) {

            currentLeft -= 5;
            this.missileObject.left = currentLeft;
            missile!.style.left = currentLeft as any as string + 'px';
        }
    }
    launchMissile() {
        let missile = document.getElementById('missile');
        let currentBottom = parseInt(this.missileObject.bottom);
        this.checkForImpact();
        let hit = this.checkForImpact();
        if (currentBottom > this.innerHeight - 200 || hit) {
            this.resetMissile();
            if (hit) {
                this.updateScore(100);
            }
            else {
                this.updateScore(-25);
            }
        } else {
            currentBottom += 10;
            this.missileObject.bottom = currentBottom;
            missile!.style.bottom = currentBottom + 'px';
        }
    }

    checkForImpact() {
        let UFOCollection = document.getElementsByClassName('ufo') as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < UFOCollection.length; i++) {
            let UFOwidth = parseInt(UFOCollection[i].style.width);
            let UFOleft = parseInt(UFOCollection[i].style.left);
            let UFObottom = parseInt(UFOCollection[i].style.bottom);

            let missileLeft = parseInt(this.missileObject.left);
            let missileBottom = parseInt(this.missileObject.bottom);
            let missileHeight = 70;

            let hit = (

                (missileBottom + missileHeight) >= UFObottom &&
                (missileBottom + missileHeight) <= (UFObottom + UFOwidth) &&
                missileLeft >= UFOleft &&
                missileLeft <= UFOleft + UFOwidth

            )

            if (hit) {
                this.changeUFOToExplosion(UFOCollection[i]);

                return true;
            }

        }

        return false;

    }
    changeUFOToExplosion(ufo: any) {
        ufo.src = "../../assets/explosion.gif";
        setTimeout(() => { ufo.src = "../../assets/ufo.png" }, 2000);
    }
    updateScore(score: number) {
        this.score += score;
    }
    resetMissile() {
        let missile = document.getElementById('missile');
        clearInterval(this.interval);
        missile!.style.bottom = '20px';
        this.missileObject.isLaunched = false;
        this.missileObject.bottom = 20;

    }
    reload() {
        window.location.reload();
    }
}
