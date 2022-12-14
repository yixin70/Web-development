import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPServerService } from 'src/services/HTTPServerService';
import { SettingsService } from 'src/services/settingsServices';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = "";
  password = "";
  token : any;

  constructor(private server: HTTPServerService, private tokenServ: SettingsService, private router: Router) {}

  logIn(){
    this.server.loginUser(this.userName, this.password).subscribe(
      (data) =>{

        this.token = data.headers.get('Authorization');
        this.token = (<String>this.token).slice(7);
        this.tokenServ.saveToken(this.token);
        this.tokenServ.saveUsername(this.userName);
        console.log(this.token);
        alert('UserLogged');
        this.router.navigate(['/home']);

      },
      (error) =>{
        alert("Wrong password/username");
      }
    )
  }



  ngOnInit(): void {
  }

}
