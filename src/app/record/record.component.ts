import { Component, OnInit } from '@angular/core';
import { HTTPServerService } from 'src/services/HTTPServerService';
import { SettingsService } from 'src/services/settingsServices';

@Component({
    selector: 'app-record',
    templateUrl: './record.component.html',
    styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

    records: any;
    personalRecords: any;

    constructor(private server: HTTPServerService, private tokenServ: SettingsService) { }
    getRecords() {
        this.server.getRecords().subscribe(
            (data) => {
                this.records = data;
                for (let i = 0; i < this.records.length; i++)
                    this.records[i].recordDate = new Date(this.records[i].recordDate).toDateString()
            }
        )
    }

    getPersonalRecords() {
        let username = this.tokenServ.getUsername();
        if (username == null) {

        }
        else {
            this.server.getPersonalRecords(username).subscribe(
                (data) => {
                    this.personalRecords = data;
                    for (let i = 0; i < this.personalRecords.length; i++)
                        this.personalRecords[i].recordDate = new Date(this.personalRecords[i].recordDate).toDateString()
                }
            )
        }
    }

    ngOnInit(): void {
        this.getRecords();
        this.getPersonalRecords();
    }

}
