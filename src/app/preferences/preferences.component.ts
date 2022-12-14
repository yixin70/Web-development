import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/services/settingsServices';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  numberOfUFOs = 1;
  time = 60;
  constructor(private prefService: SettingsService) {}

  checkParameters(){
    if(this.checkTime() && this.checkUFOs()){
      this.prefService.setPreferences(this.time as any as string, this.numberOfUFOs as any as string);
    }
    else{
      alert('Wrong input');
    }
  }
  private checkUFOs(){
    if(this.numberOfUFOs > 0 && this.numberOfUFOs < 6){
      return true;
    }
    return false;
  }

  private checkTime(){
    if(this.time % 60 == 0 && this.time != 0 && this.time <= 180){
      return true;
    }
    return false;
  }

  clearParameters(){
    this.prefService.clearPreferences();
    this.prefService.setPreferences('60', '1'); //Set default.
  }



  ngOnInit(): void {
  }

}
