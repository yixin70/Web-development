import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})

export class SettingsService {
    saveUsername(userName : string){
        localStorage.setItem('username', userName);
    }
    getUsername(){
        return localStorage.getItem('username');
    }

    removeUsername(){
        localStorage.removeItem('username');
    }

    setPreferences(time: string, numberOfUFOs: string) {
        localStorage.setItem('time', time);
        localStorage.setItem('numberOfUFOs', numberOfUFOs);
    }

    getTimePreferences() {
        if (localStorage.getItem('time')) {
            return localStorage.getItem('time');
        }
        return 60;
    }

    getUFOPreferences() {
        if (localStorage.getItem('numberOfUFOs')) {
            return localStorage.getItem('numberOfUFOs');
        }
        return 1;
    }

    clearPreferences() {
        localStorage.removeItem('numberOfUFOs');
        localStorage.removeItem('time');
    }
    saveFinalScore(score: string){
        localStorage.setItem('score', score);
    }
    getFinalScore(){
        if (localStorage.getItem('score')) {
            return localStorage.getItem('score');
        }
        return 0;
    }
    saveToken(token: string) {
        localStorage.setItem('token', token);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    removeToken() {
        localStorage.removeItem('token');
    }

}
