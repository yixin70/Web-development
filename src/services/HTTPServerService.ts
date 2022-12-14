import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class HTTPServerService {
    private baseURL = 'http://wd.etsisi.upm.es:10000';

    constructor(private http: HttpClient) { }

    registerUser(username: string, email: string, password: string) {
        console.log('Sending...')

        let params = new HttpParams();
        params = params.set("username", username);
        params = params.set("email", email);
        params = params.set("password", password);

        return this.http.post(this.baseURL + '/users', params, { observe: 'response' });

    }
    getUsernameValidation(username: string) {
        return this.http.get(this.baseURL + '/users' + '/' + username, { observe: 'response' });
    }

    loginUser(username: string, password: string) {

        let params = new HttpParams();
        params = params.set('username', username);
        params = params.set('password', password);

        return this.http.get(this.baseURL + '/users/login?' + params, { observe: 'response' });
    }

    getRecords() {
        return this.http.get(this.baseURL + '/records');
    }

    getPersonalRecords(username: string) {
        return this.http.get(this.baseURL + '/records/' + username);
    }

    saveRecords(punctuation: string, ufos: string, disposedTime: string) {

        const headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded")

        let params = new HttpParams();
        params = params.set('punctuation', punctuation);
        params = params.set('ufos', ufos);
        params = params.set('disposedTime', disposedTime);

        return this.http.post(this.baseURL + '/records', params, {headers: headers});
    }

}
