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
        return <Observable<IUser[]>> this.http.get<IUser[]>('http://localhost:8080/user/');
    }
}
