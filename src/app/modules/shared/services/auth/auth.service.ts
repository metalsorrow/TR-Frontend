import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/modules/shared/interface/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly USER_KEY = 'user';
	private $userData: BehaviorSubject<User| null>;
	
	constructor() {
		this.$userData = new BehaviorSubject<User| null>(null);
	}

	setSessionUser(user: User | null) {
		localStorage.setItem('user', JSON.stringify(user));
		this.$userData.next(user);
	}

	$getSerssionUser(): Observable<User|null>{
		if(!this.$userData.getValue()){
			let user=JSON.parse(localStorage.getItem("user")||'');
			this.$userData.next(user);
		}
		return of(this.$userData.getValue());
	}

}
