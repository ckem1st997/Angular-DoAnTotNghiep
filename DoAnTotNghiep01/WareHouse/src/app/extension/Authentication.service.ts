import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // private userSubject: BehaviorSubject<User>;
    // public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        // this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return JSON.parse(sessionStorage.getItem('user') || '{}');
    }
    public get userCheck(): boolean {
        var check=JSON.parse(sessionStorage.getItem('user') || '{}');
        return check.username !== null && check.token !== undefined;
    }
    login(username: string, password: string, remember: boolean) {
        return this.http.post<any>(`${environment.authorizeApi}AuthorizeMaster/login`, { username, password, remember })
            .pipe(map(user => {
                if (user.success) {
                    var save=new User();
                    save.username=username;
                    save.token=user.data;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('user', JSON.stringify(save));
                 //   this.userSubject.next(user);
                }
                return user;

            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('user');
     //   this.userSubject.next(new User());
        this.router.navigate(['/authozire/login']);
    }
}