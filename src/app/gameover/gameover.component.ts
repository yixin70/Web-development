import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPServerService } from 'src/services/HTTPServerService';
import { SettingsService } from 'src/services/settingsServices';

@Component({
    selector: 'app-gameover',
    templateUrl: './gameover.component.html',
    styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {

    score = this.setting.getFinalScore() as string;
    ufos = this.setting.getUFOPreferences() as string;
    time = this.setting.getTimePreferences() as string;

    constructor(private setting: SettingsService, private router: Router, private http: HTTPServerService) { }

    ngOnInit(): void {
    }
    saveScore(){
        this.http.saveRecords(this.score, this.ufos, this.time).subscribe(
            (data) => {
                alert('Data saved');
            }
        );
    }
    playAgain(){
        this.router.navigate(['/play']);
    }
    isLogged(){
        return this.setting.getUsername() != null;
    }

}
