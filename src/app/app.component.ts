import { Component } from '@angular/core';
import { SettingsService } from 'src/services/settingsServices';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'UFO';
    constructor(private settings: SettingsService) { }
    isLogged() {
        return this.settings.getUsername() != null;
    }
    logout(){
        console.log('logout');
        this.settings.removeToken();
        this.settings.removeUsername();
    }
}
