import { Component, OnInit } from '@angular/core';
import { HTTPServerService } from 'src/services/HTTPServerService';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    username = "";
    email = "";
    password = "";
    repeatPassword = "";
    response: any;
    constructor(private server: HTTPServerService) { }

    checkParameters() {

        if (this.checkEmail() && this.checkPassword() && this.checkUsername()) {
            this.server.registerUser(this.username, this.email, this.password)
                .subscribe(
                    (data) => {
                        this.response = data.status;
                        console.log(this.response);
                        alert('Register succesful');

                    });
        }
        else {
            alert('Register Error');
        }
    }



    checkUsername() {
        if (this.username === '') {
            return false;
        }
        else {
            this.server.getUsernameValidation(this.username)
                .subscribe(
                    (data) => {
                        this.response = data.status;
                        alert('Username not available.');

                        this.username = '';
                        document.getElementById('username')?.focus();
                        return false;
                    },
                    (error) => {
                        return true;
                    }
                )
        }
        return true;


    }
    private checkEmail() {
        if (this.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return true;
        }
        else {
            alert('Non valid email.');
            return false;
        }

    }
    private checkPassword() {
        if (this.password === this.repeatPassword) {
            return true;
        }
        else {
            alert("Passwords are not the same.");
            return false;
        }
    }


    ngOnInit(): void {
    }

}
