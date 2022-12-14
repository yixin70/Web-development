import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameoverComponent } from './gameover/gameover.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

import { PlayComponent } from './play/play.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { RecordComponent } from './record/record.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'play', component: PlayComponent},
  {path: 'record', component: RecordComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'gameover', component: GameoverComponent},
  {path: '**', redirectTo: 'home'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
