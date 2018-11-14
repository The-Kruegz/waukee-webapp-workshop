import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserService } from '../user.service';
import { IUser } from '../user';


//export interface User {
//    name: string;
//    department: string;
//    location: string;
//}

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

    searchBarFormControl = new FormControl('');
    users: IUser[] = [];
    filteredUsers: IUser[] = [];

    constructor( private _userService: UserService) { }

    ngOnInit() {

        this._userService.getUsers()
            .subscribe(data => this.users = data);

        this.filteredUsers = this.searchBarFormControl.valueChanges
            .pipe(
            startWith<string | IUser>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.users.slice())
        );
    }

    displayName(user?: IUser): string | undefined {
        return user ? user.name : undefined;
    }

    private _filter(name: string): IUser[] {
        const filterValue = name.toLowerCase();

        return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
    }


}
