import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from './user';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor( private http: HttpClient) { }

    getUsers(): Observable<IUser[]> {
        return this.http.get('http://localhost:8080/user/');
        //return [{name:'John',department:'sales',location:'Iowa'}, 
        //       {name:'Jonny',department:'R&D',location:'Iowa'}, 
        //      {name:'Bill',department:'sales',location:'Iowa'}];
    }
}
